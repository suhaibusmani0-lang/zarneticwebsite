'use client'

import { ArrowUpRight, Sparkles } from 'lucide-react'

export function Portfolio() {
  const clients = [
    { name: "Swift Fuel Inc", link: "https://swiftfuelinc.com/", isPremium: true },
    { name: "Xen Motors (USA)", link: "https://www.xenmotors.com", isPremium: true },
    { name: "Spread Smiles Foundation", link: "https://www.spreadsmilesfoundation.com", isPremium: true },
    { name: "Exevo Events", link: "https://www.exevoevents.com", isPremium: true },
    { name: "Buniyadi Sahara Foundation", isStatic: true },
    { name: "Child Growth Trust", isStatic: true },
    { name: "Dandoush Restaurant", isStatic: true },
    { name: "Dr. Bushra Shams", isStatic: true },
    { name: "Hayat Health", isStatic: true },
    { name: "MeatWala", isStatic: true },
    { name: "Naushad Chicken Point", isStatic: true },
    { name: "Safar E Haider", isStatic: true },
    { name: "Sweekar Pride Foundation", isStatic: true },
    { name: "Social Alliance Trust", isStatic: true },
    { name: "BSEA", isStatic: true },
    { name: "A.T.H", isStatic: true }
  ];

  // Divide clients into two rows for Dual-Directional Ticker
  const row1Clients = clients.filter((_, i) => i % 2 === 0);
  const row2Clients = clients.filter((_, i) => i % 2 !== 0);

  // Multiply arrays for smooth infinite scroll
  const tickerItems1 = [...row1Clients, ...row1Clients, ...row1Clients, ...row1Clients];
  const tickerItems2 = [...row2Clients, ...row2Clients, ...row2Clients, ...row2Clients];

  return (
    <section id="portfolio" className="relative py-32 bg-[#020202] overflow-hidden border-y border-white/5 font-sans">
      
      {/* Background Luxury Grid & Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-red-600/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* Header Area */}
      <div className="container mx-auto px-6 mb-24 relative z-10">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
             <Sparkles className="w-4 h-4 text-blue-500" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500">
                Selected Works
             </span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.85]">
             Global <br />
             <span className="text-gray-700">Footprint.</span>
          </h2>
        </div>
      </div>

      {/* --- CATCHY DUAL-DIRECTIONAL TICKERS --- */}
      <div className="relative flex flex-col gap-6 md:gap-10 group/wrapper rotate-[-2deg] scale-105">
        
        {/* ROW 1: Scrolling Left */}
        <div className="relative flex items-center group/row">
          <div className="flex animate-marquee-left whitespace-nowrap group-hover/row:[animation-play-state:paused]">
            {tickerItems1.map((item, index) => (
              <div key={`r1-${index}`} className="flex items-center px-8 md:px-16">
                {item.isPremium ? (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group/brand relative flex items-center gap-4"
                  >
                    <span className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter luxury-text-stroke transition-all duration-500 group-hover/brand:luxury-text-fill group-hover/brand:scale-105 group-hover/brand:-translate-y-2">
                      {item.name}
                    </span>
                    <div className="opacity-0 group-hover/brand:opacity-100 transition-all duration-500 transform translate-x-[-20px] group-hover/brand:translate-x-0 group-hover/brand:-translate-y-2">
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                         <ArrowUpRight className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </a>
                ) : (
                  <span className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter luxury-text-stroke-dim cursor-default hover:luxury-text-stroke transition-all duration-500">
                    {item.name}
                  </span>
                )}
                <span className="mx-8 md:mx-16 text-3xl md:text-5xl text-white/20">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Scrolling Right */}
        <div className="relative flex items-center group/row">
          <div className="flex animate-marquee-right whitespace-nowrap group-hover/row:[animation-play-state:paused]">
            {tickerItems2.map((item, index) => (
              <div key={`r2-${index}`} className="flex items-center px-8 md:px-16">
                {item.isPremium ? (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group/brand relative flex items-center gap-4"
                  >
                    <span className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter luxury-text-stroke transition-all duration-500 group-hover/brand:luxury-text-fill group-hover/brand:scale-105 group-hover/brand:-translate-y-2">
                      {item.name}
                    </span>
                    <div className="opacity-0 group-hover/brand:opacity-100 transition-all duration-500 transform translate-x-[-20px] group-hover/brand:translate-x-0 group-hover/brand:-translate-y-2">
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                         <ArrowUpRight className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </a>
                ) : (
                  <span className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter luxury-text-stroke-dim cursor-default hover:luxury-text-stroke transition-all duration-500">
                    {item.name}
                  </span>
                )}
                <span className="mx-8 md:mx-16 text-3xl md:text-5xl text-white/20">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Overlays to hide rough edges of rotation */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#020202] via-[#020202]/90 to-transparent z-20 pointer-events-none scale-110" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#020202] via-[#020202]/90 to-transparent z-20 pointer-events-none scale-110" />
      </div>

      {/* --- ERROR-FREE CSS INJECTION --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          display: flex;
          animation: marquee-left 60s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          animation: marquee-right 60s linear infinite;
        }

        /* Luxury Typography Effects */
        .luxury-text-stroke {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
        }
        .luxury-text-stroke-dim {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
        }
        .luxury-text-fill {
          color: #ffffff;
          -webkit-text-stroke: 0px;
          text-shadow: 0 0 40px rgba(255, 255, 255, 0.4);
        }
      ` }} />
    </section>
  )
}