import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import { company } from '@/data/company';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassmorphicCard } from '@/components/shared/GlassmorphicCard';
import { TextReveal } from '@/components/shared/TextReveal';
import { getIcon } from '@/lib/icons';
import { CheckCircle2, ChevronRight, MessageCircle } from 'lucide-react';

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} | Zarnetic`,
    description: service.description,
    alternates: {
      canonical: `https://zarnetic.com/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);
  if (!service) notFound();

  const Icon = getIcon(service.icon);
  
  const whatsappUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(service.whatsappMessage || `Hi Zarnetic, I'm interested in your ${service.title} services.`)}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Zarnetic",
      "url": "https://zarnetic.com"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs?.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    })) || []
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zarnetic.com/" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://zarnetic.com/services" },
      { "@type": "ListItem", "position": 3, "name": service.title, "item": `https://zarnetic.com/services/${service.slug}` }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      {service.faqs && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="min-h-screen bg-[#030303] text-white pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-zinc-400 mb-12 mt-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-zinc-100">{service.title}</span>
          </nav>

          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br ${service.colorClass || 'from-blue-500 to-cyan-500'}`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <TextReveal 
                text={service.title} 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60" 
              />
              <p className="text-xl text-zinc-400 leading-relaxed mb-8">
                {service.longDescription || service.description}
              </p>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
              >
                Get a Free Consultation
                <MessageCircle className="w-5 h-5 ml-2" />
              </a>
            </div>
            
            {/* Features */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl -z-10 blur-3xl"></div>
              <GlassmorphicCard className="p-8 md:p-10 bg-[#080808]/80 backdrop-blur-xl border-white/10">
                <h3 className="text-2xl font-bold mb-8">Core Features</h3>
                <ul className="space-y-4">
                  {service.features?.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 shrink-0 mt-0.5" />
                      <span className="text-zinc-300 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </GlassmorphicCard>
            </div>
          </div>

          {/* Deliverables */}
          {service.deliverables && service.deliverables.length > 0 && (
            <div className="mb-24">
              <SectionHeader title="What We" highlightedWord="Deliver" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {service.deliverables.map((del: string, idx: number) => (
                  <GlassmorphicCard key={idx} className="p-6 bg-[#080808] border-white/5">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-zinc-200 font-medium">{del}</span>
                    </div>
                  </GlassmorphicCard>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="max-w-3xl mx-auto mb-20">
              <SectionHeader title="Service" highlightedWord="FAQs" />
              <div className="mt-12 space-y-4">
                {service.faqs.map((faq: any, i: number) => (
                  <details key={i} className="group bg-[#080808] border border-white/5 rounded-2xl overflow-hidden cursor-pointer">
                    <summary className="p-6 font-semibold flex justify-between items-center list-none [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <span className="group-open:rotate-180 transition-transform duration-300">
                        <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </span>
                    </summary>
                    <div className="p-6 pt-0 text-zinc-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

