'use client'

import { useState } from 'react'
import { Send, Sparkles, Clock, Globe, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return // Basic validation
    }

    setIsSubmitting(true)
    setFormStatus('idle')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: "46a465c3-4deb-499e-afe0-fe2a9cff0dfa", // Aapki Web3Forms Key
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Business Inquiry: ${formData.name}`,
          from_name: "Zarnetic Website",
        }),
      })

      const data = await response.json()

      if (data.success) {
        setFormStatus('success')
        setFormData({ name: '', email: '', message: '' })
        // 5 seconds baad success message hata do
        setTimeout(() => setFormStatus('idle'), 5000)
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-40 bg-[#020202] overflow-hidden font-sans">
      {/* --- LUXURY AMBIENT GLOWS --- */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-600/[0.07] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-600/[0.05] rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          
          {/* --- LEFT: BRANDING & INFO --- */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500">The Final Step</span>
              </div>
              <h2 className="text-7xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter italic uppercase">
                Let's <br /><span className="text-gray-700">Connect.</span>
              </h2>
              <p className="text-xl text-gray-400 font-light leading-relaxed max-w-md border-l-2 border-blue-500/30 pl-8">
                Ready to transform your vision into a <span className="text-white font-medium">Digital Masterpiece?</span> Our engineers are standing by.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: Clock, label: "Response Time", value: "Within 24 Hours", color: "text-blue-500" },
                { icon: Globe, label: "Global Reach", value: "Delhi | USA | Global", color: "text-emerald-500" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-blue-500/40 transition-all duration-500 shadow-2xl">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">{item.label}</p>
                    <p className="text-white font-bold text-lg">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT: THE GLASS FORM --- */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-2 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-[50px] blur-3xl opacity-40 pointer-events-none" />
            
            <div className="relative bg-[#080808]/80 border border-white/5 backdrop-blur-3xl rounded-[45px] p-10 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
              
              {/* Form Status Messages */}
              {formStatus === 'success' && (
                <div className="mb-8 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="text-emerald-500 font-bold">Transmission Successful</h4>
                    <p className="text-emerald-500/80 text-sm mt-1">We've received your inquiry. Our team will contact you shortly.</p>
                  </div>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="mb-8 p-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                  <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
                  <div>
                    <h4 className="text-red-500 font-bold">Transmission Failed</h4>
                    <p className="text-red-500/80 text-sm mt-1">Something went wrong. Please check your connection and try again.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Suhaib Usmani"
                      className="w-full px-8 py-5 rounded-[24px] bg-white/[0.03] border border-white/5 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all text-lg font-medium"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Email Identity</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="name@company.com"
                      className="w-full px-8 py-5 rounded-[24px] bg-white/[0.03] border border-white/5 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all text-lg font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Project Vision</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us what we are building together..."
                    className="w-full px-8 py-6 rounded-[30px] bg-white/[0.03] border border-white/5 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all text-lg font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 rounded-[24px] bg-white text-black font-black text-xs uppercase tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all duration-700 flex items-center justify-center gap-6 group disabled:opacity-50 shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
                >
                  {isSubmitting ? 'Transmitting Data...' : 'Initiate Inquiry'}
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Feature Summary */}
        <div className="mt-32 pt-16 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-12 text-center sm:text-left">
          {[
            { t: "Expert Consultation", d: "Direct architectural deep-dives." },
            { t: "Transparent Pricing", d: "No hidden layers, just results." },
            { t: "Security First", d: "ISO standard data protection." }
          ].map((item, idx) => (
            <div key={idx} className="group">
              <h4 className="text-white font-black text-sm uppercase tracking-widest mb-3 flex items-center gap-3 justify-center sm:justify-start">
                <ArrowRight className="w-3 h-3 text-blue-500 group-hover:translate-x-1 transition-transform" />
                {item.t}
              </h4>
              <p className="text-gray-600 text-xs font-light tracking-wide uppercase">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}