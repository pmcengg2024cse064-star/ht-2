import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  Award, 
  Scale, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  FileCheck2, 
  Cpu, 
  HeartPulse, 
  Briefcase, 
  Users, 
  Terminal,
  CheckCircle2,
  Lock,
  Layers,
  Star,
  Download
} from 'lucide-react';
import { 
  FOUNDER_PROFILE, 
  CYBER_PATENTS, 
  PARTNER_INSTITUTIONS, 
  COMPANY_FACTS,
  SITE_URL 
} from '../data/cyberData';
import { SEOHead } from '../components/common/SEOHead';
import { CompanyStory } from '../components/landing-additions/CompanyStory';

interface AboutUsPageProps {
  onRequestConsultation: (topic?: string) => void;
  onRequestAudit?: (serviceTitle?: string) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ 
  onRequestConsultation,
  onRequestAudit 
}) => {
  const [activeAreaIdx, setActiveAreaIdx] = useState(0);

  // 5 Required Experience Areas
  const experienceAreas = [
    {
      id: 'cyber-crime-cell',
      title: '1. Cyber Crime Cell Advisory',
      subtitle: 'State Law Enforcement Technical Support',
      icon: Scale,
      color: '#D4AF37',
      desc: 'Active technical advisory for the Tamil Nadu Police Cyber Crime Department and district Cyber Crime Cells. Providing technical intelligence on dark web activities, cryptocurrency tracing, financial fraud investigation, and cyber offense neutralization.',
      points: [
        'Advisory on high-profile cybercrime inquiries and transnational fraud tracking',
        'Capacity-building masterclasses for state law enforcement officers',
        'State-wide cyber threat intelligence coordination under TANCCAO'
      ]
    },
    {
      id: 'cyber-forensic-investigation',
      title: '2. Cyber Forensic Investigation (DFIR)',
      subtitle: 'Section 65B Electronic Evidence Admissibility',
      icon: Terminal,
      color: '#10B981',
      desc: 'Emergency 24/7 forensic breach response, hardware write-blocker bitstream disk imaging, volatile RAM memory extraction, and preparing legally admissible Section 65B evidence dossiers for Indian judicial courts.',
      points: [
        'Strict chain of custody compliance under Section 65B of the Indian Evidence Act',
        'Volatile RAM timeline reconstruction via Volatility & memory forensics',
        'Ransomware root-cause decryption and post-incident technical hard reports'
      ]
    },
    {
      id: 'education-sector',
      title: '3. Education Sector Modernization',
      subtitle: '54+ Universities & Campus Centers of Excellence',
      icon: GraduationCap,
      color: '#38BDF8',
      desc: 'Serving as the official cybersecurity curriculum modernization partner (Board of Studies member for 8 universities) and installing turnkey on-campus Cyber Range sandbox labs for 54+ higher education campuses across South India.',
      points: [
        'Curriculum development for B.Tech, M.Tech, and B.Sc/M.Sc Cybersecurity degrees',
        '1,00,000+ students and 1,200+ faculty trained via specialized FDPs',
        'Industrial student internships and direct MNC campus placement corridors'
      ]
    },
    {
      id: 'private-industries',
      title: '4. Private Industries & BFSI',
      subtitle: 'Critical Infrastructure & Enterprise VAPT',
      icon: Building2,
      color: '#F59E0B',
      desc: 'High-assurance penetration testing (VAPT), 24/7 managed SOC operations, and regulatory audit readiness for core banking institutions, fintech platforms, NBFCs, and SaaS corporations operating under RBI and SEBI mandates.',
      points: [
        'Zero-downtime manual exploit verification across web, mobile, APIs, and networks',
        'Turnkey SIEM ingestion and blue team monitoring (15-min critical SLA)',
        'Guaranteed Safe-to-Host certification accepted by external regulators'
      ]
    },
    {
      id: 'healthcare-it',
      title: '5. Healthcare IT & Cloud Defense',
      subtitle: 'Zero-Trust Architecture & DPDP Act Alignment',
      icon: HeartPulse,
      color: '#EC4899',
      desc: 'Hardening multi-cloud hospital management clusters, PACS diagnostic imaging networks, and patient database repositories against ransomware extortion while ensuring strict compliance with the Indian DPDP Act 2023.',
      points: [
        'Kubernetes cluster and cloud perimeter CIS benchmark audits',
        'Data-at-rest transparent encryption protecting patient PII records',
        'Data Principal consent workflows and Privacy Impact Assessments (DPIA)'
      ]
    }
  ];

  const executiveTeam = [
    {
      name: 'Dr. Dinesh Paranthagan',
      role: 'Founder & Chief Executive Officer',
      credentials: 'M.C.A., Ph.D. &bull; TANCCAO Secretary General',
      desc: 'Nationally recognized cyber authority with 10 years experience, 2 patents, and government advisor.',
      image: '/images/founder_dinesh.jpg'
    },
    {
      name: 'Cyber Operations Taskforce',
      role: 'Red Team & Threat Research Directorate',
      credentials: 'OSCP &bull; CEH Master &bull; CPENT &bull; LPT',
      desc: 'Elite offensive engineers executing manual exploit verification and adversary simulation drills.',
      image: '/images/portal_enterprise.jpg'
    },
    {
      name: 'Academic Advisory Board',
      role: 'Curriculum & CoE Installation Board',
      credentials: 'BOS Members across 8 Universities',
      desc: 'Guiding university MoUs, Faculty Development Programs, and corporate hiring partnerships.',
      image: '/images/portal_student.jpg'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fadeIn font-sans text-slate-900">
      
      {/* 1. SEO HEAD */}
      <SEOHead
        title="About Us | Hackup Technology Coimbatore Leadership"
        description="Learn about Hackup Technology: CEO Dinesh Paranthagan, 10 years experience, TANCCAO Sec. Gen., 2 patents, 54 colleges & 7 MNC partners."
        canonical={`${SITE_URL}/about-us`}
        primaryKeyword="cybersecurity company in Coimbatore"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About Us', url: '/about-us' }
        ]}
      />

      {/* 2. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 font-mono text-xs text-slate-500">
        <Link to="/" className="hover:text-[#881337] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-[#881337] font-bold">About Us</span>
      </nav>

      {/* 3. HERO & OVERVIEW */}
      <div className="space-y-6">
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-mono font-bold text-[#881337] shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#881337]" />
            <span>FOUNDED IN 2013 &bull; COIMBATORE, TAMIL NADU &bull; 13+ YEARS OF LEADERSHIP</span>
          </div>

          <h1 className="font-serif-header font-black text-3xl sm:text-5xl text-slate-950 tracking-tight leading-tight">
            Defending Critical Frontiers.{' '}
            <span className="text-[#881337] block mt-1">
              Engineering the Nation's Cyber Defense Workforce.
            </span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Founded in 2013 in Ganapathy, Coimbatore by Dr. Dinesh Paranthagan, Hackup Technology Pvt Ltd is an executive cybersecurity enterprise, defense research institution, and EC-Council Accredited Training Center trusted across corporate boardrooms, police commissionerates, and 54+ universities.
          </p>
        </div>

        {/* Company Facts Bar */}
        <div className="rounded-3xl bg-white border-2 border-rose-200 p-6 sm:p-8 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            <div className="space-y-1">
              <div className="font-serif-header font-black text-3xl text-[#881337]">13+ Years</div>
              <div className="text-xs font-sans text-slate-600 font-semibold">Active Industry Experience</div>
            </div>
            <div className="space-y-1 sm:pl-4">
              <div className="font-serif-header font-black text-3xl text-[#881337]">4,343</div>
              <div className="text-xs font-sans text-slate-600 font-semibold">Google Reviews (4.8★)</div>
            </div>
            <div className="space-y-1 sm:pl-4">
              <div className="font-serif-header font-black text-3xl text-[#881337]">2 Patents</div>
              <div className="text-xs font-sans text-slate-600 font-semibold">Published Cyber Patents</div>
            </div>
            <div className="space-y-1 sm:pl-4">
              <div className="font-serif-header font-black text-3xl text-[#881337]">54 &bull; 7</div>
              <div className="text-xs font-sans text-slate-600 font-semibold">54 Colleges &amp; 7 MNCs</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. THE STORY OF HACKUP TECHNOLOGY */}
      <CompanyStory className="py-4 sm:py-6" />

      {/* 5. FOUNDER PROFILE: DR. DINESH PARANTHAGAN */}
      <div className="rounded-3xl bg-white border-2 border-rose-200 hover:border-[#881337] p-8 sm:p-12 shadow-xl space-y-8 transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-4">
            <div className="rounded-2xl overflow-hidden border-2 border-rose-200 shadow-xl bg-slate-950 relative h-96">
              <img
                src={FOUNDER_PROFILE.contact.linkedInUrl ? '/images/founder_dinesh.jpg' : '/images/founder_dinesh.jpg'}
                alt="Dr. Dinesh Paranthagan, Founder & CEO"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 z-10 dark-overlay-content">
                <span className="text-[10px] font-mono text-rose-200 uppercase font-bold tracking-wider block drop-shadow">
                  FOUNDER &amp; CEO
                </span>
                <h3 
                  className="font-serif-header font-bold text-xl text-white drop-shadow-md"
                  style={{ color: '#FFFFFF' }}
                >
                  {FOUNDER_PROFILE.name}
                </h3>
                <span className="text-xs font-mono text-slate-200 drop-shadow">
                  {FOUNDER_PROFILE.qualifications}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest">
              <Award className="w-4 h-4 text-[#881337]" />
              <span>LEADERSHIP &bull; STATE SECRETARY GENERAL &bull; PATENT INVENTOR</span>
            </div>

            <h2 className="font-serif-header font-bold text-2xl sm:text-3xl text-slate-900">
              Dr. Dinesh Paranthagan (M.C.A., Ph.D.)
            </h2>

            <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
              {FOUNDER_PROFILE.overview}
            </p>

            {/* Badges / Roles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {FOUNDER_PROFILE.badges.map((b, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs font-mono text-slate-800 p-2 rounded-lg bg-rose-50/70 border border-rose-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#881337] shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs font-mono text-slate-600 space-y-1">
              <div><strong>DEFCON Chapter:</strong> Lead Organizer, DEFCON Coimbatore 2026 Chapter (#DC91422)</div>
              <div><strong>Direct Email:</strong> <a href={`mailto:${COMPANY_FACTS.emails[1]}`} className="text-[#881337] font-bold hover:underline">{COMPANY_FACTS.emails[1]}</a></div>
            </div>

            {/* Downloadable Option for Entire Profile */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href="/downloads/Dinesh_Paranthagan_Executive_Profile.pdf"
                download="Dinesh_Paranthagan_Executive_Profile.pdf"
                className="btn-burgundy-filled px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 text-white shadow-md hover:scale-102 transition-transform cursor-pointer"
              >
                <Download className="w-4 h-4 text-white" />
                <span>Download Entire Profile (PDF)</span>
              </a>

              <a
                href={FOUNDER_PROFILE.contact.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 text-slate-700 shadow-sm transition-all"
              >
                <span>LinkedIn Profile</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#881337]" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 6. PROPRIETARY PATENTS (2 PATENTS - DETAILS REMOVED) */}
      <div className="rounded-3xl bg-white border-2 border-rose-200 p-8 sm:p-10 shadow-lg text-center space-y-4">
        <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200">
          <Sparkles className="w-4 h-4 text-[#881337]" />
          <span>INTELLECTUAL PROPERTY &bull; 2 PATENTS</span>
        </div>
        <h2 className="font-serif-header font-bold text-2xl sm:text-3xl text-slate-900">
          Holder of 2 Published Cyber Defense Patents
        </h2>
        <p className="font-sans text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Dinesh Paranthagan is the inventor and holder of 2 published Indian cybersecurity patents recognized for sovereign cyber defense and automated security architectures.
        </p>
      </div>

      {/* 7. 5 EXPERIENCE AREAS */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest">
            <Layers className="w-4 h-4 text-[#881337]" />
            <span>OPERATIONAL BREADTH &bull; 5 CORE SPHERES</span>
          </div>
          <h2 className="font-serif-header font-bold text-2xl sm:text-3xl text-slate-900">
            Our 5 Areas of Experience
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-600">
            Explore our specialized footprint across state law enforcement, judiciary, universities, enterprise, and healthcare.
          </p>
        </div>

        {/* Tab pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
          {experienceAreas.map((area, idx) => (
            <button
              key={area.id}
              onClick={() => setActiveAreaIdx(idx)}
              className={`px-4 py-2 rounded-xl border transition-all cursor-pointer font-bold ${
                activeAreaIdx === idx
                  ? 'bg-[#881337] border-[#881337] text-white shadow-sm'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-rose-300'
              }`}
            >
              {area.title}
            </button>
          ))}
        </div>

        {/* Active Area Card */}
        <div className="rounded-3xl bg-white border-2 border-rose-200 p-8 sm:p-10 shadow-xl space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center">
              {React.createElement(experienceAreas[activeAreaIdx].icon, { className: 'w-5 h-5 text-[#881337]' })}
            </div>
            <div>
              <h3 className="font-serif-header font-bold text-xl text-slate-900">
                {experienceAreas[activeAreaIdx].title}
              </h3>
              <span className="font-mono text-xs text-[#881337] font-semibold">
                {experienceAreas[activeAreaIdx].subtitle}
              </span>
            </div>
          </div>

          <p className="font-sans text-sm text-slate-700 leading-relaxed pt-2">
            {experienceAreas[activeAreaIdx].desc}
          </p>

          <div className="space-y-2 pt-2 border-t border-rose-100">
            <span className="font-mono text-[11px] uppercase font-bold text-slate-500 block">
              Key Contributions &bull; Deliverables:
            </span>
            {experienceAreas[activeAreaIdx].points.map((pt, pIdx) => (
              <div key={pIdx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 8. PARTNERS: 54 COLLEGES & 7 MNCS */}
      <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-xl space-y-8 dark-surface">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="font-mono text-xs text-rose-300 font-bold uppercase tracking-widest">
            INSTITUTIONAL FOOTPRINT
          </span>
          <h2 
            className="font-serif-header font-bold text-2xl sm:text-3xl text-white drop-shadow-md"
            style={{ color: '#FFFFFF' }}
          >
            54 College Partners &amp; 7 Corporate MNC Alliances
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-300">
            From premier autonomous engineering universities to global technology giants.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 font-mono text-xs">
          {PARTNER_INSTITUTIONS.slice(0, 12).map((inst, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
              <span className="text-[10px] text-rose-300 font-bold block">{inst.badge}</span>
              <div className="text-slate-200 font-medium leading-tight">{inst.name}</div>
              <div className="text-[10px] text-slate-400">{inst.location}</div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            to="/institutions-workshops"
            className="btn-burgundy-filled px-6 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center space-x-2 text-white"
          >
            <span>Explore All 54+ Academic Partnerships &amp; Workshops</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>
      </div>

      {/* 9. EXECUTIVE TEAM */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="font-mono text-xs text-[#881337] font-bold uppercase tracking-widest">
            OUR PEOPLE
          </span>
          <h2 className="font-serif-header font-bold text-2xl sm:text-3xl text-slate-900">
            Executive Leadership &amp; Advisory
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {executiveTeam.map((member, idx) => (
            <div key={idx} className="rounded-3xl bg-white border-2 border-rose-200 hover:border-[#881337] p-6 shadow-md hover:shadow-xl transition-all space-y-4">
              <div className="h-44 rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-header font-bold text-lg text-slate-900">{member.name}</h3>
                <div className="font-mono text-xs text-[#881337] font-semibold">{member.role}</div>
                <div className="font-sans text-[11px] text-slate-500 font-medium" dangerouslySetInnerHTML={{ __html: member.credentials }} />
                <p className="font-sans text-xs text-slate-600 pt-1 leading-relaxed">{member.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 10. BOTTOM CTA */}
      <div className="p-8 sm:p-10 rounded-3xl bg-rose-50/60 border-2 border-rose-200 text-center space-y-4">
        <h3 className="font-serif-header font-bold text-2xl text-slate-900">
          Partner with South India’s Most Trusted Cyber Security Firm
        </h3>
        <p className="font-sans text-xs sm:text-sm text-slate-700 max-w-xl mx-auto">
          Whether scoping an enterprise VAPT audit or establishing an on-campus Cyber Center of Excellence, connect directly with Dr. Dinesh Paranthagan.
        </p>
        <button
          onClick={() => onRequestConsultation('Executive Consultation')}
          className="btn-burgundy-filled px-8 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center space-x-2 shadow-lg text-white"
        >
          <Phone className="w-4 h-4 text-white" />
          <span>Book Executive Cyber Consultation</span>
        </button>
      </div>

    </div>
  );
};
