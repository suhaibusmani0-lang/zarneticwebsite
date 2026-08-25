'use client'

import { useState, useEffect } from 'react'
import { 
  Code, Cloud, ShieldCheck, Smartphone, Database, 
  Scale, FileCheck, Zap, ArrowUpRight, MessageCircle
} from 'lucide-react'

export function Services() {
  const [isVisible, setIsVisible] = useState(false)

  const services = [
    {
      id: 'legal',
      title: "Legal & NGO Compliance",
      desc: "NGO Registration (12A, 80G, FCRA), Company Incorporation, and FSSAI License experts.",
      icon: Scale,
      color: 'orange-500',
      isFeatured: true,
      whatsappMsg: "Hi Zarnetic, I want to inquire about Legal & NGO Registration services (12A/80G/FCRA)."
    },
    {
      id: 'software',
      title: "Software Engineering",
      desc: "High-performance custom web and enterprise applications built for scale.",
      icon: Code,
      color: 'blue-500',
      whatsappMsg: "Hi Zarnetic, I am looking for Custom Software Development solutions for my business."
    },
    {
      id: 'cloud',
      title: "Cloud & DevOps",
      desc: "Scalable cloud architecture and automated pipelines for 99.9% uptime.",
      icon: Cloud,
      color: 'emerald-500',
      whatsappMsg: "Hi Zarnetic, I need help with Cloud Infrastructure and DevOps setup."
    },
    {
      id: 'security',
      title: "Cyber Security",
      desc: "Professional penetration testing and data protection audits.",
      icon: ShieldCheck,
      color: 'purple-500',
      whatsappMsg: "Hi Zarnetic, I want to conduct a Cybersecurity Audit for my organization."
    },
    {
      id: 'data',
      title: "AI & Data Science",
      desc: "Transforming raw data into actionable business intelligence using AI.",
      icon: Database,
      color: 'pink-500',
      whatsappMsg: "Hi Zarnetic, I'm interested in AI & Data Science solutions."
    }
  ]

  useEffect(() => { setIsVisible(true) }, [])

  // WhatsApp Redirect Function
  const handleWhatsApp = (msg: string) => {
    const phoneNumber = "917860572173" // Tumhara number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  return (
    <section id="services" className="relative py-32 bg-[#020202] overflow-hidden font-sans">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Header */}
        <div className="max-w-4xl mb-24">
          <header className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Premium Solutions</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mb-6 uppercase italic">
              Our <span className="text-gray-600 font-light">Expertise.</span>
            </h2>
            <p className="text-xl text-gray-400 font-light max-w-2xl border-l border-orange-500/50 pl-6">
              Precision-engineered <span className="text-white">technology</span> meets rigorous <span className="text-orange-500">legal compliance</span>.
            </p>
          </header>
        </div>

        {/* --- INTERACTIVE BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <article
              key={service.id}
              onClick={() => handleWhatsApp(service.whatsappMsg)}
              className={`group relative cursor-pointer bg-[#080808] border border-white/5 rounded-[40px] p-10 transition-all duration-700 hover:border-orange-500/30 hover:-translate-y-2 ${
                service.isFeatured ? 'md:col-span-7' : 'md:col-span-5'
              } ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Luxury Hover Glow */}
              <div className={`absolute inset-0 bg-${service.color}/5 opacity-0 group-hover:opacity-100 blur-[100px] transition-opacity duration-700 pointer-events-none rounded-[40px]`} />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-12">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/10 group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-500 shadow-2xl">
                    <service.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <ArrowUpRight className="w-6 h-6 text-gray-700 group-hover:text-orange-500 transition-colors" />
                    <MessageCircle className="w-5 h-5 text-gray-800 opacity-0 group-hover:opacity-100 transition-all animate-bounce" />
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight group-hover:text-orange-500 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-500 font-light leading-relaxed text-lg mb-12 group-hover:text-gray-300 transition-colors">
                  {service.desc}
                </p>

                <div className="mt-auto flex items-center gap-3">
                   <div className="h-[1px] flex-1 bg-white/5 group-hover:bg-orange-500/20 transition-colors" />
                   <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-600 group-hover:text-orange-500 transition-colors">
                      Click to Consult
                   </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}