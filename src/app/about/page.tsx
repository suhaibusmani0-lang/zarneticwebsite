import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Building, Briefcase, Globe2, Clock, Lightbulb, Heart, Target, ShieldCheck } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { GlassmorphicCard } from '@/components/shared/GlassmorphicCard';
import { TextReveal } from '@/components/shared/TextReveal';
import { ProcessTimeline } from '@/components/about/ProcessTimeline';
import { teamMembers } from '@/data/team';

export const metadata: Metadata = {
  title: 'About Zarnetic | Our Story, Mission & Process | Digital Agency Delhi',
  description: 'Learn about Zarnetic — a premium digital agency in Delhi delivering 150+ projects globally. Our battle-tested methodology combines engineering excellence with legal compliance.',
  alternates: {
    canonical: 'https://zarnetic.com/about',
  },
};

export default function AboutPage() {
  const values = [
    {
      title: 'Innovation First',
      description: "We don't just follow trends; we set them. Our engineering culture encourages bold ideas and cutting-edge solutions.",
      icon: Lightbulb,
      color: 'text-blue-500',
    },
    {
      title: 'Radical Transparency',
      description: 'No hidden fees, no opaque processes. We believe in complete transparency from the first line of code to production deployment.',
      icon: Heart,
      color: 'text-emerald-500',
    },
    {
      title: 'Engineering Excellence',
      description: 'We write clean, performant, and maintainable code. Our architectures are built to scale seamlessly from day one.',
      icon: Target,
      color: 'text-orange-500',
    },
    {
      title: 'Security by Design',
      description: 'Security is not an afterthought. It is woven into every layer of our applications, protecting your data and users.',
      icon: ShieldCheck,
      color: 'text-purple-500',
    }
  ];

  return (
    <main className="min-h-screen bg-[#030303] text-white pt-32 pb-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl space-y-32">
        
        {/* 1. Hero Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <TextReveal text="Architecting Digital Futures Since Day One" className="text-5xl md:text-7xl font-bold font-outfit tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/40" />
          <p className="text-xl text-white/60 leading-relaxed">
            We are a collective of engineers, designers, and strategists obsessed with crafting digital masterpieces. From Delhi to the world, we transform complex problems into elegant solutions.
          </p>
        </section>

        {/* 2. Company Story */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <SectionHeader
              badge="Our Story"
              badgeIcon={<Building className="w-4 h-4" />}
              title="Built on the Foundation of Excellence"
              highlightedWord="Foundation"
            />
            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                Founded in the vibrant heart of Delhi, Zarnetic was born from a simple observation: the gap between brilliant business ideas and flawless digital execution.
              </p>
              <p>
                We realized that true digital transformation requires more than just writing code. It demands a symphony of strategic foresight, design thinking, and robust engineering.
              </p>
              <p>
                Today, we partner with visionaries across the globe, delivering scalable architectures and immersive user experiences that drive measurable impact.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <GlassmorphicCard className="p-8 text-center flex flex-col items-center justify-center space-y-2 border border-white/5 rounded-[32px] bg-[#0A0A0A]">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter target="150" label="+" />
              </div>
              <p className="text-white/60 font-medium">Projects Delivered</p>
              <Briefcase className="w-6 h-6 text-blue-500 mt-4 opacity-50" />
            </GlassmorphicCard>
            <GlassmorphicCard className="p-8 text-center flex flex-col items-center justify-center space-y-2 border border-white/5 rounded-[32px] bg-[#0A0A0A]">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter target="6" label="+" />
              </div>
              <p className="text-white/60 font-medium">Countries Reached</p>
              <Globe2 className="w-6 h-6 text-emerald-500 mt-4 opacity-50" />
            </GlassmorphicCard>
            <GlassmorphicCard className="p-8 text-center flex flex-col items-center justify-center space-y-2 border border-white/5 rounded-[32px] bg-[#0A0A0A]">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter target="500" label="+" />
              </div>
              <p className="text-white/60 font-medium">Happy Clients</p>
              <Heart className="w-6 h-6 text-pink-500 mt-4 opacity-50" />
            </GlassmorphicCard>
            <GlassmorphicCard className="p-8 text-center flex flex-col items-center justify-center space-y-2 border border-white/5 rounded-[32px] bg-[#0A0A0A]">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter target="3" label="+" />
              </div>
              <p className="text-white/60 font-medium">Years of Excellence</p>
              <Clock className="w-6 h-6 text-orange-500 mt-4 opacity-50" />
            </GlassmorphicCard>
          </div>
        </section>

        {/* 3. Process Timeline */}
        <section className="space-y-16">
          <div className="text-center">
            <SectionHeader
              badge="Methodology"
              badgeIcon={<Sparkles className="w-4 h-4" />}
              title="The Zarnetic Process"
              highlightedWord="Zarnetic"
              subtitle="Our battle-tested methodology ensures predictability, quality, and rapid time-to-market."
            />
          </div>
          <ProcessTimeline />
        </section>

        {/* 4. Values Grid */}
        <section className="space-y-16">
          <div className="text-center">
            <SectionHeader
              badge="Core Principles"
              badgeIcon={<Target className="w-4 h-4" />}
              title="What Drives Us Forward"
              highlightedWord="Drives"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, idx) => (
              <GlassmorphicCard key={idx} hoverEffect className="p-8 md:p-10 border border-white/5 rounded-[32px] bg-[#0A0A0A]">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                  <value.icon className={`w-7 h-7 ${value.color}`} />
                </div>
                <h3 className="text-2xl font-semibold font-outfit text-white mb-4">{value.title}</h3>
                <p className="text-white/60 leading-relaxed text-lg">{value.description}</p>
              </GlassmorphicCard>
            ))}
          </div>
        </section>

        {/* 5. Team Preview */}
        <section className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <SectionHeader
              badge="The Minds"
              badgeIcon={<Building className="w-4 h-4" />}
              title="Meet Our Experts"
              highlightedWord="Experts"
              subtitle="The brilliant minds behind our digital masterpieces."
            />
            <Link 
              href="/team"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group pb-4"
            >
              <span className="font-medium">Meet the Full Team</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.slice(0, 3).map((member) => (
              <GlassmorphicCard key={member.slug} hoverEffect className="p-6 border border-white/5 rounded-[32px] bg-[#0A0A0A] flex flex-col items-center text-center">
                <div className="w-32 h-32 relative mb-6 rounded-full overflow-hidden border-4 border-white/5">
                  <Image 
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold font-outfit text-white mb-1">{member.name}</h3>
                <p className="text-blue-400 text-sm font-medium mb-4">{member.role}</p>
                <p className="text-white/60 text-sm line-clamp-3">{member.description}</p>
              </GlassmorphicCard>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
