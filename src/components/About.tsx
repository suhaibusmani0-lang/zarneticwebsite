'use client'

import { useEffect, useState } from 'react'
import { Search, Cpu, Code2, ShieldCheck, Rocket, Zap, CheckCircle2 } from 'lucide-react'

export function About() {
  const [activeStep, setActiveStep] = useState(0)

  // Executive Steps with Icons
  const processSteps = [
    {
      number: "01",
      title: "Strategic Discovery",
      description: "Deep dive into your business goals, technical requirements, and legal compliance needs.",
      icon: Search,
      color: "orange"
    },
    {
      number: "02",
      title: "Architecture & Blueprint",
      description: "Designing scalable system architecture, tech-stack selection, and UI/UX prototyping.",
      icon: Cpu,
      color: "blue"
    },
    {
      number: "03",
      title: "Engineering & Execution",
      description: "Agile development sprints combined with rigorous legal documentation framing.",
      icon: Code2,
      color: "emerald"
    },
    {
      number: "04",
      title: "QA & Security Audit",
      description: "Military-grade penetration testing, code reviews, and standard compliance checks.",
      icon: ShieldCheck,
      color: "purple"
    },
    {
      number: "05",
      title: "Global Deployment",
      description: "Seamless cloud launch, continuous monitoring, and 24/7 dedicated maintenance.",
      icon: Rocket,
      color: "red"
    }
  ]

  // Smooth Infinite Loop Animation for Steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length)
    }, 2500) // Har 2.5 second mein step change hoga
    return () => clearInterval(interval)
  }, [processSteps.length])

  return (
    <section id="about" className="relative py-32 bg-[#020202] overflow-hidden font-sans">
      
      {/* --- AMBIENT LUXURY GLOWS --- */}
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-orange-600/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-blue-600/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        {/* --- EXECUTIVE HEADER --- */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-6 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <Zap className="w-4 h-4 text-orange-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500">Execution Methodology</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 italic uppercase">
            Our <span className="text-gray-600">Blueprint.</span>
          </h2>
          
          <p className="text-xl text-gray-400 font-light leading-relaxed">
            A battle-tested methodology that turns complex enterprise requirements into <span className="text-white font-medium">reliable, compliant,</span> and <span className="text-white font-medium">scalable solutions.</span>
          </p>
        </div>

        {/* --- INTERACTIVE GLOWING TIMELINE --- */}
        <div className="relative max-w-5xl mx-auto mb-32">
          
          {/* The Track Line (Background) */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-1 bg-white/5 rounded-full" />
          
          {/* The Glowing Progress Line */}
          <div 
            className="absolute left-8 md:left-12 top-0 w-1 bg-gradient-to-b from-orange-500 to-blue-500 rounded-full transition-all duration-1000 ease-in-out shadow-[0_0_15px_rgba(249,115,22,0.5)]"
            style={{ height: `${((activeStep + 1) / processSteps.length) * 100}%` }} 
          />

          <div className="space-y-12 md:space-y-16">
            {processSteps.map((step, index) => {
              const isActive = activeStep === index;
              const isPassed = activeStep > index;
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative flex items-center gap-8 md:gap-12 pl-24 md:pl-32 group">
                  
                  {/* Glowing Node Point */}
                  <div className={`absolute left-5 md:left-9 w-7 h-7 rounded-full border-4 flex items-center justify-center transition-all duration-700 z-10 ${
                    isActive 
                      ? 'bg-orange-500 border-[#020202] scale-125 shadow-[0_0_20px_rgba(249,115,22,0.8)]' 
                      : isPassed 
                        ? 'bg-blue-500 border-[#020202]' 
                        : 'bg-white/10 border-[#020202]'
                  }`}>
                    {isPassed && <CheckCircle2 className="w-3 h-3 text-[#020202]" />}
                  </div>

                  {/* Step Content Card */}
                  <div className={`flex-1 bg-[#080808] border rounded-[30px] p-8 md:p-10 transition-all duration-700 backdrop-blur-xl ${
                    isActive 
                      ? 'border-orange-500/30 bg-white/[0.04] shadow-2xl -translate-y-2' 
                      : 'border-white/5 bg-white/[0.01] opacity-60'
                  }`}>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      
                      {/* Step Number & Icon */}
                      <div className="flex items-center gap-6 shrink-0">
                        <span className={`text-5xl md:text-6xl font-black italic tracking-tighter transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/10'}`}>
                          {step.number}
                        </span>
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                          isActive ? 'bg-orange-500/10 border-orange-500/30' : 'bg-white/5 border-white/5'
                        }`}>
                          <Icon className={`w-6 h-6 ${isActive ? 'text-orange-500' : 'text-gray-600'}`} />
                        </div>
                      </div>

                      {/* Step Text */}
                      <div className="flex-1">
                        <h3 className={`text-2xl font-black mb-3 tracking-tight transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                          {step.title}
                        </h3>
                        <p className={`text-sm leading-relaxed font-light transition-colors duration-500 ${isActive ? 'text-gray-300' : 'text-gray-600'}`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                </div>
              )
            })}
          </div>
        </div>

        {/* --- PREMIUM STATS BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-16 border-t border-white/5">
          
          <div className="bg-[#080808] border border-white/5 rounded-[32px] p-10 text-center hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-2 group shadow-xl">
            <div className="text-6xl font-black text-white mb-2 tracking-tighter group-hover:text-orange-500 transition-colors">150+</div>
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Digital Assets Delivered</div>
          </div>
          
          <div className="bg-[#080808] border border-white/5 rounded-[32px] p-10 text-center hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 group shadow-xl">
            <div className="text-6xl font-black text-white mb-2 tracking-tighter group-hover:text-blue-500 transition-colors">100%</div>
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Legal & NGO Compliance</div>
          </div>
          
          <div className="bg-[#080808] border border-white/5 rounded-[32px] p-10 text-center hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-2 group shadow-xl">
            <div className="text-6xl font-black text-white mb-2 tracking-tighter group-hover:text-emerald-500 transition-colors">99.9%</div>
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Architecture Uptime</div>
          </div>

        </div>
      </div>
    </section>
  )
}