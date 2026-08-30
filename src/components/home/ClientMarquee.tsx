'use client';

import { InfiniteMarquee } from '@/components/shared/InfiniteMarquee';
import { portfolioClients } from '@/data/portfolio';

export default function ClientMarquee() {
  return (
    <section className="py-12 w-full overflow-hidden bg-[#030303] border-y border-white/[0.02]">
      <div className="relative">
        {/* Soft gradient masks for the edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />
        
        <InfiniteMarquee direction="left" speed={100} pauseOnHover={false}>
          <div className="flex items-center">
            <span className="text-gray-500/50 font-space uppercase tracking-[0.2em] text-sm md:text-base mx-8">
              Trusted by Innovators Worldwide
            </span>
            <span className="w-2 h-2 rounded-full bg-[#FF2020]/30 mx-4" />
            
            {portfolioClients.map((client, idx) => (
              <div key={client.slug} className="flex items-center">
                <span className="text-gray-400 font-space uppercase tracking-widest text-sm md:text-base mx-8 hover:text-white transition-colors cursor-default">
                  {client.name}
                </span>
                {idx !== portfolioClients.length - 1 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10 mx-4" />
                )}
              </div>
            ))}
            
            <span className="w-2 h-2 rounded-full bg-[#FF2020]/30 mx-4" />
          </div>
        </InfiniteMarquee>
      </div>
    </section>
  );
}
