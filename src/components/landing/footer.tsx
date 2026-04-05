import Link from 'next/link'
import { Shield, CreditCard } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="relative">
                <Shield className="w-6 h-6 text-emerald-500" />
                <CreditCard className="w-3 h-3 text-green-400 absolute -bottom-0.5 -right-0.5" />
              </div>
              <span className="text-lg font-bold">
                Failed<span className="gradient-text">Pay</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
              Automatically recover failed Stripe payments and reduce involuntary
              churn. Built for SaaS businesses that care about revenue.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-zinc-300">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <Link href="/auth/login" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-zinc-300">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://eazyweb.nc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  EazyWebNC
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@eazyweb.nc"
                  className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} FailedPay. All rights reserved.
          </p>
          <p className="text-zinc-600 text-sm">
            Built by{' '}
            <a
              href="https://eazyweb.nc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500/60 hover:text-emerald-500 transition-colors"
            >
              EazyWebNC
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
