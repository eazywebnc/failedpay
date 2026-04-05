'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import {
  ArrowRight,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  CreditCard,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  ArrowUpRight,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Animated Counter (spring-based + GSAP ScrollTrigger re-trigger)    */
/* ------------------------------------------------------------------ */

function AnimatedCounter({
  end,
  prefix = '',
  suffix = '',
}: {
  end: number
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(0)
  const counterObj = useRef({ val: 0 })

  useEffect(() => {
    if (!ref.current) return

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        counterObj.current.val = 0
        gsap.to(counterObj.current, {
          val: end,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            setDisplayValue(Math.round(counterObj.current.val))
          },
        })
      },
      onEnterBack: () => {
        counterObj.current.val = 0
        gsap.to(counterObj.current, {
          val: end,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            setDisplayValue(Math.round(counterObj.current.val))
          },
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [end])

  return (
    <motion.span ref={ref}>
      {prefix}
      {inView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {displayValue.toLocaleString()}
        </motion.span>
      ) : (
        '0'
      )}
      {suffix}
    </motion.span>
  )
}

/* ------------------------------------------------------------------ */
/*  Recovery Dashboard Mockup                                          */
/* ------------------------------------------------------------------ */

const retryTimeline = [
  { attempt: 1, status: 'failed', time: 'Mar 2, 10:00', amount: '$49.00' },
  { attempt: 2, status: 'failed', time: 'Mar 4, 14:30', amount: '$49.00' },
  { attempt: 3, status: 'recovered', time: 'Mar 7, 09:15', amount: '$49.00' },
]

const recoveryMetrics = [
  { label: 'Total At Risk', value: '$18,420', trend: null, color: 'text-zinc-300' },
  { label: 'Recovered', value: '$15,847', trend: '+86%', color: 'text-emerald-400' },
  { label: 'Avg Recovery', value: '3.2 days', trend: '-0.5d', color: 'text-cyan-400' },
]

const recentRecoveries = [
  { email: 'sarah@company.com', amount: '$99', method: 'Smart Retry', status: 'recovered' },
  { email: 'mike@startup.io', amount: '$49', method: 'Email Dunning', status: 'recovered' },
  { email: 'team@agency.co', amount: '$199', method: 'Card Update', status: 'pending' },
]

function RecoveryMockup() {
  return (
    <div className="relative w-full rounded-2xl border border-white/[0.08] bg-[#070d07]/80 overflow-hidden shadow-2xl shadow-emerald-500/10 backdrop-blur-xl">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-[11px] text-zinc-500 ml-2">FailedPay — Recovery Dashboard</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/15">
          <TrendingUp className="w-3 h-3 text-emerald-400" />
          <span className="text-[10px] text-emerald-400 font-medium">86% recovery rate</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-0">
        {/* Left — Recovery timeline */}
        <div className="col-span-5 p-4 border-r border-white/[0.06]">
          {/* Metrics row */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {recoveryMetrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center"
              >
                <p className={`text-sm font-bold ${m.color}`}>{m.value}</p>
                <p className="text-[8px] text-zinc-600 mt-0.5">{m.label}</p>
                {m.trend && (
                  <p className="text-[8px] text-emerald-400 mt-0.5">{m.trend}</p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Retry timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <RefreshCw className="w-3 h-3 text-zinc-500" />
              <span className="text-[10px] font-medium text-zinc-400">Recovery Timeline</span>
            </div>
            <div className="space-y-0 relative">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.06]" />

              {retryTimeline.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.15, type: 'spring' }}
                  className="flex items-start gap-3 py-2 relative"
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center z-10 ${
                    step.status === 'recovered'
                      ? 'bg-emerald-500/20'
                      : 'bg-rose-500/20'
                  }`}>
                    {step.status === 'recovered' ? (
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-2.5 h-2.5 text-rose-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-medium ${
                        step.status === 'recovered' ? 'text-emerald-300' : 'text-rose-300'
                      }`}>
                        Attempt {step.attempt} — {step.status === 'recovered' ? 'Recovered!' : 'Failed'}
                      </span>
                      <span className="text-[9px] text-zinc-600">{step.amount}</span>
                    </div>
                    <span className="text-[9px] text-zinc-600">{step.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Revenue chart mini */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mt-3 p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-zinc-500">Monthly Recovery</span>
              <span className="text-[10px] font-mono text-emerald-400">$15,847</span>
            </div>
            <div className="flex items-end gap-[3px] h-8">
              {[35, 42, 38, 55, 48, 62, 58, 72, 65, 78, 85, 92].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 1.5 + i * 0.05, duration: 0.3 }}
                  className="flex-1 rounded-sm bg-emerald-500/50 origin-bottom"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — Recent recoveries */}
        <div className="col-span-7 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <CreditCard className="w-3 h-3 text-zinc-500" />
              <span className="text-[11px] font-medium text-zinc-300">Recent Recoveries</span>
            </div>
            <span className="text-[9px] text-zinc-600">Last 24h</span>
          </div>

          <div className="space-y-2">
            {recentRecoveries.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.12, type: 'spring', stiffness: 200 }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  r.status === 'recovered' ? 'bg-emerald-500/10' : 'bg-amber-500/10'
                }`}>
                  {r.status === 'recovered' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-zinc-200 truncate">{r.email}</p>
                  <p className="text-[9px] text-zinc-500">{r.method}</p>
                </div>
                <div className="text-right">
                  <p className={`text-[11px] font-mono font-medium ${
                    r.status === 'recovered' ? 'text-emerald-400' : 'text-amber-400'
                  }`}>{r.amount}</p>
                  <p className="text-[8px] text-zinc-600 capitalize">{r.status}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Email dunning preview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Mail className="w-3 h-3 text-zinc-500" />
              <span className="text-[10px] font-medium text-zinc-400">Dunning Email Sequence</span>
            </div>
            <div className="flex items-center gap-2">
              {['Day 1', 'Day 3', 'Day 7', 'Day 14'].map((d, i) => (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + i * 0.1 }}
                  className={`flex-1 py-1.5 rounded-lg text-center text-[9px] border ${
                    i < 2
                      ? 'bg-emerald-500/10 border-emerald-500/15 text-emerald-400'
                      : 'bg-white/[0.02] border-white/[0.04] text-zinc-500'
                  }`}
                >
                  {d}
                  {i < 2 && <CheckCircle2 className="w-2 h-2 inline ml-0.5" />}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI insight */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="mt-2 p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10"
          >
            <div className="flex items-start gap-2">
              <ArrowUpRight className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
              <p className="text-[9px] text-zinc-400 leading-relaxed">
                <span className="text-emerald-300 font-medium">AI Prediction:</span> 73% chance of recovery for
                team@agency.co if retried on Wednesday at 9am (their timezone). Card update link sent.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Floating badges (with GSAP parallax refs)                          */
/* ------------------------------------------------------------------ */

const FloatingBadges = ({ badgeRightRef, badgeLeftRef }: {
  badgeRightRef: React.RefObject<HTMLDivElement | null>
  badgeLeftRef: React.RefObject<HTMLDivElement | null>
}) => {
  return (
    <>
      <motion.div
        ref={badgeRightRef}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, type: 'spring' }}
        className="absolute -right-3 top-16 z-20 hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-lg"
      >
        <DollarSign className="w-4 h-4 text-emerald-400" />
        <div>
          <p className="text-[10px] font-medium text-emerald-300">+$2,340 Recovered</p>
          <p className="text-[9px] text-zinc-500">This week</p>
        </div>
      </motion.div>

      <motion.div
        ref={badgeLeftRef}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.0, type: 'spring' }}
        className="absolute -left-3 bottom-24 z-20 hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-lg"
      >
        <RefreshCw className="w-4 h-4 text-cyan-400" />
        <div>
          <p className="text-[10px] font-medium text-cyan-300">Smart Retry</p>
          <p className="text-[9px] text-zinc-500">3 payments queued</p>
        </div>
      </motion.div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const mockupWrapperRef = useRef<HTMLDivElement>(null)
  const badgeRightRef = useRef<HTMLDivElement>(null)
  const badgeLeftRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 90])

  /* GSAP ScrollTrigger: 3D tilt on mockup + parallax on badges */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 3D perspective tilt on dashboard mockup */
      if (mockupWrapperRef.current) {
        gsap.set(mockupWrapperRef.current, {
          transformPerspective: 1200,
          transformOrigin: 'center center',
        })

        gsap.fromTo(
          mockupWrapperRef.current,
          {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
          },
          {
            rotateX: -8,
            rotateY: 3,
            scale: 0.97,
            ease: 'none',
            scrollTrigger: {
              trigger: mockupWrapperRef.current,
              start: 'top 60%',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )
      }

      /* Parallax: right badge moves faster (1.6x scroll speed) */
      if (badgeRightRef.current) {
        gsap.to(badgeRightRef.current, {
          y: -120,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      }

      /* Parallax: left badge moves slower (0.5x scroll speed) */
      if (badgeLeftRef.current) {
        gsap.to(badgeLeftRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial glows — red danger to green recovery */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-red-500/6 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-500/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-orange-500/4 rounded-full blur-[80px]" />

        {/* Diagonal stripe pattern — crimson */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(239,68,68,0.15) 40px, rgba(239,68,68,0.15) 41px, transparent 41px, transparent 80px)',
          }}
        />

        {/* CSS grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(239,68,68,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,.12) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-sm font-medium mb-8"
          >
            <ShieldCheck className="w-4 h-4" />
            Recover up to 87% of failed payments
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1]"
          >
            Stop Losing Revenue to{' '}
            <span className="gradient-text">Failed Payments</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            5-10% of your subscribers churn involuntarily due to failed payments.
            FailedPay automatically recovers that revenue with smart retries, email
            dunning, and AI-powered recovery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/auth/login"
              className="group flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold text-lg hover:from-red-600 hover:to-rose-600 transition-all shadow-lg shadow-red-500/25 hover:shadow-rose-500/30"
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
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
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
          </motion.div>
        </div>

        {/* Recovery Dashboard Mockup */}
        <motion.div
          style={{ y: mockupY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, type: 'spring', stiffness: 80 }}
          className="relative max-w-4xl mx-auto"
        >
          <FloatingBadges badgeRightRef={badgeRightRef} badgeLeftRef={badgeLeftRef} />
          <div ref={mockupWrapperRef}>
            <RecoveryMockup />
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-emerald-500/15 blur-[60px] rounded-full" />
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div
            className="relative"
            style={{ perspective: '1200px' }}
          >
            <div
              className="relative transform transition-transform duration-700 hover:scale-[1.01]"
              style={{ transform: 'rotateX(4deg) rotateY(-1deg)' }}
            >
              <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-emerald-500/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                <Image
                  src="/images/dashboard.webp"
                  alt="FailedPay Dashboard"
                  width={1200}
                  height={675}
                  className="rounded-2xl border border-white/10 shadow-2xl shadow-black/50"
                  priority
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 z-20" />
              </div>
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 rounded-3xl blur-xl -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
