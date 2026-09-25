import { connectDB } from '@/lib/db'
import { Portfolio } from '@/models/Portfolio'
import { portfolioClients, PortfolioClient } from '@/data/portfolio'

export async function getAllPortfolioProjects(): Promise<PortfolioClient[]> {
  try {
    await connectDB()
    const dbProjects = await Portfolio.find().lean()

    const formattedDbProjects: PortfolioClient[] = dbProjects.map((p: any) => ({
      slug: p.slug,
      name: p.title || p.clientName,
      url: p.url,
      isPremium: p.isPremium ?? true,
      category: p.category,
      brief: p.brief,
      caseStudy: {
        heroTagline: p.brief,
        challenge: p.challenge || 'Client required an advanced enterprise solution to streamline digital operations and scale globally.',
        solution: p.solution || 'Zarnetic architected and engineered a custom cloud-native digital ecosystem with automated workflows.',
        results: p.results && p.results.length > 0 ? p.results : ['100% On-time delivery', 'Enterprise SLA support'],
        techStack: p.techStack && p.techStack.length > 0 ? p.techStack : ['Next.js', 'Node.js', 'Cloud Infrastructure'],
        testimonial: p.testimonial?.quote
          ? {
              quote: p.testimonial.quote,
              author: p.testimonial.author || 'Project Lead',
              role: p.testimonial.role || p.clientName,
            }
          : undefined,
        timeline: p.timeline || '4-8 weeks',
        industry: p.category,
      },
    }))

    // Combine: DB projects first, followed by static projects that do not share the same slug
    const dbSlugs = new Set(formattedDbProjects.map((p) => p.slug))
    const nonDuplicatedStatic = portfolioClients.filter((p) => !dbSlugs.has(p.slug))

    return [...formattedDbProjects, ...nonDuplicatedStatic]
  } catch (err) {
    console.error('Error fetching dynamic portfolio projects:', err)
    return portfolioClients
  }
}

export async function getPortfolioProjectBySlug(slug: string): Promise<PortfolioClient | undefined> {
  try {
    await connectDB()
    const dbProject = await Portfolio.findOne({ slug }).lean()
    if (dbProject) {
      const p: any = dbProject
      return {
        slug: p.slug,
        name: p.title || p.clientName,
        url: p.url,
        isPremium: p.isPremium ?? true,
        category: p.category,
        brief: p.brief,
        caseStudy: {
          heroTagline: p.brief,
          challenge: p.challenge || 'Client required an advanced enterprise solution to scale operations.',
          solution: p.solution || 'Zarnetic architected and engineered a custom cloud-native ecosystem.',
          results: p.results && p.results.length > 0 ? p.results : ['100% On-time delivery', 'High availability architecture'],
          techStack: p.techStack && p.techStack.length > 0 ? p.techStack : ['Next.js', 'Node.js', 'Cloud Architecture'],
          testimonial: p.testimonial?.quote
            ? {
                quote: p.testimonial.quote,
                author: p.testimonial.author || 'Leadership',
                role: p.testimonial.role || p.clientName,
              }
            : undefined,
          timeline: p.timeline || '8 weeks',
          industry: p.category,
        },
      }
    }
  } catch (err) {
    console.error('Error fetching project by slug from DB:', err)
  }

  // Fallback to static
  return portfolioClients.find((c) => c.slug === slug)
}
