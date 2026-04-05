import {
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  DollarSign,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface StatsCardsProps {
  totalFailed: number
  recovered: number
  recoveryRate: number
  revenueSaved: number
}

export function StatsCards({
  totalFailed,
  recovered,
  recoveryRate,
  revenueSaved,
}: StatsCardsProps) {
  const stats = [
    {
      label: 'Total Failed',
      value: totalFailed.toString(),
      icon: AlertTriangle,
      iconColor: 'text-red-400',
      bgColor: 'bg-red-500/10',
    },
    {
      label: 'Recovered',
      value: recovered.toString(),
      icon: CheckCircle2,
      iconColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
    {
      label: 'Recovery Rate',
      value: `${recoveryRate}%`,
      icon: TrendingUp,
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Revenue Saved',
      value: formatCurrency(revenueSaved),
      icon: DollarSign,
      iconColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass rounded-2xl p-6 hover:border-white/10 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-zinc-400 text-sm">{stat.label}</span>
            <div
              className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}
            >
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
          </div>
          <p className="text-3xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
