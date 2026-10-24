import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Target, Eye, Sparkles } from 'lucide-react';
import { MISSION_VISION } from '../../data/landingAdditions';

export const MissionVision: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = (delay: number): Variants => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
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
        <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-[#881337]" />
          <span>{MISSION_VISION.eyebrow}</span>
        </div>

        <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          {MISSION_VISION.h2}
        </h2>
      </div>

      {/* Two Side-by-Side Cards (Stacked on Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Mission Card */}
        <motion.div
          variants={cardVariants(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="group rounded-3xl bg-white border-2 border-rose-200/90 hover:border-[#881337] p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
        >
          <div className="space-y-5">
            {/* Icon Badge */}
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#881337] group-hover:scale-105 group-hover:bg-[#881337] group-hover:text-white transition-all duration-300 shadow-sm">
              <Target className="w-7 h-7 transition-colors" />
            </div>

            {/* Title (H3 per specification) */}
            <h3 className="font-serif-header font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-[#881337] transition-colors tracking-tight">
              Our Mission
            </h3>

            {/* Mission Copy */}
            <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {MISSION_VISION.mission}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-rose-100 flex items-center justify-between">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Core Objective
            </span>
            <span className="w-2 h-2 rounded-full bg-[#881337]" />
          </div>
        </motion.div>

        {/* Vision Card */}
        <motion.div
          variants={cardVariants(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="group rounded-3xl bg-white border-2 border-rose-200/90 hover:border-[#881337] p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
        >
          <div className="space-y-5">
            {/* Icon Badge */}
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#881337] group-hover:scale-105 group-hover:bg-[#881337] group-hover:text-white transition-all duration-300 shadow-sm">
              <Eye className="w-7 h-7 transition-colors" />
            </div>

            {/* Title (H3 per specification) */}
            <h3 className="font-serif-header font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-[#881337] transition-colors tracking-tight">
              Our Vision
            </h3>

            {/* Vision Copy */}
            <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {MISSION_VISION.vision}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-rose-100 flex items-center justify-between">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Long-Term Horizon
            </span>
            <span className="w-2 h-2 rounded-full bg-[#881337]" />
          </div>
        </motion.div>

      </div>

    </section>
  );
};
