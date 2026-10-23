import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  ShieldCheck, 
  Award, 
  Download, 
  ArrowRight, 
  Check, 
  Clock, 
  Sparkles, 
  Users,
  Search,
  BookOpen
} from 'lucide-react';
import { ACADEMY_COURSES, COMPANY_FACTS, SITE_URL } from '../data/cyberData';
import { SEOHead } from '../components/common/SEOHead';

interface CoursesPageProps {
  onBookDemo: (courseTitle?: string) => void;
  onDownloadSyllabus?: (courseTitle?: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ 
  onBookDemo,
  onDownloadSyllabus 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Offensive Security', 'Cloud & DevSecOps', 'Forensics & Governance'];

  const filteredCourses = selectedCategory === 'All'
    ? ACADEMY_COURSES
    : ACADEMY_COURSES.filter((c) => c.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fadeIn font-sans text-slate-900">
      
      {/* SEO HEAD */}
      <SEOHead
        title="Best Cyber Security Course in Coimbatore | Hackup"
        description="Best cyber security course in Coimbatore. Official EC-Council Accredited Training Center for CEH v13, CCSE, ECDE, ECES & industrial internships."
        canonical={`${SITE_URL}/courses`}
        primaryKeyword="best cyber security course in Coimbatore"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Courses', url: '/courses' }
        ]}
      />

      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-900 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-[#1E3A8A]" />
          <span>OFFICIAL EC-COUNCIL ACCREDITED TRAINING CENTER (ATC) &bull; COIMBATORE</span>
        </div>

        <h1 className="font-serif-header font-extrabold text-3xl sm:text-5xl text-slate-950 tracking-tight leading-tight">
          EC-Council Certified Cyber Security Courses &amp; Internships
        </h1>

        <p className="font-sans text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
          Master real-world offensive cyber warfare, cloud defense, DevSecOps pipelines, and applied cryptography. Learn on live virtual cyber range sandboxes with authorized international certification vouchers.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full border transition-all cursor-pointer font-bold ${
                selectedCategory === cat
                  ? 'btn-navy-filled text-white border-transparent shadow-md'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-blue-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 5 Courses Grid (White & Navy Blue Styling) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="rounded-3xl bg-white border-2 border-slate-200 hover:border-blue-300 p-6 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-blue-950/10 transition-all duration-300 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                  {course.badge}
                </span>
                <span className="font-mono text-xs text-slate-500">
                  {course.duration}
                </span>
              </div>

              <div className="space-y-1.5">
                <h2 className="font-serif-header font-bold text-xl text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                  <Link to={`/courses/${course.id}`}>
                    {course.title}
                  </Link>
                </h2>
                {course.ecCouncilCode && (
                  <span className="text-[11px] font-mono text-blue-900 font-bold block">
                    {course.ecCouncilCode}
                  </span>
                )}
                <p className="font-sans text-xs text-slate-600 line-clamp-3 leading-relaxed pt-1">
                  {course.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-blue-100">
                <div className="text-xs font-mono text-slate-700">
                  <strong>Practical Lab Hours:</strong> {course.practicalLabHours}
                </div>
                <div className="text-xs font-mono text-slate-700">
                  <strong>Training Mode:</strong> {course.mode}
                </div>
                <div className="text-xs font-mono text-blue-900 font-bold">
                  <strong>Upcoming Cohort:</strong> {course.upcomingBatch}
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-2">
              <Link
                to={`/courses/${course.id}`}
                className="btn-navy-filled w-full py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-md hover:scale-101 text-white"
              >
                <span>View Full Curriculum &amp; Labs</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>

              <button
                onClick={() => onBookDemo(course.title)}
                className="w-full py-2 text-center text-xs font-mono font-bold text-blue-900 hover:text-blue-950 hover:underline cursor-pointer"
              >
                Enquire / Download Syllabus PDF &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EC-Council Accreditation Trust Showcase */}
      <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-blue-900/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
              <Award className="w-4 h-4 text-blue-400" />
              <span>OFFICIAL ASPEN CREDENTIALS</span>
            </div>
            <h3 className="font-serif-header font-bold text-2xl sm:text-3xl text-white">
              Why EC-Council Accreditation Matters for Your Career
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
              Hackup Technology issues authentic EC-Council digital courseware, official Aspen portal credentials, cloud cyber range lab environments with 2,200+ attack tools, and authorized international exam voucher support.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
              <div className="font-serif-header font-black text-2xl text-blue-400">100%</div>
              <div className="text-slate-300 font-bold">Practical Lab Drills</div>
              <div className="text-[10px] text-slate-500">Live attack &amp; defense range</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
              <div className="font-serif-header font-black text-2xl text-blue-400">98%+</div>
              <div className="text-slate-300 font-bold">First-Attempt Pass Rate</div>
              <div className="text-[10px] text-slate-500">Official exam voucher prep</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
              <div className="font-serif-header font-black text-2xl text-blue-400">40+</div>
              <div className="text-slate-300 font-bold">Hiring Partners</div>
              <div className="text-[10px] text-slate-500">Direct MNC interview referrals</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
              <div className="font-serif-header font-black text-2xl text-blue-400">1,00,000+</div>
              <div className="text-slate-300 font-bold">Students Trained</div>
              <div className="text-[10px] text-slate-500">Across 54+ universities</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
