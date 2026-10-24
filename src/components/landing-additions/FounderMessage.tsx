import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Quote, Radio, Mic, Sparkles } from 'lucide-react';
import { FOUNDER_MESSAGE } from '../../data/landingAdditions';

export const FounderMessage: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = (delay: number): Variants => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay },
    },
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80">
          <Sparkles className="w-4 h-4 text-[#881337]" />
          <span>{FOUNDER_MESSAGE.eyebrow}</span>
        </div>

        <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          {FOUNDER_MESSAGE.h2}
        </h2>
      </div>

      {/* Main Grid: Large Quote Card + Media & Talks Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Large Quote Card with Founder Photo */}
        <motion.div
          variants={cardVariants(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="lg:col-span-8 rounded-3xl bg-white border border-slate-200/90 hover:border-rose-200 p-8 sm:p-10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="space-y-6 relative z-10">
            {/* Elegant Sub-eyebrow Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50/70 border border-rose-200/60 text-xs font-mono font-semibold uppercase tracking-wider text-rose-800">
              <Quote className="w-3.5 h-3.5 text-[#881337]" />
              <span>Executive Vision</span>
            </div>

            {/* Main Quote Text - Clean, Professional Editorial Typography */}
            <blockquote className="font-sans text-lg sm:text-xl lg:text-[1.35rem] text-slate-700 leading-relaxed font-normal">
              &ldquo;{FOUNDER_MESSAGE.quote}&rdquo;
            </blockquote>
          </div>

          {/* Founder Attribution Bar with Clean Avatar */}
          <div className="pt-8 mt-8 border-t border-slate-100 flex items-center space-x-4 relative z-10">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-rose-200 shadow-sm shrink-0 bg-slate-100">
              <img
                src={FOUNDER_MESSAGE.photoPath}
                alt={FOUNDER_MESSAGE.photoAlt}
                className="w-full h-full object-cover object-[center_15%]"
              />
            </div>

            <div className="space-y-0.5">
              <div className="font-sans font-semibold text-base sm:text-lg text-slate-900">
                {FOUNDER_MESSAGE.attributionLine1}
              </div>
              <div className="font-sans text-xs sm:text-sm text-slate-500 font-normal">
                {FOUNDER_MESSAGE.attributionLine2}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Media & Talks Sub-Block */}
        <motion.div
          variants={cardVariants(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="lg:col-span-4 rounded-3xl bg-white border border-slate-200/90 hover:border-rose-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6"
        >
          {/* Sub-block 1: In the Media */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[#881337]">
              <Radio className="w-4 h-4 text-[#881337]" />
              <h3 className="font-serif-header font-bold text-base text-slate-900 tracking-tight">
                {FOUNDER_MESSAGE.media.label}
              </h3>
            </div>

            {/* Plain text chips / badges (NO logos per specification) */}
            <div className="flex flex-wrap gap-2 pt-1">
              {FOUNDER_MESSAGE.media.items.map((mediaName) => (
                <span
                  key={mediaName}
                  className="font-sans text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 border border-slate-200/80 shadow-2xs hover:border-rose-200 hover:text-rose-900 transition-colors"
                >
                  {mediaName}
                </span>
              ))}
            </div>

            <p className="font-sans text-xs text-slate-600 leading-relaxed pt-1">
              {FOUNDER_MESSAGE.media.caption}
            </p>
          </div>

          <div className="w-full h-[1px] bg-slate-100" />

          {/* Sub-block 2: Talks & Programmes */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[#881337]">
              <Mic className="w-4 h-4 text-[#881337]" />
              <h3 className="font-serif-header font-bold text-base text-slate-900 tracking-tight">
                {FOUNDER_MESSAGE.talks.label}
              </h3>
            </div>

            <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
              {FOUNDER_MESSAGE.talks.text}
            </p>
          </div>

          <div className="pt-2 text-[11px] font-mono text-slate-400">
            Hackup Leadership Outreach
          </div>
        </motion.div>

      </div>

    </section>
  );
};
