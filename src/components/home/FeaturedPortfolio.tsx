'use client';

import { portfolioClients } from '@/data/portfolio';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassmorphicCard } from '@/components/shared/GlassmorphicCard';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function FeaturedPortfolio() {
  const featured = portfolioClients.filter(c => c.isPremium).slice(0, 2);

  return (
    <section className="py-24 w-full bg-[#030303] text-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Featured Work"
          title="Engineered for Excellence."
          highlightedWord="Excellence."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {featured.map((client, idx) => (
            <Link key={client.slug} href={`/portfolio/${client.slug}`}>
              <GlassmorphicCard className="group cursor-pointer relative h-[500px] overflow-hidden bg-[#080808] border-white/5 flex flex-col justify-end p-8 md:p-12 hover:border-[#FF2020]/30 transition-all duration-500">
                {/* Background Image Placeholder / Gradient */}
                <div className={`absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105 opacity-20 ${idx === 0 ? 'bg-gradient-to-tr from-[#FF2020]/40 to-black' : 'bg-gradient-to-tr from-blue-900/40 to-black'}`}></div>
                
                {/* Content Overlay */}
                <div className="relative z-10">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[#FF2020] font-space font-medium mb-3 tracking-widest text-sm uppercase">
                        {client.category}
                      </p>
                      <h3 className="text-4xl md:text-5xl font-bold font-space tracking-tighter mb-4 text-white group-hover:text-[#FF2020] transition-colors">
                        {client.name}
                      </h3>
                      <p className="text-gray-400 max-w-md line-clamp-2">
                        {client.brief}
                      </p>
                    </div>
                    <div className="hidden md:flex w-14 h-14 rounded-full bg-white/5 border border-white/10 items-center justify-center group-hover:bg-[#FF2020] group-hover:border-[#FF2020] transition-all duration-500">
                      <ArrowUpRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              </GlassmorphicCard>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-white hover:text-[#FF2020] font-space font-medium transition-colors">
            View All Projects <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

