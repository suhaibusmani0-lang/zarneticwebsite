'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function HomeCTA() {
  return (
    <section className="relative py-32 w-full overflow-hidden bg-[#030303] border-t border-white/[0.02]">
      {/* Massive ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#FF2020]/20 blur-[150px] rounded-[100%] pointer-events-none opacity-50" />
      
      {/* Noise overlay specific to CTA */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-space tracking-tighter text-white mb-6 uppercase max-w-5xl mx-auto leading-[0.9]">
          Ready to Build Something <span className="text-transparent" style={{ WebkitTextStroke: '2px #FF2020' }}>Extraordinary?</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl font-outfit font-light">
          Let's transform your vision into a digital masterpiece. Partner with Zarnetic for next-level engineering.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <Link
            href="/contact"
            className="group px-10 py-5 rounded-full bg-[#FF2020] text-white transition-all text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-3 overflow-hidden relative hover:scale-105"
          >
            <span className="relative z-10">Start Your Project</span>
            <ArrowUpRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
          <Link
            href="/portfolio"
            className="group px-10 py-5 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all text-sm font-bold tracking-widest uppercase flex justify-center items-center"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
