'use client'
import Image from "next/image";

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, TrendingUp, DollarSign, ShieldCheck } from 'lucide-react'

function AnimatedCounter({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
}: {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration])

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-green-500/3 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-emerald-400/3 rounded-full blur-[60px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-sm font-medium mb-8">
          <ShieldCheck className="w-4 h-4" />
          Trusted by 500+ SaaS businesses
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1]">
          Stop Losing Revenue to{' '}
          <span className="gradient-text">Failed Payments</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          5-10% of your subscribers churn involuntarily due to failed payments.
          FailedPay automatically recovers that revenue with smart retries, email
          dunning, and AI-powered recovery.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/auth/login"
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold text-lg hover:from-emerald-600 hover:to-green-700 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
          >
            Start Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#how-it-works"
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-zinc-300 font-medium text-lg hover:bg-white/5 transition-all"
          >
            See How It Works
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="glass rounded-2xl p-6 glow-green">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              <span className="text-3xl font-bold gradient-text">
                <AnimatedCounter end={2400000} prefix="$" />
              </span>
            </div>
            <p className="text-zinc-500 text-sm">Revenue Recovered</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              <span className="text-3xl font-bold text-white">
                <AnimatedCounter end={87} suffix="%" />
              </span>
            </div>
            <p className="text-zinc-500 text-sm">Recovery Rate</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span className="text-3xl font-bold text-white">
                <AnimatedCounter end={12000} suffix="+" />
              </span>
            </div>
            <p className="text-zinc-500 text-sm">Payments Recovered</p>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-emerald-500/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            <Image
              src="/images/dashboard.webp"
              alt="FailedPay payment recovery dashboard"
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 z-20" />
          </div>
        </div>
      </div>
    </section>
  )
}
