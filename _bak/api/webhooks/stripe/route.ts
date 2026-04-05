import { NextResponse } from 'next/server'
import { stripe, PLANS } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createAdminClient()

  try {
    switch (event.type) {
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const piField = (invoice as unknown as Record<string, unknown>).payment_intent
        if (!invoice.customer || !piField) break

        // Find the account this belongs to
        const customerId =
          typeof invoice.customer === 'string'
            ? invoice.customer
            : invoice.customer.id

        // Look up which fp_account this customer belongs to
        const connectedAccountId = event.account
        if (!connectedAccountId) break

        const { data: account } = await supabase
          .from('fp_accounts')
          .select('id')
          .eq('stripe_account_id', connectedAccountId)
          .eq('is_active', true)
          .single()

        if (!account) break

        const paymentIntentId =
          typeof piField === 'string' ? piField : (piField as { id: string }).id

        await supabase.from('fp_failed_payments').upsert(
          {
            account_id: account.id,
            stripe_payment_intent_id: paymentIntentId,
            stripe_invoice_id: invoice.id,
            customer_email: invoice.customer_email || 'unknown@email.com',
            customer_name: invoice.customer_name,
            amount: invoice.amount_due,
            currency: invoice.currency,
            failure_reason:
              invoice.last_finalization_error?.message || 'Payment failed',
            failure_code: invoice.last_finalization_error?.code || null,
            status: 'pending',
          },
          { onConflict: 'account_id,stripe_payment_intent_id' }
        )
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const piField2 = (invoice as unknown as Record<string, unknown>).payment_intent
        if (!piField2) break

        const paymentIntentId =
          typeof piField2 === 'string' ? piField2 : (piField2 as { id: string }).id

        // Mark as recovered if it was a failed payment
        await supabase
          .from('fp_failed_payments')
          .update({
            status: 'recovered',
            recovered_at: new Date().toISOString(),
          })
          .eq('stripe_payment_intent_id', paymentIntentId)
          .in('status', ['pending', 'recovering'])
        break
      }

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.mode !== 'subscription' || !session.customer) break

        const customerId =
          typeof session.customer === 'string'
            ? session.customer
            : session.customer.id

        const subscriptionId =
          typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription?.id

        // Determine plan from the price
        const subscription = subscriptionId
          ? await stripe.subscriptions.retrieve(subscriptionId)
          : null

        const priceId = subscription?.items.data[0]?.price.id
        let plan = 'free'
        if (priceId === PLANS.pro.priceId) plan = 'pro'
        else if (priceId === PLANS.business.priceId) plan = 'business'

        const planConfig = PLANS[plan as keyof typeof PLANS]

        await supabase
          .from('fp_settings')
          .update({
            plan,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId || null,
            recovery_limit: 'recovery_limit' in planConfig ? planConfig.recovery_limit : null,
            accounts_limit: 'accounts_limit' in planConfig ? planConfig.accounts_limit : null,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId =
          typeof subscription.customer === 'string'
            ? subscription.customer
            : subscription.customer.id

        const priceId = subscription.items.data[0]?.price.id
        let plan = 'free'
        if (priceId === PLANS.pro.priceId) plan = 'pro'
        else if (priceId === PLANS.business.priceId) plan = 'business'

        const planConfig = PLANS[plan as keyof typeof PLANS]

        await supabase
          .from('fp_settings')
          .update({
            plan,
            recovery_limit: planConfig.recovery_limit,
            accounts_limit: planConfig.accounts_limit,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId =
          typeof subscription.customer === 'string'
            ? subscription.customer
            : subscription.customer.id

        await supabase
          .from('fp_settings')
          .update({
            plan: 'free',
            stripe_subscription_id: null,
            recovery_limit: PLANS.free.recovery_limit,
            accounts_limit: PLANS.free.accounts_limit,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId)
        break
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }

  return NextResponse.json({ received: true })
}
