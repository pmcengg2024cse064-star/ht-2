import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  Check, 
  Download, 
  Clock, 
  Terminal, 
  Flame,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { ACADEMY_COURSES, AcademyCourse } from '../../data/cyberData';
import { CyberRangeVisualizer } from './CyberRangeVisualizer';

interface AcademyCoursesProps {
  onDownloadSyllabus: (courseTitle: string) => void;
  onViewCourseDetails?: (course: AcademyCourse) => void;
  onExploreCyberRange?: () => void;
}

export const AcademyCourses: React.FC<AcademyCoursesProps> = ({
  onDownloadSyllabus,
  onViewCourseDetails,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Tracks');

  const categories = [
    'All Tracks',
    'Offensive Security',
    'Defensive SOC',
    'Cloud & DevSecOps',
    'Foundations',
  ];

  const filteredCourses = selectedCategory === 'All Tracks'
    ? ACADEMY_COURSES
    : ACADEMY_COURSES.filter(c => c.category === selectedCategory);

  return (
    <section id="academy" className="relative py-24 bg-rose-50/50 dark:bg-[#0D0204] border-t border-rose-200 dark:border-rose-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title (Center-Aligned Serif Header) */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="font-mono text-xs uppercase tracking-widest text-rose-700 dark:text-rose-300 font-bold">
            OFFICIAL EC-COUNCIL ACCREDITED CURRICULUM
          </div>

          <h2 className="font-serif-header font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white tracking-wider">
            ACADEMY TRAINING
          </h2>

          <div className="w-16 h-[2px] bg-rose-500 mx-auto mt-3 mb-4" />

          <p className="font-sans text-sm sm:text-base text-slate-700 dark:text-[#E2C4C9] leading-relaxed">
            Hands-on cybersecurity certifications led by active red team and SOC analysts. Learn in our Coimbatore cyber range or via live interactive online batches.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#881337] text-white font-bold shadow-lg shadow-[#881337]/30'
                    : 'bg-white dark:bg-[#180407] text-slate-700 dark:text-rose-200 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-rose-900/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-3xl bg-white dark:bg-[#4A0A13]/90 border border-slate-200 dark:border-rose-300/25 hover:border-rose-400 dark:hover:border-rose-300 p-7 flex flex-col justify-between group transition-all duration-300 relative overflow-hidden shadow-xl dark:shadow-2xl"
            >
              <div>
                {/* Top Badge & Code */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-rose-800 dark:text-rose-300 bg-rose-100 dark:bg-rose-950 px-3 py-1 rounded-full border border-rose-300 dark:border-rose-400/40 font-bold">
                    {course.badge}
                  </span>
                  <span className="font-mono text-xs text-slate-600 dark:text-rose-200">
                    {course.ecCouncilCode || course.level}
                  </span>
                </div>

                <h3 className="font-serif-header font-bold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-wide group-hover:text-rose-700 dark:group-hover:text-rose-200 transition-colors leading-snug mb-1">
                  {course.title}
                </h3>

                <div className="font-mono text-xs text-rose-700 dark:text-rose-300/90 mb-4">
                  {course.category} • {course.level} Level
                </div>

                <p className="font-sans text-xs sm:text-sm text-slate-700 dark:text-[#E2C4C9] leading-relaxed mb-5">
                  {course.description}
                </p>

                {/* Practical Metric Callout Pill */}
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-rose-900/60 font-mono text-xs text-slate-800 dark:text-rose-200 mb-5 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-rose-600 dark:text-rose-300" />
                    <span className="text-slate-900 dark:text-white font-bold">{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Terminal className="w-3.5 h-3.5 text-rose-600 dark:text-rose-300" />
                    <span className="text-slate-900 dark:text-white font-bold">{course.practicalLabHours}</span>
                  </div>
                </div>

                {/* Highlights with Checkmarks */}
                <div className="space-y-2.5 mb-6 pt-3 border-t border-slate-200 dark:border-rose-900/60">
                  {course.highlights.map((hl, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs font-sans text-slate-700 dark:text-rose-100">
                      <div className="w-4 h-4 rounded-full bg-rose-100 dark:bg-rose-900/80 border border-rose-300 dark:border-rose-400/50 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-rose-800 dark:text-white" />
                      </div>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action CTAs */}
              <div className="pt-4 border-t border-slate-200 dark:border-rose-900/60 space-y-2">
                {onViewCourseDetails && (
                  <button
                    onClick={() => onViewCourseDetails(course)}
                    className="w-full py-2.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider text-rose-900 dark:text-rose-200 hover:text-rose-950 dark:hover:text-white bg-rose-100/80 dark:bg-rose-950/80 hover:bg-rose-200 dark:hover:bg-[#5B0E1B] border border-rose-200 dark:border-rose-400/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-rose-700 dark:text-rose-300" />
                    <span>View Detailed Modules &amp; Labs</span>
                  </button>
                )}

                <button
                  onClick={() => onDownloadSyllabus(course.title)}
                  className="btn-burgundy-filled w-full py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                >
                  <Download className="w-3.5 h-3.5 text-white" />
                  <span>Download Syllabus &amp; Demo Pass</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* The Hackup Cyber Range Visualizer */}
        <CyberRangeVisualizer />

      </div>
    </section>
  );
};

