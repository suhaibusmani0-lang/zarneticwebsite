import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import ClientMarquee from '@/components/home/ClientMarquee';
import { FeaturedPortfolio } from '@/components/home/FeaturedPortfolio';
import { FeaturedServices } from '@/components/home/FeaturedServices';
import StatsCounter from '@/components/home/StatsCounter';
import Testimonials from '@/components/home/Testimonials';
import HomeCTA from '@/components/home/HomeCTA';
import Script from 'next/script';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Top Web Development & SEO Agency in Delhi | Zarnetic',
  description: 'Zarnetic is Delhi\'s #1 premium web development, SEO, digital marketing, and software engineering agency. Specializing in high-performance websites and NGO compliance.',
  keywords: 'Web Development Delhi, Top SEO Agency New Delhi, Digital Marketing Okhla, Software Engineering Company Jamia Nagar, Best IT Agency in Delhi, NGO Compliance Registration Delhi',
  alternates: { canonical: 'https://zarnetic.com' },
  openGraph: {
    title: 'Top Web Development & SEO Agency in Delhi | Zarnetic',
    description: 'Delhi\'s premier digital agency delivering custom software, SEO, and legal compliance.',
    url: 'https://zarnetic.com',
    siteName: 'Zarnetic',
    images: [{ url: '/images/og/og-banner.jpg', width: 1200, height: 630, alt: 'Zarnetic Delhi' }],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': 'https://zarnetic.com',
    name: 'Zarnetic',
    url: 'https://zarnetic.com',
    logo: 'https://zarnetic.com/images/logo.png',
    image: 'https://zarnetic.com/images/og/og-banner.jpg',
    description: metadata.description,
    telephone: company.phone[0],
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '36 1st Floor, Lane No. 7, Noor Nagar, Jamia Nagar, Okhla',
      addressLocality: 'New Delhi',
      postalCode: '110025',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.5616',
      longitude: '77.2818'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00'
    },
    sameAs: [
      company.social.facebook,
      company.social.instagram,
      company.social.linkedin
    ],
    priceRange: '$$',
    areaServed: ['Delhi', 'New Delhi', 'Okhla', 'Noida', 'Gurugram', 'India', 'Global']
  };

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex min-h-screen flex-col items-center w-full bg-[#030303]">
        <Hero />
        <ClientMarquee />
        <FeaturedPortfolio />
        <FeaturedServices />
        <StatsCounter />
        <Testimonials />
        <HomeCTA />
      </main>
    </>
  );
}

