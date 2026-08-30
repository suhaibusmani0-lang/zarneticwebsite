'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  target: string | number;
  label: string;
}

export function AnimatedCounter({ target, label }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  const targetStr = String(target);
  const numMatch = targetStr.match(/\d+/);
  const targetNum = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = targetStr.replace(/\d+/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || targetNum === 0) return;

    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function: easeOutQuart
      const easeProgress = 1 - Math.pow(1 - percentage, 4);
      
      setCount(Math.floor(easeProgress * targetNum));

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, targetNum]);

  return (
    <div ref={elementRef} className="flex flex-col items-center">
      <div className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
        {count}{suffix}
      </div>
      <div className="text-sm uppercase tracking-widest text-gray-400 font-medium">
        {label}
      </div>
    </div>
  );
}



