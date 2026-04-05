export interface FPAccount {
  id: string
  user_id: string
  stripe_account_id: string
  account_name: string
  is_active: boolean
  created_at: string
}

export interface FPFailedPayment {
  id: string
  account_id: string
  stripe_payment_intent_id: string
  stripe_invoice_id: string | null
  customer_email: string
  customer_name: string | null
  amount: number
  currency: string
  failure_reason: string
  failure_code: string | null
  status: 'pending' | 'recovering' | 'recovered' | 'failed'
  created_at: string
  recovered_at: string | null
}

export interface FPRecoveryAttempt {
  id: string
  failed_payment_id: string
  method: 'retry' | 'email' | 'sms'
  status: 'sent' | 'success' | 'failed'
  details: Record<string, unknown> | null
  created_at: string
}

export interface FPSettings {
  id: string
  user_id: string
  auto_retry: boolean
  retry_schedule: string
  dunning_enabled: boolean
  dunning_email_template: string | null
  plan: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  recovery_limit: number | null
  accounts_limit: number | null
  created_at: string
  updated_at: string
}
