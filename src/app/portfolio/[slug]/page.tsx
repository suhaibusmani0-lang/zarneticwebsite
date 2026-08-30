import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getClientBySlug, getAllClientSlugs } from '@/data/portfolio';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassmorphicCard } from '@/components/shared/GlassmorphicCard';
import { TextReveal } from '@/components/shared/TextReveal';
import { ChevronRight, ExternalLink, Calendar, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  const slugs = getAllClientSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const client = getClientBySlug(resolvedParams.slug);
  
  if (!client || !client.caseStudy) return { title: 'Case Study Not Found' };

  return {
    title: `${client.name} Case Study | Zarnetic Portfolio`,
    description: client.brief,
    alternates: {
      canonical: `https://zarnetic.com/portfolio/${client.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const client = getClientBySlug(resolvedParams.slug);
  
  if (!client || !client.caseStudy) notFound();

  const study = client.caseStudy;

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": client.name,
    "description": client.brief,
    "creator": {
      "@type": "Organization",
      "name": "Zarnetic"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zarnetic.com/" },
      { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://zarnetic.com/portfolio" },
      { "@type": "ListItem", "position": 3, "name": client.name, "item": `https://zarnetic.com/portfolio/${client.slug}` }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="min-h-screen bg-[#030303] text-white pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-zinc-400 mb-12 mt-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-zinc-100">{client.name}</span>
          </nav>

          {/* Hero */}
          <div className="max-w-4xl mb-24">
            <div className="flex items-center space-x-4 mb-6">
              <span className="px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-medium border border-white/10">
                {client.category}
              </span>
              {study.timeline && (
                <span className="flex items-center text-zinc-400 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  {study.timeline}
                </span>
              )}
            </div>
            <TextReveal 
              text={client.name} 
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60" 
            />
            {study.heroTagline && (
              <p className="text-2xl md:text-3xl text-zinc-300 font-light leading-relaxed">
                {study.heroTagline}
              </p>
            )}
            {client.url && (
              <a 
                href={client.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center mt-8 text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Visit Live Site <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Challenge */}
              <section>
                <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
                <div className="prose prose-invert prose-lg max-w-none text-zinc-400">
                  <p>{study.challenge}</p>
                </div>
              </section>

              {/* Solution */}
              <section>
                <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
                <div className="prose prose-invert prose-lg max-w-none text-zinc-400">
                  <p>{study.solution}</p>
                </div>
              </section>

              {/* Testimonial */}
              {study.testimonial && (
                <GlassmorphicCard className="p-8 md:p-10 bg-[#080808] border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                  <blockquote className="text-xl md:text-2xl font-medium leading-relaxed italic text-zinc-200 mb-6">
                    "{study.testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-bold text-white">{study.testimonial.author}</div>
                    <div className="text-zinc-400">{study.testimonial.role}</div>
                  </div>
                </GlassmorphicCard>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-12">
              {/* Results */}
              {study.results && study.results.length > 0 && (
                <GlassmorphicCard className="p-8 bg-[#080808] border-white/5">
                  <h3 className="text-xl font-bold mb-6">Key Results</h3>
                  <ul className="space-y-6">
                    {study.results.map((result: string, i: number) => {
                      const statMatch = result.match(/^([\d\+\-\%x\.]+)\s+(.*)/i);
                      return (
                        <li key={i} className="border-l-2 border-emerald-500 pl-4">
                          {statMatch ? (
                            <>
                              <div className="text-2xl font-bold text-white mb-1">{statMatch[1]}</div>
                              <div className="text-sm text-zinc-400">{statMatch[2]}</div>
                            </>
                          ) : (
                            <div className="text-zinc-300">{result}</div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </GlassmorphicCard>
              )}

              {/* Tech Stack */}
              {study.techStack && study.techStack.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-6">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {study.techStack.map((tech: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 bg-[#111] border border-white/10 rounded-lg text-sm text-zinc-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-[#080808] border border-white/5 rounded-3xl p-12 md:p-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to start your project?</h2>
            <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
              Let's create something extraordinary together. Our team of experts is ready to help you achieve your goals.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors text-lg"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}


