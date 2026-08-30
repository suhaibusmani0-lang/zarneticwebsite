import { Metadata } from 'next';
import { Clock, Globe2, MapPin, Phone, Mail, MessageSquare, ShieldCheck, CreditCard } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { GlassmorphicCard } from '@/components/shared/GlassmorphicCard';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Contact Zarnetic | Get Your Free Consultation Today | Delhi',
  description: 'Contact Zarnetic for web development, SEO, digital marketing, software engineering, and legal compliance services. Response within 24 hours. Office: Okhla, Delhi.',
  alternates: {
    canonical: 'https://zarnetic.com/contact',
  },
};

export default function ContactPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': company.name,
    'image': 'https://zarnetic.com/logo.png',
    '@id': 'https://zarnetic.com',
    'url': 'https://zarnetic.com',
    'telephone': company.phone,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': company.address.street,
      'addressLocality': company.address.locality,
      'addressRegion': company.address.region,
      'postalCode': company.address.postalCode,
      'addressCountry': company.address.country
    }
  };

  return (
    <main className="min-h-screen bg-[#030303] text-white pt-32 pb-24 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* 1. Hero Section */}
        <div className="text-center space-y-6 max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold font-outfit tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/40">
            Let's Connect.
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            Ready to transform your vision into a Digital Masterpiece?
          </p>
          
          {/* 2. Quick Info Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-6 py-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Within 24 Hours</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-6 py-2">
              <Globe2 className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium">Delhi | USA | Global</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Right Column: Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 4. Contact Info Grid */}
            <div className="grid gap-4">
              <GlassmorphicCard className="p-6 border border-white/5 rounded-[24px] bg-[#0A0A0A] flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Expert Consultation</h3>
                  <p className="text-sm text-white/60 leading-relaxed">Discuss your project requirements directly with our senior architects and strategists.</p>
                </div>
              </GlassmorphicCard>

              <GlassmorphicCard className="p-6 border border-white/5 rounded-[24px] bg-[#0A0A0A] flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <CreditCard className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Transparent Pricing</h3>
                  <p className="text-sm text-white/60 leading-relaxed">Clear, upfront estimates based on scope, with no hidden costs or surprise fees.</p>
                </div>
              </GlassmorphicCard>

              <GlassmorphicCard className="p-6 border border-white/5 rounded-[24px] bg-[#0A0A0A] flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Security First</h3>
                  <p className="text-sm text-white/60 leading-relaxed">All communications are strictly confidential. We sign NDAs before discussing proprietary concepts.</p>
                </div>
              </GlassmorphicCard>
            </div>

            {/* 5. Office Info */}
            <div className="bg-[#0A0A0A] rounded-[32px] p-8 border border-white/5">
              <h3 className="text-xl font-semibold font-outfit text-white mb-6">Direct Contact</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-white/40 shrink-0 mt-1" />
                  <div className="text-white/70 leading-relaxed">
                    <p className="font-medium text-white mb-1">Headquarters</p>
                    {company.address.full}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-white/40 shrink-0" />
                  <a href={`tel:${company.phone[0]}`} className="text-white/70 hover:text-white transition-colors">
                    {company.phone[0]}
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-white/40 shrink-0" />
                  <a href={`mailto:${company.email}`} className="text-white/70 hover:text-white transition-colors">
                    {company.email}
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
