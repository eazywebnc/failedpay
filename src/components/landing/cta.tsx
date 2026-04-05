import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative glass rounded-3xl p-12 sm:p-16 text-center overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px]" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              Free to start, no credit card required
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Ready to{' '}
              <span className="gradient-text">Recover Revenue</span>?
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-8">
              Join hundreds of SaaS businesses that recover thousands in lost
              revenue every month with FailedPay.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/login"
                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold text-lg hover:from-emerald-600 hover:to-green-700 transition-all shadow-lg shadow-emerald-500/20"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-zinc-500 text-sm">
                Set up in under 2 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
