import Link from 'next/link'
import { Check, Zap, Crown } from 'lucide-react'

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect to get started and test the waters.',
    features: [
      '50 recovery attempts/month',
      '1 connected Stripe account',
      'Basic retry logic',
      'Email notifications',
      'Community support',
    ],
    cta: 'Start Free',
    popular: false,
    icon: null,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For growing SaaS businesses serious about recovery.',
    features: [
      '500 recovery attempts/month',
      '3 connected Stripe accounts',
      'Smart retry scheduling',
      'Email dunning campaigns',
      'Recovery analytics',
      'Priority support',
      'Webhook notifications',
    ],
    cta: 'Get Pro',
    popular: true,
    icon: Zap,
  },
  {
    name: 'Business',
    price: '$79',
    period: '/month',
    description: 'Unlimited recovery for established businesses.',
    features: [
      'Unlimited recovery attempts',
      'Unlimited Stripe accounts',
      'AI-powered recovery',
      'Custom branding on emails',
      'Advanced analytics & reports',
      'Dedicated support',
      'API access',
      'Custom retry schedules',
    ],
    cta: 'Get Business',
    popular: false,
    icon: Crown,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-emerald-400 font-medium text-sm uppercase tracking-wider mb-3">
            Pricing
          </p>
          <h2 className="text-4xl font-bold">
            Simple, Transparent{' '}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Start free. Upgrade when you need more. No hidden fees, no surprises.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                tier.popular
                  ? 'glass border-emerald-500/30 glow-green scale-[1.02]'
                  : 'glass hover:border-white/10'
              }`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-xs font-semibold">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  {tier.icon && (
                    <tier.icon className="w-5 h-5 text-emerald-500" />
                  )}
                  <h3 className="text-xl font-semibold">{tier.name}</h3>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-zinc-500">{tier.period}</span>
                </div>
                <p className="text-zinc-400 text-sm mt-2">{tier.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/auth/login"
                className={`block text-center py-3 rounded-xl font-medium text-sm transition-all ${
                  tier.popular
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-500/20'
                    : 'border border-white/10 text-zinc-300 hover:bg-white/5'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
