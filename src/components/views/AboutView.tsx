import React from 'react';
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

interface AboutViewProps {
  onOpenDisclosure: () => void;
  onRequestConsultation: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onOpenDisclosure,
  onRequestConsultation,
}) => {
  return (
    <div className="space-y-16 animate-fadeIn pb-16">
      
      {/* About Dedicated Hero */}
      <section className="relative pt-12 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1A0D30] border border-[#C4A77D]/40 shadow-xl backdrop-blur-xl">
            <Building className="w-4 h-4 text-[#C4A77D]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#C4A77D]">
              HEADQUARTERED IN COIMBATORE, TAMIL NADU
            </span>
          </div>

          <h1 className="font-serif-header font-bold text-3xl sm:text-5xl text-[#F8FAFC] tracking-wide leading-tight">
            About <span className="text-gold-pure">Hackup Technology</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#A79AB2] max-w-2xl mx-auto leading-relaxed">
            Bridging elite offensive cybersecurity consulting with world-class EC-Council accredited training from Coimbatore.
          </p>
        </div>
      </section>

      {/* Main Company Story & Accreditation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 luxury-glass-card rounded-3xl p-8 sm:p-10 space-y-5">
            <div className="font-mono text-xs text-[#C4A77D] uppercase tracking-widest">
              OUR MISSION &amp; HERITAGE
            </div>
            <h3 className="font-serif-header font-bold text-2xl sm:text-3xl text-[#F8FAFC]">
              Enterprise Defense Driven by Active Practitioners
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#A79AB2] leading-relaxed">
              Founded in 2013 in Coimbatore, Hackup Technology Pvt Ltd has grown to become Tamil Nadu's leading authority on high-assurance vulnerability assessments, cloud DevSecOps audits, and EC-Council certified education.
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#A79AB2] leading-relaxed">
              Unlike traditional IT training institutes or automated scanning shops, every service and course at Hackup Technology is led by practicing red team consultants who discover 0-day exploits and triage live ransomware attacks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              {[
                'Official EC-Council ATC Partner',
                'ISO 27001 Aligned Security Practices',
                'Host of DEFCON Coimbatore Chapter',
                '1,000+ Placed Cyber Alumni in MNCs',
              ].map((point, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs font-mono text-[#E2E8F0]">
                  <CheckCircle2 className="w-4 h-4 text-[#C4A77D] shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {/* Physical Campus Address Card */}
            <div className="luxury-glass-card rounded-3xl p-7 space-y-4 font-mono text-xs text-[#E2E8F0]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-[#C4A77D] font-bold uppercase tracking-wider">
                  OFFICIAL CAMPUS
                </span>
                <MapPin className="w-4 h-4 text-[#C4A77D]" />
              </div>

              <div className="font-sans text-sm text-[#F8FAFC] leading-relaxed">
                Hackup Technology Pvt Ltd<br />
                No.4, First Street, Sri Venkatesapuram,<br />
                Ganapathy, Coimbatore - 641006,<br />
                Tamil Nadu, India.
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center space-x-2 text-xs">
                  <Phone className="w-3.5 h-3.5 text-[#C4A77D]" />
                  <span>+91 93620 12339 / +91 96262 15976</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <Mail className="w-3.5 h-3.5 text-[#C4A77D]" />
                  <span>info@hackuptechnology.com</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Ganapathy+Coimbatore"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold-outline w-full py-2.5 rounded-xl text-xs font-mono font-semibold flex items-center justify-center space-x-1.5"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Responsible Disclosure Quick Card */}
            <div className="p-6 rounded-3xl bg-[#1A0D30]/80 border border-[#C4A77D]/30 space-y-3 font-mono text-xs">
              <div className="text-[#C4A77D] font-bold uppercase">Safe Harbor &amp; Disclosure</div>
              <p className="font-sans text-xs text-[#A79AB2]">
                We maintain a strict Responsible Vulnerability Disclosure policy for security researchers and ethical hackers.
              </p>
              <button
                onClick={onOpenDisclosure}
                className="text-[#C4A77D] font-semibold hover:underline cursor-pointer"
              >
                Read Disclosure Guidelines →
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
