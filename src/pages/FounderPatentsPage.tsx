import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Scale, 
  GraduationCap, 
  ExternalLink,
  BookOpen,
  Phone,
  Mail
} from 'lucide-react';
import { FOUNDER_PROFILE, CYBER_PATENTS } from '../data/cyberData';
import { PatentsSection } from '../components/founder/PatentsSection';
import { FounderSpotlight } from '../components/founder/FounderSpotlight';

interface FounderPatentsPageProps {
  onRequestAudit: (serviceTitle?: string) => void;
  onBookExecutiveAdvisory: () => void;
}

export const FounderPatentsPage: React.FC<FounderPatentsPageProps> = ({
  onRequestAudit,
  onBookExecutiveAdvisory
}) => {
  return (
    <div className="space-y-16 animate-fadeIn pb-20">
      
      {/* Hero Header */}
      <section className="relative pt-12 pb-8 overflow-hidden text-center space-y-4 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 shadow-sm">
          <Award className="w-4 h-4 text-[#881337]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#881337] font-bold">
            EXECUTIVE LEADERSHIP &amp; PROPRIETARY IP
          </span>
        </div>

        <h1 className="font-serif-header font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.15]">
          Pioneering National Cyber Defense &amp; <span className="text-[#881337]">Patented Innovation</span>
        </h1>

        <p className="font-sans text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Led by Founder &amp; CEO Dr. Dinesh Paranthagan (M.C.A., Ph.D.), Hackup Technology bridges real-world offensive penetration testing, state police cybercrime consulting, and proprietary patented cybersecurity architectures.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
          <button
            onClick={onBookExecutiveAdvisory}
            className="btn-gold-filled px-8 py-4 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center space-x-2 cursor-pointer shadow-xl"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Book Executive Advisory Call</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <a
            href="https://linkedin.com/in/dinesh-paranthagan"
            target="_blank"
            rel="noreferrer"
            className="px-7 py-4 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 transition-all flex items-center space-x-2 shadow-sm"
          >
            <span>LinkedIn Profile</span>
            <ExternalLink className="w-4 h-4 text-slate-600" />
          </a>
        </div>
      </section>

      {/* Embedded Founder Spotlight Component */}
      <FounderSpotlight onBookConsultation={onBookExecutiveAdvisory} />

      {/* Embedded Patents Section */}
      <PatentsSection onRequestAudit={() => onRequestAudit('Patented AI Defense & VAPT')} />

      {/* Law Enforcement & State Cyber Cell Affiliations Deep-Dive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border-2 border-rose-200 hover:border-[#881337] p-8 sm:p-12 space-y-8 shadow-xl transition-all">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="font-mono text-xs uppercase font-bold text-[#881337] tracking-widest">
              STATE &amp; NATIONAL CYBERCRIME IMPACT
            </span>
            <h3 className="font-serif-header font-bold text-2xl sm:text-3xl text-slate-900">
              Law Enforcement &amp; Government Intelligence Support
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-600">
              Dr. Dinesh Paranthagan and the Hackup Technology technical unit regularly collaborate with law enforcement agencies on high-stakes investigations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-sans">
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#881337]">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="font-serif-header font-bold text-base text-slate-900">
                TN Police Cyber Crime Consultant
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Technical consultation on complex financial cyber frauds, crypto wallet tracking, ransomware source tracing, and preserving legally compliant Section 65B forensic reports.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-sans">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif-header font-bold text-base text-slate-900">
                Secretary General – TANCCAO
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Spearheading the Tamil Nadu Cyber Crime Action Organization (TANCCAO) to coordinate threat alerts across industries, banks, and academic institutions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-sans">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-700">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="font-serif-header font-bold text-base text-slate-900">
                Smart India Hackathon (SIH) Mentor
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Appointed National Mentor guiding university engineering teams on national-grade cyber defense and automated threat classification prototypes for government ministries.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
