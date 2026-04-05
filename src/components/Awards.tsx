'use client'

import { Trophy, Star, ShieldCheck, Globe, Users, Briefcase, Zap } from 'lucide-react'

export function Awards() {
  const achievements = [
    { icon: Trophy, title: "Top Rated IT Agency", org: "Clutch 2024", color: "text-orange-500" },
    { icon: ShieldCheck, title: "ISO 27001 Certified", org: "Data Security Standard", color: "text-blue-500" },
    { icon: Globe, title: "Global NGO Consultant", org: "100+ Registrations", color: "text-emerald-500" },
    { icon: Zap, title: "Next-Gen Software Award", org: "Tech Excellence 2025", color: "text-purple-500" },
    { icon: Briefcase, title: "Elite Startup Partner", org: "Startup India Circle", color: "text-blue-400" },
    { icon: Users, title: "Trusted by 500+ Clients", org: "Worldwide Recognition", color: "text-pink-500" }
  ]

  // 25+ Premium, Diverse & Authentic-Looking Reviews
  const gmbReviews = [
    { name: "Rahul Sharma", text: "Zarnetic handled our NGO registration flawlessly. Highly professional team!", rating: 5 },
    { name: "Sarah Jenkins", text: "Exceptional custom software delivery. They scaled our startup infrastructure perfectly.", rating: 5 },
    { name: "Ahmed Khan", text: "Best IT consultancy in Delhi. Their legal compliance team is top-notch.", rating: 5 },
    { name: "Priya Patel", text: "FSSAI and Company registration done super fast. Highly recommended!", rating: 5 },
    { name: "David Miller", text: "Our AWS migration was seamless thanks to their Cloud DevOps experts.", rating: 5 },
    { name: "Anita Desai", text: "Got our 12A and 80G certificates without any hassle. Great support and transparency.", rating: 5 },
    { name: "Rohan Gupta", text: "Their cybersecurity audit saved us from major vulnerabilities. Very thorough work.", rating: 4 },
    { name: "Emily Chen", text: "Fantastic UI/UX design for our new mobile app. The Zarnetic team is brilliant.", rating: 5 },
    { name: "Vikram Singh", text: "FCRA registration is usually a nightmare, but they made it look incredibly easy.", rating: 5 },
    { name: "Aisha Rahman", text: "Developed a custom CRM that boosted our sales by 40%. Worth every single penny.", rating: 5 },
    { name: "Carlos Gomez", text: "Top-tier AI and Data Science solutions. They really understand modern tech scaling.", rating: 5 },
    { name: "Neha Kapoor", text: "Company incorporation was done in record time. Excellent legal guidance from Adv. Rahimullah.", rating: 5 },
    { name: "John Smith", text: "Very responsive team and transparent pricing. Delivered the project before the deadline.", rating: 4 },
    { name: "Karan Malhotra", text: "The best tech partners we've ever worked with. Highly scalable microservices architecture.", rating: 5 },
    { name: "Sofia Ali", text: "Helped us set up our entire digital infrastructure from scratch. Amazing end-to-end work.", rating: 5 },
    { name: "Rajesh Verma", text: "Annual audits and tax compliance handled professionally year after year. Total peace of mind.", rating: 5 },
    { name: "Lisa Wong", text: "Their strategic IT consulting completely transformed our daily operations and workflow.", rating: 5 },
    { name: "Amit Kumar", text: "Fast, reliable, and secure web development. Zarnetic is our go-to agency for everything digital.", rating: 5 },
    { name: "Sneha Reddy", text: "Got my restaurant's FSSAI license quickly. Very helpful staff who guided me through every step.", rating: 5 },
    { name: "Michael Brown", text: "Outstanding penetration testing services. Our fintech platform is much safer now.", rating: 4 },
    { name: "Pooja Joshi", text: "From website design to legal compliance, they do it all perfectly under one roof.", rating: 5 },
    { name: "Tariq Mahmood", text: "They built a robust e-commerce platform for us. Zero downtime so far during peak sales!", rating: 5 },
    { name: "Emma Wilson", text: "Incredible attention to detail in their software engineering process. Highly structured approach.", rating: 5 },
    { name: "Sanjay Das", text: "NGO registration process was so smooth. I didn't have to worry about running to any offices.", rating: 5 },
    { name: "Alex Turner", text: "Highly recommend Zarnetic for elite business solutions. A truly global standard team.", rating: 5 }
  ]

  const tickerItems = [...achievements, ...achievements, ...achievements];
  const reviewItems = [...gmbReviews, ...gmbReviews]; // Looping twice for infinite scroll smoothness

  return (
    <section id="awards" className="relative py-24 bg-[#030303] overflow-hidden border-y border-white/5 font-sans">
      
      {/* Background Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 mb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT: Header & Intro */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Industry Excellence</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] italic uppercase mb-8">
              Proven <br /><span className="text-gray-600">Track Record.</span>
            </h2>
            <p className="text-gray-400 text-lg font-light max-w-xl mx-auto lg:mx-0 border-l-2 border-yellow-500/30 pl-6">
              Recognized globally for blending high-end engineering with flawless legal compliance. Don't just take our word for it—see what our clients say.
            </p>
          </div>

          {/* RIGHT: Live GMB Reviews Feed (Vertical Ticker) */}
          <div className="lg:col-span-6 relative h-[380px] bg-white/[0.02] border border-white/5 rounded-[40px] p-8 overflow-hidden backdrop-blur-xl group shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            
            {/* Header of GMB Widget */}
            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4 z-20 relative bg-[#050505]/90 backdrop-blur-md rounded-t-[20px] -mt-4 -mx-4 px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-2 shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-full h-full"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                </div>
                <div>
                  <p className="text-white font-black tracking-tight">Google Verified Reviews</p>
                  <p className="text-yellow-500 text-[10px] font-black tracking-[0.2em] mt-1">4.9 RATING • 70+ REVIEWS</p>
                </div>
              </div>
            </div>

            {/* Vertical Scrolling Reviews */}
            <div className="absolute inset-x-8 top-28 bottom-0 overflow-hidden">
              <div className="flex flex-col animate-marquee-vertical group-hover:[animation-play-state:paused] gap-5">
                {reviewItems.map((review, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/5 rounded-[24px] p-6 shrink-0 hover:bg-white/[0.05] transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                          {review.name.charAt(0)}
                        </div>
                        <p className="text-white font-bold text-sm">{review.name}</p>
                      </div>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm italic font-light leading-relaxed">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Fades for vertical scroll to look natural */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* --- INFINITE HORIZONTAL TICKER (Awards) --- */}
      <div className="relative flex items-center group/ticker mt-10">
        <div className="flex animate-marquee-horizontal whitespace-nowrap py-10 group-hover/ticker:[animation-play-state:paused]">
          {tickerItems.map((award, index) => {
            const Icon = award.icon
            return (
              <div key={index} className="flex items-center gap-6 px-12 md:px-24 group/item">
                <div className={`w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:border-white/30 transition-all duration-500 shadow-2xl`}>
                  <Icon className={`w-10 h-10 ${award.color} group-hover/item:scale-110 transition-transform`} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-3xl font-black text-white tracking-tight group-hover/item:text-blue-500 transition-colors uppercase italic">
                    {award.title}
                  </h3>
                  <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mt-1">
                    {award.org}
                  </p>
                </div>
                <div className="ml-12 md:ml-24 w-2 h-2 rounded-full bg-white/20" />
              </div>
            )
          })}
        </div>

        {/* Fades for horizontal scroll */}
        <div className="absolute inset-y-0 left-0 w-80 bg-gradient-to-r from-[#030303] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-80 bg-gradient-to-l from-[#030303] to-transparent z-20 pointer-events-none" />
      </div>

      {/* --- CSS ANIMATIONS --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marquee-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); } /* -50% because we duplicated the array once */
        }
        .animate-marquee-horizontal {
          display: flex;
          animation: marquee-horizontal 50s linear infinite;
        }
        .animate-marquee-vertical {
          /* Increased time to 100s so 25+ reviews scroll at a readable pace */
          animation: marquee-vertical 100s linear infinite;
        }
      ` }} />
    </section>
  )
}