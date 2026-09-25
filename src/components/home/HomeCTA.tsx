'use client';

import Link from 'next/link';
import { ArrowUpRight, Globe, Server, UserCheck } from 'lucide-react';

export default function HomeCTA() {
  return (
    <section className="relative py-32 w-full overflow-hidden bg-[#030303] border-t border-white/[0.02]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#FF2020]/20 blur-[150px] rounded-[100%] pointer-events-none opacity-50" />
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-space tracking-tighter text-white mb-6 uppercase max-w-5xl mx-auto leading-[0.9]">
          Ready to Build Something <span className="text-transparent" style={{ WebkitTextStroke: '2px #FF2020' }}>Extraordinary?</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl font-outfit font-light">
          Scale your enterprise with custom web engineering, instant domain activations, and high-speed NVMe cloud hosting.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-3xl">
          <Link
            href="/contact"
            className="group px-8 py-4 rounded-xl bg-[#FF2020] hover:bg-[#e01a1a] text-white transition-all text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-red-950/40 cursor-pointer"
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            href="/domains"
            className="px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition-all text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-950/40 cursor-pointer"
          >
            <Globe className="w-4 h-4" />
            <span>Search Domains</span>
          </Link>

          <Link
            href="/hosting"
            className="px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transition-all text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-purple-950/40 cursor-pointer"
          >
            <Server className="w-4 h-4" />
            <span>Cloud Hosting</span>
          </Link>

          <Link
            href="/client-portal"
            className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Client Dashboard</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
