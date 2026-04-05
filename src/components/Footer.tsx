'use client'

// 1. Logo import
import Logo from '../assets/zarnetic logo.png'

// TypeScript Interface
interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
}

export function Footer() {
  const techStack = [
    'React & Next.js', 'TypeScript', 'Node.js', 'Python',
    'AWS & Azure', 'Docker & Kubernetes', 'PostgreSQL', 'MongoDB',
    'GraphQL', 'Terraform', 'CI/CD Pipelines'
  ]

  // ERROR FIXED HERE: Pehle unknown phir StaticImageData
  // Isse TypeScript ka "overlap" wala error khatam ho jata hai
  const logoSrc = (Logo as unknown as StaticImageData)?.src || (Logo as string);

  return (
    <footer className="relative py-28 bg-[#030303] text-white overflow-hidden border-t border-white/5 font-sans">
      {/* Background Mesh Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-12 gap-y-16 lg:gap-20">
          
          {/* --- LEFT COLUMN: BRAND & ADDRESS --- */}
          <div className="col-span-12 lg:col-span-5">
            <div className="flex flex-col gap-10">
              
              {/* --- LOGO IMAGE --- */}
              <div className="relative group w-fit cursor-pointer">
                <div className="absolute -inset-4 bg-white/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
                
                <div className="relative bg-white rounded-2xl p-2 shadow-xl transition-transform group-hover:scale-105">
                  <img 
                    src={logoSrc} 
                    alt="Zarnetic Logo"
                    className="w-64 h-auto object-contain" 
                  />
                </div>
              </div>

              {/* Office Address Section */}
              <div className="space-y-6 text-gray-400 font-light">
                <div className="flex items-start gap-4 group">
                  <div className="mt-1.5 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-red-500/50 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="leading-relaxed text-sm lg:text-base">
                    <span className="text-white font-bold block mb-1 uppercase tracking-widest text-[10px]">Corp Office</span>
                    430 2nd Floor Sant Nagar East of Kailash,<br /> New Delhi 110065
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-emerald-500/50 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="font-medium text-sm">
                    <a href="tel:+917860572173" className="hover:text-white transition-colors">+91-7860572173</a>, 
                    <a href="tel:+919999372092" className="hover:text-white transition-colors ml-2">+91-9999372092</a>
                  </div>
                </div>
              </div>

              {/* Contact Icons */}
              <div className="flex items-center flex-wrap gap-4 pt-4">
                {[
                  { name: 'FB', link: 'https://www.facebook.com/share/1AvVWEx2Ei/', color: 'hover:bg-[#1877F2]', path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                  { name: 'IG', link: 'https://www.instagram.com/zarnetic?igsh=MTkwbjVwcGNsanhpNA==', isInsta: true },
                  { name: 'LN', link: 'https://www.linkedin.com/company/zarnetic/', color: 'hover:bg-[#0077B5]', path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                  { name: 'WA', link: 'https://wa.me/917860572173', color: 'hover:bg-[#25D366]', path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72 0.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.894-5.338 11.896-11.898 0-3.182-1.24-6.171-3.481-8.413z" },
                  { name: 'Mail', link: 'mailto:zarnetic@gmail.com', color: 'hover:bg-white', isMail: true }
                ].map((social) => (
                  <a 
                    key={social.name}
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`w-11 h-11 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-500 overflow-hidden group/social ${social.color}`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" className={`relative z-10 transition-transform duration-500 group-hover/social:scale-110 ${social.isMail ? 'text-white group-hover/social:text-black' : 'fill-white'}`}>
                      {social.isInsta ? (
                        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </g>
                      ) : social.isMail ? (
                        <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </g>
                      ) : (
                        <path fill="currentColor" d={social.path} />
                      )}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="col-span-12 lg:col-span-7">
            <div className="relative p-8 lg:p-12 rounded-[32px] bg-white/[0.02] border border-white/5 backdrop-blur-3xl group">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-12">
                  <div className="h-[1px] w-8 bg-red-500" />
                  <h4 className="text-xs font-black tracking-[0.4em] text-red-500 uppercase">Our Tech Expertise</h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-6">
                  {techStack.map((tool) => (
                    <div key={tool} className="group/item flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover/item:bg-red-500 group-hover/item:scale-150 transition-all duration-300" />
                      <span className="text-gray-400 group-hover/item:text-white transition-colors duration-300 font-medium text-sm">
                        {tool}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-gray-500">
          <div className="tracking-[0.1em] uppercase text-[10px]">
            © 2026 <span className="text-white font-black">ZARNETIC</span>. 
            <span className="ml-3 opacity-40 italic">Architecting Digital Futures.</span>
          </div>
          <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Operational Globally</span>
          </div>
        </div>
      </div>
    </footer>
  )
}