'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Search, Cpu, Code2, ShieldCheck, Rocket } from 'lucide-react';

const processSteps = [
  {
    id: '01',
    title: 'Strategic Discovery',
    description: 'We begin by deeply understanding your business goals, target audience, and market landscape. This foundation ensures every technical decision aligns with your strategic objectives.',
    icon: Search,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20'
  },
  {
    id: '02',
    title: 'Architecture & Blueprint',
    description: 'Our senior architects design scalable, secure, and performant system architectures. We define the tech stack, data models, and user flows before writing a single line of code.',
    icon: Cpu,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  },
  {
    id: '03',
    title: 'Engineering & Execution',
    description: 'We build your product using modern frameworks and engineering best practices. Our agile sprints ensure transparency and regular deliverables you can test and review.',
    icon: Code2,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20'
  },
  {
    id: '04',
    title: 'QA & Security Audit',
    description: 'Rigorous testing is non-negotiable. We conduct automated and manual testing, performance profiling, and comprehensive security audits to ensure production-readiness.',
    icon: ShieldCheck,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20'
  },
  {
    id: '05',
    title: 'Global Deployment',
    description: 'We orchestrate smooth, zero-downtime deployments to global edge networks. Post-launch, we provide continuous monitoring and proactive maintenance.',
    icon: Rocket,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20'
  }
];

export function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepDuration = 2500; // 2.5s per step
    const interval = 50; // Update progress every 50ms
    
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setActiveStep(curr => (curr + 1) % processSteps.length);
          return 0;
        }
        return p + (interval / stepDuration) * 100;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-5xl mx-auto py-12 flex flex-col md:flex-row gap-12">
      {/* Timeline Nav */}
      <div className="relative flex-none md:w-1/3 border-l border-white/10 ml-6 md:ml-0 pl-8">
        <div className="absolute top-0 bottom-0 left-[-1px] w-[2px] bg-white/5" />
        
        {/* Active Progress Line */}
        <div 
          className="absolute top-0 left-[-1px] w-[2px] bg-gradient-to-b from-blue-500 to-emerald-500 transition-all duration-300"
          style={{ height: `${(activeStep + progress/100) * (100 / (processSteps.length - 1))}%` }}
        />

        <div className="space-y-12">
          {processSteps.map((step, idx) => (
            <div 
              key={step.id}
              className={`relative cursor-pointer transition-all duration-300 ${activeStep === idx ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
              onClick={() => { setActiveStep(idx); setProgress(0); }}
            >
              <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-[#080808] ${activeStep === idx ? 'bg-blue-500 scale-125' : 'bg-white/20'}`} />
              <h3 className="text-xl font-medium font-outfit text-white/90">
                <span className="text-white/40 mr-2 text-sm">{step.id}</span>
                {step.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Active Step Content */}
      <div className="flex-1 relative min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`bg-[#0A0A0A] rounded-[32px] p-8 border ${processSteps[activeStep].borderColor}`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${processSteps[activeStep].bgColor}`}>
              <div className={processSteps[activeStep].color}>
                {(() => {
                  const Icon = processSteps[activeStep].icon;
                  return <Icon className="w-8 h-8" strokeWidth={1.5} />;
                })()}
              </div>
            </div>
            <h4 className="text-2xl font-medium font-outfit text-white mb-4">
              {processSteps[activeStep].title}
            </h4>
            <p className="text-white/60 leading-relaxed text-lg">
              {processSteps[activeStep].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}


