'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InfiniteMarqueeProps {
  children: ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteMarquee({
  children,
  direction = 'left',
  speed = 60,
  pauseOnHover = true,
  className,
}: InfiniteMarqueeProps) {
  return (
    <div className={cn('flex overflow-hidden group select-none w-full', className)}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left { animation: marquee-left var(--speed) linear infinite; }
        .animate-marquee-right { animation: marquee-right var(--speed) linear infinite; }
      `}} />
      <div
        className={cn(
          'flex shrink-0 min-w-full justify-around items-center gap-8 px-4',
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={{ '--speed': `${speed}s` } as React.CSSProperties}
      >
        {children}
      </div>
      <div
        className={cn(
          'flex shrink-0 min-w-full justify-around items-center gap-8 px-4',
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={{ '--speed': `${speed}s` } as React.CSSProperties}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}


