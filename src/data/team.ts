export interface TeamMember {
  slug: string
  name: string
  role: string
  image: string
  description: string
  extendedBio: string
  linkedin?: string
}

export const teamMembers: TeamMember[] = [
  {
    slug: 'suhaib-usmani',
    name: 'Mr Suhaib Usmani',
    role: 'CEO & Founder',
    image: '/images/team/suhaib.jpeg',
    description:
      'Visionary leader driving Zarnetic\'s global digital innovation and strategy.',
    extendedBio:
      'Suhaib Usmani founded Zarnetic with a mission to bring world-class technology solutions to businesses of all sizes. With deep expertise in software architecture, cloud computing, and digital strategy, he leads the company\'s vision of making enterprise-grade technology accessible to startups and SMEs. Under his leadership, Zarnetic has delivered 150+ digital products across 6 countries.',
    linkedin: 'https://www.linkedin.com/in/suhaib-usmani-0847661b1/',
  },
  {
    slug: 'zain-jamal',
    name: 'Mr. Zain Jamal',
    role: 'Chief Growth Officer',
    image: '/images/team/zain.jpeg',
    description:
      'Leading international business development and strategic global partnerships.',
    extendedBio:
      'Zain Jamal spearheads Zarnetic\'s global expansion and partnership strategy. His expertise in B2B sales, strategic alliances, and market penetration has been instrumental in establishing Zarnetic\'s presence across India, USA, and the Middle East. He manages key client relationships and drives revenue growth through innovative go-to-market strategies.',
  },
  {
    slug: 'rahimullah',
    name: 'Adv. Rahimullah',
    role: 'Legal & Compliance',
    image: '/images/team/rahimullah.jpeg',
    description:
      'Expert in corporate law, business registrations, and legal documentation.',
    extendedBio:
      'Advocate Rahimullah brings extensive legal expertise to Zarnetic\'s compliance division. Specializing in corporate law, NGO regulations, and business registrations, he has successfully handled 100+ NGO registrations (12A, 80G, FCRA) with a perfect approval record. His meticulous approach to legal documentation ensures every client receives compliant, future-proof solutions.',
  },
  {
    slug: 'faizan-ghani',
    name: 'Mr Faizan Ghani',
    role: 'Head of Data & AI',
    image: '/images/team/faizan.jpeg',
    description:
      'Architecting high-performance AI systems and scalable digital products.',
    extendedBio:
      'Faizan Ghani leads Zarnetic\'s data science and artificial intelligence initiatives. With expertise in machine learning, deep learning, and big data architecture, he has built AI-powered solutions that have generated measurable ROI for clients across industries. His work spans predictive analytics, NLP systems, and computer vision applications.',
  },
  {
    slug: 'harsh-goyal',
    name: 'Mr. Harsh Goyal',
    role: 'Marketing Head',
    image: '/images/team/harsh.jpeg',
    description:
      'Performance marketing specialist focused on data-driven growth and SEO.',
    extendedBio:
      'Harsh Goyal oversees all marketing operations at Zarnetic, including SEO, paid advertising, content strategy, and brand development. His data-driven approach to digital marketing has helped clients achieve significant improvements in search rankings, conversion rates, and customer acquisition costs. He specializes in technical SEO and performance marketing.',
  },
  {
    slug: 'safia',
    name: 'Miss Safia',
    role: 'UX/UI Design Lead',
    image: '/images/team/safia.jpeg',
    description:
      'Crafting premium user interfaces and seamless brand identities.',
    extendedBio:
      'Safia leads the design team at Zarnetic, creating premium user experiences that blend aesthetics with functionality. Her design philosophy centers on user-centric thinking, accessibility, and brand storytelling. She has designed interfaces for clients across automotive, healthcare, non-profit, and enterprise SaaS sectors.',
  },
]

