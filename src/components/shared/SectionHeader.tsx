import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: ReactNode;
  title: string;
  highlightedWord?: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({
  badge,
  badgeIcon,
  title,
  highlightedWord,
  subtitle,
  className,
}: SectionHeaderProps) {
  const parts = highlightedWord ? title.split(highlightedWord) : [title];
  
  return (
    <div className={cn('text-center max-w-4xl mx-auto mb-16', className)}>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
        {badgeIcon && <span className="text-blue-500">{badgeIcon}</span>}
        <span className="text-sm font-medium text-gray-300 uppercase tracking-wider">{badge}</span>
      </div>
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < parts.length - 1 && (
              <span className="text-gray-600">{highlightedWord}</span>
            )}
          </span>
        ))}
      </h2>
      
      {subtitle && (
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}



