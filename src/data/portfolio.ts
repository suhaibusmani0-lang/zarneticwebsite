export interface PortfolioClient {
  slug: string
  name: string
  url?: string
  isPremium: boolean
  category: string
  brief: string
  caseStudy?: {
    heroTagline: string
    challenge: string
    solution: string
    results: string[]
    techStack: string[]
    testimonial?: { quote: string; author: string; role: string }
    timeline: string
    industry: string
  }
}

export const portfolioClients: PortfolioClient[] = [
  {
    slug: 'swift-fuel-inc',
    name: 'Swift Fuel Inc',
    url: 'https://swiftfuelinc.com/',
    isPremium: true,
    category: 'Energy & Logistics',
    brief:
      'End-to-end digital platform for a US-based fuel logistics company, including real-time fleet tracking and automated invoicing.',
    caseStudy: {
      heroTagline: 'Fueling the Future of Energy Logistics',
      challenge:
        'Swift Fuel Inc, a rapidly growing fuel distribution company in the United States, was struggling with manual fleet management, delayed invoicing, and lack of real-time visibility into their supply chain. Their legacy systems could not scale with the 40% year-over-year growth they were experiencing.',
      solution:
        'Zarnetic designed and built a comprehensive digital platform featuring real-time GPS fleet tracking with geofencing alerts, automated invoicing with QuickBooks integration, a customer self-service portal for order placement and tracking, and a driver mobile app with route optimization. The platform was built on a microservices architecture deployed on AWS with auto-scaling to handle peak demand periods.',
      results: [
        '60% reduction in invoice processing time',
        '35% improvement in fleet utilization through route optimization',
        'Real-time visibility into 200+ delivery vehicles',
        '25% reduction in fuel wastage through predictive analytics',
        '99.97% platform uptime since launch',
      ],
      techStack: [
        'React',
        'Node.js',
        'PostgreSQL',
        'AWS',
        'React Native',
        'Redis',
        'GraphQL',
      ],
      testimonial: {
        quote:
          'Zarnetic transformed our entire operation. The real-time tracking alone saved us hundreds of thousands in lost deliveries.',
        author: 'Operations Director',
        role: 'Swift Fuel Inc',
      },
      timeline: '16 weeks',
      industry: 'Energy & Logistics',
    },
  },
  {
    slug: 'xen-motors',
    name: 'Xen Motors (USA)',
    url: 'https://www.xenmotors.com',
    isPremium: true,
    category: 'Automotive',
    brief:
      'Premium automotive e-commerce platform with 3D vehicle configurator and dealership management system for a US-based motors company.',
    caseStudy: {
      heroTagline: 'Driving Digital Innovation in Automotive',
      challenge:
        'Xen Motors needed a premium online presence that matched the luxury of their vehicle lineup. Their existing website was outdated, had poor mobile experience, and lacked the interactive features modern car buyers expect. They also needed a robust dealership management system to streamline their multi-location operations.',
      solution:
        'Zarnetic delivered a stunning, high-performance e-commerce platform featuring an interactive 3D vehicle configurator allowing customers to customize colors, wheels, and interiors in real-time. The platform included a seamless test drive booking system, financing calculator, inventory management across multiple dealerships, and a CRM integration for lead nurturing. The design followed a dark, premium aesthetic inspired by top automotive brands.',
      results: [
        '180% increase in online lead generation',
        '45% improvement in mobile conversion rate',
        'Average session duration increased from 1.2 to 4.8 minutes',
        '90% reduction in inventory discrepancies across locations',
        'Google PageSpeed score of 95+ on all pages',
      ],
      techStack: [
        'Next.js',
        'Three.js',
        'TypeScript',
        'Node.js',
        'MongoDB',
        'AWS CloudFront',
        'Stripe',
      ],
      testimonial: {
        quote:
          'The 3D configurator alone generated more qualified leads in one month than our entire previous website did in a year.',
        author: 'CEO',
        role: 'Xen Motors',
      },
      timeline: '20 weeks',
      industry: 'Automotive',
    },
  },
  {
    slug: 'spread-smiles-foundation',
    name: 'Spread Smiles Foundation',
    url: 'https://www.spreadsmilesfoundation.com',
    isPremium: true,
    category: 'Non-Profit / NGO',
    brief:
      'Complete digital transformation for an Indian NGO — website, donation portal, donor management system, and 12A/80G compliance.',
    caseStudy: {
      heroTagline: 'Technology for Social Impact',
      challenge:
        'Spread Smiles Foundation, a growing non-profit organization in India, needed to scale their impact but lacked digital infrastructure. They had no online donation capability, manual donor tracking in spreadsheets, and were struggling with 12A and 80G compliance documentation. They needed a complete digital transformation on a limited budget.',
      solution:
        'Zarnetic delivered a comprehensive pro-bono-rate digital package: a modern, emotionally compelling website with impact storytelling, a secure Razorpay-integrated donation portal with automated 80G tax receipt generation, a donor CRM for tracking relationships and communication, social media integration for campaign amplification, and complete legal compliance including 12A, 80G, and FCRA registration assistance.',
      results: [
        '300% increase in online donations within first 6 months',
        'Automated 80G receipt generation saving 20+ hours per month',
        'Donor retention rate improved from 15% to 45%',
        'Successfully obtained FCRA registration for international funding',
        'Website traffic grew from 200 to 5,000+ monthly visitors',
      ],
      techStack: [
        'Next.js',
        'Tailwind CSS',
        'Node.js',
        'Razorpay',
        'PostgreSQL',
        'SendGrid',
      ],
      testimonial: {
        quote:
          'Zarnetic didn\'t just build us a website — they gave us the digital backbone to scale our mission across India.',
        author: 'Founder',
        role: 'Spread Smiles Foundation',
      },
      timeline: '10 weeks',
      industry: 'Non-Profit',
    },
  },
  {
    slug: 'exevo-events',
    name: 'Exevo Events',
    url: 'https://www.exevoevents.com',
    isPremium: true,
    category: 'Events & Entertainment',
    brief:
      'Luxury event management platform with real-time booking, vendor marketplace, and immersive event showcase gallery.',
    caseStudy: {
      heroTagline: 'Redefining Event Experiences Digitally',
      challenge:
        'Exevo Events, a premium event management company, needed a digital platform that reflected the luxury and attention to detail of their in-person events. Their booking process was entirely manual (phone and email), they had no way to showcase their portfolio effectively, and vendor coordination was chaotic with no centralized system.',
      solution:
        'Zarnetic created an immersive digital experience featuring a cinematic portfolio gallery with video backgrounds and parallax scrolling, a real-time event booking system with instant quotation generation, a vendor marketplace connecting Exevo with 200+ verified vendors, a client dashboard for tracking event planning milestones, and an AI-powered event planner chatbot for initial client consultations.',
      results: [
        '150% increase in booking inquiries through the website',
        'Average booking value increased by 35% due to upselling features',
        'Vendor onboarding time reduced from 2 weeks to 2 days',
        'Client satisfaction score improved from 4.2 to 4.8 out of 5',
        'Event planning coordination time reduced by 40%',
      ],
      techStack: [
        'React',
        'Framer Motion',
        'Node.js',
        'PostgreSQL',
        'Stripe',
        'Twilio',
        'AWS S3',
      ],
      testimonial: {
        quote:
          'Our website now gets the same "wow" reaction from clients that our events do. Zarnetic truly understood our brand.',
        author: 'Creative Director',
        role: 'Exevo Events',
      },
      timeline: '14 weeks',
      industry: 'Events & Entertainment',
    },
  },
  {
    slug: 'buniyadi-sahara-foundation',
    name: 'Buniyadi Sahara Foundation',
    isPremium: false,
    category: 'Non-Profit / NGO',
    brief: 'NGO registration, compliance, and digital presence setup.',
  },
  {
    slug: 'child-growth-trust',
    name: 'Child Growth Trust',
    isPremium: false,
    category: 'Non-Profit / NGO',
    brief: 'Complete NGO digital infrastructure and compliance services.',
  },
  {
    slug: 'dandoush-restaurant',
    name: 'Dandoush Restaurant',
    isPremium: false,
    category: 'Food & Beverage',
    brief: 'Restaurant website with online menu and FSSAI compliance.',
  },
  {
    slug: 'dr-bushra-shams',
    name: 'Dr. Bushra Shams',
    isPremium: false,
    category: 'Healthcare',
    brief: 'Professional healthcare website with appointment booking.',
  },
  {
    slug: 'hayat-health',
    name: 'Hayat Health',
    isPremium: false,
    category: 'Healthcare',
    brief: 'Health services platform with patient portal integration.',
  },
  {
    slug: 'meatwala',
    name: 'MeatWala',
    isPremium: false,
    category: 'Food & Beverage',
    brief: 'E-commerce platform for fresh meat delivery with FSSAI compliance.',
  },
  {
    slug: 'naushad-chicken-point',
    name: 'Naushad Chicken Point',
    isPremium: false,
    category: 'Food & Beverage',
    brief: 'Restaurant branding and digital ordering system.',
  },
  {
    slug: 'safar-e-haider',
    name: 'Safar E Haider',
    isPremium: false,
    category: 'Travel & Tourism',
    brief: 'Travel and pilgrimage booking platform with CRM integration.',
  },
  {
    slug: 'sweekar-pride-foundation',
    name: 'Sweekar Pride Foundation',
    isPremium: false,
    category: 'Non-Profit / NGO',
    brief: 'NGO website with awareness campaign tools and donor management.',
  },
  {
    slug: 'social-alliance-trust',
    name: 'Social Alliance Trust',
    isPremium: false,
    category: 'Non-Profit / NGO',
    brief: 'Trust registration, compliance, and community portal.',
  },
  {
    slug: 'bsea',
    name: 'BSEA',
    isPremium: false,
    category: 'Education',
    brief: 'Educational institution digital platform and branding.',
  },
  {
    slug: 'ath',
    name: 'A.T.H',
    isPremium: false,
    category: 'Business Services',
    brief: 'Corporate branding and digital identity development.',
  },
]

export function getClientBySlug(slug: string): PortfolioClient | undefined {
  return portfolioClients.find((c) => c.slug === slug)
}

export function getPremiumClients(): PortfolioClient[] {
  return portfolioClients.filter((c) => c.isPremium)
}

export function getAllClientSlugs(): string[] {
  return portfolioClients.filter((c) => c.isPremium && c.caseStudy).map((c) => c.slug)
}

