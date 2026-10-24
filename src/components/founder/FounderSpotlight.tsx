import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  Building2, 
  GraduationCap, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Quote, 
  Mail, 
  Phone,
  FileCheck2,
  Download
} from 'lucide-react';
import { FOUNDER_PROFILE } from '../../data/cyberData';

interface FounderSpotlightProps {
  onBookConsultation?: () => void;
}

export const FounderSpotlight: React.FC<FounderSpotlightProps> = ({ 
  onBookConsultation 
}) => {
  return (
    <section id="founder" className="relative py-16 overflow-hidden">
      
      {/* Background ambient halos */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[300px] bg-[#D4AF37]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Executive Profile Container */}
        <div className="relative rounded-3xl bg-white border-2 border-amber-400/50 hover:border-amber-500 p-6 sm:p-10 lg:p-12 shadow-xl transition-all duration-300">
          
          {/* Subtle top indicator line */}
          <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Portrait & Executive Credentials Badge */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              
              <div className="relative inline-block mx-auto lg:mx-0 group">
                {/* 3D Gold Accent Frame with Aspect Ratio for Executive Portrait */}
                <div className="w-64 sm:w-72 lg:w-80 h-80 sm:h-96 rounded-3xl p-1.5 bg-gradient-to-b from-[#D4AF37] via-[#C4A77D] to-[#881337] shadow-xl shadow-amber-500/10 mx-auto group-hover:scale-102 transition-transform duration-500">
                  <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-900 flex items-center justify-center relative">
                    <img
                      src="/images/founder_dinesh.jpg"
                      alt="Dr. Dinesh Paranthagan - Founder & CEO Hackup Technology"
                      className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Elegant lower gradient overlay with caption */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5 text-left">
                      <span className="font-serif-header font-bold text-xl text-white drop-shadow-md">
                        {FOUNDER_PROFILE.name}
                      </span>
                      <span className="font-mono text-xs text-amber-300 font-semibold tracking-wide">
                        {FOUNDER_PROFILE.qualifications} • Founder &amp; CEO
                      </span>
                    </div>
                  </div>
                </div>

                {/* Verified Leadership Float Badge */}
                <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 bg-amber-50 border border-amber-300 px-4 py-1.5 rounded-full shadow-md flex items-center space-x-1.5 whitespace-nowrap">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span className="font-mono text-[10px] uppercase font-bold text-amber-950 tracking-wider">
                    POLICE ADVISOR &amp; PATENT HOLDER
                  </span>
                </div>
              </div>

              {/* Quick Stat Pill Highlights */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs text-left">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">
                    Trained Workforce
                  </span>
                  <span className="text-lg font-bold text-amber-700 font-display">
                    {FOUNDER_PROFILE.stats.studentsTrained}
                  </span>
                  <span className="text-[10px] text-slate-500 block">National Cyber Defenders</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">
                    Enterprise Audits
                  </span>
                  <span className="text-lg font-bold text-amber-700 font-display">
                    {FOUNDER_PROFILE.stats.auditsCompleted}
                  </span>
                  <span className="text-[10px] text-slate-500 block">VAPT &amp; Banking Scopes</span>
                </div>
              </div>

            </div>

            {/* Right Column: Bio, Vision Quote, Milestone Badges */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-300">
                  <Award className="w-3.5 h-3.5 text-amber-700" />
                  <span>EXECUTIVE LEADERSHIP PROFILE</span>
                </div>

                <h3 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900">
                  Dinesh Paranthagan <span className="text-sm font-mono font-normal text-slate-500">M.C.A., Ph.D.</span>
                </h3>

                <p className="font-mono text-xs sm:text-sm text-amber-700 font-semibold">
                  Founder &amp; CEO, Hackup Technology | Secretary General – TANCCAO
                </p>
              </div>

              {/* Gold Vision Quote */}
              <div className="relative p-5 rounded-2xl bg-amber-50/70 border-l-4 border-amber-500 border-y border-r border-amber-300/60 shadow-inner space-y-2">
                <Quote className="w-6 h-6 text-amber-500/40 absolute top-3 right-3" />
                <p className="font-serif-display italic text-sm sm:text-base text-slate-800 leading-relaxed">
                  "{FOUNDER_PROFILE.visionQuote}"
                </p>
                <div className="font-mono text-[11px] text-amber-800 font-bold tracking-wider text-right">
                  — Dinesh Paranthagan
                </div>
              </div>

              {/* Bio Narrative */}
              <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                {FOUNDER_PROFILE.overview}
              </p>

              {/* Key Institutional & Law Enforcement Credentials */}
              <div className="space-y-2.5 pt-2">
                <div className="font-mono text-[11px] uppercase font-bold text-slate-600 tracking-wider">
                  Verified Government &amp; Academic Footprint:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {FOUNDER_PROFILE.keyContributions.slice(0, 4).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
                    >
                      <div className="font-serif-header font-bold text-xs text-slate-900 flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </div>
                      <p className="font-sans text-[11px] text-slate-600 leading-snug line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions & Direct Connect */}
              <div className="pt-4 flex flex-col sm:flex-row flex-wrap items-center gap-3">
                <a
                  href="/downloads/Dinesh_Paranthagan_Executive_Profile.pdf"
                  download="Dinesh_Paranthagan_Executive_Profile.pdf"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-[#881337] hover:bg-[#5B0E1B] text-white transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md hover:scale-102"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Download Entire Profile (PDF)</span>
                </a>

                <a
                  href="https://linkedin.com/in/dinesh-paranthagan"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto btn-gold-filled px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-xl"
                >
                  <span>Connect on LinkedIn</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={onBookConsultation}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-700" />
                  <span>Book Executive Consultation</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
