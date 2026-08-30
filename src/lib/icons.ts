import { Scale, Code, Cloud, ShieldCheck, Database, Trophy, Globe, Zap, Briefcase, Users, Search, Cpu, Code2, Rocket, ArrowUpRight, ArrowRight, MessageCircle, CheckCircle2, Star, Sparkles, Server } from 'lucide-react'

const iconMap: Record<string, React.ComponentType<any>> = { 
  Scale, Code, Cloud, ShieldCheck, Database, Trophy, Globe, Zap, Briefcase, Users, Search, Cpu, Code2, Rocket, ArrowUpRight, ArrowRight, MessageCircle, CheckCircle2, Star, Sparkles, Server 
}

export function getIcon(name: string) { 
  return iconMap[name] || Zap 
}
