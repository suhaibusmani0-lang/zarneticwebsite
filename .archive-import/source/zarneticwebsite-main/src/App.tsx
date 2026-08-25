import { useEffect } from 'react'
import { Hero } from './components/Hero'
import { Portfolio } from './components/Portfolio'
import { Awards } from './components/Awards'
import { About } from './components/About'
import { Services } from './components/Services'
import { Team } from './components/Team'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  useEffect(() => {
    const path = window.location.pathname.replace(/^\/+/, '')
    if (!path || path.includes('.')) return

    const target = document.getElementById(path)
    if (!target) return

    const frame = window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'auto', block: 'start' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-black focus:shadow-2xl"
      >
        Skip to main content
      </a>

      <main id="main-content" className="relative" aria-label="Zarnetic digital agency website">
        <section id="hero" aria-label="Zarnetic digital agency hero">
          <Hero />
        </section>
        <section id="portfolio" aria-label="Selected Zarnetic projects">
          <Portfolio />
        </section>
        <section id="awards" aria-label="Zarnetic awards and recognition">
          <Awards />
        </section>
        <section id="about" aria-label="About Zarnetic">
          <About />
        </section>
        <section id="services" aria-label="Zarnetic services">
          <Services />
        </section>
        <section id="team" aria-label="Zarnetic core team">
          <Team />
        </section>
        <section id="contact" aria-label="Contact Zarnetic">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  )
}
