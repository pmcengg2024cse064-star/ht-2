import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Search, 
  Server, 
  FileCheck2, 
  Flame, 
  Cpu, 
  FileSearch, 
  Sparkles, 
  ArrowRight, 
  Check, 
  ShieldCheck,
  Building2,
  Lock,
  Phone
} from 'lucide-react';
import { ENTERPRISE_SERVICES, COMPANY_FACTS, SITE_URL } from '../data/cyberData';
import { SEOHead } from '../components/common/SEOHead';

interface ServicesPageProps {
  onRequestAudit: (serviceTitle?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onRequestAudit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const serviceIcons: Record<string, any> = {
    'penetration-testing-vapt': ShieldAlert,
    'vulnerability-management-security-audit': Search,
    'soc-managed-security': Server,
    'grc-compliance-consulting': FileCheck2,
    'red-team-blue-team': Flame,
    'iot-ot-security': Cpu,
    'digital-forensics-cybercrime-investigation': FileSearch,
    'ai-security': Sparkles
  };

  const filteredServices = ENTERPRISE_SERVICES.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.standards.some((std) => std.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fadeIn font-sans text-slate-900">
      
      {/* SEO HEAD */}
      <SEOHead
        title="Cybersecurity Services Coimbatore India | Hackup Tech"
        description="Enterprise cybersecurity services Coimbatore India: VAPT, 24/7 SOC, ISO 27001 GRC consulting, Red Teaming, IoT security & AI defense solutions."
        canonical={`${SITE_URL}/services`}
        primaryKeyword="cybersecurity services Coimbatore India"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' }
        ]}
      />

      {/* Header & Hero */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center space-x-2 text-xs font-mono text-[#881337] font-bold uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4 text-[#881337]" />
          <span>ENTERPRISE SOLUTIONS HUB &bull; ZERO PRODUCTION DOWNTIME</span>
        </div>

        <h1 className="font-serif-header font-extrabold text-3xl sm:text-5xl text-slate-950 tracking-tight leading-tight">
          Enterprise Cybersecurity Services in Coimbatore &amp; Pan-India
        </h1>

        <p className="font-sans text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
          High-assurance offensive penetration testing, 24/7 managed SOC monitoring, regulatory GRC compliance, and emergency incident response designed for BFSI, healthcare, and software product enterprises.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto pt-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services by keyword, standard (e.g. VAPT, ISO, SOC)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-300 focus:border-[#881337] focus:ring-1 focus:ring-[#881337] outline-none text-xs font-mono"
            />
          </div>
        </div>
      </div>

      {/* 8 Services Grid (White and Burgundy Styling) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredServices.map((srv) => {
          const IconComponent = serviceIcons[srv.id] || ShieldAlert;
          return (
            <div
              key={srv.id}
              className="rounded-3xl bg-white border-2 border-rose-200 hover:border-[#881337] p-6 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <IconComponent className="w-5 h-5 text-[#881337]" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-50 text-[#881337] border border-rose-200">
                    {srv.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h2 className="font-serif-header font-bold text-lg text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                    <Link to={`/services/${srv.id}`}>
                      {srv.shortTitle}
                    </Link>
                  </h2>
                  <p className="font-sans text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-rose-100">
                  <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                    Deliverables &bull; Turnaround
                  </span>
                  <div className="text-[11px] font-mono text-slate-700">
                    {srv.turnaroundDays} &bull; Safe-to-Host Certificate
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-2">
                <Link
                  to={`/services/${srv.id}`}
                  className="btn-burgundy-filled w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-md hover:scale-101 text-white"
                >
                  <span>View Service Scope</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Emergency Banner */}
      <div className="rounded-3xl bg-rose-50/70 border-2 border-rose-200 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-red-700 uppercase">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
            <span>24/7 INCIDENT HOTLINE ACTIVE</span>
          </div>
          <h3 className="font-serif-header font-bold text-2xl text-slate-900">
            Experiencing an Active Security Incident or Breach?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-slate-700 max-w-xl">
            Our DFIR emergency triage team activates within 90 minutes across Coimbatore and Pan-India to isolate ransomware and preserve Section 65B digital evidence.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <a
            href={`tel:${COMPANY_FACTS.phones[0].replace(/\s+/g, '')}`}
            className="btn-burgundy-filled px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-lg text-white"
          >
            <Phone className="w-4 h-4 text-white" />
            <span>Call Hotline: {COMPANY_FACTS.phones[0]}</span>
          </a>
          <button
            onClick={() => onRequestAudit('Emergency Incident Response Consultation')}
            className="px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 transition-colors cursor-pointer"
          >
            Request Rapid Scoping
          </button>
        </div>
      </div>

    </div>
  );
};
