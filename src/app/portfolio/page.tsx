import { Metadata } from 'next';
import Link from 'next/link';
import { portfolioClients } from '@/data/portfolio';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassmorphicCard } from '@/components/shared/GlassmorphicCard';
import { TextReveal } from '@/components/shared/TextReveal';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Portfolio | Zarnetic — 150+ Projects Delivered Globally',
  description: 'Explore Zarnetic\'s portfolio of 150+ digital projects across Energy, Automotive, Non-Profit, Healthcare, and F&B industries. See our work for Swift Fuel Inc, Xen Motors, and more.',
  alternates: {
    canonical: 'https://zarnetic.com/portfolio',
  },
};

export default function PortfolioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Zarnetic Portfolio",
    "itemListElement": portfolioClients.map((client, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": client.name,
        "description": client.brief,
        "url": client.isPremium && client.caseStudy ? `https://zarnetic.com/portfolio/${client.slug}` : undefined
      }
    }))
  };

  const premiumClients = portfolioClients.filter(c => c.isPremium);
  const otherClients = portfolioClients.filter(c => !c.isPremium);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <main className="min-h-screen bg-[#030303] text-white pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-20 pt-16">
            <TextReveal 
              text="Global Footprint. Proven Results." 
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60" 
            />
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Delivering excellence across industries. Explore how we've helped businesses transform and scale globally.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 max-w-4xl mx-auto">
            {[
              { value: '150+', label: 'Projects Delivered' },
              { value: '6+', label: 'Countries Served' },
              { value: '500+', label: 'Happy Clients' },
            ].map((stat, i) => (
              <GlassmorphicCard key={i} className="p-8 text-center bg-[#080808] border-white/5">
                <div className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">{stat.value}</div>
                <div className="text-zinc-400 font-medium">{stat.label}</div>
              </GlassmorphicCard>
            ))}
          </div>

          {/* Premium Portfolio (Case Studies) */}
          <div className="mb-24">
            <SectionHeader title="Featured" highlightedWord="Work" subtitle="Deep dives into some of our most impactful projects." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {premiumClients.map((client) => (
                <GlassmorphicCard key={client.slug} className="group overflow-hidden bg-[#080808] border-white/5 flex flex-col h-full">
                  <div className="p-8 flex-grow">
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full">
                        {client.category}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{client.name}</h3>
                    <p className="text-zinc-400 mb-8 text-lg">{client.brief}</p>
                    
                    {client.caseStudy && (
                      <Link 
                        href={`/portfolio/${client.slug}`}
                        className="inline-flex items-center font-semibold text-white group-hover:text-blue-400 transition-colors"
                      >
                        View Case Study
                        <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </GlassmorphicCard>
              ))}
            </div>
          </div>

          {/* All Other Clients Grid */}
          <div className="mb-20">
            <SectionHeader title="More" highlightedWord="Projects" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {otherClients.map((client) => (
                <GlassmorphicCard key={client.slug} hoverEffect className="p-6 bg-[#080808] border-white/5">
                  <span className="inline-block px-2 py-1 text-[10px] font-semibold tracking-wider uppercase bg-white/5 text-zinc-400 rounded mb-4">
                    {client.category}
                  </span>
                  <h4 className="text-xl font-bold mb-2 text-zinc-100">{client.name}</h4>
                  <p className="text-sm text-zinc-500 line-clamp-3">{client.brief}</p>
                </GlassmorphicCard>
              ))}
            </div>
          </div>
          
        </div>
      </main>
    </>
  );
}
