import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Check, 
  AlertTriangle, 
  FileCheck2, 
  Layers, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Phone,
  Send,
  Building2,
  GraduationCap,
  Clock,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { ENTERPRISE_SERVICES, ACADEMY_COURSES, BLOG_POSTS, SEO_METADATA_MAP, COMPANY_FACTS, SITE_URL } from '../data/cyberData';
import { SEOHead } from '../components/common/SEOHead';

interface ServiceDetailPageProps {
  onRequestAudit: (serviceTitle?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ onRequestAudit }) => {
  const { slug, serviceId } = useParams<{ slug?: string; serviceId?: string }>();
  const currentId = slug || serviceId;

  // Legacy route ID resolver
  const legacyMap: Record<string, string> = {
    'vapt': 'penetration-testing-vapt',
    'pam-identity': 'vulnerability-management-security-audit',
    'soc-deployment': 'soc-managed-security',
    'dfir': 'digital-forensics-cybercrime-investigation',
    'cloud-devsecops': 'vulnerability-management-security-audit',
    'compliance-readiness': 'grc-compliance-consulting'
  };

  const resolvedId = currentId && legacyMap[currentId] ? legacyMap[currentId] : currentId;
  const service = ENTERPRISE_SERVICES.find((s) => s.id === resolvedId) || ENTERPRISE_SERVICES[0];

  // Accordion state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Consultation form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    scope: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Related course lookup
  const relatedCourse = ACADEMY_COURSES.find((c) => c.id === service.relatedCourseSlug);

  // Related services lookup
  const relatedServices = ENTERPRISE_SERVICES.filter((s) => 
    service.relatedServiceSlugs?.includes(s.id) && s.id !== service.id
  ).slice(0, 2);

  // Related blog lookup
  const relatedBlog = BLOG_POSTS.find((b) => b.slug === service.relatedBlogSlug);

  const seoData = SEO_METADATA_MAP[`/services/${service.id}`] || {
    title: `${service.title} | Hackup Technology`,
    description: service.description.slice(0, 155),
    canonical: `${SITE_URL}/services/${service.id}`,
    primaryKeyword: service.shortTitle
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
          { name: 'Services', url: '/services' },
          { name: service.shortTitle, url: `/services/${service.id}` }
        ]}
        type="service"
        serviceData={{
          name: service.title,
          description: service.description
        }}
        faqData={service.faqs}
      />

      {/* 2. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 font-mono text-xs text-slate-500">
        <Link to="/" className="hover:text-[#881337] transition-colors">Home</Link>
        <span>/</span>
        <Link to="/services" className="hover:text-[#881337] transition-colors">Services</Link>
        <span>/</span>
        <span className="text-[#881337] font-bold">{service.shortTitle}</span>
      </nav>

      {/* 3. HERO WITH CONSULTATION BUTTON */}
      <div className="bg-white rounded-3xl overflow-hidden border-2 border-rose-200 shadow-xl">
        {service.imageUrl && (
          <div className="h-64 sm:h-80 w-full overflow-hidden bg-slate-950 relative image-banner-dark">
            <img
              src={service.imageUrl}
              alt={service.title}
              className="w-full h-full object-cover opacity-80"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />
            
            <div className="absolute top-6 left-6 flex items-center space-x-3 z-10">
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-rose-200 bg-[#4A0A13]/90 px-3.5 py-1.5 rounded-full border border-rose-500/40 backdrop-blur-md">
                {service.badge}
              </span>
              <span className="font-mono text-xs text-slate-200 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-700 backdrop-blur-md">
                Turnaround: {service.turnaroundDays}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-10 dark-overlay-content">
              <h1 
                className="font-serif-header font-bold text-2xl sm:text-4xl text-white tracking-wide leading-tight drop-shadow-md"
                style={{ color: '#FFFFFF' }}
              >
                {service.title}
              </h1>
              <p className="font-mono text-xs sm:text-sm text-rose-300 mt-2 font-semibold drop-shadow">
                {service.tagline}
              </p>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-10 space-y-8">
          <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl font-normal">
            {service.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={() => onRequestAudit(service.title)}
              className="w-full sm:w-auto btn-burgundy-filled px-8 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl hover:scale-102 cursor-pointer text-white"
            >
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Book Your Cyber Consultation</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <span className="font-mono text-xs text-slate-500">
              Zero Production Downtime &bull; 100% NDA Protected
            </span>
          </div>
        </div>
      </div>

      {/* 4. WHO IT IS FOR & WHAT IS INCLUDED */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Who It Is For */}
        <div className="p-8 rounded-3xl bg-white border border-rose-200 shadow-md space-y-4">
          <div className="flex items-center space-x-2 text-[#881337] font-mono text-xs uppercase font-bold tracking-wider">
            <Building2 className="w-4 h-4 text-[#881337]" />
            <span>Target Organizations &bull; Who It Is For</span>
          </div>
          <h2 className="font-serif-header font-bold text-xl text-slate-900">
            Engineered For High-Stakes Environments
          </h2>
          <ul className="space-y-3 pt-2">
            {service.whoIsItFor?.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                <div className="w-5 h-5 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#881337]" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What Is Included */}
        <div className="p-8 rounded-3xl bg-white border border-rose-200 shadow-md space-y-4">
          <div className="flex items-center space-x-2 text-[#881337] font-mono text-xs uppercase font-bold tracking-wider">
            <Layers className="w-4 h-4 text-[#881337]" />
            <span>Scope Of Work &bull; What Is Included</span>
          </div>
          <h2 className="font-serif-header font-bold text-xl text-slate-900">
            Comprehensive Verification Spectrum
          </h2>
          <ul className="space-y-3 pt-2">
            {service.whatIsIncluded?.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                <div className="w-5 h-5 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#881337]" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 5. METHODOLOGY (5-STAGE EXECUTION FLOW) */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="font-mono text-xs text-[#881337] font-bold uppercase tracking-widest">
            RIGOROUS AUDITING FLOW
          </span>
          <h2 className="font-serif-header font-bold text-2xl sm:text-3xl text-slate-900">
            Testing &amp; Execution Methodology
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {service.methodology?.map((step, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="font-mono text-xs text-[#881337] font-bold block">{step.step}</span>
              <h3 className="font-serif-header font-bold text-sm text-slate-900">{step.title}</h3>
              <p className="font-sans text-xs text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. DELIVERABLES */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6 dark-surface">
        <div className="flex items-center space-x-2 text-rose-400 font-mono text-xs uppercase font-bold tracking-wider">
          <FileCheck2 className="w-4 h-4 text-rose-400" />
          <span>Executive &amp; Technical Deliverables</span>
        </div>
        <h2 
          className="font-serif-header font-bold text-2xl text-white drop-shadow-md"
          style={{ color: '#FFFFFF' }}
        >
          What Your Organization Receives
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {service.deliverables?.map((deliv, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-start space-x-3 text-xs sm:text-sm text-slate-200">
              <div className="w-5 h-5 rounded-full bg-rose-900/40 border border-rose-500/40 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-rose-400" />
              </div>
              <span>{deliv}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. FAQ ACCORDION */}
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-[#881337] font-bold uppercase tracking-widest">
            TRANSPARENCY &amp; COMPLIANCE
          </span>
          <h2 className="font-serif-header font-bold text-2xl sm:text-3xl text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {service.faqs?.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-serif-header font-bold text-sm sm:text-base text-slate-900 hover:text-[#881337] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaqIdx === idx ? 'rotate-180 text-[#881337]' : ''}`} />
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

      {/* 8. RELATED ENTERPRISE SERVICES */}
      <div className="space-y-6 pt-4 border-t border-slate-200">
        <h2 className="font-serif-header font-bold text-2xl text-slate-900">
          Related Enterprise Defense Solutions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedServices.map((rel) => (
            <div key={rel.id} className="rounded-3xl bg-white border-2 border-rose-200 hover:border-[#881337] p-6 flex flex-col justify-between shadow-md hover:shadow-xl transition-all">
              <div className="space-y-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-[#881337] border border-rose-200">
                  Complementary Service
                </span>
                <h3 className="font-serif-header font-bold text-base text-slate-900">
                  {rel.shortTitle}
                </h3>
                <p className="font-sans text-xs text-slate-600 line-clamp-3">
                  {rel.description}
                </p>
              </div>
              <div className="pt-4">
                <Link
                  to={`/services/${rel.id}`}
                  className="btn-burgundy-filled w-full py-2 rounded-xl text-xs font-mono font-bold text-center block text-white"
                >
                  View Service &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. CONSULTATION FORM */}
      <div className="p-8 sm:p-12 rounded-3xl bg-rose-50/70 border-2 border-rose-200 shadow-xl max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-[#881337] font-bold uppercase tracking-widest">
            DIRECT TECHNICAL SCOPING
          </span>
          <h2 className="font-serif-header font-bold text-2xl sm:text-3xl text-slate-900">
            Request Scope &amp; NDA Consultation for {service.shortTitle}
          </h2>
          <p className="font-sans text-xs text-slate-600">
            Speak directly with our senior security consultants under strict mutual non-disclosure.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-white border border-emerald-300 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-serif-header font-bold text-lg text-slate-900">Scoping Request Received</h4>
            <p className="font-sans text-xs text-slate-600">
              Our lead consultant in Ganapathy, Coimbatore will contact you within 2 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[11px] font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dinesh Kumar"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#881337] outline-none bg-white mt-1"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] font-bold text-slate-700">Work Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. dinesh@company.com"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#881337] outline-none bg-white mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[11px] font-bold text-slate-700">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 93620 12339"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#881337] outline-none bg-white mt-1"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] font-bold text-slate-700">Company Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Organization or Entity"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#881337] outline-none bg-white mt-1"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[11px] font-bold text-slate-700">Target Scope &amp; Asset Details</label>
              <textarea
                rows={3}
                value={formData.scope}
                onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                placeholder={`Provide any specific target domains, IPs, compliance deadlines for ${service.shortTitle}...`}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#881337] outline-none bg-white mt-1"
              />
            </div>

            <button
              type="submit"
              className="btn-burgundy-filled w-full py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg text-white"
            >
              <Send className="w-3.5 h-3.5 text-white" />
              <span>Submit Scoping Request</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
