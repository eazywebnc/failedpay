import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Check if fp_settings exists for this user, create if not
      const admin = createAdminClient()
      const { data: existing } = await admin
        .from('fp_settings')
        .select('id')
        .eq('user_id', data.user.id)
        .single()

      if (!existing) {
        await admin.from('fp_settings').insert({
          user_id: data.user.id,
          plan: 'free',
          auto_retry: true,
          retry_schedule: '1h,24h,72h,168h',
          dunning_enabled: false,
          recovery_limit: 50,
          accounts_limit: 1,
        })
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`)
}
