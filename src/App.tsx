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
  
  // ==========================================
  // DIRECT URL LOAD HANDLER (Direct link fix)
  // ==========================================
  useEffect(() => {
    const currentPath = window.location.pathname;
    
    // Agar URL '/' nahi hai (jaise '/about' ya '/contact' hai)
    if (currentPath !== '/' && currentPath.length > 1) {
      // '/' ko hata kar target id nikalo ('about')
      const targetId = currentPath.substring(1); 
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Halka sa delay taaki DOM render ho jaye, uske baad seedha us section par scroll kardo
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'instant' });
        }, 100);
      }
    }
  }, []); // Empty array ka matlab ye sirf initial page load par chalega

  // ==========================================
  // SCROLL OBSERVER - URL CHANGING LOGIC
  // ==========================================
  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // Jab koi section screen ke middle mein aata hai
        if (entry.isIntersecting) {
          const id = entry.target.id;
          
          // Agar hero (top) section hai toh URL '/', nahi toh '/section-name'
          const path = id === 'hero' ? '/' : `/${id}`;
          
          // URL update karo bina history kharab kiye (replaceState)
          if (window.location.pathname !== path) {
            window.history.replaceState(null, '', path);
          }
        }
      });
    };

    // Observer setup: Trigger when a section crosses the middle of the viewport
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '-50% 0px -50% 0px', 
      threshold: 0,
    });

    // Saare <section> tags ko observe karo jinke paas 'id' hai
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    // Cleanup function
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ overflow: 'visible' }}>
      <main className="relative" role="main" style={{ overflow: 'visible' }}>
        <section id="hero" aria-label="Hero section">
          <Hero />
        </section>
        <section id="portfolio" aria-label="Portfolio section">
          <Portfolio />
        </section>
        <section id="awards" aria-label="Awards section">
          <Awards />
        </section>
        <section id="about" aria-label="About section">
          <About />
        </section>
        <section id="services" aria-label="Services section">
          <Services />
        </section>
        <section id="team" aria-label="Team section" style={{ overflow: 'visible', height: 'auto', minHeight: '0', maxHeight: 'none' }}>
          <Team />
        </section>
        <section id="contact" aria-label="Contact section">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  )
}