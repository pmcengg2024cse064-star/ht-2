import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Check, 
  Award, 
  Clock, 
  ShieldCheck, 
  Terminal, 
  Download, 
  ChevronDown, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ACADEMY_COURSES, ENTERPRISE_SERVICES, SEO_METADATA_MAP, COMPANY_FACTS, SITE_URL } from '../data/cyberData';
import { SEOHead } from '../components/common/SEOHead';

interface CourseDetailPageProps {
  onBookDemo: (courseTitle?: string) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ onBookDemo }) => {
  const { slug, courseId } = useParams<{ slug?: string; courseId?: string }>();
  const currentId = slug || courseId;

  // Legacy route ID resolver
  const legacyMap: Record<string, string> = {
    'ceh-v13': 'certified-ethical-hacker-ceh',
    'cpent': 'certified-ethical-hacker-ceh',
    'soc-analyst': 'certified-ethical-hacker-ceh',
    'ccse': 'cloud-security-engineer-ccse',
    'ecde': 'devsecops-engineer-ecde',
    'chfi': 'encryption-specialist-eces',
    'cnd': 'cloud-security-engineer-ccse',
    'ctia-ecih': 'encryption-specialist-eces',
    'internship': 'cyber-security-internship'
  };

  const resolvedId = currentId && legacyMap[currentId] ? legacyMap[currentId] : currentId;
  const course = ACADEMY_COURSES.find((c) => c.id === resolvedId) || ACADEMY_COURSES[0];

  // Accordion states
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activeModuleIdx, setActiveModuleIdx] = useState<number | null>(0);

  // Enquiry form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    collegeOrCompany: '',
    modePreference: 'Hybrid (Coimbatore Lab + Live Online)'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Related service lookup
  const relatedService = ENTERPRISE_SERVICES.find((s) => s.id === course.relatedServiceSlug);

  const seoData = SEO_METADATA_MAP[`/courses/${course.id}`] || {
    title: `${course.title} | Hackup Technology`,
    description: course.description.slice(0, 155),
    canonical: `${SITE_URL}/courses/${course.id}`,
    primaryKeyword: course.title
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fadeIn font-sans text-slate-900">
      
      {/* 1. SEO HEAD & JSON-LD SCHEMAS */}
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        canonical={seoData.canonical}
        primaryKeyword={seoData.primaryKeyword}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Courses', url: '/courses' },
          { name: course.title, url: `/courses/${course.id}` }
        ]}
        type="course"
        courseData={{
          name: course.title,
          description: course.description
        }}
        faqData={course.faqs}
      />

      {/* 2. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 font-mono text-xs text-slate-500">
        <Link to="/" className="hover:text-blue-800 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/courses" className="hover:text-blue-800 transition-colors">Courses</Link>
        <span>/</span>
        <span className="text-blue-950 font-bold">{course.title}</span>
      </nav>

      {/* 3. HERO WITH EC-COUNCIL BADGE AND ENQUIRY BUTTON */}
      <div className="bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-xl">
        {course.imageUrl && (
          <div className="h-64 sm:h-80 w-full overflow-hidden bg-slate-950 relative image-banner-dark">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-full object-cover opacity-80"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />
            
            <div className="absolute top-6 left-6 flex items-center space-x-3 z-10">
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-white bg-[#0B132B]/90 px-3.5 py-1.5 rounded-full border border-blue-500/50 backdrop-blur-md">
                {course.badge}
              </span>
              <span className="font-mono text-xs text-slate-200 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-700 backdrop-blur-md">
                Duration: {course.duration}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-10 dark-overlay-content">
              <div className="flex items-center space-x-2 text-blue-300 font-mono text-xs font-bold uppercase mb-1 drop-shadow">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>OFFICIAL EC-COUNCIL CURRICULUM &bull; ATC #ATC-IND-2024</span>
              </div>
              <h1 
                className="font-serif-header font-bold text-2xl sm:text-4xl text-white tracking-wide leading-tight drop-shadow-md"
                style={{ color: '#FFFFFF' }}
              >
                {course.title}
              </h1>
              {course.ecCouncilCode && (
                <p className="font-mono text-xs sm:text-sm text-blue-300 mt-1 font-semibold drop-shadow">
                  {course.ecCouncilCode} &bull; {course.certificationPartner}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="p-6 sm:p-10 space-y-6">
          <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl font-normal">
            {course.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={() => onBookDemo(course.title)}
              className="w-full sm:w-auto btn-navy-filled px-8 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl hover:scale-102 cursor-pointer text-white"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Download Syllabus &amp; Enquire</span>
            </button>
            <span className="font-mono text-xs text-slate-500">
              {course.upcomingBatch} &bull; {course.mode}
            </span>
          </div>
        </div>
      </div>

      {/* 4. OVERVIEW & HIGHLIGHTS */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
        <div className="flex items-center space-x-2 text-[#1E3A8A] font-mono text-xs uppercase font-bold tracking-wider">
          <Sparkles className="w-4 h-4 text-[#1E3A8A]" />
          <span>Curriculum Highlights &bull; Core Competencies</span>
        </div>
        <h2 className="font-serif-header font-bold text-xl sm:text-2xl text-slate-900">
          What Sets This Certification Apart
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {course.highlights?.map((hl, idx) => (
            <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
              <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-blue-900" />
              </div>
              <span>{hl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. MODULES (ACCORDION) */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="font-mono text-xs text-blue-900 font-bold uppercase tracking-widest">
            STEP-BY-STEP SYLLABUS
          </span>
          <h2 className="font-serif-header font-bold text-2xl sm:text-3xl text-slate-900">
            Course Modules &amp; Domains
          </h2>
        </div>

        <div className="space-y-3">
          {course.modules?.map((mod, idx) => (
            <div key={idx} className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
              <button
                onClick={() => setActiveModuleIdx(activeModuleIdx === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-serif-header font-bold text-sm sm:text-base text-slate-900 hover:text-blue-900 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900">
                    {mod.moduleNum}
                  </span>
                  <span>{mod.title}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeModuleIdx === idx ? 'rotate-180 text-blue-700' : ''}`} />
              </button>

              {activeModuleIdx === idx && (
                <div className="px-5 pb-5 pt-2 border-t border-blue-100 bg-blue-50/30">
                  <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block mb-2">
                    Included Hands-on Labs:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {mod.labs.map((lab, lIdx) => (
                      <div key={lIdx} className="flex items-center space-x-2 text-xs font-mono text-slate-700">
                        <Terminal className="w-3.5 h-3.5 text-[#1E3A8A] shrink-0" />
                        <span>{lab}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 6. HANDS-ON LABS */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6 border border-blue-900/50 dark-surface">
        <div className="flex items-center space-x-2 text-blue-400 font-mono text-xs uppercase font-bold tracking-wider">
          <Terminal className="w-4 h-4 text-blue-400" />
          <span>Practical Cyber Range Environment</span>
        </div>
        <h2 
          className="font-serif-header font-bold text-2xl text-white drop-shadow-md"
          style={{ color: '#FFFFFF' }}
        >
          Hands-On Lab Scenarios You Will Master
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {course.handsOnLabs?.map((lab, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-start space-x-3 text-xs sm:text-sm text-slate-200">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-blue-400" />
              </div>
              <span>{lab}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. CERTIFICATION AND CAREER PATHS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Certification Info */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
          <div className="flex items-center space-x-2 text-[#1E3A8A] font-mono text-xs uppercase font-bold tracking-wider">
            <Award className="w-4 h-4 text-[#1E3A8A]" />
            <span>Official Credential &bull; Examination</span>
          </div>
          <h3 className="font-serif-header font-bold text-xl text-slate-900">
            Global Certification Attestation
          </h3>
          <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
            {course.certificationInfo}
          </p>
          <div className="pt-2 font-mono text-xs text-blue-900 font-bold">
            &bull; Partner: {course.certificationPartner}
          </div>
        </div>

        {/* Career Paths */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
          <div className="flex items-center space-x-2 text-[#1E3A8A] font-mono text-xs uppercase font-bold tracking-wider">
            <Briefcase className="w-4 h-4 text-[#1E3A8A]" />
            <span>Target Roles &bull; Career Outcomes</span>
          </div>
          <h3 className="font-serif-header font-bold text-xl text-slate-900">
            High-Paying Placement Opportunities
          </h3>
          <div className="space-y-2">
            {course.targetRoles?.map((role, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200 text-xs font-mono text-slate-800 font-semibold">
                &bull; {role}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 8. FAQ ACCORDION */}
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-blue-900 font-bold uppercase tracking-widest">
            ADMISSIONS &amp; BATCH DETAILS
          </span>
          <h2 className="font-serif-header font-bold text-2xl sm:text-3xl text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {course.faqs?.map((faq, idx) => (
            <div key={idx} className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-serif-header font-bold text-sm sm:text-base text-slate-900 hover:text-blue-900 cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaqIdx === idx ? 'rotate-180 text-blue-700' : ''}`} />
              </button>
              {openFaqIdx === idx && (
                <div className="px-5 pb-5 font-sans text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 9. RELATED SERVICES */}
      {relatedService && (
        <div className="p-8 rounded-3xl bg-amber-50/80 border-2 border-amber-300 shadow-md space-y-4">
          <div className="flex items-center space-x-2 text-amber-800 font-mono text-xs uppercase font-bold tracking-wider">
            <Building2 className="w-4 h-4 text-amber-600" />
            <span>Enterprise Application &bull; Industry Service</span>
          </div>
          <h3 className="font-serif-header font-bold text-xl text-slate-900">
            See How Enterprise Clients Use These Skills in Real World: {relatedService.title}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-slate-700">
            {relatedService.description}
          </p>
          <Link
            to={`/services/${relatedService.id}`}
            className="btn-gold-filled inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider"
          >
            <span>Explore {relatedService.shortTitle} Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* 10. ENQUIRY FORM */}
      <div className="p-8 sm:p-12 rounded-3xl bg-blue-50/70 border-2 border-blue-200 shadow-xl max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-blue-900 font-bold uppercase tracking-widest">
            ADMISSIONS &amp; SYLLABUS ENQUIRY
          </span>
          <h2 className="font-serif-header font-bold text-2xl sm:text-3xl text-slate-900">
            Enquire for {course.title}
          </h2>
          <p className="font-sans text-xs text-slate-600">
            Receive the complete module PDF, lab setup requirements, and upcoming batch schedule.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-white border border-emerald-300 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-serif-header font-bold text-lg text-slate-900">Enquiry Submitted Successfully</h4>
            <p className="font-sans text-xs text-slate-600">
              Our academic counselors in Coimbatore will send the syllabus PDF and contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleEnquirySubmit} className="space-y-4 font-sans text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[11px] font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Priya Venkatesh"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-600 outline-none bg-white mt-1"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] font-bold text-slate-700">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. priya@gmail.com"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-600 outline-none bg-white mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[11px] font-bold text-slate-700">Phone Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 96262 15976"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-600 outline-none bg-white mt-1"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] font-bold text-slate-700">College / Employer</label>
                <input
                  type="text"
                  value={formData.collegeOrCompany}
                  onChange={(e) => setFormData({ ...formData, collegeOrCompany: e.target.value })}
                  placeholder="College or Company Name"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-600 outline-none bg-white mt-1"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[11px] font-bold text-slate-700">Training Mode Preference</label>
              <select
                value={formData.modePreference}
                onChange={(e) => setFormData({ ...formData, modePreference: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-600 outline-none bg-white mt-1 font-sans"
              >
                <option value="Hybrid (Coimbatore Lab + Live Online)">Hybrid (Coimbatore Lab + Live Online)</option>
                <option value="Physical Classroom (Ganapathy, Coimbatore Lab)">Physical Classroom (Ganapathy, Coimbatore Lab)</option>
                <option value="100% Live Instructor-Led Online">100% Live Instructor-Led Online</option>
                <option value="Weekend Fast-Track (Working Professionals)">Weekend Fast-Track (Working Professionals)</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn-navy-filled w-full py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg text-white"
            >
              <Send className="w-3.5 h-3.5 text-white" />
              <span>Submit Course Enquiry &amp; Get Syllabus</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
