import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BackToTop: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercentage(Math.round(scrollProgress));
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-4 sm:right-6 z-40"
        >
          <button
            onClick={scrollToTop}
            className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-rose-200 shadow-xl hover:shadow-2xl hover:border-[#881337] hover:bg-rose-50/80 transition-all cursor-pointer overflow-hidden backdrop-blur-xl"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            {/* Circular Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 p-1" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="transition-all duration-150"
                strokeDasharray={`${scrollPercentage}, 100`}
                strokeWidth="2.5"
                strokeLinecap="round"
                stroke="#881337"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>

            <ArrowUp 
              className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:-translate-y-0.5 transition-transform relative z-10" 
              style={{ color: '#881337' }}
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
