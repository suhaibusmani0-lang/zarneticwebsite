'use client';

import { SectionHeader } from '@/components/shared/SectionHeader';
import { InfiniteMarquee } from '@/components/shared/InfiniteMarquee';
import { reviews, reviewStats } from '@/data/reviews';
import { awards } from '@/data/awards';
import * as LucideIcons from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-24 w-full bg-[#030303] text-white overflow-hidden border-t border-white/[0.02]">
      <div className="container mx-auto px-4 mb-20">
        <div className="flex flex-col md:flex-row gap-12 items-end justify-between">
          <SectionHeader
            badge="Client Trust"
            title="Real Results."
            highlightedWord="Results."
            className="mb-0 text-left"
          />
          
          {/* Authentic-looking GMB Block */}
          <div className="flex items-center gap-6 bg-white p-6 rounded-2xl shrink-0 border border-gray-200 shadow-xl max-w-sm w-full">
            <div className="bg-white p-2 rounded-full shadow-sm shrink-0">
              <svg viewBox="0 0 48 48" className="w-10 h-10">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-bold text-gray-900 leading-none">{reviewStats.rating}</span>
                <div className="flex text-[#FBBC05]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 font-medium font-outfit text-sm">
                Based on {reviewStats.totalReviews} Google Reviews
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Marquee */}
      <div className="relative mb-32">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />
        
        <InfiniteMarquee direction="left" speed={90} pauseOnHover>
          {reviews.map((review, idx) => (
            <div key={idx} className="mx-4 w-[400px] bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl hover:border-[#FF2020]/20 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF2020] to-orange-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-white font-space tracking-tight">{review.name}</h4>
                  <p className="text-xs text-gray-500 mb-1">2 weeks ago</p>
                  <div className="flex text-[#FBBC05]">
                    {Array.from({ length: 5 }).map((_, i) => (
                       <svg key={i} viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 font-outfit leading-relaxed">"{review.text}"</p>
            </div>
          ))}
        </InfiniteMarquee>
      </div>

      {/* Awards Section */}
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-10 h-px bg-[#FF2020]" />
          <h3 className="text-xl font-space font-bold tracking-widest uppercase text-white">Awards & Recognitions</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {awards.map((award, idx) => {
            const Icon = (LucideIcons as any)[award.icon] || LucideIcons.Award;
            return (
              <div key={idx} className="bg-[#080808] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-[#111] hover:border-white/10 transition-all">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-black border border-white/10 text-gray-300 group-hover:text-white transition-colors`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white font-space text-sm mb-1 leading-tight">{award.title}</h4>
                <p className="text-xs text-gray-500 font-outfit uppercase tracking-wider">{award.organization}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
