'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { company } from '@/data/company';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    formData.append('access_key', company.forms.web3formsKey);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0A0A0A] rounded-[32px] p-8 md:p-12 border border-white/5 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white/60 mb-2">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            className="w-full bg-white/[0.03] rounded-[24px] border border-white/5 px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-white/20"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="w-full bg-white/[0.03] rounded-[24px] border border-white/5 px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-white/20"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white/60 mb-2">Message</label>
          <textarea 
            id="message" 
            name="message" 
            required 
            rows={5}
            className="w-full bg-white/[0.03] rounded-[24px] border border-white/5 px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-white/20 resize-none"
            placeholder="How can we help you?"
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium px-8 py-5 rounded-[24px] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Initiate Inquiry
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {submitStatus === 'success' && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-emerald-400 text-center text-sm font-medium"
          >
            Message sent successfully! We'll get back to you within 24 hours.
          </motion.p>
        )}

        {submitStatus === 'error' && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-center text-sm font-medium"
          >
            Something went wrong. Please try again or email us directly.
          </motion.p>
        )}
      </form>
    </div>
  );
}


