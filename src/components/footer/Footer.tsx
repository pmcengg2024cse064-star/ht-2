import React from 'react';
import { Link } from 'react-router-dom';
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
  Briefcase
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
              <span>Certified Courses</span>
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
                  &rarr; View All EC-Council Courses
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
                <Link to="/portfolio" className="hover:text-slate-950 transition-colors">
                  Client Portfolio &amp; Case Studies
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
