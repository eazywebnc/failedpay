import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase/server'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
})

export async function getOrCreateStripeCustomer(userId: string, email: string) {
  const supabase = createAdminClient()

  // Check if user already has a Stripe customer ID
  const { data: settings } = await supabase
    .from('fp_settings')
    .select('stripe_customer_id')
    .eq('user_id', userId)
    .single()

  if (settings?.stripe_customer_id) {
    return settings.stripe_customer_id
  }

  // Create a new Stripe customer
  const customer = await stripe.customers.create({
    email,
    metadata: { user_id: userId },
  })

  // Save the customer ID
  await supabase
    .from('fp_settings')
    .update({ stripe_customer_id: customer.id })
    .eq('user_id', userId)

  return customer.id
}

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    recovery_limit: 50,
    accounts_limit: 1,
  },
  pro: {
    name: 'Pro',
    price: 2900, // in cents
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    recovery_limit: 500,
    accounts_limit: 3,
  },
  business: {
    name: 'Business',
    price: 7900, // in cents
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID!,
    recovery_limit: null, // unlimited
    accounts_limit: null, // unlimited
  },
} as const
