import {
  RotateCw,
  Mail,
  Users,
  BarChart3,
  LineChart,
  Code2,
} from 'lucide-react'

const features = [
  {
    icon: RotateCw,
    title: 'Smart Retry Logic',
    description:
      'Intelligent retry scheduling that adapts to failure patterns. Retry at optimal times to maximize recovery rates.',
  },
  {
    icon: Mail,
    title: 'Email Dunning',
    description:
      'Automated, customizable dunning emails that gently remind customers to update their payment methods.',
  },
  {
    icon: Users,
    title: 'Multi-Account Support',
    description:
      'Connect multiple Stripe accounts and manage all your failed payment recovery from a single dashboard.',
  },
  {
    icon: BarChart3,
    title: 'Real-time Dashboard',
    description:
      'Monitor failed payments, recovery attempts, and success rates in real-time with our intuitive dashboard.',
  },
  {
    icon: LineChart,
    title: 'Recovery Analytics',
    description:
      'Deep insights into your recovery performance, failure patterns, and revenue impact over time.',
  },
  {
    icon: Code2,
    title: 'API Access',
    description:
      'Full REST API access to integrate FailedPay recovery data into your existing tools and workflows.',
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-emerald-400 font-medium text-sm uppercase tracking-wider mb-3">
            Features
          </p>
          <h2 className="text-4xl font-bold">
            Everything You Need to{' '}
            <span className="gradient-text">Recover Revenue</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Powerful tools designed to automatically recover failed payments and
            reduce involuntary churn for your SaaS business.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group glass rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                <feature.icon className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
