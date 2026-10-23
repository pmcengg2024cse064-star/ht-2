import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  Award,
  Terminal,
  Scale
} from 'lucide-react';
import { PORTFOLIO_ITEMS, SITE_URL } from '../data/cyberData';
import { SEOHead } from '../components/common/SEOHead';

interface PortfolioPageProps {
  onRequestAudit: (serviceTitle?: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onRequestAudit }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fadeIn font-sans text-slate-900">
      
      {/* SEO HEAD */}
      <SEOHead
        title="Cybersecurity Case Studies & Portfolio | Hackup Tech"
        description="Explore Hackup Technology’s proven cybersecurity portfolio: BFSI core audits, police cybercrime triage, and hospital zero-trust defense."
        canonical={`${SITE_URL}/portfolio`}
        primaryKeyword="cybersecurity company India"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Portfolio', url: '/portfolio' }
        ]}
      />

      {/* Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-mono font-bold text-[#881337] shadow-sm">
          <Briefcase className="w-4 h-4 text-[#881337]" />
          <span>VERIFIABLE CASE STUDIES &bull; MEASURABLE SECURITY OUTCOMES</span>
        </div>

        <h1 className="font-serif-header font-black text-3xl sm:text-5xl text-slate-950 tracking-tight leading-tight">
          Proven Enterprise Cybersecurity Portfolio
        </h1>

        <p className="font-sans text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
          From mitigating critical vulnerabilities in core banking ledgers to providing state law enforcement with legally certified digital forensics under Section 65B, explore how Hackup Technology delivers high-assurance defense.
        </p>
      </div>

      {/* Case Studies Grid */}
      <div className="space-y-8">
        {PORTFOLIO_ITEMS.map((item, idx) => (
          <div
            key={item.id}
            className="rounded-3xl bg-white border-2 border-rose-200 hover:border-[#881337] p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-100 pb-4">
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#881337] bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  {item.sector}
                </span>
                <h2 className="font-serif-header font-bold text-2xl text-slate-900 pt-1">
                  {item.title}
                </h2>
              </div>
              <div className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 self-start sm:self-auto">
                {item.outcomeMetric}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Challenge & Solution */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="font-mono text-xs uppercase font-bold text-slate-500">
                    Client &bull; Operational Challenge:
                  </span>
                  <div className="text-xs font-mono text-[#881337] font-bold">
                    {item.clientBadge}
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {item.challenge}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono text-xs uppercase font-bold text-slate-500">
                    Engineered Solution:
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>

              {/* Key Results & Technologies */}
              <div className="space-y-4 bg-rose-50/40 p-6 rounded-2xl border border-rose-200">
                <span className="font-mono text-xs uppercase font-bold text-slate-700 block">
                  Key Verification Results:
                </span>
                <div className="space-y-2">
                  {item.keyResults.map((kr, kIdx) => (
                    <div key={kIdx} className="flex items-start space-x-2.5 text-xs text-slate-800">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{kr}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-rose-200 space-y-1.5">
                  <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                    Technologies &amp; Deliverables:
                  </span>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                    {item.technologiesUsed.map((tech, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <div className="font-mono text-xs text-slate-500">
                <strong>Services Delivered:</strong> {item.servicesDelivered.join(', ')}
              </div>
              <button
                onClick={() => onRequestAudit(item.title)}
                className="btn-burgundy-filled px-6 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 text-white"
              >
                <span>Request Scope for Your Organization</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white text-center space-y-4 dark-surface">
        <h3 
          className="font-serif-header font-bold text-2xl text-white drop-shadow-md"
          style={{ color: '#FFFFFF' }}
        >
          Ready to Elevate Your Security Posture?
        </h3>
        <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Contact our technical team in Ganapathy, Coimbatore for confidential scoping and tailored testing methodologies.
        </p>
        <button
          onClick={() => onRequestAudit('Enterprise VAPT Engagement')}
          className="btn-burgundy-filled px-8 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center space-x-2 text-white"
        >
          <ShieldCheck className="w-4 h-4 text-white" />
          <span>Book Confidential Consultation</span>
        </button>
      </div>

    </div>
  );
};
