'use client';

import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { GlassmorphicCard } from '@/components/shared/GlassmorphicCard';

export default function StatsCounter() {
  const stats = [
    { target: 150, label: 'Projects Delivered', suffix: '+' },
    { target: 500, label: 'Clients Worldwide', suffix: '+' },
    { target: 99, label: 'Architecture Uptime', suffix: '.9%' },
    { target: 100, label: 'Legal Compliance', suffix: '%' },
  ];

  return (
    <section className="py-24 w-full bg-[#030303] text-white">
      <div className="container mx-auto px-4">
        <GlassmorphicCard className="p-8 md:p-12" hoverEffect={false}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {stats.map((stat, idx) => (
              <div key={idx} className={`flex flex-col items-center justify-center text-center ${idx !== 0 ? 'pt-8 sm:pt-0' : ''}`}>
                <div className="text-5xl md:text-6xl font-bold font-bagel mb-2 tracking-tighter text-white flex items-center">
                  <AnimatedCounter target={stat.target} label={stat.label} />
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-gray-400 text-sm tracking-widest uppercase mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </GlassmorphicCard>
      </div>
    </section>
  );
}


