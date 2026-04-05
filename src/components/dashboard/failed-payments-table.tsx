import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'

interface Payment {
  id: string
  customer_email: string
  customer_name: string | null
  amount: number
  currency: string
  failure_reason: string
  status: string
  created_at: string
  recovered_at: string | null
}

interface FailedPaymentsTableProps {
  payments: Payment[]
}

export function FailedPaymentsTable({ payments }: FailedPaymentsTableProps) {
  if (payments.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <p className="text-zinc-400 text-lg mb-2">No failed payments yet</p>
        <p className="text-zinc-500 text-sm">
          When a payment fails on your connected Stripe account, it will appear
          here.
        </p>
      </div>
    )
  }

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                Customer
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                Amount
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                Reason
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                Status
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium">
                      {payment.customer_name || 'Unknown'}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {payment.customer_email}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  {formatCurrency(payment.amount, payment.currency)}
                </td>
                <td className="px-6 py-4 text-sm text-zinc-400 max-w-[200px] truncate">
                  {payment.failure_reason}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                      payment.status
                    )}`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-400">
                  {formatDate(payment.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
