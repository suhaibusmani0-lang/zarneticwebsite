'use client'

import { ImageWithFallback } from './figma/ImageWithFallback'
import { Linkedin, ArrowUpRight } from 'lucide-react'

// Photos import
import SuhaibImg from '../assets/suhaib.jpeg'
import ZainImg from '../assets/zain.jpeg'
import RahimImg from '../assets/rahimullah.jpeg'
import FaizanImg from '../assets/faizan.jpeg'
import HarshImg from '../assets/harsh.jpeg'
import SafiaImg from '../assets/safia.jpeg'

export function Team() {
  const team = [
    { 
      name: "Mr Suhaib Usmani", 
      role: "CEO & Founder", 
      image: SuhaibImg, 
      linkedin: "https://www.linkedin.com/in/suhaib-usmani-0847661b1/",
      desc: "Visionary leader driving Zarnetic's global digital innovation and strategy."
    },
    { 
      name: "Mr. Zain Jamal", 
      role: "Chief Growth Officer", 
      image: ZainImg,
      desc: "Leading international business development and strategic global partnerships."
    },
    { 
      name: "Adv. Rahimullah", 
      role: "Legal & Compliance", 
      image: RahimImg,
      desc: "Expert in corporate law, business registrations, and legal documentation."
    },
    { 
      name: "Mr Faizan Ghani", 
      role: "Head of Data & AI", 
      image: FaizanImg,
      desc: "Architecting high-performance AI systems and scalable digital products."
    },
    { 
      name: "Mr. Harsh Goyal", 
      role: "Marketing Head", 
      image: HarshImg,
      desc: "Performance marketing specialist focused on data-driven growth and SEO."
    },
    { 
      name: "Miss Safia ", 
      role: "UX/UI Design Lead", 
      image: SafiaImg,
      desc: "Crafting premium user interfaces and seamless brand identities."
    },
  ]

  return (
    <div className="relative py-32 bg-[#050505] w-full overflow-hidden">
      {/* --- ERROR-FREE FONT INJECTION --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
      ` }} />

      <div className="container mx-auto px-6 lg:px-16 relative z-10 font-jakarta">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-4 uppercase italic">
            The <span className="text-blue-500">Core</span> Team
          </h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
        </div>

        {/* --- BALANCED GRID (3 PER ROW) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {team.map((member) => (
            <div 
              key={member.name} 
              className="group relative bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 transition-all duration-500 hover:bg-white/[0.03] hover:border-blue-500/30 hover:-translate-y-2 shadow-2xl"
            >
              {/* Photo Section */}
              <div className="relative aspect-square mb-8 overflow-hidden rounded-[24px] border border-white/10 shadow-inner">
                <ImageWithFallback 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                />
                
                {/* LinkedIn Badge */}
                {member.linkedin && (
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 z-20 p-3 bg-white text-black rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-blue-600 hover:text-white transform translate-y-2 group-hover:translate-y-0"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Info Section */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-blue-500 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-blue-500 font-bold uppercase tracking-[0.2em] text-[10px] mt-1 italic">
                    {member.role}
                  </p>
                </div>
                
                <p className="text-gray-500 text-sm leading-relaxed font-light line-clamp-3 group-hover:text-gray-300 transition-colors italic">
                  "{member.desc}"
                </p>
              </div>

              {/* Bottom Decorative Line */}
              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest leading-none">Executive Member</span>
                 <ArrowUpRight className="w-4 h-4 text-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Ambient Lighting */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
    </div>
  )
}