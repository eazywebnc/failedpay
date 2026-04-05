'use client'
import Image from 'next/image'

import { useRef } from 'react'
import {
  RotateCw,
  Mail,
  Users,
  BarChart3,
  LineChart,
  Code2,
  type LucideIcon,
} from 'lucide-react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  /** Bento grid span (1 or 2 columns on md+) */
  span: 1 | 2
  /** Optional visual element key */
  visual?: 'retry' | 'analytics'
}

const features: Feature[] = [
  {
    icon: RotateCw,
    title: 'Smart Retry Logic',
    description:
      'Intelligent retry scheduling that adapts to failure patterns. Retry at optimal times to maximize recovery rates.',
    span: 2,
    visual: 'retry',
  },
  {
    icon: Mail,
    title: 'Email Dunning',
    description:
      'Automated, customizable dunning emails that gently remind customers to update their payment methods.',
    span: 1,
  },
  {
    icon: Users,
    title: 'Multi-Account Support',
    description:
      'Connect multiple Stripe accounts and manage all your failed payment recovery from a single dashboard.',
    span: 1,
  },
  {
    icon: BarChart3,
    title: 'Real-time Dashboard',
    description:
      'Monitor failed payments, recovery attempts, and success rates in real-time with our intuitive dashboard.',
    span: 1,
  },
  {
    icon: LineChart,
    title: 'Recovery Analytics',
    description:
      'Deep insights into your recovery performance, failure patterns, and revenue impact over time.',
    span: 2,
    visual: 'analytics',
  },
  {
    icon: Code2,
    title: 'API Access',
    description:
      'Full REST API access to integrate FailedPay recovery data into your existing tools and workflows.',
    span: 1,
  },
]

/* ------------------------------------------------------------------ */
/*  Visual: Retry Sequence                                             */
/* ------------------------------------------------------------------ */

const retryAttempts = [
  { label: 'Attempt 1', status: 'failed', delay: 0 },
  { label: 'Attempt 2', status: 'failed', delay: 0.3 },
  { label: 'Attempt 3', status: 'success', delay: 0.6 },
] as const

function RetryVisual() {
  return (
    <div className="mt-6 flex items-end gap-3">
      {retryAttempts.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: a.delay, duration: 0.5, ease: 'easeOut' }}
          className="flex-1"
        >
          <div className="glass rounded-lg px-3 py-2.5 flex items-center gap-2 border border-white/5">
            <motion.div
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                a.status === 'success' ? 'bg-emerald-400' : 'bg-red-400'
              }`}
              animate={
                a.status === 'success'
                  ? { scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }
                  : {}
              }
              transition={{
                repeat: Infinity,
                repeatDelay: 2,
                duration: 1,
              }}
            />
            <div className="min-w-0">
              <p className="text-[11px] text-zinc-500 leading-tight">
                {a.label}
              </p>
              <p
                className={`text-xs font-medium leading-tight ${
                  a.status === 'success' ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {a.status === 'success' ? 'Recovered!' : 'Failed'}
              </p>
            </div>
          </div>
          {/* Connector line */}
          {i < retryAttempts.length - 1 && (
            <motion.div
              className="h-0.5 bg-gradient-to-r from-red-500/40 to-emerald-500/40 mt-2 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: a.delay + 0.3, duration: 0.4 }}
              style={{ transformOrigin: 'left' }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Visual: Analytics Chart                                            */
/* ------------------------------------------------------------------ */

const barData = [35, 48, 42, 65, 58, 80, 74, 90, 85, 95]

function AnalyticsVisual() {
  return (
    <div className="mt-6 flex items-end gap-1.5 h-24">
      {barData.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-emerald-500/60 to-emerald-400/30"
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            delay: i * 0.07,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ scaleY: 1.12, originY: 1 }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Single Feature Card                                                */
/* ------------------------------------------------------------------ */

function FeatureCard({
  feature,
  index,
}: {
  feature: Feature
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      className={`group glass rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300 ${
        feature.span === 2 ? 'md:col-span-2' : 'md:col-span-1'
      }`}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
        <feature.icon className="w-6 h-6 text-emerald-500" />
      </div>

      {/* Text */}
      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">
        {feature.description}
      </p>

      {/* Inline visual for wide cards */}
      {feature.visual === 'retry' && <RetryVisual />}
      {feature.visual === 'analytics' && <AnalyticsVisual />}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Parallax wrapper for the grid                                      */
/* ------------------------------------------------------------------ */

function useParallax(scrollYProgress: MotionValue<number>) {
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  return y
}

/* ------------------------------------------------------------------ */
/*  Export                                                              */
/* ------------------------------------------------------------------ */

export function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const gridY = useParallax(scrollYProgress)

  return (
    <section id="features" className="py-24 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
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
        </motion.div>

        {/* Bento Grid with scroll parallax */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ y: gridY }}
        >
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </motion.div>

        {/* Feature Screenshots */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]"
          >
            <Image
              src="/images/feature-1.webp"
              alt="Automated payment retry sequence dashboard"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]"
          >
            <Image
              src="/images/feature-2.webp"
              alt="Revenue recovery analytics and insights"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
