-- FailedPay Migration
-- Run this in the Supabase SQL Editor

-- Settings/users table
CREATE TABLE IF NOT EXISTS fp_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  auto_retry boolean DEFAULT true,
  retry_schedule text DEFAULT '1h,24h,72h,168h',
  dunning_enabled boolean DEFAULT false,
  dunning_email_template text,
  plan text DEFAULT 'free',
  stripe_customer_id text,
  stripe_subscription_id text,
  recovery_limit integer DEFAULT 50,
  accounts_limit integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Connected Stripe accounts
CREATE TABLE IF NOT EXISTS fp_accounts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_account_id text NOT NULL,
  account_name text NOT NULL DEFAULT 'My Stripe Account',
  webhook_secret text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, stripe_account_id)
);

-- Failed payments tracked
CREATE TABLE IF NOT EXISTS fp_failed_payments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  account_id uuid REFERENCES fp_accounts(id) ON DELETE CASCADE NOT NULL,
  stripe_payment_intent_id text NOT NULL,
  stripe_invoice_id text,
  customer_email text NOT NULL,
  customer_name text,
  amount integer NOT NULL,
  currency text DEFAULT 'usd',
  failure_reason text,
  failure_code text,
  status text DEFAULT 'pending' CHECK (status IN ('pending','recovering','recovered','failed')),
  created_at timestamptz DEFAULT now(),
  recovered_at timestamptz,
  UNIQUE(account_id, stripe_payment_intent_id)
);

-- Recovery attempts log
CREATE TABLE IF NOT EXISTS fp_recovery_attempts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  failed_payment_id uuid REFERENCES fp_failed_payments(id) ON DELETE CASCADE NOT NULL,
  method text NOT NULL CHECK (method IN ('retry','email','sms')),
  status text DEFAULT 'sent' CHECK (status IN ('sent','success','failed')),
  details jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE fp_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE fp_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE fp_failed_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE fp_recovery_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for fp_settings
CREATE POLICY "Users can view own settings" ON fp_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own settings" ON fp_settings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own settings" ON fp_settings FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for fp_accounts
CREATE POLICY "Users can view own accounts" ON fp_accounts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own accounts" ON fp_accounts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own accounts" ON fp_accounts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own accounts" ON fp_accounts FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for fp_failed_payments (via account ownership)
CREATE POLICY "Users can view own failed payments" ON fp_failed_payments FOR SELECT
  USING (account_id IN (SELECT id FROM fp_accounts WHERE user_id = auth.uid()));

-- RLS Policies for fp_recovery_attempts (via payment -> account ownership)
CREATE POLICY "Users can view own recovery attempts" ON fp_recovery_attempts FOR SELECT
  USING (failed_payment_id IN (
    SELECT fp.id FROM fp_failed_payments fp
    JOIN fp_accounts fa ON fp.account_id = fa.id
    WHERE fa.user_id = auth.uid()
  ));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_fp_settings_user ON fp_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_fp_accounts_user ON fp_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_fp_failed_payments_account ON fp_failed_payments(account_id);
CREATE INDEX IF NOT EXISTS idx_fp_failed_payments_status ON fp_failed_payments(status);
CREATE INDEX IF NOT EXISTS idx_fp_recovery_attempts_payment ON fp_recovery_attempts(failed_payment_id);
