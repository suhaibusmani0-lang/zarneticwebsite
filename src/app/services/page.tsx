import type { Metadata } from 'next';
import { services } from '@/data/services';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassmorphicCard } from '@/components/shared/GlassmorphicCard';
import { TextReveal } from '@/components/shared/TextReveal';
import Link from 'next/link';
import { Briefcase, ShieldCheck, Globe, Zap, ArrowUpRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services | Zarnetic',
  description: 'Explore Zarnetic\'s premium services.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <TextReveal 
            text="Premium Solutions for Modern Enterprises." 
            className="text-5xl md:text-7xl font-space font-bold tracking-tighter mb-8" 
          />
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-outfit">
            We architect resilient, high-performance digital ecosystems for global enterprises. From elite software engineering to rigorous legal compliance.
          </p>
        </div>

        {/* Services List */}
        <div className="flex flex-col gap-12 mb-32">
          {services.map((service, idx) => {
            const Icon = (LucideIcons as any)[service.icon] || LucideIcons.Activity;
            return (
              <Link href={`/services/${service.slug}`} key={service.slug} className="group block">
                <GlassmorphicCard className="p-8 md:p-12 border-white/5 bg-[#080808] hover:bg-[#111] transition-all relative overflow-hidden">
                  
                  {/* Subtle Background Glow on Hover */}
                  <div className={`absolute top-0 right-0 w-96 h-96 bg-${service.colorClass}/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                  <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
                    
                    {/* Icon Block */}
                    <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center shrink-0 border border-white/10 bg-[#030303] group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className={`w-10 h-10 text-${service.colorClass} drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]`} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-sm font-space tracking-widest uppercase text-gray-500">0{idx + 1}</span>
                        <h3 className="text-3xl md:text-4xl font-space font-bold text-white group-hover:text-[#FF2020] transition-colors">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 font-outfit text-lg max-w-3xl leading-relaxed mb-6">
                        {service.longDescription || service.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-3">
                        {service.features.slice(0, 4).map(feature => (
                          <span key={feature} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-outfit text-gray-300">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Arrow */}
                    <div className="shrink-0 md:pl-8">
                      <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#FF2020] group-hover:border-[#FF2020] transition-all">
                        <ArrowUpRight className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                  </div>
                </GlassmorphicCard>
              </Link>
            )
          })}
        </div>

        {/* Why Choose Us */}
        <div className="mb-32">
          <SectionHeader 
            badge="The Zarnetic Advantage"
            title="Why Choose"
            highlightedWord="Us"
            className="mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Industry Elite', desc: 'Decades of combined engineering expertise.', icon: Briefcase },
              { title: 'Full Compliance', desc: 'Rigorous adherence to global standards.', icon: ShieldCheck },
              { title: 'Global Reach', desc: 'Serving enterprise clients worldwide.', icon: Globe },
              { title: '24/7 Support', desc: 'Round-the-clock dedicated SRE assistance.', icon: Zap },
            ].map((item, i) => (
              <GlassmorphicCard key={i} className="p-8 bg-[#080808] border-white/5 text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-[#FF2020]" />
                </div>
                <h4 className="text-xl font-space font-bold mb-3">{item.title}</h4>
                <p className="text-sm font-outfit text-gray-400 leading-relaxed">{item.desc}</p>
              </GlassmorphicCard>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
