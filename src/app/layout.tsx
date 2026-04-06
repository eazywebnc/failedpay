import type { Metadata } from 'next'
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
    locale: 'en_US',
    images: [{ url: '/images/og-image.webp', width: 1200, height: 630, type: 'image/webp', alt: 'FailedPay — Recover Failed Stripe Payments Automatically' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FailedPay — Recover Failed Stripe Payments',
    description:
      'Stop losing revenue to failed payments. Automatic recovery for Stripe.',
    images: ['/images/og-image.webp'],
  },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  alternates: {
    canonical: 'https://failedpay.eazyweb.nc',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'FailedPay',
      url: 'https://failedpay.eazyweb.nc',
      publisher: {
        '@type': 'Organization',
        name: 'EazyWebNC',
        url: 'https://eazyweb.nc',
        logo: { '@type': 'ImageObject', url: 'https://eazyweb.nc/logo.png' },
      },
    },
    {
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
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is FailedPay?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FailedPay is an automated payment recovery tool for Stripe. It detects failed payments, retries them at optimal times, and sends smart dunning emails to recover lost revenue.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much revenue can FailedPay recover?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FailedPay typically recovers 5-10% of revenue lost to involuntary churn through smart retry logic and AI-powered dunning campaigns.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does FailedPay integrate with Stripe?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Connect your Stripe account in one click. FailedPay automatically monitors your payments, detects failures, and begins recovery — no code changes required.',
          },
        },
      ],
    },
  ],
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
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded">Skip to content</a>
        <div id="main-content">
        {children}
        </div>
      </body>
    </html>
  )
}
