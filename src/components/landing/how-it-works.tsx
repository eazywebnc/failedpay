import { Link2, ShieldCheck, TrendingUp } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Link2,
    title: 'Connect Your Stripe Account',
    description:
      'Link your Stripe account in seconds. We securely connect via OAuth and start monitoring your payments immediately.',
  },
  {
    number: '02',
    icon: ShieldCheck,
    title: 'We Monitor & Recover',
    description:
      'Our system automatically detects failed payments and initiates smart retries and dunning sequences to recover them.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Watch Revenue Flow Back',
    description:
      'Track recovered payments in real-time. See exactly how much revenue FailedPay saves you every month.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/3 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-emerald-400 font-medium text-sm uppercase tracking-wider mb-3">
            How It Works
          </p>
          <h2 className="text-4xl font-bold">
            Three Steps to{' '}
            <span className="gradient-text">Revenue Recovery</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Get started in minutes. No code changes required.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[calc(50%+60px)] right-[calc(-50%+60px)] h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />
              )}

              <div className="text-center">
                {/* Number + Icon */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-emerald-500" />
                  </div>
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
