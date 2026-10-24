import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { COMPANY_STORY } from '../../data/landingAdditions';

export const GrowthChart: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { charts } = COMPANY_STORY;

  // Chart A: Colleges reached (2014: 10, 2018: 50, 2020: 100)
  // ViewBox: 0 0 340 190. Usable area: x from 45 to 295, y from 40 to 140 (baseline y=145)
  const chartAPath = 'M 45 134 L 170 90 L 295 40';
  const chartAArea = 'M 45 145 L 45 134 L 170 90 L 295 40 L 295 145 Z';
  const chartAPoints = [
    { x: 45, y: 134, year: 2014, val: '10' },
    { x: 170, y: 90, year: 2018, val: '50' },
    { x: 295, y: 40, year: 2020, val: '100' },
  ];

  // Chart B: Business clients (2016: 10, 2019: 50+)
  // ViewBox: 0 0 340 190. Usable area: x from 70 to 270, baseline y=145
  const chartBPath = 'M 70 125 L 270 45';
  const chartBArea = 'M 70 145 L 70 125 L 270 45 L 270 145 Z';
  const chartBPoints = [
    { x: 70, y: 125, year: 2016, val: '10' },
    { x: 270, y: 45, year: 2019, val: '50+' },
  ];

  const lineVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const areaVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.8, delay: 0.4 },
    },
  };

  const pointVariants = (index: number): Variants => ({
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { type: 'spring' as const, stiffness: 260, damping: 20, delay: 0.5 + index * 0.15 },
    },
  });

  return (
    <div className="rounded-3xl bg-white border border-rose-100/90 hover:border-rose-200 p-6 sm:p-8 shadow-lg shadow-rose-950/5 mt-12 transition-all">
      {/* Panel Header */}
      <div className="flex items-center space-x-2.5 mb-6 pb-4 border-b border-rose-100">
        <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#881337]">
          <TrendingUp className="w-4 h-4 text-[#881337]" />
        </div>
        <h3 className="font-serif-header font-bold text-lg sm:text-xl text-slate-900 tracking-tight">
          {charts.title}
        </h3>
      </div>

      {/* Screen-reader-only accessible text summary */}
      <div className="sr-only">
        Colleges reached: 10 in 2014, 50 in 2018, 100 in 2020. Business clients: 10 in 2016, 50+ in 2019.
      </div>

      {/* 2-Column Responsive Grid on Desktop, Stacked on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Chart A: Colleges reached */}
        <div className="rounded-2xl bg-rose-50/40 border border-rose-200/60 p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-serif-header font-bold text-sm sm:text-base text-slate-900">
              {charts.seriesA.title}
            </span>
            <span className="font-mono text-[10px] uppercase font-bold text-[#881337] bg-rose-100 px-2 py-0.5 rounded border border-rose-200">
              Verified Growth
            </span>
          </div>

          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9]">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 340 190"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="growthAreaGradA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#881337" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#881337" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="growthStrokeGradA" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#881337" />
                  <stop offset="100%" stopColor="#E11D48" />
                </linearGradient>
              </defs>

              {/* Baseline axis */}
              <line
                x1="25"
                y1="145"
                x2="315"
                y2="145"
                stroke="#E2E8F0"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Area fill */}
              <motion.path
                d={chartAArea}
                fill="url(#growthAreaGradA)"
                variants={areaVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '0px' }}
              />

              {/* Line path */}
              <motion.path
                d={chartAPath}
                fill="none"
                stroke="url(#growthStrokeGradA)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={lineVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '0px' }}
              />

              {/* Data points & labels */}
              {chartAPoints.map((pt, i) => (
                <g key={pt.year}>
                  {/* Point circle */}
                  <motion.circle
                    cx={pt.x}
                    cy={pt.y}
                    r="5.5"
                    fill="#FFFFFF"
                    stroke="#881337"
                    strokeWidth="3"
                    variants={pointVariants(i)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '0px' }}
                    className="drop-shadow-sm"
                  />

                  {/* Value label above */}
                  <motion.text
                    x={pt.x}
                    y={pt.y - 12}
                    textAnchor="middle"
                    fill="#881337"
                    className="font-mono font-extrabold text-[12px]"
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.6 + i * 0.15 }}
                  >
                    {pt.val}
                  </motion.text>

                  {/* Year label below baseline */}
                  <motion.text
                    x={pt.x}
                    y="166"
                    textAnchor="middle"
                    fill="#64748B"
                    className="font-mono font-bold text-[11px]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 + i * 0.1 }}
                  >
                    {pt.year}
                  </motion.text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Chart B: Business clients */}
        <div className="rounded-2xl bg-rose-50/40 border border-rose-200/60 p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-serif-header font-bold text-sm sm:text-base text-slate-900">
              {charts.seriesB.title}
            </span>
            <span className="font-mono text-[10px] uppercase font-bold text-[#881337] bg-rose-100 px-2 py-0.5 rounded border border-rose-200">
              Verified Growth
            </span>
          </div>

          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9]">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 340 190"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="growthAreaGradB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#881337" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#881337" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="growthStrokeGradB" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#881337" />
                  <stop offset="100%" stopColor="#E11D48" />
                </linearGradient>
              </defs>

              {/* Baseline axis */}
              <line
                x1="25"
                y1="145"
                x2="315"
                y2="145"
                stroke="#E2E8F0"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Area fill */}
              <motion.path
                d={chartBArea}
                fill="url(#growthAreaGradB)"
                variants={areaVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '0px' }}
              />

              {/* Line path */}
              <motion.path
                d={chartBPath}
                fill="none"
                stroke="url(#growthStrokeGradB)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={lineVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '0px' }}
              />

              {/* Data points & labels */}
              {chartBPoints.map((pt, i) => (
                <g key={pt.year}>
                  {/* Point circle */}
                  <motion.circle
                    cx={pt.x}
                    cy={pt.y}
                    r="5.5"
                    fill="#FFFFFF"
                    stroke="#881337"
                    strokeWidth="3"
                    variants={pointVariants(i)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '0px' }}
                    className="drop-shadow-sm"
                  />

                  {/* Value label above */}
                  <motion.text
                    x={pt.x}
                    y={pt.y - 12}
                    textAnchor="middle"
                    fill="#881337"
                    className="font-mono font-extrabold text-[12px]"
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.6 + i * 0.15 }}
                  >
                    {pt.val}
                  </motion.text>

                  {/* Year label below baseline */}
                  <motion.text
                    x={pt.x}
                    y="166"
                    textAnchor="middle"
                    fill="#64748B"
                    className="font-mono font-bold text-[11px]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 + i * 0.1 }}
                  >
                    {pt.year}
                  </motion.text>
                </g>
              ))}
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
};
