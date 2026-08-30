import type { Metadata, Viewport } from 'next'
import { outfit, spaceGrotesk } from '@/lib/fonts'
import '@/styles/globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { NoiseTexture } from '@/components/shared/NoiseTexture'
import { company } from '@/data/company'
import Script from 'next/script'

export const viewport: Viewport = {
  themeColor: '#030303',
  width: 'device-width',
  initialScale: 1
}

export const metadata: Metadata = {
  metadataBase: new URL('https://zarnetic.com'),
  title: {
    default: 'Zarnetic | Top Web Development, SEO & Digital Marketing Agency in Delhi',
    template: '%s | Zarnetic'
  },
  description: 'Delhi NCR\'s premium IT firm. Zarnetic specializes in scalable web development, enterprise SEO, digital marketing, AI, and comprehensive legal NGO compliance.',
  keywords: [
    'top web development company Delhi', 'best SEO agency in New Delhi', 'digital marketing experts Okhla', 
    'software engineering firm Jamia Nagar', 'NGO 12A 80G FCRA registration Delhi', 'Zarnetic Delhi',
    'enterprise web apps Delhi', 'e-commerce development Delhi', 'custom software development NCR',
    'cloud devops agency Delhi', 'cyber security audit Delhi', 'AI and data science consulting India'
  ],
  authors: [{ name: 'Zarnetic', url: 'https://zarnetic.com' }],
  creator: 'Zarnetic',
  publisher: 'Zarnetic',
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: 'website',
    siteName: 'Zarnetic',
    locale: 'en_IN',
    url: 'https://zarnetic.com',
    title: 'Zarnetic | Top Web Development & SEO Agency in Delhi',
    description: 'Delhi NCR\'s premium IT firm specializing in scalable web development, enterprise SEO, and digital marketing.',
    images: [{ url: '/images/og/og-banner.jpg', width: 1200, height: 630, alt: 'Zarnetic - Premium Digital Agency' }]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@zarnetic',
    creator: '@zarnetic',
    title: 'Zarnetic | Premium Web & SEO Agency',
    description: 'Delhi NCR\'s premium IT firm specializing in scalable web development, enterprise SEO, and digital marketing.',
    images: ['/images/og/og-banner.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 }
  },
  other: { 'application-name': 'Zarnetic', 'apple-mobile-web-app-title': 'Zarnetic' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'LocalBusiness'],
    name: company.name,
    url: company.url,
    logo: 'https://zarnetic.com/images/logo.png',
    description: company.description,
    telephone: company.phone[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.locality,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country,
    },
    areaServed: company.areasServed?.map(area => ({
      '@type': area.type,
      name: area.name
    })),
    sameAs: Object.values(company.social)
  }

  return (
    <html lang="en-IN" className={`${outfit.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-[#030303] text-white antialiased">
        <NoiseTexture />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="relative min-h-screen">
          {children}
        </main>
        <Footer />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${company.analytics.gaId}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${company.analytics.gaId}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  )
}

