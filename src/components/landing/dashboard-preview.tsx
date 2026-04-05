'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export function DashboardPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -6])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.97])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.6])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Section heading */}
      <div className="text-center mb-14 px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-teal-400 tracking-wide uppercase mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Real-time Dashboard
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Everything at a{' '}
          <span className="gradient-text">glance</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-zinc-400 max-w-xl mx-auto text-lg"
        >
          Track every failed payment, smart retry, and recovered dollar
          from a single intuitive dashboard.
        </motion.p>
      </div>

      {/* Browser frame with 3D tilt */}
      <div className="max-w-5xl mx-auto px-6" style={{ perspective: '1400px' }}>
        <motion.div
          style={{
            rotateX,
            scale,
            opacity,
            transformOrigin: 'center center',
          }}
          className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-emerald-500/10"
        >
          {/* macOS title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] border-b border-white/[0.06]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]">
                <span className="text-[11px] text-zinc-500">app.failedpay.com/dashboard</span>
              </div>
            </div>
            <div className="w-[52px]" /> {/* Spacer for symmetry */}
          </div>

          {/* Dashboard image */}
          <div className="relative">
            <Image
              src="/images/dashboard.webp"
              alt="FailedPay Recovery Dashboard — real-time view of recovered payments, retry timeline and revenue analytics"
              width={1920}
              height={1080}
              quality={90}
              priority={false}
              className="w-full h-auto block"
            />
          </div>
        </motion.div>

        {/* Glow below the frame */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
      </div>
    </section>
  )
}
