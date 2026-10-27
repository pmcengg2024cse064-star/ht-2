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
  ArrowDown,
  Check, 
  CheckCircle2,
  ShieldCheck, 
  Building2, 
  Lock, 
  Phone, 
  Mail, 
  Award, 
  ChevronDown,
  HelpCircle,
  HeartPulse,
  Scale,
  Terminal,
  Shield,
  Clock,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { ENTERPRISE_SERVICES, COMPANY_FACTS, SITE_URL } from '../data/cyberData';
import { SEOHead } from '../components/common/SEOHead';

interface ServicesPageProps {
  onRequestAudit: (serviceTitle?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onRequestAudit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'offensive' | 'defensive' | 'compliance' | 'specialized'>('all');
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(0);

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

  // Service Categorization for quick filtering
  const serviceCategories: Record<string, 'offensive' | 'defensive' | 'compliance' | 'specialized'> = {
    'penetration-testing-vapt': 'offensive',
    'red-team-blue-team': 'offensive',
    'soc-managed-security': 'defensive',
    'vulnerability-management-security-audit': 'defensive',
    'grc-compliance-consulting': 'compliance',
    'digital-forensics-cybercrime-investigation': 'compliance',
    'iot-ot-security': 'specialized',
    'ai-security': 'specialized'
  };

  const filteredServices = ENTERPRISE_SERVICES.filter((s) => {
    const matchesSearch = 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.standards.some((std) => std.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === 'all' || serviceCategories[s.id] === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (idx: number) => {
    setActiveFaqIdx((prev) => (prev === idx ? null : idx));
  };

  // 3 Core Differentiators as specified by user
  const differentiators = [
    {
      num: '01',
      title: 'Practitioner-led experts',
      desc: 'Our consultants run real pentests, forensics and SOC operations every day, backed by 13+ years of experience and 50+ clients served.',
      icon: Award,
      badge: '13+ YEARS &bull; 50+ CLIENTS',
      highlight: 'Zero junior delegators. Every engagement is guided directly by seasoned red teamers and defense practitioners.'
    },
    {
      num: '02',
      title: 'No lock-in, no packaged boxes',
      desc: 'We scope every VAPT, SOC or audit engagement to your risk, budget and compliance needs, and you stay because of results, not contracts.',
      icon: ShieldCheck,
      badge: 'CUSTOM RISK-BASED SCOPING',
      highlight: 'Tailored test plans with transparent pricing, zero shelfware, and flexible milestone-based engagements.'
    },
    {
      num: '03',
      title: 'Assured compliance',
      desc: 'We deliver ISO audits and security assessments in association with TÜV SÜD giving you trusted, audit-ready reports.',
      icon: FileCheck2,
      badge: 'TÜV SÜD ASSOCIATION',
      highlight: 'Globally recognized compliance reports and Safe-to-Host attestation trusted across banks, enterprise boards, and regulators.'
    }
  ];

  // 6 Target Industries We Serve
  const industries = [
    {
      name: 'BFSI & Fintech',
      icon: Building2,
      badge: 'RBI & SEBI MANDATES',
      desc: 'High-assurance penetration testing for core banking APIs, mobile payments, and payment switches with guaranteed zero operational downtime.',
      regulations: ['RBI Master Directions', 'SEBI CS Framework', 'PCI-DSS v4.0']
    },
    {
      name: 'Healthcare IT & Hospitals',
      icon: HeartPulse,
      badge: 'DPDP ACT & HIPAA',
      desc: 'Hardening multi-cloud diagnostic repositories, hospital PACS imaging networks, and patient health portals against ransomware extortion.',
      regulations: ['DPDP Act 2023', 'HIPAA Security Rule', 'ISO 27799']
    },
    {
      name: 'Manufacturing & Industrial IoT',
      icon: Cpu,
      badge: 'IEC 62443 & OT DEFENSE',
      desc: 'Firmware reverse engineering, SCADA network segmentation, and PLC protocol analysis to secure critical shop-floor manufacturing assets.',
      regulations: ['IEC 62443', 'NIST SP 800-82', 'ISO 27001']
    },
    {
      name: 'SaaS & Cloud Platforms',
      icon: Server,
      badge: 'SOC 2 & ISO 27001',
      desc: 'Multi-cloud perimeter defense, Kubernetes cluster CIS benchmarks, and business logic API fuzzing for high-growth tech platforms.',
      regulations: ['SOC 2 Type II', 'ISO/IEC 27001:2022', 'OWASP Top 10']
    },
    {
      name: 'Higher Education & CoE',
      icon: Terminal,
      badge: '54+ UNIVERSITIES',
      desc: 'Installing on-campus Cyber Range sandbox labs, academic cyber curriculum modernization, and campus threat isolation for 54+ universities.',
      regulations: ['UGC/AICTE Guidelines', 'EC-Council Standards', 'ISO 27001']
    },
    {
      name: 'Law Enforcement & Govt',
      icon: Scale,
      badge: 'SECTION 65B EVIDENCE',
      desc: 'Emergency forensic incident response, hardware write-blocker disk imaging, and Section 65B electronic evidence dossiers for judicial courts.',
      regulations: ['Indian Evidence Act (65B)', 'IT Act 2000', 'CERT-In Directives']
    }
  ];

  // 5-Stage Engagement Process
  const engagementSteps = [
    {
      num: '01',
      title: 'Consultation & Scoping',
      subtitle: 'Threat Modeling & Boundaries',
      desc: 'We conduct an in-depth kickoff to establish rules of engagement, verify target domains and IPs, and design testing boundaries with zero disruption to live operations.'
    },
    {
      num: '02',
      title: 'Controlled Exploitation',
      subtitle: 'Manual Exploit Verification',
      desc: 'Our offensive engineers simulate real-world adversaries using manual testing and PoC exploit chains, weeding out false positives from automated scanners.'
    },
    {
      num: '03',
      title: 'Reporting & CVSS Scoring',
      subtitle: 'Executive & Developer Dossiers',
      desc: 'We deliver dual reports: an executive summary with business impact metrics for leadership and line-by-line code remediation blueprints for developers.'
    },
    {
      num: '04',
      title: 'Remediation & Free Retesting',
      subtitle: '30-Day Patch Verification',
      desc: 'Our practitioners consult directly with your engineering team to guide patch deployment, backed by a complimentary 30-day complete re-audit.'
    },
    {
      num: '05',
      title: 'Attestation & Ongoing Defense',
      subtitle: 'Safe-to-Host & 24/7 Monitoring',
      desc: 'We issue your certified Safe-to-Host Certificate accepted by regulators, with seamless transition to continuous SOC and vulnerability management.'
    }
  ];

  // Comprehensive Services FAQ
  const serviceFaqs = [
    {
      q: 'How does Hackup ensure zero downtime during active penetration testing on live systems?',
      a: 'We operate under strict, pre-agreed Rules of Engagement (RoE). Our offensive engineers throttle request rates, avoid unverified denial-of-service payloads, use controlled test user accounts, and execute intrusive exploit verifications only during negotiated maintenance windows.'
    },
    {
      q: 'What is the turnaround time for a complete enterprise security audit?',
      a: 'Standard enterprise VAPT engagements take 5 to 10 business days depending on scope (number of endpoints, APIs, and IP blocks). Initial critical findings are reported within 24 hours of discovery so your developers can patch immediately without waiting for the final report.'
    },
    {
      q: 'Is Hackup’s Safe-to-Host Certificate accepted by external regulators and enterprise boards?',
      a: 'Yes. Our Safe-to-Host attestation certificates are recognized and accepted across Indian and international regulatory bodies including RBI, SEBI, CERT-In, ISO/IEC 27001 auditors, and institutional procurement teams.'
    },
    {
      q: 'How do you collaborate with TÜV SÜD for ISO audits and certifications?',
      a: 'In association with TÜV SÜD, we provide end-to-end ISO 27001, ISO 27701, and SOC 2 readiness audits, internal controls verification, and third-party audit facilitation, ensuring your organization receives globally credible, audit-ready compliance documentation.'
    },
    {
      q: 'What is included in the complimentary 30-day re-testing window?',
      a: 'Every enterprise VAPT and security audit includes one full round of re-testing within 30 days of initial report delivery. We re-test all discovered vulnerabilities to confirm patches are effective and issue an updated zero-vulnerability attestation at no extra cost.'
    },
    {
      q: 'How does Hackup structure pricing without rigid contracts or packaged lock-ins?',
      a: 'We evaluate each engagement based on your exact attack surface, compliance mandates, and risk profile. We offer one-time audit engagements, milestone-based scopes, and flexible retainers without mandatory multi-year commitments.'
    }
  ];

  return (
    <div className="space-y-16 animate-fadeIn font-sans text-slate-900 pb-20">
      
      {/* 1. SEO HEAD */}
      <SEOHead
        title="Cybersecurity Services | VAPT, SOC, Audits & Forensics | Hackup Tech"
        description="Comprehensive cybersecurity services by Hackup Technology: VAPT, 24/7 Managed SOC, TÜV SÜD ISO audits, Digital Forensics, and Red Teaming with zero downtime guarantee."
        canonical={`${SITE_URL}/services`}
        primaryKeyword="cybersecurity services Coimbatore India"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' }
        ]}
      />


      {/* 3. HERO SECTION: SEAMLESS FULL-BLEED HERO WITH AMBIENT GRADIENT & TECH GRID */}
      <section id="overview" className="relative pt-8 pb-12 lg:pt-12 lg:pb-16 overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9] border-b border-rose-100/60">
        
        {/* Subtle Tech Diagonal Grid & Ambient Layer Scoped to Hero */}
        <div 
          className="absolute inset-0 pointer-events-none -z-10 opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(15, 23, 42, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(15, 23, 42, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px'
          }}
        />

        {/* Ambient Radial Burgundy Glows */}
        <div className="absolute right-0 lg:right-8 top-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-[#881337]/10 blur-[140px] rounded-full pointer-events-none -z-10" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Category Pill Tag */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#881337]" />
                <span>FOR BUSINESSES &amp; ENTERPRISES</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="font-serif-header font-black text-3xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight leading-none">
                  Cybersecurity <span className="text-[#881337]">Services</span>
                </h1>
                <div className="font-serif-header font-bold text-xl sm:text-2xl lg:text-3xl text-slate-800">
                  VAPT, SOC, Audits &amp; Forensics
                </div>
              </div>

              {/* Tagline from User Image */}
              <p className="font-sans text-base sm:text-lg font-semibold text-rose-950 italic">
                Identify threats. Strengthen defences. Protect what matters.
              </p>

              {/* Brief Introduction */}
              <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl">
                Empowering modern enterprises with high-assurance offensive security, 24/7 Managed SOC surveillance, and rigorous regulatory compliance. From zero-downtime penetration testing to TÜV SÜD-backed ISO audits, Hackup Technology engineers sovereign resilience against today's weaponized threat landscape.
              </p>

              {/* Feature Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs text-slate-800 max-w-2xl">
                <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-white border border-rose-200/80 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#881337] shrink-0" />
                  <span className="font-medium text-slate-800">100% Manual Exploit Verification</span>
                </div>
                <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-white border border-rose-200/80 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#881337] shrink-0" />
                  <span className="font-medium text-slate-800">Zero Production Downtime</span>
                </div>
                <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-white border border-rose-200/80 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#881337] shrink-0" />
                  <span className="font-medium text-slate-800">Free 30-Day Retesting Included</span>
                </div>
                <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-white border border-rose-200/80 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#881337] shrink-0" />
                  <span className="font-medium text-slate-800">Official Safe-to-Host Certification</span>
                </div>
              </div>

              {/* Consultation CTA Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onRequestAudit('Hero Get Protected CTA')}
                  className="btn-burgundy-gloss inline-flex items-center space-x-2.5 px-8 py-3.5 rounded-full bg-[#881337] hover:bg-[#6e0f2c] text-white text-sm font-semibold shadow-lg shadow-[#881337]/25 transition-all duration-200 hover:-translate-y-0.5 group cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Get Protected</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#services-catalog"
                  className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-white hover:bg-rose-50/60 border-2 border-rose-200 text-slate-800 hover:text-[#881337] text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-sm"
                >
                  <span>Explore All 8 Services</span>
                  <ArrowDown className="w-4 h-4 text-[#881337]" />
                </a>
              </div>

            </div>

            {/* Right Visual Column (Attached Cybersecurity Services Visual) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-full max-w-[440px]">
                
                {/* 3D Burgundy Gradient Frame */}
                <div className="w-full aspect-[2/3] rounded-3xl p-2 bg-gradient-to-b from-[#881337] via-[#9F1239] to-rose-300 shadow-2xl shadow-rose-950/25 group-hover:scale-101 transition-transform duration-500">
                  <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-950 relative shadow-inner">
                    <img
                      src="/images/cybersecurity_services_hero.jpg"
                      alt="Cybersecurity Services - VAPT, SOC, Audits & Forensics - Hackup Technology"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                      loading="eager"
                    />
                  </div>
                </div>

                {/* Floating Verified Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white border-2 border-[#881337] px-5 py-2 rounded-full shadow-xl flex items-center space-x-2 whitespace-nowrap z-10">
                  <Award className="w-4 h-4 text-[#881337]" />
                  <span className="font-mono text-xs uppercase font-bold text-slate-900 tracking-wider">
                    TÜV SÜD Audit Partner &bull; CERT-In Aligned
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT HACKUP SERVICES SECTION */}
      <section id="about-services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-3xl bg-white border-2 border-rose-200 p-8 sm:p-12 lg:p-14 shadow-xl relative overflow-hidden space-y-8">
          
          {/* Ambient Burgundy Glow Background Layers */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#881337]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-rose-100">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-mono font-bold uppercase tracking-widest shadow-sm" style={{ color: '#881337' }}>
                <Shield className="w-4 h-4" style={{ color: '#881337' }} />
                <span>ABOUT HACKUP SERVICES &bull; COIMBATORE, TAMIL NADU</span>
              </div>
              <h2 className="font-serif-header font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight" style={{ color: '#0f172a' }}>
                About Our <span style={{ color: '#881337' }}>Cybersecurity Services</span>
              </h2>
              <p className="font-sans text-xs sm:text-sm font-mono font-medium" style={{ color: '#475569' }}>
                Protecting businesses from real-world cyber threats with measurable, practitioner-led defense.
              </p>
            </div>

            {/* Art of Security Creed Pill */}
            <div className="shrink-0">
              <div className="inline-flex flex-col items-start sm:items-end p-4 rounded-2xl bg-gradient-to-br from-rose-50 via-white to-amber-50/50 border-2 border-[#881337]/20 shadow-md">
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest" style={{ color: '#881337' }}>
                  Our Service Creed
                </span>
                <span className="font-serif-header font-black text-base sm:text-lg mt-0.5" style={{ color: '#0f172a' }}>
                  Art of Security: <span style={{ color: '#881337' }}>practical protection you can measure.</span>
                </span>
              </div>
            </div>
          </div>

          {/* Core Story Statement & Practitioner Credentials */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (Exact User Text Structured Elegantly) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="p-6 sm:p-7 rounded-2xl border border-rose-200 leading-relaxed space-y-4" style={{ backgroundColor: '#fff5f7' }}>
                <p className="font-sans text-base sm:text-lg font-medium leading-relaxed" style={{ color: '#0f172a' }}>
                  <strong className="font-bold" style={{ color: '#881337' }}>Hackup Technology</strong> is a Coimbatore-based cybersecurity company that protects businesses from real-world cyber threats. Our team of practitioners has 13+ years of hands-on experience in vulnerability assessment and penetration testing (VAPT), SOC implementation, security audits, GRC and ISO 27001 consulting, digital forensics and cybercrime investigation support.
                </p>
                <p className="font-sans text-sm sm:text-base leading-relaxed" style={{ color: '#334155' }}>
                  We test the way attackers think, give honest advice, and scope every engagement to your risk, budget and compliance needs, with no long-term lock-in. We serve corporates, healthcare IT and growing businesses across Tamil Nadu and India.
                </p>
              </div>

              {/* 3 Core Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-rose-200/90 shadow-xs space-y-1.5 hover:border-[#881337] transition-colors">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 shrink-0" style={{ color: '#881337' }} />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: '#881337' }}>Adversarial Mindset</span>
                  </div>
                  <p className="text-xs font-medium leading-snug" style={{ color: '#334155' }}>
                    We test the way attackers think to identify critical vulnerabilities before criminals do.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-rose-200/90 shadow-xs space-y-1.5 hover:border-[#881337] transition-colors">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: '#881337' }} />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: '#881337' }}>No Long-Term Lock-In</span>
                  </div>
                  <p className="text-xs font-medium leading-snug" style={{ color: '#334155' }}>
                    Transparent, risk-based scoping customized to your risk, budget, and compliance mandates.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-rose-200/90 shadow-xs space-y-1.5 hover:border-[#881337] transition-colors">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 shrink-0" style={{ color: '#881337' }} />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: '#881337' }}>Tamil Nadu &amp; India</span>
                  </div>
                  <p className="text-xs font-medium leading-snug" style={{ color: '#334155' }}>
                    Trusted by corporates, healthcare IT, and growing enterprises across the nation.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Fast Facts Card - Fully High Contrast Visible */}
            <div className="lg:col-span-4 space-y-4">
              <div 
                className="p-6 rounded-2xl shadow-xl space-y-5 border border-rose-900/40"
                style={{ background: 'linear-gradient(135deg, #881337 0%, #9F1239 50%, #881337 100%)', color: '#ffffff' }}
              >
                <div className="space-y-1.5">
                  <div 
                    className="font-mono text-xs font-bold uppercase tracking-wider"
                    style={{ color: '#fed7aa' }}
                  >
                    Cybersecurity Company &bull; HQ
                  </div>
                  <div className="font-serif-header font-bold text-xl tracking-wide" style={{ color: '#ffffff' }}>
                    Coimbatore, Tamil Nadu
                  </div>
                  <div 
                    className="text-xs font-medium leading-relaxed"
                    style={{ color: '#ffffff' }}
                  >
                    VAPT &bull; SOC &bull; GRC &bull; ISO 27001 &bull; Forensics
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3.5 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}>
                  <div>
                    <div className="font-serif-header font-black text-2xl sm:text-3xl" style={{ color: '#ffffff' }}>13+</div>
                    <div className="text-xs font-mono font-medium mt-0.5" style={{ color: '#fed7aa' }}>
                      Years Experience
                    </div>
                  </div>
                  <div>
                    <div className="font-serif-header font-black text-2xl sm:text-3xl" style={{ color: '#ffffff' }}>Zero</div>
                    <div className="text-xs font-mono font-medium mt-0.5" style={{ color: '#fed7aa' }}>
                      Vendor Lock-In
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onRequestAudit('About Section Engagement Scoping')}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-rose-50 font-bold text-xs uppercase tracking-wider font-mono shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    style={{ color: '#881337' }}
                  >
                    <span>Request Audit Scoping</span>
                    <ArrowRight className="w-3.5 h-3.5" style={{ color: '#881337' }} />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. OUR CYBERSECURITY SERVICES (SEARCH, FILTER & 8 EXPANDED SERVICE CARDS) */}
      <section id="services-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-6">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200">
            <Sparkles className="w-4 h-4 text-[#881337]" />
            <span>FULL-SPECTRUM DEFENSE PORTFOLIO</span>
          </div>

          <h2 className="font-serif-header font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Our Cybersecurity Services
          </h2>

          <p className="font-sans text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From high-assurance offensive ethical hacking to 24/7 managed SOC monitoring and post-incident forensics. Scoped precisely to your risk, budget, and regulatory mandates.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 max-w-4xl mx-auto">
          
          {/* Keyword Search Input */}
          <div className="relative max-w-lg mx-auto">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services by keyword, standard (e.g., VAPT, ISO 27001, SOC, RBI)..."
              className="w-full pl-11 pr-4 py-3 rounded-full border-2 border-rose-200 focus:border-[#881337] focus:ring-2 focus:ring-[#881337]/20 outline-none text-xs font-mono bg-white shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl border transition-all cursor-pointer font-bold ${
                selectedCategory === 'all'
                  ? 'bg-[#881337] border-[#881337] text-white shadow-sm'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-rose-300'
              }`}
            >
              All Services ({ENTERPRISE_SERVICES.length})
            </button>
            <button
              onClick={() => setSelectedCategory('offensive')}
              className={`px-4 py-2 rounded-xl border transition-all cursor-pointer font-bold ${
                selectedCategory === 'offensive'
                  ? 'bg-[#881337] border-[#881337] text-white shadow-sm'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-rose-300'
              }`}
            >
              Offensive Security (VAPT &amp; Red Team)
            </button>
            <button
              onClick={() => setSelectedCategory('defensive')}
              className={`px-4 py-2 rounded-xl border transition-all cursor-pointer font-bold ${
                selectedCategory === 'defensive'
                  ? 'bg-[#881337] border-[#881337] text-white shadow-sm'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-rose-300'
              }`}
            >
              Blue Team &amp; SOC (24/7 &amp; Audits)
            </button>
            <button
              onClick={() => setSelectedCategory('compliance')}
              className={`px-4 py-2 rounded-xl border transition-all cursor-pointer font-bold ${
                selectedCategory === 'compliance'
                  ? 'bg-[#881337] border-[#881337] text-white shadow-sm'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-rose-300'
              }`}
            >
              GRC &amp; Forensics (ISO &amp; DFIR)
            </button>
            <button
              onClick={() => setSelectedCategory('specialized')}
              className={`px-4 py-2 rounded-xl border transition-all cursor-pointer font-bold ${
                selectedCategory === 'specialized'
                  ? 'bg-[#881337] border-[#881337] text-white shadow-sm'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-rose-300'
              }`}
            >
              IoT &amp; AI Security
            </button>
          </div>
        </div>

        {/* 8 Comprehensive Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {filteredServices.map((srv) => {
            const IconComponent = serviceIcons[srv.id] || ShieldAlert;
            return (
              <div
                key={srv.id}
                className="rounded-3xl bg-white border-2 border-rose-200 hover:border-[#881337] p-6 sm:p-7 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1 relative"
              >
                <div className="space-y-4">
                  
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 group-hover:bg-[#881337] flex items-center justify-center text-[#881337] group-hover:text-white transition-all shadow-sm">
                      <IconComponent className="w-6 h-6 transition-colors" />
                    </div>
                    <span className="font-mono text-[9px] uppercase font-bold text-[#881337] px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-right truncate max-w-[130px]">
                      {srv.badge.split('&bull;')[0]}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="font-serif-header font-bold text-lg text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                      {srv.shortTitle}
                    </h3>
                    <p className="font-sans text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>

                  {/* Key Deliverables Checkpoints */}
                  <div className="space-y-1.5 pt-2 border-t border-rose-100">
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                      Key Deliverables:
                    </span>
                    <ul className="space-y-1">
                      {srv.keyDeliverables.slice(0, 2).map((del, dIdx) => (
                        <li key={dIdx} className="flex items-start space-x-1.5 text-[11px] text-slate-700 leading-tight">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Compliance Standards Tags */}
                  <div className="space-y-1.5 pt-2 border-t border-rose-100">
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                      Standards &bull; Compliance
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {srv.standards.slice(0, 2).map((std, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Card Action Buttons */}
                <div className="pt-6 space-y-2">
                  <Link
                    to={`/services/${srv.id}`}
                    className="btn-burgundy-filled w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-md hover:scale-101 text-white"
                  >
                    <span>Explore Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => onRequestAudit(srv.title)}
                    className="w-full py-2 rounded-xl font-mono text-[11px] font-semibold text-slate-700 hover:text-[#881337] bg-slate-50 hover:bg-rose-50 border border-slate-200 transition-all flex items-center justify-center space-x-1"
                  >
                    <span>Request Audit Scope</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 rounded-3xl bg-rose-50/50 border border-rose-200 space-y-3">
            <HelpCircle className="w-8 h-8 text-[#881337] mx-auto" />
            <div className="font-serif-header font-bold text-lg text-slate-800">
              No services matched your query "{searchQuery}"
            </div>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="text-xs font-mono font-bold text-[#881337] underline"
            >
              Reset Search &amp; View All 8 Services
            </button>
          </div>
        )}

      </section>

      {/* 5. WHAT MAKES HACKUP DIFFERENT? (EXACT 3 USER-SPECIFIED CORE PILLARS) */}
      <section id="why-hackup" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        <div className="rounded-3xl bg-white border-2 border-rose-200 p-8 sm:p-12 shadow-xl space-y-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200">
              <Award className="w-4 h-4 text-[#881337]" />
              <span>THE HACKUP ADVANTAGE</span>
            </div>
            
            <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              What Makes Hackup Different?
            </h2>

            <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
              We replace boilerplate check-the-box security with practitioner-grade adversarial testing, transparent scoping, and guaranteed regulatory attestation.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentiators.map((diff, idx) => {
              const Icon = diff.icon;
              return (
                <div 
                  key={idx} 
                  className="p-8 rounded-3xl bg-rose-50/40 border-2 border-rose-200 hover:border-[#881337] transition-all space-y-5 shadow-sm hover:shadow-xl group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-rose-300 flex items-center justify-center text-[#881337] group-hover:bg-[#881337] group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-6 h-6 transition-colors" />
                    </div>
                    <span className="font-serif-header font-black text-2xl text-rose-300 group-hover:text-[#881337] transition-colors">
                      {diff.num}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="font-mono text-[10px] uppercase font-bold text-[#881337] tracking-wider" dangerouslySetInnerHTML={{ __html: diff.badge }} />
                    <h3 className="font-serif-header font-bold text-xl text-slate-900 leading-snug">
                      {diff.title}
                    </h3>
                  </div>

                  <p className="font-sans text-sm text-slate-700 leading-relaxed">
                    {diff.desc}
                  </p>

                  <div className="pt-3 border-t border-rose-200/60 text-xs font-sans text-slate-600 italic">
                    {diff.highlight}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. INDUSTRIES WE SERVE */}
      <section id="industries" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200">
            <Building2 className="w-4 h-4 text-[#881337]" />
            <span>SECTOR SPECIALIZATION</span>
          </div>

          <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Industries We Serve
          </h2>

          <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
            Relevant industries and organisations supported by Hackup across state law enforcement, judiciary, universities, enterprise, and healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div 
                key={idx} 
                className="rounded-3xl bg-white border-2 border-rose-200 hover:border-[#881337] p-7 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#881337] group-hover:bg-[#881337] group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-5 h-5 transition-colors" />
                    </div>
                    <span className="font-mono text-[9px] uppercase font-bold text-[#881337] px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200">
                      {ind.badge}
                    </span>
                  </div>

                  <h3 className="font-serif-header font-bold text-lg text-slate-900 group-hover:text-[#881337] transition-colors">
                    {ind.name}
                  </h3>

                  <p className="font-sans text-xs text-slate-600 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-rose-100 space-y-1.5">
                  <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                    Governing Frameworks:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {ind.regulations.map((reg, rIdx) => (
                      <span key={rIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {reg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* 7. OUR ENGAGEMENT PROCESS (5-STAGE PROGRESSION LIFECYCLE) */}
      <section id="process" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200">
            <Clock className="w-4 h-4 text-[#881337]" />
            <span>HOW WE DELIVER</span>
          </div>

          <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Our Engagement Process
          </h2>

          <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
            How businesses progress from initial consultation to assessment, recommendations, and ongoing continuous defense.
          </p>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {engagementSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border-2 border-rose-200 hover:border-[#881337] shadow-sm hover:shadow-xl transition-all space-y-4 relative group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif-header font-black text-3xl text-rose-300 group-hover:text-[#881337] transition-colors">
                    {step.num}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#881337]" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif-header font-bold text-base text-slate-900">
                    {step.title}
                  </h3>
                  <div className="font-mono text-[10px] text-[#881337] font-semibold uppercase tracking-wider">
                    {step.subtitle}
                  </div>
                </div>

                <p className="font-sans text-xs text-slate-600 leading-relaxed pt-1">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-rose-100 flex items-center text-[10px] font-mono text-slate-400">
                <span>Stage {idx + 1} of 5</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
      <section id="faqs" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200">
            <HelpCircle className="w-4 h-4 text-[#881337]" />
            <span>KNOWLEDGE BASE &bull; COMMON INQUIRIES</span>
          </div>

          <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="font-sans text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Common questions about our cybersecurity services, scoping methodology, compliance audits, and engagement models.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {serviceFaqs.map((faq, idx) => {
            const isOpen = activeFaqIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border-2 border-rose-200 bg-white shadow-sm overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between space-x-4 cursor-pointer hover:bg-rose-50/40 transition-colors"
                >
                  <span className="font-serif-header font-bold text-sm sm:text-base text-slate-900">
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 text-[#881337] transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#881337] text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm font-sans text-slate-700 leading-relaxed border-t border-rose-100 bg-rose-50/20">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* 9. FINAL CALL TO ACTION: SECURE YOUR BUSINESS. TALK TO OUR EXPERTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden border-2 border-rose-500/40 dark-surface">
          
          {/* Ambient Lighting Layers */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#881337]/30 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-600/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-rose-300 uppercase tracking-widest px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30">
                <ShieldCheck className="w-4 h-4 text-rose-300" />
                <span>CONFIDENTIAL &bull; PRODUCTION-SAFE &bull; NDA GUARANTEED</span>
              </div>

              <h2 className="font-serif-header font-bold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                Secure Your Business. Talk to Our Experts.
              </h2>

              <p className="font-sans text-sm text-slate-300 max-w-2xl leading-relaxed">
                Whether scoping an urgent pre-deployment VAPT, preparing for an upcoming TÜV SÜD-backed ISO audit, or seeking 24/7 SOC defense, connect directly with our senior cybersecurity team.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-300">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Free Initial Scoping &amp; Threat Model</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Zero-Downtime Guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>30-Day Free Retest Included</span>
                </div>
              </div>
            </div>

            {/* Right Action Column */}
            <div className="lg:col-span-4 flex flex-col space-y-3">
              <button
                type="button"
                onClick={() => onRequestAudit('Final CTA Consultation')}
                className="btn-burgundy-filled w-full py-4 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 text-white shadow-xl hover:scale-102 transition-transform cursor-pointer"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>Schedule Consultation</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <div className="text-center pt-2 text-xs font-mono text-slate-400 space-y-1">
                <div>
                  Direct Line: <a href="tel:+919597775522" className="text-rose-300 font-bold hover:underline">+91 95977 75522</a>
                </div>
                <div>
                  Email: <a href="mailto:info@hackuptechnology.com" className="text-rose-300 font-bold hover:underline">info@hackuptechnology.com</a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
