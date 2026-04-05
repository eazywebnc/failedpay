import { createAdminClient } from '@/lib/supabase/server'

/**
 * Ensures the authenticated user has an fp_settings record.
 * Called on first dashboard access to support cross-SaaS login.
 */
export async function ensureUserProfile(userId: string) {
  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from('fp_settings')
    .select('user_id')
    .eq('user_id', userId)
    .single()

  if (existing) return

  await supabase.from('fp_settings').upsert(
    {
      user_id: userId,
      plan: 'free',
      auto_retry: true,
      retry_schedule: '1h,24h,72h,168h',
      recovery_limit: 50,
      accounts_limit: 1,
    },
    { onConflict: 'user_id' }
  )
}
