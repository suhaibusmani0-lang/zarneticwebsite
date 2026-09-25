'use client';

import { useState, useEffect } from 'react';
import { InfiniteMarquee } from '@/components/shared/InfiniteMarquee';
import { portfolioClients } from '@/data/portfolio';

interface MarqueeClient {
  slug: string;
  name: string;
  logoUrl?: string;
}

export default function ClientMarquee() {
  const [clients, setClients] = useState<MarqueeClient[]>(portfolioClients);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch('/api/portfolio');
        const data = await res.json();
        if (data.success && Array.isArray(data.items) && data.items.length > 0) {
          const mapped: MarqueeClient[] = data.items.map((item: any) => ({
            slug: item.slug,
            name: item.title || item.clientName,
            logoUrl: item.logoUrl,
          }));
          setClients(mapped);
        }
      } catch (err) {
        console.error('Failed to load portfolio clients for marquee:', err);
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <section className="py-12 w-full overflow-hidden bg-[#030303] border-y border-white/[0.04]">
      <div className="relative">
        {/* Soft gradient masks for the edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />
        
        <InfiniteMarquee direction="left" speed={70} pauseOnHover={true}>
          <div className="flex items-center">
            <span className="text-gray-500/60 font-space uppercase tracking-[0.2em] text-xs md:text-sm mx-6 shrink-0 font-medium">
              Trusted by Innovators Worldwide
            </span>
            <span className="w-2 h-2 rounded-full bg-[#FF2020]/40 mx-4 shrink-0" />
            
            {clients.map((client, idx) => (
              <div key={`${client.slug}-${idx}`} className="flex items-center shrink-0">
                {client.logoUrl ? (
                  <div className="h-10 px-4 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 flex items-center justify-center transition-all mx-4 group">
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="max-h-6 max-w-[120px] object-contain filter brightness-90 group-hover:brightness-100 transition-all"
                    />
                  </div>
                ) : (
                  <span className="text-gray-400 font-space uppercase tracking-widest text-xs md:text-sm mx-6 hover:text-white transition-colors cursor-default whitespace-nowrap">
                    {client.name}
                  </span>
                )}
                {idx !== clients.length - 1 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10 mx-4" />
                )}
              </div>
            ))}
            
            <span className="w-2 h-2 rounded-full bg-[#FF2020]/40 mx-4 shrink-0" />
          </div>
        </InfiniteMarquee>
      </div>
    </section>
  );
}
