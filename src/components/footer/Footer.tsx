import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  Lock, 
  ArrowUpRight, 
  ShieldCheck, 
  Scale, 
  Sparkles, 
  Building2, 
  GraduationCap, 
  Users,
  Briefcase,
  Layers,
  Terminal,
  HelpCircle
} from 'lucide-react';
import { COMPANY_FACTS } from '../../data/cyberData';

interface FooterProps {
  onRequestConsultation: () => void;
  onOpenDisclosure: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onRequestConsultation,
  onOpenDisclosure,
}) => {
  const location = useLocation();
  const isCoursesPage = location.pathname.startsWith('/courses');
  const isServicesPage = location.pathname.startsWith('/services');

  // -------------------------------------------------------------------------
  // 1. DEDICATED SERVICES FOOTER (Tailored for CISOs, CTOs & Enterprise Clients)
  // -------------------------------------------------------------------------
  if (isServicesPage) {
    return (
      <footer className="relative bg-slate-100 border-t border-slate-200 text-slate-600 font-sans pt-16 pb-12 overflow-hidden">
        {/* Top Subtle Burgundy Line with Executive Amber Sheen */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#881337] to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main 4-Column Enterprise Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-300">
            
            {/* Column 1 — Hackup Cyber Defense (Enterprise Authority) */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white p-1">
                  <img
                    src="/images/hackup_logo.png"
                    alt="Hackup Technology Official Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-serif-header font-extrabold text-base tracking-wider text-slate-900">
                      HACKUP
                    </span>
                    <span className="font-serif-header font-bold text-xs tracking-widest text-[#881337]">
                      SERVICES
                    </span>
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                    Cyber Defense &amp; VAPT
                  </div>
                </div>
              </Link>
              
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Sovereign offensive cyber defense firm delivering practitioner-led VAPT, 24/7 Managed SOC operations, ISO 27001 / DPDP compliance audits with TÜV SÜD association, and digital forensics pan-India.
              </p>

              <div className="flex flex-col space-y-1.5 pt-1">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[10px] font-mono font-bold text-[#881337]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#881337]" />
                  <span>TÜV SÜD Assured Audit Partner</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-mono font-bold text-slate-700">
                  <Award className="w-3.5 h-3.5 text-[#881337]" />
                  <span>Dual Indian Patent Holder &bull; 13+ Yrs</span>
                </span>
              </div>
            </div>

            {/* Column 2 — Enterprise Capabilities */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[#881337] font-mono text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#881337]" />
                <span>Enterprise Capabilities</span>
              </div>
              
              <ul className="space-y-2 text-xs font-sans font-medium">
                <li>
                  <Link to="/services/penetration-testing-vapt" className="hover:text-slate-950 transition-colors">
                    Penetration Testing (VAPT - Web, Mobile, API)
                  </Link>
                </li>
                <li>
                  <Link to="/services/soc-managed-security" className="hover:text-slate-950 transition-colors">
                    24/7 Managed SOC &amp; Threat Detection
                  </Link>
                </li>
                <li>
                  <Link to="/services/grc-compliance-consulting" className="hover:text-slate-950 transition-colors">
                    ISO 27001, SOC 2 &amp; DPDP Act Compliance
                  </Link>
                </li>
                <li>
                  <Link to="/services/red-team-blue-team" className="hover:text-slate-950 transition-colors">
                    Red Team vs Blue Team Adversary Emulation
                  </Link>
                </li>
                <li>
                  <Link to="/services/digital-forensics-cybercrime-investigation" className="hover:text-slate-950 transition-colors">
                    Digital Forensics &amp; Sec 65B Investigation
                  </Link>
                </li>
                <li>
                  <Link to="/services/iot-ot-security" className="hover:text-slate-950 transition-colors">
                    IoT, Firmware &amp; SCADA / OT Security
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-[#881337] hover:underline font-mono font-bold mt-1 block">
                    &rarr; View All 8 Enterprise Practice Areas
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 — Governance, Risk & Assurance */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider">
                <Scale className="w-4 h-4 text-[#881337]" />
                <span>Governance &amp; Assurance</span>
              </div>
              
              <ul className="space-y-2 text-xs font-sans font-medium">
                <li>
                  <a href="/services#process" className="hover:text-slate-950 transition-colors">
                    5-Stage Safe-to-Host Delivery Lifecycle
                  </a>
                </li>
                <li>
                  <a href="/services#why-hackup" className="hover:text-slate-950 transition-colors">
                    Why Enterprises Choose Hackup
                  </a>
                </li>
                <li>
                  <a href="/services#industries" className="hover:text-slate-950 transition-colors">
                    Industries We Defend (BFSI, Health, Gov)
                  </a>
                </li>
                <li>
                  <a href="/services#faqs" className="hover:text-slate-950 transition-colors">
                    Engagement &amp; Scoping FAQs
                  </a>
                </li>
                <li>
                  <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 mt-1">
                    ✓ Production-Safe Mutual NDA Included
                  </div>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onRequestConsultation}
                    className="text-[#881337] hover:underline font-mono font-bold mt-1 block text-left cursor-pointer"
                  >
                    &rarr; Request Fast-Track Scoping Call
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4 — Executive Advisory & Direct Scope */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[#881337] font-mono text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>Executive Advisory</span>
              </div>
              
              <div className="space-y-2 text-xs leading-relaxed text-slate-700 font-medium">
                <p>
                  <strong className="text-slate-900">Coimbatore Cyber HQ</strong><br />
                  {COMPANY_FACTS.headquarters.street}, {COMPANY_FACTS.headquarters.area},<br />
                  Coimbatore - 641006, Tamil Nadu.
                </p>

                <div className="space-y-1 pt-1 font-mono text-[11px]">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-[#881337] shrink-0" />
                    <a href="tel:+919597775522" className="hover:text-slate-950 transition-colors font-bold">
                      +91 95977 75522
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-[#881337] shrink-0" />
                    <a href="mailto:info@hackuptechnology.com" className="hover:text-slate-950 transition-colors">
                      info@hackuptechnology.com
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onRequestConsultation}
                    className="btn-burgundy-filled w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-md hover:scale-101 text-white cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span>Schedule Consultation</span>
                  </button>
                </div>

                <div className="pt-1">
                  <Link
                    to="/courses"
                    className="text-[#881337] hover:underline font-mono text-[11px] font-bold block"
                  >
                    &rarr; Looking for Cyber Training? Visit Academy
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row: Verified contact information, Legal, and link to separate Courses Site */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-center md:text-left font-medium">
              <span>&copy; {new Date().getFullYear()} Hackup Technology Pvt Ltd. All Rights Reserved.</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>Production-Safe &bull; NDA Guaranteed</span>
              <span className="hidden sm:inline">&bull;</span>
              <Link to="/courses" className="text-[#881337] hover:underline font-bold">
                Switch to Cybersecurity Training &amp; Labs Portal &rarr;
              </Link>
            </div>

            <div className="flex items-center space-x-4 font-semibold">
              <a
                href="https://www.linkedin.com/company/hackup-technology/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors"
              >
                LinkedIn
              </a>
              <span>&bull;</span>
              <Link to="/privacy-policy" className="hover:text-slate-900 transition-colors">
                Privacy Policy
              </Link>
              <span>&bull;</span>
              <Link to="/terms" className="hover:text-slate-900 transition-colors">
                Terms
              </Link>
              <span>&bull;</span>
              <button
                onClick={onOpenDisclosure}
                className="text-[#881337] hover:underline cursor-pointer"
              >
                Responsible Disclosure
              </button>
            </div>
          </div>

        </div>
      </footer>
    );
  }

  if (isCoursesPage) {
    return (
      <footer className="relative bg-slate-100 border-t border-slate-200 text-slate-600 font-sans pt-16 pb-12 overflow-hidden">
        {/* Top Subtle Burgundy Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#881337] to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main 4-Column Education Layout (Section 14 Specification) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-300">
            
            {/* Column 1 — Hackup Technology */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white p-1">
                  <img
                    src="/images/hackup_logo.png"
                    alt="Hackup Technology"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-serif-header font-extrabold text-base tracking-wider text-slate-900">
                      HACKUP
                    </span>
                    <span className="font-serif-header font-bold text-xs tracking-widest text-[#881337]">
                      ACADEMY
                    </span>
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                    Education &amp; Cyber Labs
                  </div>
                </div>
              </Link>
              
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Offensive-first cybersecurity academy delivering EC-Council accredited training, hands-on cyber range labs, and verified industrial internships led by active red team practitioners.
              </p>

              <div className="pt-1">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[10px] font-mono font-bold text-[#881337]">
                  <Award className="w-3.5 h-3.5 text-[#881337]" />
                  <span>Authorized EC-Council ATC</span>
                </span>
              </div>
            </div>

            {/* Column 2 — Explore */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[#881337] font-mono text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4 text-[#881337]" />
                <span>Explore Learning</span>
              </div>
              
              <ul className="space-y-2 text-xs font-sans font-medium">
                <li>
                  <a href="#featured-courses" className="hover:text-slate-950 transition-colors">
                    Training Catalogue
                  </a>
                </li>
                <li>
                  <a href="#trust-credibility" className="hover:text-slate-950 transition-colors">
                    Why Trust Hackup for Training
                  </a>
                </li>
                <li>
                  <a href="#cyber-labs" className="hover:text-slate-950 transition-colors">
                    Hands-On Cyber Labs
                  </a>
                </li>
                <li>
                  <a href="#learning-journey" className="hover:text-slate-950 transition-colors">
                    The 4-Stage Learning Journey
                  </a>
                </li>
                <li>
                  <Link to="/courses/certified-ethical-hacker-ceh" className="text-[#881337] hover:underline font-mono font-bold mt-1 block">
                    &rarr; Ethical Hacking (CEH v13)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 — For Learners */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-[#881337]" />
                <span>For Learners</span>
              </div>
              
              <ul className="space-y-2 text-xs font-sans font-medium">
                <li>
                  <a href="#featured-courses" className="hover:text-slate-950 transition-colors">
                    Enrolment &amp; Syllabus Information
                  </a>
                </li>
                <li>
                  <a href="#faqs" className="hover:text-slate-950 transition-colors">
                    Learner FAQs
                  </a>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-slate-950 transition-colors">
                    Education Enquiries &amp; Admissions
                  </Link>
                </li>
                <li>
                  <a href="#why-hackup" className="hover:text-slate-950 transition-colors">
                    Why Trust Hackup for Training
                  </a>
                </li>
                <li>
                  <Link to="/courses/cyber-security-internship" className="text-[#881337] hover:underline font-mono font-bold mt-1 block">
                    &rarr; Coimbatore Industrial Internship
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 — For Institutions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[#881337] font-mono text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>For Institutions</span>
              </div>
              
              <ul className="space-y-2 text-xs font-sans font-medium">
                <li>
                  <a href="#colleges" className="hover:text-slate-950 transition-colors">
                    College Training &amp; Campus Bootcamps
                  </a>
                </li>
                <li>
                  <Link to="/institutions-workshops" className="hover:text-slate-950 transition-colors">
                    54+ Partner Colleges &amp; MoUs
                  </Link>
                </li>
                <li>
                  <a href="#colleges" className="hover:text-slate-950 transition-colors">
                    Faculty Development Programmes (FDP)
                  </a>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-slate-950 transition-colors">
                    Discuss Institutional Training
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-[#881337] hover:underline font-mono font-bold mt-1 block">
                    &rarr; Visit Enterprise Services Website
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom row: Verified contact information, Social links, Legal, and link to separate Cybersecurity Services */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-center md:text-left font-medium">
              <span>&copy; {new Date().getFullYear()} Hackup Technology Pvt Ltd. All Rights Reserved.</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>Ganapathy, Coimbatore HQ &bull; +91 95977 75522</span>
              <span className="hidden sm:inline">&bull;</span>
              <Link to="/services" className="text-[#881337] hover:underline font-bold">
                Switch to Cybersecurity Services Site &rarr;
              </Link>
            </div>

            <div className="flex items-center space-x-4 font-semibold">
              <a
                href="https://www.linkedin.com/company/hackup-technology/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors"
              >
                LinkedIn
              </a>
              <span>&bull;</span>
              <a
                href="https://www.instagram.com/hackuptechnology/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors"
              >
                Instagram
              </a>
              <span>&bull;</span>
              <Link to="/privacy-policy" className="hover:text-slate-900 transition-colors">
                Privacy Policy
              </Link>
              <span>&bull;</span>
              <Link to="/terms" className="hover:text-slate-900 transition-colors">
                Terms
              </Link>
            </div>
          </div>

        </div>
      </footer>
    );
  }

  return (
    <footer className="relative bg-slate-100 border-t border-slate-200 text-slate-600 font-sans pt-16 pb-12 overflow-hidden">
      
      {/* Top Subtle Burgundy Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#881337] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Clean Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-300">
          
          {/* Column 1: Hackup Enterprise Services (Burgundy) */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-[#881337] font-mono text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-[#881337]" />
              <span>Enterprise Services</span>
            </div>
            
            <ul className="space-y-2 text-xs font-sans font-medium">
              <li>
                <Link to="/services/penetration-testing-vapt" className="hover:text-slate-950 transition-colors">
                  Penetration Testing (VAPT)
                </Link>
              </li>
              <li>
                <Link to="/services/soc-managed-security" className="hover:text-slate-950 transition-colors">
                  24/7 Managed SOC &amp; SIEM
                </Link>
              </li>
              <li>
                <Link to="/services/grc-compliance-consulting" className="hover:text-slate-950 transition-colors">
                  ISO 27001 &amp; DPDP Compliance
                </Link>
              </li>
              <li>
                <Link to="/services/digital-forensics-cybercrime-investigation" className="hover:text-slate-950 transition-colors">
                  Digital Forensics &amp; Incident Triage (DFIR)
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#881337] hover:underline font-mono font-bold mt-1 block">
                  &rarr; View All 8 Enterprise Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Hackup Academy (Burgundy) */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-[#881337] font-mono text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-[#881337]" />
              <span>Certified Training</span>
            </div>
            
            <ul className="space-y-2 text-xs font-sans font-medium">
              <li>
                <Link to="/courses/certified-ethical-hacker-ceh" className="hover:text-slate-950 transition-colors">
                  Certified Ethical Hacker (CEH v13)
                </Link>
              </li>
              <li>
                <Link to="/courses/cloud-security-engineer-ccse" className="hover:text-slate-950 transition-colors">
                  Cloud Security Engineer (CCSE)
                </Link>
              </li>
              <li>
                <Link to="/courses/devsecops-engineer-ecde" className="hover:text-slate-950 transition-colors">
                  DevSecOps Engineer (ECDE)
                </Link>
              </li>
              <li>
                <Link to="/courses/cyber-security-internship" className="hover:text-slate-950 transition-colors">
                  Coimbatore Industrial Internship
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-[#881337] hover:underline font-mono font-bold mt-1 block">
                  &rarr; View All EC-Council Training
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional, Portfolio & Research */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#881337]" />
              <span>Company &amp; Research</span>
            </div>
            
            <ul className="space-y-2 text-xs font-sans font-medium">
              <li>
                <Link to="/about-us" className="hover:text-slate-950 transition-colors">
                  About Us &amp; Dinesh Paranthagan
                </Link>
              </li>
              <li>
                <Link to="/institutions-workshops" className="hover:text-slate-950 transition-colors">
                  54+ Partner Colleges &amp; Workshops
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-slate-950 transition-colors">
                  Cyber Range Gallery
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-[#881337] hover:underline font-mono font-bold mt-1 block">
                  &rarr; Cybersecurity Threat Research
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Coimbatore HQ Office & Verified Contact */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-[#881337] font-mono text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Coimbatore HQ Office</span>
            </div>
            
            <div className="space-y-2 text-xs leading-relaxed text-slate-700 font-medium">
              <p>
                <strong className="text-slate-900">Hackup Technology Pvt Ltd</strong><br />
                {COMPANY_FACTS.headquarters.street},<br />
                {COMPANY_FACTS.headquarters.area}, {COMPANY_FACTS.headquarters.city} - {COMPANY_FACTS.headquarters.pincode},<br />
                {COMPANY_FACTS.headquarters.state}, {COMPANY_FACTS.headquarters.country}.
              </p>

              <div className="space-y-1 pt-2 font-mono text-[11px]">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#881337] shrink-0" />
                  <a href={`tel:${COMPANY_FACTS.phones[0].replace(/\s+/g, '')}`} className="hover:text-slate-950 transition-colors font-bold">
                    {COMPANY_FACTS.phones[0]}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#881337] shrink-0" />
                  <a href={`tel:${COMPANY_FACTS.phones[1].replace(/\s+/g, '')}`} className="hover:text-slate-950 transition-colors">
                    {COMPANY_FACTS.phones[1]}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-[#881337] shrink-0" />
                  <a href={`mailto:${COMPANY_FACTS.emails[0]}`} className="hover:text-slate-950 transition-colors">
                    {COMPANY_FACTS.emails[0]}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-[#881337] shrink-0" />
                  <a href={`mailto:${COMPANY_FACTS.emails[1]}`} className="text-[#881337] hover:underline transition-colors font-bold">
                    {COMPANY_FACTS.emails[1]}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal Links */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex wrap items-center gap-2 sm:gap-4 text-center md:text-left font-medium">
            <span>&copy; {new Date().getFullYear()} Hackup Technology Pvt Ltd. All Rights Reserved.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>EC-Council Accredited Training Center</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>TANCCAO Secretariat</span>
          </div>

          <div className="flex items-center space-x-4 font-semibold">
            <Link to="/privacy-policy" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link to="/terms" className="hover:text-slate-900 transition-colors">
              Terms of Service
            </Link>
            <span>&bull;</span>
            <button
              onClick={onOpenDisclosure}
              className="text-[#881337] hover:underline cursor-pointer"
            >
              Responsible Disclosure
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
