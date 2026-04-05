import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://failedpay.eazyweb.nc'),
  title: 'FailedPay — Recover Failed Stripe Payments Automatically',
  description:
    'FailedPay recovers failed Stripe payments and reduces involuntary churn by 5-10%. Smart retries, email dunning, and AI-powered recovery.',
  keywords: [
    'failed payments',
    'stripe recovery',
    'involuntary churn',
    'payment recovery',
    'dunning',
    'SaaS',
    'revenue recovery',
  ],
  openGraph: {
    title: 'FailedPay — Recover Failed Stripe Payments Automatically',
    description:
      'Stop losing revenue to failed payments. FailedPay recovers 5-10% of churned revenue automatically.',
    url: 'https://failedpay.eazyweb.nc',
    siteName: 'FailedPay',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FailedPay — Recover Failed Stripe Payments',
    description:
      'Stop losing revenue to failed payments. Automatic recovery for Stripe.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: 'https://failedpay.eazyweb.nc',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FailedPay',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'Automatically recover failed Stripe payments and reduce involuntary churn.',
  url: 'https://failedpay.eazyweb.nc',
  offers: [
    { '@type': 'Offer', price: '0', priceCurrency: 'USD', name: 'Free' },
    { '@type': 'Offer', price: '29', priceCurrency: 'USD', name: 'Pro' },
    { '@type': 'Offer', price: '79', priceCurrency: 'USD', name: 'Business' },
  ],
  creator: {
    '@type': 'Organization',
    name: 'EazyWebNC',
    url: 'https://eazyweb.nc',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded">Skip to content</a>
        <div id="main-content">
        {children}
        </div>
      </body>
    </html>
  )
}
