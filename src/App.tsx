import { useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowUpRight, Check, Menu, X, Sparkles, Code2, PenTool, Layers3, Mail, Instagram, Linkedin, Twitter } from 'lucide-react'

const projects = [
  { title: 'Kinetic / Motion systems', tag: 'Digital product', year: '2024', color: 'violet' },
  { title: 'Northstar / Brand direction', tag: 'Identity + web', year: '2024', color: 'blue' },
  { title: 'Orbit / Commerce reimagined', tag: 'E-commerce', year: '2023', color: 'orange' },
]

function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const links = [['/', 'Home'], ['/services', 'Services'], ['/work', 'Work'], ['/about', 'About']]
  return <div className="site-shell">
    <header className="site-header">
      <Link to="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark">Z</span><span>ZARNETIC<span className="brand-dot">.</span></span></Link>
      <nav className={`main-nav ${open ? 'nav-open' : ''}`} aria-label="Primary navigation">
        {links.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => isActive || (to === '/' && location.pathname === '/') ? 'active' : ''}>{label}</NavLink>)}
        <Link className="nav-cta" to="/contact" onClick={() => setOpen(false)}>Start a project <ArrowUpRight size={15} /></Link>
      </nav>
      <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </header>
    {children}
    <footer className="site-footer">
      <div><Link to="/" className="brand"><span className="brand-mark">Z</span><span>ZARNETIC<span className="brand-dot">.</span></span></Link><p className="footer-note">Independent digital studio for brands<br />that want to move culture forward.</p></div>
      <div className="footer-links"><div><span className="eyebrow">Explore</span><Link to="/services">Services</Link><Link to="/work">Selected work</Link><Link to="/about">About us</Link></div><div><span className="eyebrow">Connect</span><a href="mailto:hello@zarnetic.com">Email us</a><a href="#">Instagram</a><a href="#">LinkedIn</a></div></div>
      <div className="footer-bottom"><span>© 2024 Zarnetic Studio</span><span>New York · London · Everywhere</span></div>
    </footer>
  </div>
}

function Home() { return <main>
  <section className="hero section-pad"><div className="hero-kicker"><span className="live-dot" /> Available for select projects · 2024</div><h1>We build brands<br /><em>in motion.</em></h1><div className="hero-bottom"><p className="hero-lede">Zarnetic is an independent digital studio partnering with ambitious people to turn big ideas into cultural moments.</p><Link to="/work" className="circle-link">Explore work <ArrowUpRight size={22} /></Link></div><div className="hero-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><span className="art-word">Z</span><span className="art-caption">Strategy / Design / Technology</span></div></section>
  <section className="intro section-pad"><div className="section-label">01 — What we do</div><div className="intro-copy"><h2>Ideas that <span>travel.</span></h2><p>We create identities, digital experiences, and products that make a lasting impression. No templates. No safe bets. Just thoughtful work with a point of view.</p><Link to="/services" className="text-link">Our capabilities <ArrowUpRight size={17} /></Link></div></section>
  <section className="work-preview section-pad"><div className="section-heading"><div><div className="section-label">02 — Selected work</div><h2>Made to be <em>seen.</em></h2></div><Link to="/work" className="text-link">View all work <ArrowUpRight size={17} /></Link></div><div className="project-grid">{projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}</div></section>
  <section className="statement"><div className="section-label">03 — A different kind of studio</div><h2>Small team.<br /><span>Big energy.</span></h2><Link to="/about" className="circle-link light">Meet the studio <ArrowUpRight size={22} /></Link></section>
</main> }

function ProjectCard({ project, index }: { project: typeof projects[number], index: number }) { return <Link to="/work" className={`project-card ${project.color}`}><div className="project-visual"><span>{index === 0 ? 'K' : index === 1 ? 'N' : 'O'}</span><div className="visual-grid" /></div><div className="project-meta"><div><span>{project.tag}</span><h3>{project.title}</h3></div><span>{project.year} <ArrowUpRight size={16} /></span></div></Link> }

function PageHero({ eyebrow, title, text }: { eyebrow: string, title: React.ReactNode, text: string }) { return <section className="page-hero section-pad"><div className="section-label">{eyebrow}</div><h1>{title}</h1><p>{text}</p></section> }

function Services() { const services = [{ icon: Sparkles, title: 'Brand strategy', text: 'Positioning, verbal identity, and a clear point of view that puts your brand in motion.' }, { icon: PenTool, title: 'Identity & design', text: 'Visual systems with enough flexibility to live everywhere — and enough character to be remembered.' }, { icon: Code2, title: 'Digital experiences', text: 'Websites and products that feel as good as they function, from first click to lasting connection.' }, { icon: Layers3, title: 'Creative technology', text: 'The right tools, thoughtfully applied. We make emerging technology feel human and useful.' }]; return <main><PageHero eyebrow="01 — Capabilities" title={<>The full picture.<br /><em>Not just the pixels.</em></>} text="From the first question to the final launch, we bring strategy, craft, and technology into one focused team." /><section className="service-list section-pad">{services.map((s, i) => <div className="service-row" key={s.title}><span className="service-number">0{i + 1}</span><s.icon size={28} strokeWidth={1.4} /><div><h2>{s.title}</h2><p>{s.text}</p></div><ArrowUpRight className="service-arrow" /></div>)}</section><section className="band-quote"><p>“The best work doesn’t just solve a problem.<br /><em>It changes what people expect.</em>”</p></section></main> }

function Work() { return <main><PageHero eyebrow="02 — Selected work" title={<>Proof of<br /><em>possibility.</em></>} text="A few things we’ve made with people who believe their next chapter can be their best one yet." /><section className="all-projects section-pad">{projects.concat([{ title: 'Good House / A new hospitality', tag: 'Experience + space', year: '2023', color: 'green' as const }]).map((p, i) => <ProjectCard key={p.title} project={p} index={i % 3} />)}</section></main> }

function About() { return <main><PageHero eyebrow="03 — About Zarnetic" title={<>Built for the<br /><em>in-between.</em></>} text="We’re a compact, senior-led studio. Small enough to care about every detail, experienced enough to know which details matter." /><section className="about-grid section-pad"><div className="about-big">20<span>+</span><small>years of combined<br />experience</small></div><div className="about-text"><p className="large-copy">We work with founders, teams, and organizations at moments of change. When the old way isn’t enough and the new way hasn’t been defined yet — that’s where we come in.</p><div className="values"><div><span>01</span><h3>Stay curious</h3></div><div><span>02</span><h3>Make it matter</h3></div><div><span>03</span><h3>Leave it better</h3></div></div></div></section></main> }

function Contact() { const [sent, setSent] = useState(false); return <main><PageHero eyebrow="04 — Start a conversation" title={<>Have a good<br /><em>one for us?</em></>} text="Tell us a little about what you’re building, where you’re going, and what’s getting in the way. We’ll take it from there." /><section className="contact-section section-pad"><div className="contact-copy"><span className="eyebrow">Say hello</span><a className="email-link" href="mailto:hello@zarnetic.com">hello@zarnetic.com</a><p>We typically respond within two business days.</p></div>{sent ? <div className="success-box"><Check size={30} /><h2>Message received.</h2><p>Thanks for reaching out. We’ll be in touch soon.</p></div> : <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true) }}><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@company.com" /></label><label>Tell us about it<textarea required name="message" placeholder="A few words about your project..." rows={4} /></label><button className="submit-button" type="submit">Send inquiry <ArrowUpRight size={18} /></button></form>}</section></main> }

function NotFound() { return <main className="not-found"><span className="eyebrow">404 — Lost in the ether</span><h1>That page<br /><em>drifted away.</em></h1><Link to="/" className="text-link">Back to home <ArrowUpRight size={17} /></Link></main> }

export default function App() { return <BrowserRouter><Layout><Routes><Route path="/" element={<Home />} /><Route path="/services" element={<Services />} /><Route path="/work" element={<Work />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes></Layout></BrowserRouter> }
