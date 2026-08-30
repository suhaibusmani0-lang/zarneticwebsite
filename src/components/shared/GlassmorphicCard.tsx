import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassmorphicCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassmorphicCard({
  children,
  className,
  hoverEffect = true,
}: GlassmorphicCardProps) {
  return (
    <div
      className={cn(
        'bg-[#080808] border border-white/5 rounded-[32px] overflow-hidden',
        hoverEffect && 'transition-all duration-500 ease-out hover:-translate-y-2 hover:border-white/10 hover:shadow-[0_8px_30px_rgb(255,255,255,0.04)] transition-luxury',
        className
      )}
    >
      {children}
    </div>
  );
}



