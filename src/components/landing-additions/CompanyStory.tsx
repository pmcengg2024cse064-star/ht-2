import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { Sparkles, TrendingUp, ArrowUpRight } from 'lucide-react';
import { COMPANY_STORY, TimelineMilestone } from '../../data/landingAdditions';
import { CountUp } from './CountUp';
import { GrowthChart } from './GrowthChart';

export const CompanyStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Filter ONLY verified items per specification
  const verifiedMilestones: TimelineMilestone[] = COMPANY_STORY.milestones.filter(
    (item) => item.verified === true
  );

  // Growth spine scroll-driven progress line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  // Calculate node diameter progressively from 14px to 30px
  const getNodeSize = (idx: number, total: number) => {
    if (total <= 1) return 20;
    return Math.round(14 + (idx / (total - 1)) * 16);
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      
      {/* Scoped Keyframes for Ambient Upward Drifting Burgundy Orbs */}
      <style>{`
        @keyframes floatUpwardOrb {
          0% {
            transform: translateY(0px) scale(1);
            opacity: 0.25;
          }
          50% {
            transform: translateY(-40px) scale(1.08);
            opacity: 0.45;
          }
          100% {
            transform: translateY(0px) scale(1);
            opacity: 0.25;
          }
        }
        .animate-drift-orb-1 {
          animation: floatUpwardOrb 12s ease-in-out infinite;
        }
        .animate-drift-orb-2 {
          animation: floatUpwardOrb 16s ease-in-out infinite 3s;
        }
      `}</style>

      {/* Ambient background soft burgundy glows (skipped if reduced motion) */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#881337]/10 blur-[110px] animate-drift-orb-1" />
          <div className="absolute top-2/3 -right-20 w-96 h-96 rounded-full bg-[#BE123C]/10 blur-[130px] animate-drift-orb-2" />
        </div>
      )}

      {/* 1. Header (Entrance Reveal Pattern matching HomePage) */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-[#881337]" />
          <span>{COMPANY_STORY.eyebrow}</span>
        </div>

        <h2 className="font-serif-header font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
          The Story of{' '}
          <span className="text-[#881337] glossy-burgundy-text">Hackup Technology</span>
        </h2>

        <p className="font-sans text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {COMPANY_STORY.intro}
        </p>
      </div>

      {/* 2. Timeline with Interactive Growth Spine */}
      <div ref={containerRef} className="relative pb-10">
        
        {/* The Vertical Growth Spine */}
        {/* Desktop: Centered at 50%. Mobile: Left-aligned at 24px (left-6) */}
        <div className="absolute top-4 bottom-24 left-6 md:left-1/2 -translate-x-1/2 w-[3px]">
          {/* Base Muted Track */}
          <div className="w-full h-full bg-slate-200/90 rounded-full" />

          {/* Animated Burgundy Fill Overlay */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#881337] via-[#BE123C] to-[#E11D48] rounded-full origin-top"
            style={{
              height: '100%',
              scaleY: shouldReduceMotion ? 1 : smoothProgress,
            }}
          />
        </div>

        {/* Milestones List */}
        <div className="space-y-12 sm:space-y-16">
          {verifiedMilestones.map((milestone, idx) => {
            const isEven = idx % 2 === 0;
            const nodeSize = getNodeSize(idx, verifiedMilestones.length);
            const isLast = idx === verifiedMilestones.length - 1;

            return (
              <div
                key={milestone.year}
                className="relative flex flex-col md:flex-row items-start md:items-center w-full"
              >
                
                {/* Node on Spine (Centered on Desktop, Left-Aligned on Mobile) */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                  <motion.div
                    initial={shouldReduceMotion ? { scale: 1 } : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 300, damping: 20 }
                    }
                    style={{ width: `${nodeSize}px`, height: `${nodeSize}px` }}
                    className="relative rounded-full bg-gradient-to-tr from-[#5B0E1B] via-[#881337] to-[#BE123C] border-2 border-white shadow-md flex items-center justify-center"
                  >
                    {/* Inner glowing center */}
                    <div className="w-2 h-2 rounded-full bg-white" />

                    {/* One-time ripple expansion (non-reduced-motion) */}
                    {!shouldReduceMotion && (
                      <span className="absolute inset-0 rounded-full bg-[#881337] opacity-40 animate-ping pointer-events-none" />
                    )}

                    {/* Subtle pulse on the latest milestone */}
                    {isLast && !shouldReduceMotion && (
                      <span className="absolute -inset-1.5 rounded-full border border-rose-500/60 animate-pulse pointer-events-none" />
                    )}
                  </motion.div>
                </div>

                {/* Milestone Card Container */}
                <div
                  className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                    isEven ? 'md:pr-14 md:text-right' : 'md:pl-14 md:ml-auto md:text-left'
                  }`}
                >
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: isEven ? -48 : 48, y: 16 }
                    }
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }
                    }
                    className="group relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 hover:border-rose-300 p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Desktop Connector Line from Spine to Card */}
                    <div
                      className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[1.5px] bg-gradient-to-r ${
                        isEven
                          ? 'right-[-56px] w-[56px] from-slate-200 to-[#881337]'
                          : 'left-[-56px] w-[56px] from-[#881337] to-slate-200'
                      }`}
                    />

                    {/* Card Content Header: Year Numeral */}
                    <div
                      className={`flex items-center gap-3 mb-2 ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      }`}
                    >
                      <span className="font-serif-header font-black text-2xl sm:text-3xl text-[#881337] tracking-tight">
                        {milestone.year}
                      </span>
                    </div>

                    {/* Milestone Title (H3 per specification) */}
                    <h3 className="font-serif-header font-bold text-base sm:text-lg text-slate-900 group-hover:text-[#881337] transition-colors mb-2">
                      {milestone.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {milestone.description}
                    </p>

                    {/* Metric Chip (If present on verified milestone) */}
                    {milestone.metric && (
                      <div
                        className={`pt-4 mt-4 border-t border-rose-100/80 flex items-center ${
                          isEven ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-xs font-mono font-bold text-[#881337] shadow-xs">
                          <TrendingUp className="w-3.5 h-3.5 text-[#881337] shrink-0" />
                          <CountUp
                            value={milestone.metric.value}
                            prefix={milestone.metric.prefix}
                            suffix={milestone.metric.suffix}
                            label={milestone.metric.label}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>

              </div>
            );
          })}
        </div>

        {/* 3. Closing Microcopy & Final Glowing Node */}
        <div className="relative pt-12 text-center flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#5B0E1B] to-[#881337] text-white flex items-center justify-center shadow-lg shadow-rose-950/20 mb-3 border-2 border-white">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <p className="font-serif-header font-bold text-sm sm:text-base text-slate-800 tracking-wide">
            {COMPANY_STORY.closingMicrocopy}
          </p>
        </div>

      </div>

      {/* 4. Growth At A Glance Panel */}
      <GrowthChart />

    </section>
  );
};
