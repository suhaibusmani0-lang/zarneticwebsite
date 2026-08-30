export interface Award {
  title: string
  organization: string
  icon: string
  colorClass: string
}

export const awards: Award[] = [
  { title: 'Top Rated IT Agency', organization: 'Clutch 2024', icon: 'Trophy', colorClass: 'text-orange-500' },
  { title: 'ISO 27001 Certified', organization: 'Data Security Standard', icon: 'ShieldCheck', colorClass: 'text-blue-500' },
  { title: 'Global NGO Consultant', organization: '100+ Registrations', icon: 'Globe', colorClass: 'text-emerald-500' },
  { title: 'Next-Gen Software Award', organization: 'Tech Excellence 2025', icon: 'Zap', colorClass: 'text-purple-500' },
  { title: 'Elite Startup Partner', organization: 'Startup India Circle', icon: 'Briefcase', colorClass: 'text-blue-400' },
  { title: 'Trusted by 500+ Clients', organization: 'Worldwide Recognition', icon: 'Users', colorClass: 'text-pink-500' },
]

