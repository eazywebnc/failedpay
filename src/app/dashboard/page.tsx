import { createClient } from '@/lib/supabase/server'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { FailedPaymentsTable } from '@/components/dashboard/failed-payments-table'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch accounts for this user
  const { data: accounts } = await supabase
    .from('fp_accounts')
    .select('id')
    .eq('user_id', user!.id)

  const accountIds = accounts?.map((a) => a.id) || []

  // Fetch failed payments
  let payments: { id: string; amount: number; status: string; currency: string; customer_email: string; customer_name: string | null; failure_reason: string; created_at: string; recovered_at: string | null }[] = []
  if (accountIds.length > 0) {
    const { data } = await supabase
      .from('fp_failed_payments')
      .select('*')
      .in('account_id', accountIds)
      .order('created_at', { ascending: false })
      .limit(20)
    payments = data || []
  }

  // Calculate stats
  const totalFailed = payments.length
  const recovered = payments.filter((p) => p.status === 'recovered').length
  const recoveryRate = totalFailed > 0 ? Math.round((recovered / totalFailed) * 100) : 0
  const revenueSaved = payments
    .filter((p) => p.status === 'recovered')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-zinc-400 mt-1">
          Monitor and recover your failed payments
        </p>
      </div>

      <StatsCards
        totalFailed={totalFailed}
        recovered={recovered}
        recoveryRate={recoveryRate}
        revenueSaved={revenueSaved}
      />

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Failed Payments</h2>
        <FailedPaymentsTable payments={payments} />
      </div>
    </div>
  )
}
