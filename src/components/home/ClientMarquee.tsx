'use client';

import React, { useState, useEffect } from 'react';
import { InfiniteMarquee } from '@/components/shared/InfiniteMarquee';
import { portfolioClients } from '@/data/portfolio';

interface MarqueeClient {
  slug: string;
  name: string;
  logoUrl?: string;
  category?: string;
}

// Billion-Dollar Enterprise Brand Logo Lockups
function ClientBrandLogo({ client }: { client: MarqueeClient }) {
  // If an authentic uploaded logo image is provided (e.g. Swift Fuel Inc)
  if (client.logoUrl) {
    return (
      <div className="flex items-center justify-center">
        <div className="h-14 md:h-16 px-5 py-2 bg-white/95 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.5)] border border-white/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <img
            src={client.logoUrl}
            alt={`${client.name} logo`}
            className="h-10 md:h-12 max-h-12 max-w-[190px] md:max-w-[240px] w-auto object-contain"
          />
        </div>
      </div>
    );
  }

  // Bespoke Fortune-500 Vector Brand Logos for featured flagship clients
  const slug = (client.slug || '').toLowerCase();

  if (slug === 'xen-motors' || slug.includes('xen')) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-zinc-100 via-zinc-400 to-zinc-700 p-0.5 shadow-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-[#0a0a0c] rounded-[14px] flex items-center justify-center">
            <svg className="w-7 h-7 text-zinc-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M4 4l16 16M20 4L4 20" />
              <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-space font-black tracking-[0.25em] text-base md:text-lg text-white group-hover:text-red-400 transition-colors">
            XEN MOTORS
          </span>
          <span className="text-[11px] tracking-[0.25em] text-zinc-400 uppercase font-semibold">
            Automotive USA
          </span>
        </div>
      </div>
    );
  }

  if (slug === 'spread-smiles-foundation' || slug.includes('spread-smiles')) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-rose-500 to-emerald-500 p-0.5 shadow-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-[#0a0a0c] rounded-[14px] flex items-center justify-center">
            <svg className="w-7 h-7 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-space font-black tracking-wider text-base md:text-lg text-white group-hover:text-emerald-400 transition-colors">
            SPREAD SMILES
          </span>
          <span className="text-[11px] tracking-[0.2em] text-emerald-400 uppercase font-semibold">
            Foundation • NGO
          </span>
        </div>
      </div>
    );
  }

  if (slug === 'exevo-events' || slug.includes('exevo')) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 p-0.5 shadow-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-[#0a0a0c] rounded-[14px] flex items-center justify-center">
            <svg className="w-7 h-7 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-space font-black tracking-[0.25em] text-base md:text-lg text-white group-hover:text-purple-400 transition-colors">
            EXEVO
          </span>
          <span className="text-[11px] tracking-[0.25em] text-purple-300 uppercase font-semibold">
            Luxury Events
          </span>
        </div>
      </div>
    );
  }

  if (slug === 'hayat-health' || slug.includes('hayat')) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-[#0a0a0c] rounded-[14px] flex items-center justify-center">
            <svg className="w-7 h-7 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-space font-black tracking-wider text-base md:text-lg text-white group-hover:text-cyan-400 transition-colors">
            HAYAT HEALTH
          </span>
          <span className="text-[11px] tracking-[0.2em] text-cyan-400 uppercase font-semibold">
            Healthcare Network
          </span>
        </div>
      </div>
    );
  }

  if (slug === 'meatwala' || slug.includes('meat')) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-red-500 to-amber-600 p-0.5 shadow-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-[#0a0a0c] rounded-[14px] flex items-center justify-center">
            <svg className="w-7 h-7 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-space font-black tracking-wider text-base md:text-lg text-white group-hover:text-red-400 transition-colors">
            MEATWALA
          </span>
          <span className="text-[11px] tracking-[0.2em] text-red-400 uppercase font-semibold">
            Fresh Foods E-Com
          </span>
        </div>
      </div>
    );
  }

  if (slug === 'safar-e-haider' || slug.includes('safar')) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 p-0.5 shadow-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-[#0a0a0c] rounded-[14px] flex items-center justify-center">
            <svg className="w-7 h-7 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-space font-black tracking-wider text-base md:text-lg text-white group-hover:text-emerald-400 transition-colors">
            SAFAR-E-HAIDER
          </span>
          <span className="text-[11px] tracking-[0.2em] text-emerald-400 uppercase font-semibold">
            Travel & Pilgrimage
          </span>
        </div>
      </div>
    );
  }

  // Universal dynamic tech monogram badge for any other client
  const initials = client.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 p-0.5 shadow-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
        <div className="w-full h-full bg-[#0a0a0c] rounded-[14px] flex items-center justify-center">
          <span className="font-space font-black text-base text-white tracking-wider">
            {initials}
          </span>
        </div>
      </div>
      <div className="flex flex-col text-left">
        <span className="font-space font-black tracking-wider text-base md:text-lg text-white group-hover:text-red-400 transition-colors truncate max-w-[210px]">
          {client.name.toUpperCase()}
        </span>
        <span className="text-[11px] tracking-[0.2em] text-zinc-400 uppercase font-semibold truncate max-w-[210px]">
          {client.category || 'Enterprise Client'}
        </span>
      </div>
    </div>
  );
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
            category: item.category,
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
    <section className="py-14 md:py-24 w-full overflow-hidden bg-[#030303] relative border-y border-white/[0.08]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-gradient-to-r from-red-600/10 via-purple-600/10 to-blue-600/10 blur-3xl pointer-events-none" />

      {/* Header Eyebrow Tag */}
      <div className="flex justify-center mb-10 px-4 relative z-10">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-xs md:text-sm font-semibold text-zinc-200 uppercase tracking-[0.25em] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] animate-pulse" />
          <span>Trusted by Global Industry Leaders & Scaleups</span>
        </div>
      </div>

      <div className="relative">
        {/* Deep gradient fade masks for seamless infinite flow */}
        <div className="absolute inset-y-0 left-0 w-36 md:w-64 bg-gradient-to-r from-[#030303] via-[#030303]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-36 md:w-64 bg-gradient-to-l from-[#030303] via-[#030303]/80 to-transparent z-20 pointer-events-none" />
        
        <InfiniteMarquee direction="left" speed={50} pauseOnHover={true}>
          <div className="flex items-center gap-8 py-3">
            {clients.map((client, idx) => (
              <div key={`${client.slug}-${idx}`} className="flex items-center shrink-0">
                {/* Billion-Dollar Executive Logo Card Badge */}
                <div className="h-20 md:h-24 min-w-[240px] md:min-w-[300px] px-7 md:px-9 py-4 rounded-2xl md:rounded-3xl bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-transparent hover:from-white/[0.14] hover:via-white/[0.07] hover:to-transparent border border-white/[0.14] hover:border-white/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_12px_40px_rgba(255,32,32,0.18),inset_0_1px_2px_rgba(255,255,255,0.35)] transition-all duration-300 group cursor-pointer flex items-center justify-center hover:-translate-y-1.5">
                  <ClientBrandLogo client={client} />
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/20 mx-5 md:mx-7 shrink-0" />
              </div>
            ))}
          </div>
        </InfiniteMarquee>
      </div>
    </section>
  );
}
