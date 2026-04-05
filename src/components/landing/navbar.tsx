'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, CreditCard, Menu, X } from 'lucide-react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative">
            <Shield className="w-7 h-7 text-emerald-500" />
            <CreditCard className="w-3.5 h-3.5 text-green-400 absolute -bottom-0.5 -right-0.5" />
          </div>
          <span className="text-lg font-bold">
            Failed<span className="gradient-text">Pay</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Pricing
          </a>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/auth/login"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/auth/login"
            className="text-sm font-medium px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 transition-all"
          >
            Start Free
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-zinc-400"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 px-6 py-4 space-y-4">
          <a href="#features" className="block text-sm text-zinc-400 hover:text-white">
            Features
          </a>
          <a href="#how-it-works" className="block text-sm text-zinc-400 hover:text-white">
            How It Works
          </a>
          <a href="#pricing" className="block text-sm text-zinc-400 hover:text-white">
            Pricing
          </a>
          <Link href="/auth/login" className="block text-sm text-zinc-400 hover:text-white">
            Sign In
          </Link>
          <Link
            href="/auth/login"
            className="block text-center text-sm font-medium px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white"
          >
            Start Free
          </Link>
        </div>
      )}
    </nav>
  )
}
