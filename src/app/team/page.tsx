'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Users } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { teamMembers } from '@/data/team';

export default function TeamPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': teamMembers.map((member, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Person',
        'name': member.name,
        'jobTitle': member.role,
        'description': member.extendedBio,
        ...(member.linkedin && { 'sameAs': member.linkedin })
      }
    }))
  };

  return (
    <main className="min-h-screen bg-[#030303] text-white pt-32 pb-24 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl space-y-20">
        
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <SectionHeader
            badge="Our People"
            badgeIcon={<Users className="w-4 h-4" />}
            title="The Core Team"
            highlightedWord="Core"
            subtitle="Meet the engineers, designers, legal experts, and strategists driving digital innovation from Delhi to the world."
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-[#0A0A0A] rounded-[32px] p-8 border border-white/5 relative group flex flex-col h-full overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative w-full aspect-square rounded-[24px] overflow-hidden mb-8">
                <Image 
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                {member.linkedin && (
                  <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <Link 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-500 shadow-lg"
                    >
                      <Linkedin className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-semibold font-outfit text-white mb-2">{member.name}</h3>
                <p className="text-blue-400 font-medium mb-4">{member.role}</p>
                <p className="text-white/60 leading-relaxed text-sm flex-1 mb-8">
                  {member.extendedBio}
                </p>
                
                <div className="mt-auto pt-6 border-t border-white/5">
                  <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/50 tracking-wider uppercase">
                    Executive Member
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}
