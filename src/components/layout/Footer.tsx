import Link from 'next/link';
import Image from 'next/image';
import { company } from '@/data/company';
import { services } from '@/data/services';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#030303] pt-32 pb-12 w-full border-t border-white/[0.02] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF2020]/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Zarnetic"
                width={200}
                height={60}
                className="h-12 w-auto bg-white p-2.5 rounded-lg"
              />
            </Link>
            <p className="text-xl md:text-2xl font-outfit font-light text-gray-400 max-w-md leading-relaxed">
              We architect resilient, high-performance digital ecosystems for global enterprises.
            </p>
            
            <div className="flex gap-4">
              <a href={`mailto:${company.email}`} className="px-6 py-3 rounded-full border border-white/10 hover:border-[#FF2020] hover:text-[#FF2020] text-sm font-space uppercase tracking-widest transition-all">
                Email Us
              </a>
              <a href={`https://wa.me/${company.whatsapp}`} className="px-6 py-3 rounded-full border border-white/10 hover:border-[#FF2020] hover:text-[#FF2020] text-sm font-space uppercase tracking-widest transition-all">
                WhatsApp
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div>
              <h4 className="text-white font-space font-bold uppercase tracking-widest mb-8 text-sm">Services</h4>
              <ul className="space-y-4">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-gray-400 hover:text-[#FF2020] transition-colors font-outfit"
                    >
                      {service.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-space font-bold uppercase tracking-widest mb-8 text-sm">Company</h4>
              <ul className="space-y-4">
                {['About', 'Portfolio', 'Team', 'Blog', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-[#FF2020] transition-colors font-outfit"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-space font-bold uppercase tracking-widest mb-8 text-sm">Connect</h4>
              <div className="flex flex-wrap gap-4">
                <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all text-gray-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                </a>
                <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#E4405F] hover:border-[#E4405F] hover:text-white transition-all text-gray-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all text-gray-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 pt-8 border-t border-white/5 font-outfit">
          <p>© {new Date().getFullYear()} ZARNETIC. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0 space-x-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-space font-bold tracking-widest uppercase text-gray-400">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

