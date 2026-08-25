import { motion } from 'framer-motion'
import { ArrowUpRight, Check, MapPin, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const navItems = [
  ['Services', 'services'],
  ['Our work', 'portfolio'],
  ['About us', 'about'],
  ['Team', 'team'],
  ['Contact', 'contact'],
]

export function Hero() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    window.history.pushState(null, '', id === 'hero' ? '/' : `/${id}`)
    setIsMobileMenuOpen(false)
  }

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[#07111f] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(36,125,255,.25),transparent_32%),linear-gradient(135deg,#07111f_0%,#0b1b31_50%,#07111f_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:72px_72px]" />

      <nav className={`fixed left-0 right-0 top-0 z-50 transition-all ${isScrolled ? 'border-b border-white/10 bg-[#07111f]/90 backdrop-blur-xl' : ''}`} aria-label="Main navigation">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <button onClick={() => goTo('hero')} className="flex items-center gap-3" aria-label="Go to homepage">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#2f8cff] text-sm font-black italic">M</span>
            <span className="text-lg font-bold tracking-tight">Mahira Digital</span>
          </button>
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map(([label, id]) => <button key={id} onClick={() => goTo(id)} className="text-sm text-white/75 transition hover:text-white">{label}</button>)}
          </div>
          <button onClick={() => goTo('contact')} className="hidden items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#07111f] transition hover:bg-[#b9dcff] sm:flex">Get a free consultation <ArrowUpRight size={16} /></button>
          <button className="rounded-full border border-white/20 p-2 md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">{isMobileMenuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </nav>

      {isMobileMenuOpen && <div className="fixed inset-0 z-40 bg-[#07111f] px-6 pt-28 md:hidden"><div className="flex flex-col gap-6">{navItems.map(([label, id]) => <button key={id} onClick={() => goTo(id)} className="text-left text-3xl font-semibold">{label}</button>)}<button onClick={() => goTo('contact')} className="mt-3 w-fit rounded-full bg-white px-5 py-3 font-semibold text-[#07111f]">Get a free consultation</button></div></div>}

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-20 pt-32 lg:px-10">
        <div className="grid w-full items-end gap-14 lg:grid-cols-[1.08fr_.92fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <div className="mb-7 flex items-center gap-2 text-sm font-medium text-[#83bcff]"><MapPin size={16} /> New Delhi · Serving businesses across India</div>
            <h1 className="max-w-3xl text-balance text-5xl font-bold leading-[1.02] tracking-[-.055em] sm:text-6xl lg:text-7xl xl:text-[6.2rem]">Digital growth that makes your business <span className="text-[#72b4ff]">impossible to ignore.</span></h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/65">Mahira Digital is a performance-led digital marketing agency in Delhi helping ambitious businesses get found, trusted and chosen.</p>
            <div className="mt-9 flex flex-wrap gap-4"><button onClick={() => goTo('contact')} className="flex items-center gap-2 rounded-full bg-[#2f8cff] px-6 py-4 font-semibold transition hover:bg-[#5ba5ff]">Start growing today <ArrowUpRight size={18} /></button><button onClick={() => goTo('portfolio')} className="rounded-full border border-white/20 px-6 py-4 font-semibold text-white/80 transition hover:border-white/50 hover:text-white">See our work</button></div>
            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/55">{['SEO that compounds', 'Websites built to convert', 'Transparent partnerships'].map(item => <span key={item} className="flex items-center gap-2"><Check size={15} className="text-[#72b4ff]" />{item}</span>)}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }} className="relative hidden min-h-[480px] lg:block">
            <div className="absolute right-2 top-4 h-[390px] w-[390px] rounded-full border border-[#72b4ff]/25" /><div className="absolute right-20 top-20 h-[270px] w-[270px] rounded-full border border-[#72b4ff]/20" />
            <div className="absolute right-0 top-32 w-[330px] rounded-3xl border border-white/15 bg-white/[.08] p-6 shadow-2xl backdrop-blur-xl"><p className="text-sm text-white/55">Your growth dashboard</p><div className="mt-8 flex items-end gap-3"><span className="text-6xl font-semibold tracking-tight">4.9</span><span className="pb-2 text-amber-300">★★★★★</span></div><p className="mt-1 text-sm text-white/60">235 Google reviews</p><div className="mt-8 h-24 rounded-xl bg-[linear-gradient(135deg,rgba(114,180,255,.3),rgba(47,140,255,.04))] p-3"><div className="flex h-full items-end gap-2">{[30,44,38,56,65,72,88,82,100].map((height, index) => <span key={index} className="flex-1 rounded-t bg-[#72b4ff]" style={{ height: `${height}%` }} />)}</div></div><div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm"><span className="text-white/55">Organic visibility</span><span className="font-semibold text-[#8bc3ff]">+184%</span></div></div>
            <div className="absolute bottom-3 left-4 rounded-2xl border border-white/15 bg-[#102641] p-5 shadow-xl"><p className="text-3xl font-semibold">10+ years</p><p className="mt-1 text-sm text-white/55">building brands that grow</p></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
