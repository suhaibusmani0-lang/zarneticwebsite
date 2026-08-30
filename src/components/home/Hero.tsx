'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { company } from '@/data/company';
import { HeroBackground } from './HeroBackground';

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#030303] pt-20">
      
      {/* Premium CSS Animated Background */}
      <HeroBackground />

      {/* Vignette Overlay to darken edges and make text pop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#030303_100%)] opacity-90 pointer-events-none" />

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Bold Typography */}
        <div className="lg:col-span-8 flex flex-col items-start text-left">
          <div className="w-16 h-1 bg-[#FF2020] mb-8 rounded-full" />
          
          <div className="font-space text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] mb-8 uppercase">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              INNOVATIVE
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-transparent"
              style={{ WebkitTextStroke: '2px white', color: 'transparent' }}
            >
              DIGITAL
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              FUTURES
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl font-outfit font-light"
          >
            We don't just build software. We engineer resilient, high-performance digital ecosystems for global enterprises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <Link
              href="/contact"
              className="group px-8 py-4 rounded-lg bg-[#FF2020] text-white transition-all text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-3 overflow-hidden relative"
            >
              <span className="relative z-10">Partner With Us</span>
              <ArrowUpRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <div className="absolute inset-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Floating Status Card */}
        <div className="lg:col-span-4 hidden lg:flex justify-end">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="glass-effect p-8 rounded-2xl border-white/10 w-full max-w-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF2020]/20 blur-3xl rounded-full" />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-space tracking-widest text-gray-400 uppercase">Systems Nominal</span>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Active Projects</p>
                <p className="text-4xl font-space font-bold text-white">24</p>
              </div>
              <div className="h-px w-full bg-white/10" />
              <div>
                <p className="text-sm text-gray-500 mb-1">Global Uptime</p>
                <p className="text-4xl font-space font-bold text-white">99.9%</p>
              </div>
              <div className="h-px w-full bg-white/10" />
              <div>
                <p className="text-sm text-gray-500 mb-1">Client Satisfaction</p>
                <p className="text-4xl font-space font-bold text-[#FF2020]">100%</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}



