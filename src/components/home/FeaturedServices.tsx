'use client';

import { SectionHeader } from '@/components/shared/SectionHeader';
import { services } from '@/data/services';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

const iconMap: Record<string, any> = {
  Code: LucideIcons.Code,
  Search: LucideIcons.Search,
  Megaphone: LucideIcons.Megaphone,
  Briefcase: LucideIcons.Briefcase,
  Scale: LucideIcons.Scale,
  MonitorPlay: LucideIcons.MonitorPlay,
  Rocket: LucideIcons.Rocket,
  Shield: LucideIcons.Shield
};

export function FeaturedServices() {
  return (
    <section className="py-24 w-full bg-[#030303] text-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Enterprise Capabilities"
          title="Digital Transformation,"
          highlightedWord="Delivered."
          subtitle="Our core competencies are designed to scale your business and dominate your market."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-16 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || LucideIcons.Layers;
            
            // Create a bento box layout: First item spans 2 cols on lg, rest span 1.
            const isWide = index === 0 || index === 3;
            
            return (
              <div 
                key={service.slug} 
                className={`group relative bg-[#0a0a0a] rounded-3xl border border-white/5 p-8 overflow-hidden transition-all duration-500 hover:border-[#FF2020]/30 hover:bg-[#111] ${isWide ? 'lg:col-span-2' : 'lg:col-span-1'}`}
              >
                {/* Large Background Typography for visual flair */}
                <div className="absolute -right-8 -bottom-8 text-9xl font-space font-bold text-white/[0.02] pointer-events-none group-hover:text-[#FF2020]/[0.05] transition-colors duration-500 select-none">
                  0{index + 1}
                </div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-16 bg-[#1a1a1a] border border-white/5 text-[#FF2020] group-hover:scale-110 transition-transform duration-500`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  
                  <div className="mt-auto">
                    <h3 className="text-2xl md:text-3xl font-space font-bold tracking-tight mb-3 text-white">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed mb-8 max-w-md font-outfit">
                      {service.description}
                    </p>
                    
                    <Link 
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center text-sm font-space font-bold tracking-widest uppercase text-white hover:text-[#FF2020] transition-colors w-fit group/link"
                    >
                      Explore Service <ArrowUpRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
