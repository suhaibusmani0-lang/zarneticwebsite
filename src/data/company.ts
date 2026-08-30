export const company = {
  name: 'Zarnetic',
  legalName: 'Zarnetic',
  tagline: 'Architecting Digital Futures',
  description:
    'Zarnetic is a professional web development, SEO, digital marketing, software, branding and automation company in Okhla, Jamia Nagar, Delhi. Build, grow and scale your business online.',
  url: 'https://zarnetic.com',
  logo: '/images/zarnetic-logo.png',
  ogImage: '/images/og/og-banner.jpg',
  favicon: '/favicon.ico',

  address: {
    street: '36 1st Floor, Lane No. 7, Noor Nagar, Jamia Nagar',
    locality: 'Okhla',
    city: 'New Delhi',
    region: 'Delhi',
    postalCode: '110025',
    country: 'IN',
    full: '36 1st Floor, Lane No. 7, Noor Nagar, Jamia Nagar, Okhla, New Delhi – 110025',
  },

  phone: ['+91-7860572173', '+91-9999372092'],
  whatsapp: '917860572173',
  email: 'zarnetic@gmail.com',

  social: {
    facebook: 'https://www.facebook.com/share/1AvVWEx2Ei/',
    instagram:
      'https://www.instagram.com/zarnetic?igsh=MTkwbjVwcGNsanhpNA==',
    linkedin: 'https://www.linkedin.com/company/zarnetic/',
    whatsapp: 'https://wa.me/917860572173',
    twitter: '@zarnetic_dev',
  },

  analytics: {
    gaId: 'G-PQYXZKJ37J',
  },

  forms: {
    web3formsKey: '46a465c3-4deb-499e-afe0-fe2a9cff0dfa',
  },

  stats: {
    projectsDelivered: '150+',
    legalCompliance: '100%',
    uptime: '99.9%',
    clientsWorldwide: '500+',
    countriesServed: '6+',
    yearsExperience: '3+',
  },

  techStack: [
    'React & Next.js',
    'TypeScript',
    'Node.js',
    'Python',
    'AWS & Azure',
    'Docker & Kubernetes',
    'PostgreSQL',
    'MongoDB',
    'GraphQL',
    'Terraform',
    'CI/CD Pipelines',
  ],

  areasServed: [
    { type: 'City', name: 'Delhi' },
    { type: 'AdministrativeArea', name: 'South Delhi' },
    { type: 'Place', name: 'Okhla' },
    { type: 'Place', name: 'Jamia Nagar' },
    { type: 'City', name: 'Noida' },
    { type: 'City', name: 'Gurugram' },
    { type: 'Country', name: 'India' },
  ],
} as const

