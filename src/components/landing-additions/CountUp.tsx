import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  duration?: number;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  value,
  prefix = '',
  suffix = '',
  label,
  duration = 1400,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(shouldReduceMotion ? value : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(value);
      return;
    }

    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setCount(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic: 1 - (1 - progress)^3
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeProgress * value));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, duration, shouldReduceMotion]);

  const displayCount = count >= 1000 ? count.toLocaleString() : count;

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span>
        {prefix}
        {displayCount}
        {suffix}
      </span>
      {label && <span className="ml-1 font-sans"> {label}</span>}
    </span>
  );
};
