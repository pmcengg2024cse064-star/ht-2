import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Award, 
  Cpu, 
  Scale, 
  Building, 
  Shield, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Briefcase,
  HeartPulse,
  FileCheck2,
  GraduationCap,
  Globe,
  ArrowUpRight
} from 'lucide-react';
import { TechMarquee } from '../components/common/TechMarquee';
import { SEOHead } from '../components/common/SEOHead';
import { 
  ENTERPRISE_SERVICES, 
  BLOG_POSTS, 
  GOOGLE_REVIEWS, 
  COMPANY_FACTS, 
  CYBER_PATENTS,
  SITE_URL
} from '../data/cyberData';

// High-performance 60fps counting animation component
interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  duration = 2000
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const step = (currentTime: number) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Smooth ease-out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeProgress * value));
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(value);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count >= 1000 ? count.toLocaleString() : count}
      {suffix}
    </span>
  );
};

interface HomePageProps {
  onRequestAudit: (serviceTitle?: string) => void;
  onBookDemo?: (courseTitle?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onRequestAudit,
}) => {
  // Google reviews carousel state
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  // Final CTA Consultation Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    serviceInterest: 'Penetration Testing (VAPT)',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<'A' | 'B'>('A');
  const activeVideoRef = useRef<'A' | 'B'>('A');
  const isSwitchingRef = useRef(false);

  useEffect(() => {
    const vA = videoRefA.current;
    const vB = videoRefB.current;
    if (!vA || !vB) return;

    // Increased transition and playback speed (1.25x for brisk, fluid animation)
    vA.playbackRate = 1.25;
    vB.playbackRate = 1.25;

    vA.play().catch(() => {
      // Fallback if browser autoplay policy delays initial play
    });

    let animId: number;
    const monitorPlayback = () => {
      const current = activeVideoRef.current === 'A' ? vA : vB;
      const next = activeVideoRef.current === 'A' ? vB : vA;

      if (current && next && current.duration && !isNaN(current.duration)) {
        // Trigger seamless crossfade handoff ~0.45s before current video ends to eliminate reload pause
        if (current.currentTime >= current.duration - 0.45 && !isSwitchingRef.current) {
          isSwitchingRef.current = true;
          next.currentTime = 0;
          next.playbackRate = 1.25;
          next.play().then(() => {
            const nextActive = activeVideoRef.current === 'A' ? 'B' : 'A';
            activeVideoRef.current = nextActive;
            setActiveVideo(nextActive);

            setTimeout(() => {
              isSwitchingRef.current = false;
            }, 600);
          }).catch(() => {
            isSwitchingRef.current = false;
          });
        }
      }
      animId = requestAnimationFrame(monitorPlayback);
    };

    animId = requestAnimationFrame(monitorPlayback);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleNextReview = () => {
    setActiveReviewIdx((prev) => (prev + 1) % GOOGLE_REVIEWS.length);
  };

  const handlePrevReview = () => {
    setActiveReviewIdx((prev) => (prev - 1 + GOOGLE_REVIEWS.length) % GOOGLE_REVIEWS.length);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const experienceMetrics = [
    { 
      target: 10, 
      suffix: ' Years', 
      label: 'Cyber Defense Experience', 
      sub: 'Foundational Industry Leadership',
      icon: Award
    },
    { 
      target: 2100, 
      suffix: '+', 
      label: 'Enterprise Security Audits', 
      sub: 'Zero Breaches Post-Attestation',
      icon: FileCheck2
    },
    { 
      target: 54, 
      suffix: '', 
      label: 'Institutional Alliances', 
      sub: 'Active Higher-Ed & CoE Partners',
      icon: GraduationCap
    },
    { 
      target: 7, 
      suffix: '', 
      label: 'MNC Corporate Alliances', 
      sub: 'Enterprise Security Governance',
      icon: Globe
    }
  ];

  const whyHackupPillars = [
    {
      title: '10 Years of Field Experience',
      desc: 'Over a decade defending state infrastructure, banking networks, and critical production assets against sophisticated threat actors.',
      icon: Award
    },
    {
      title: '2 Issued Cyber Patents',
      desc: 'Proprietary IP in AI-based Firewall Security (2024) and Automated Pentesting & Binary Reverse Engineering (2023).',
      icon: Sparkles
    },
    {
      title: 'Police Cyber Cell Technical Advisor',
      desc: 'Active consultant to the Tamil Nadu Police Cyber Crime Department on ransomware triage and Section 65B electronic evidence.',
      icon: Scale
    },
    {
      title: '100% Manual Exploit Verification',
      desc: 'Zero automated scanner noise. We simulate real adversaries with chained PoCs and provide guaranteed Safe-to-Host certification.',
      icon: ShieldCheck
    }
  ];

  const processSteps = [
    {
      num: '01',
      title: 'Assess',
      tagline: 'Scope & Threat Modeling',
      desc: 'Define testing boundaries, review network topology, and model threat vectors without touching live operations.'
    },
    {
      num: '02',
      title: 'Test',
      tagline: 'Controlled Exploitation',
      desc: 'Simulate real adversaries to uncover business logic flaws and chained vulnerabilities with zero production downtime.'
    },
    {
      num: '03',
      title: 'Report',
      tagline: 'CVSS Risk Scoring',
      desc: 'Deliver executive summaries for leadership and step-by-step code-level remediation blueprints for development teams.'
    },
    {
      num: '04',
      title: 'Fix & Retest',
      tagline: 'Patch Verification',
      desc: 'Provide developer consultation and conduct complimentary 30-day re-testing to verify all remediation actions.'
    },
    {
      num: '05',
      title: 'Monitor',
      tagline: 'Continuous Defense & Attestation',
      desc: 'Issue official Safe-to-Host Certificate and configure 24/7 SIEM monitoring for ongoing threat resilience.'
    }
  ];

  const industrySectors = [
    {
      name: 'BFSI & Fintech',
      desc: 'Core banking ledgers, mobile payment apps, and API corridors audited under strict RBI & SEBI mandates.',
      icon: Building2
    },
    {
      name: 'Healthcare IT',
      desc: 'Securing hospital PACS servers, medical IoT, and patient records aligned with the Indian DPDP Act 2023.',
      icon: HeartPulse
    },
    {
      name: 'Law Enforcement & Government',
      desc: 'Digital evidence preservation, dark web investigations, and Section 65B forensic court dossiers.',
      icon: Scale
    },
    {
      name: 'Higher Education & CoE',
      desc: 'Campus Cyber Centers of Excellence, security architecture audits, and defense advisory for 54+ institutions.',
      icon: Award
    },
    {
      name: 'Manufacturing & Industrial IoT',
      desc: 'SCADA, PLC, and firmware reverse engineering ensuring uninterrupted plant operations under IEC 62443.',
      icon: Cpu
    }
  ];

  return (
    <div className="space-y-20 animate-fadeIn pb-20 overflow-hidden font-sans text-slate-900">
      
      {/* SEO HEAD FOR HOMEPAGE */}
      <SEOHead
        title="Cyber Security Company in Coimbatore | Hackup Technology"
        description="Premier enterprise cyber security company in Coimbatore. Patented AI firewall, VAPT audits, 24/7 SOC, digital forensics & high-assurance cyber advisory."
        canonical={`${SITE_URL}/`}
        primaryKeyword="cyber security company in Coimbatore"
        breadcrumbs={[{ name: 'Home', url: '/' }]}
      />

      {/* 1. HERO SECTION: TWO-COLUMN LAYOUT WITH 3D CYBERSECURITY ANIMATION */}
      <section className="relative pt-6 pb-6 lg:pt-8 lg:pb-8 overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9]">
        
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

        {/* Soft Burgundy Radial Glow Behind Video */}
        <div className="absolute right-0 lg:right-6 top-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-[#881337]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

        {/* Hero Scoped Typography & Keyframes: Matches "Hackup Technology" brand heading font */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
          .hero-font-brand {
            font-family: 'Outfit', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `}</style>

        {/* Main 2-Column Responsive Container */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            
            {/* LEFT COLUMN: Headline, Paragraph, CTAs */}
            <div className="lg:col-span-5 xl:col-span-5 text-left space-y-6 z-20 relative">
              
              {/* Eyebrow Accent & Text */}
              <div className="flex items-center space-x-3">
                <span className="w-8 sm:w-10 h-[2.5px] bg-[#881337] rounded-full inline-block shrink-0" />
                <span className="hero-font-brand text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#0B132B] uppercase">
                  INDIA'S PREMIER CYBERSECURITY ENTERPRISE
                </span>
              </div>

              {/* Main Headline - Matches website heading font ("Hackup Technology") */}
              <h1 className="hero-font-brand font-extrabold text-4xl sm:text-5xl lg:text-[44px] xl:text-[52px] text-[#0B132B] leading-[1.12] tracking-tight">
                India's Premier<br />
                <span className="text-[#881337] glossy-burgundy-text">Cybersecurity</span><br />
                Enterprise for<br />
                Advanced Solutions
              </h1>

              {/* Supporting Paragraph */}
              <p className="hero-font-brand font-normal text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Empowering businesses with advanced cybersecurity solutions, intelligent threat detection, and proactive digital defence. At Hackup Technology, we engineer security that protects critical assets, strengthens digital resilience, and secures your business against an evolving threat landscape.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/services"
                  className="btn-burgundy-gloss inline-flex items-center space-x-2.5 px-8 py-3.5 rounded-full bg-[#881337] hover:bg-[#6e0f2c] text-white hero-font-brand text-sm font-semibold shadow-lg shadow-[#881337]/25 transition-all duration-200 hover:-translate-y-0.5 group cursor-pointer"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={() => onRequestAudit('Enterprise Partnership & Security Consultation')}
                  className="inline-flex items-center space-x-2.5 px-8 py-3.5 rounded-full bg-white hover:bg-rose-50/50 border border-[#881337] text-[#0B132B] hover:text-[#881337] hero-font-brand text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 group cursor-pointer shadow-sm"
                >
                  <span>Let's Collaborate</span>
                  <ArrowRight className="w-4 h-4 text-[#881337] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: 3D Cybersecurity Animation Video (Seamless Zero-Reload 16:9 Loop) */}
            <div className="lg:col-span-7 xl:col-span-7 flex items-center justify-center relative z-10 w-full">
              <div className="relative w-full aspect-video max-w-[820px] rounded-2xl overflow-hidden flex items-center justify-center">
                {/* Primary Video Buffer */}
                <video
                  ref={videoRefA}
                  src="/videos/hackup-cybersecurity-hero.mp4"
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  className={`w-full h-full object-contain pointer-events-none select-none transition-opacity duration-300 ease-in-out ${
                    activeVideo === 'A' ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                  aria-label="3D Cybersecurity Shield and Threat Detection Animation"
                />

                {/* Secondary Video Buffer for Zero-Stutter Seamless Looping */}
                <video
                  ref={videoRefB}
                  src="/videos/hackup-cybersecurity-hero.mp4"
                  muted
                  playsInline
                  preload="auto"
                  className={`absolute inset-0 w-full h-full object-contain pointer-events-none select-none transition-opacity duration-300 ease-in-out ${
                    activeVideo === 'B' ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                  aria-hidden={activeVideo !== 'B'}
                />
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 2. TRUST BAR: GOOGLE REVIEWS, TANCCAO, PATENTS, ALLIANCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            
            {/* Trust 1: Google Reviews */}
            <div className="pt-2 sm:pt-0 space-y-1">
              <div className="flex items-center justify-center space-x-1 text-amber-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <div className="font-serif-header font-black text-2xl sm:text-3xl text-slate-900">
                4,343 Reviews
              </div>
              <div className="font-sans text-xs text-slate-600 font-medium">
                4.8 rating
              </div>
            </div>

            {/* Trust 2: Cyber Audits Attested */}
            <div className="pt-2 sm:pt-0 sm:pl-4 space-y-1">
              <div className="flex items-center justify-center space-x-1.5 text-[#881337] mb-1">
                <ShieldCheck className="w-4 h-4 text-[#881337]" />
                <span className="font-mono text-[10px] uppercase font-bold text-slate-600">Enterprise Track</span>
              </div>
              <div className="font-serif-header font-black text-2xl sm:text-3xl text-slate-900">
                2,100+
              </div>
              <div className="font-sans text-xs text-slate-600 font-medium">
                Security Audits Delivered
              </div>
            </div>

            {/* Trust 3: TANCCAO */}
            <div className="pt-2 sm:pt-0 sm:pl-4 space-y-1">
              <div className="flex items-center justify-center space-x-1.5 text-[#881337] mb-1">
                <Scale className="w-4 h-4 text-[#881337]" />
                <span className="font-mono text-[10px] uppercase font-bold text-slate-600">State Secretariat</span>
              </div>
              <div className="font-serif-header font-black text-2xl sm:text-3xl text-slate-900">
                TANCCAO
              </div>
              <div className="font-sans text-xs text-slate-600 font-medium">
                Secretary General Lead
              </div>
            </div>

            {/* Trust 4: 2 Issued Patents */}
            <div className="pt-2 sm:pt-0 sm:pl-4 space-y-1">
              <div className="flex items-center justify-center space-x-1.5 text-[#881337] mb-1">
                <Sparkles className="w-4 h-4 text-[#881337]" />
                <span className="font-mono text-[10px] uppercase font-bold text-slate-600">Proprietary IP</span>
              </div>
              <div className="font-serif-header font-black text-2xl sm:text-3xl text-slate-900">
                2 Patents
              </div>
              <div className="font-sans text-xs text-slate-600 font-medium">
                AI Firewall &amp; Binary RE
              </div>
            </div>

            {/* Trust 5: 54 Colleges & 7 MNC Partners */}
            <div className="pt-2 sm:pt-0 sm:pl-4 col-span-2 md:col-span-1 space-y-1">
              <div className="flex items-center justify-center space-x-1.5 text-[#881337] mb-1">
                <Building2 className="w-4 h-4 text-[#881337]" />
                <span className="font-mono text-[10px] uppercase font-bold text-slate-600">Alliances</span>
              </div>
              <div className="font-serif-header font-black text-2xl sm:text-3xl text-slate-900">
                54+ Partners
              </div>
              <div className="font-sans text-xs text-slate-600 font-medium">
                &amp; 7 Corporate MNCs
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. ENTERPRISE SERVICES CATALOG (ALL 8 SPECIALIZED DEFENSE SERVICES IN WHITE & BURGUNDY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-[#881337]" />
            <span>SOLUTIONS DIRECTORY &bull; OFFENSIVE DEFENSE &bull; 24/7 SOC &bull; GRC</span>
          </div>
          
          <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900">
            Specialized Enterprise Cybersecurity Services
          </h2>

          <p className="font-sans text-xs sm:text-sm text-slate-600 font-medium">
            Explore our 8 high-assurance cybersecurity services engineered for banking, healthcare, government, and software enterprises.
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENTERPRISE_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="rounded-3xl bg-white border-2 border-rose-200 hover:border-[#881337] p-6 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-50 text-[#881337] border border-rose-200">
                    {srv.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {srv.turnaroundDays}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-serif-header font-bold text-lg text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                    {srv.shortTitle}
                  </h3>
                  <p className="font-sans text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

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

              <div className="pt-6 space-y-2">
                <Link
                  to={`/services/${srv.id}`}
                  className="btn-burgundy-filled w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-md hover:scale-101 text-white"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 4. WHY HACKUP DISTINCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-xl space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#881337]" />
              <span>THE HACKUP DISTINCTION</span>
            </div>
            <h2 className="font-serif-header font-bold text-3xl text-slate-900">
              Why Indian Enterprises Choose Hackup
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-600">
              Offensive capability honed by 10 years on the frontlines of real cyber warfare and law enforcement forensics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {whyHackupPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-rose-50/40 border border-rose-200 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#881337]" />
                  </div>
                  <h3 className="font-serif-header font-bold text-base text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. EXPERIENCE IN NUMBERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden dark-surface border border-slate-800">
          
          {/* Subtle Tech Cyber Grid & Ambient Glows */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '36px 36px'
            }}
          />
          <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[#881337]/30 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-20 w-96 h-96 bg-rose-600/20 blur-[130px] rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-10">
            {/* Header with verified track record badge */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-[11px] font-mono font-bold text-rose-300 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                <span>VERIFIABLE TRACK RECORD</span>
              </div>
              <h2 className="font-serif-header font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                Experience in Numbers
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
                A sovereign footprint spanning executive cyber advisory, state police support, and critical enterprise defense.
              </p>
            </div>

            {/* 4 Animated Glass Stat Tiles with Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {experienceMetrics.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative group p-6 sm:p-7 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-rose-500/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-rose-950/30 flex flex-col items-center justify-between overflow-hidden"
                  >
                    {/* Ambient Hover Spotlight */}
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-rose-500/10 group-hover:bg-rose-500/25 rounded-full blur-2xl transition-all pointer-events-none" />

                    {/* Radiant Glowing Icon Badge */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 via-rose-900/40 to-slate-900 border border-rose-500/30 group-hover:border-rose-400/70 flex items-center justify-center text-rose-400 group-hover:text-rose-300 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-rose-950/50 mb-4">
                      <IconComponent className="w-7 h-7 transition-transform duration-300 group-hover:rotate-6" />
                    </div>

                    {/* Animated Number Counter */}
                    <div className="space-y-1 w-full">
                      <div className="font-serif-header font-black text-3xl sm:text-4xl xl:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-rose-400 to-rose-200 group-hover:from-white group-hover:via-rose-300 group-hover:to-rose-400 transition-all duration-300 tracking-tight">
                        <AnimatedCounter value={item.target} suffix={item.suffix} duration={1800} />
                      </div>

                      {/* Stat Label */}
                      <div className="font-sans text-sm font-bold text-white tracking-wide pt-1">
                        {item.label}
                      </div>
                    </div>

                    {/* Subtitle / Footnote */}
                    <div className="font-sans text-xs text-slate-400 pt-3 border-t border-white/10 mt-4 w-full">
                      {item.sub}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. AUTHORITY: FOUNDER CARD, PATENTS, PARTNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border-2 border-rose-200 p-8 sm:p-12 shadow-xl space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Founder Portrait Column */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group w-full max-w-[300px] sm:max-w-[340px]">
                {/* 3D Burgundy Gradient Frame */}
                <div className="w-full aspect-[4/5] rounded-3xl p-1.5 bg-gradient-to-b from-[#881337] via-[#9F1239] to-rose-200 shadow-2xl shadow-rose-950/20 group-hover:scale-102 transition-transform duration-500">
                  <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-900 relative">
                    <img
                      src="/images/dr_dinesh_paranthagan.jpg"
                      alt="Dr. Dinesh Paranthagan - Founder & CEO, Hackup Technology"
                      className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Caption Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 text-left">
                      <span className="font-serif-header font-bold text-lg text-white drop-shadow-md">
                        Dr. Dinesh Paranthagan
                      </span>
                      <span className="font-mono text-[11px] text-rose-300 font-semibold tracking-wide mt-0.5">
                        Founder &amp; CEO &bull; Secretary General TANCCAO
                      </span>
                    </div>
                  </div>
                </div>

                {/* Verified Leadership Float Badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-rose-50 border border-rose-300 px-4 py-1.5 rounded-full shadow-md flex items-center space-x-1.5 whitespace-nowrap">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#881337]" />
                  <span className="font-mono text-[9px] uppercase font-bold text-[#881337] tracking-wider">
                    TN Police Advisor &bull; Patent Holder
                  </span>
                </div>
              </div>
            </div>

            {/* Founder Card Info */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest">
                <Award className="w-4 h-4 text-[#881337]" />
                <span>STATE &bull; NATIONAL &bull; CYBER DEFENSE AUTHORITY</span>
              </div>

              <h2 className="font-serif-header font-bold text-2xl sm:text-3xl text-slate-900">
                Led by Dr. Dinesh Paranthagan
              </h2>

              <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
                As Founder &amp; CEO of Hackup Technology and Secretary General of TANCCAO, Dr. Dinesh Paranthagan has steered over 2,100 enterprise cybersecurity audits, authored 2 proprietary defense patents, and serves as an official technical consultant to the Tamil Nadu Police Cyber Crime Department.
              </p>

              {/* Patent Cards Snapshot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {CYBER_PATENTS.map((pat) => (
                  <div key={pat.id} className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 space-y-1.5">
                    <span className="font-mono text-[9px] uppercase font-bold text-[#881337] bg-rose-100 px-2 py-0.5 rounded">
                      {pat.patentNumber}
                    </span>
                    <h4 className="font-serif-header font-bold text-xs text-slate-900">
                      {pat.title}
                    </h4>
                    <p className="font-sans text-[11px] text-slate-600 line-clamp-2">
                      {pat.shortDesc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Executive Social Profiles */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <span className="font-mono text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline-block mr-1">
                  Connect Directly:
                </span>

                {/* LinkedIn Premium Badge */}
                <a
                  href="https://www.linkedin.com/in/dineshparanthagan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Dinesh Paranthagan on LinkedIn"
                  className="group relative inline-flex items-center space-x-2.5 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/90 shadow-sm hover:shadow-md hover:border-[#0A66C2]/40 transition-all duration-200"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#0A66C2] flex items-center justify-center text-white shadow-sm shadow-[#0A66C2]/30 group-hover:scale-105 transition-transform duration-200">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-mono text-[9px] uppercase font-bold text-slate-500 group-hover:text-[#0A66C2] transition-colors leading-none">
                      LinkedIn
                    </div>
                    <div className="font-sans text-xs font-bold text-slate-900 leading-tight mt-0.5">
                      Dinesh Paranthagan
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0A66C2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 ml-1" />
                </a>

                {/* Instagram Premium Badge */}
                <a
                  href="https://www.instagram.com/dineshparanthagan?srtk=MWNseXh0am04aXJx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Dinesh Paranthagan on Instagram"
                  className="group relative inline-flex items-center space-x-2.5 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/90 shadow-sm hover:shadow-md hover:border-pink-500/40 transition-all duration-200"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-sm shadow-pink-500/30 group-hover:scale-105 transition-transform duration-200">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-mono text-[9px] uppercase font-bold text-slate-500 group-hover:text-pink-600 transition-colors leading-none">
                      Instagram
                    </div>
                    <div className="font-sans text-xs font-bold text-slate-900 leading-tight mt-0.5">
                      @dineshparanthagan
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-pink-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 ml-1" />
                </a>
              </div>
            </div>

          </div>



        </div>
      </section>

      {/* 7. PROCESS: ASSESS, TEST, REPORT, FIX AND RETEST, MONITOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-[#881337]" />
            <span>OPERATIONAL RIGOR</span>
          </div>
          <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900">
            Our 5-Stage Cyber Defense Lifecycle
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-600">
            Engineered to eliminate false positives and guarantee verifiable Safe-to-Host compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {processSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-rose-400 shadow-sm hover:shadow-md transition-all space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif-header font-black text-2xl text-rose-900/40 group-hover:text-[#881337] transition-colors">
                  {step.num}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#881337]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-header font-bold text-base text-slate-900">
                  {step.title}
                </h3>
                <div className="font-mono text-[10px] text-[#881337] font-semibold uppercase">
                  {step.tagline}
                </div>
                <p className="font-sans text-xs text-slate-600 leading-relaxed pt-1">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 8. INDUSTRIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest">
            <Building2 className="w-4 h-4 text-[#881337]" />
            <span>DOMAIN EXPERTISE</span>
          </div>
          <h2 className="font-serif-header font-bold text-3xl text-slate-900">
            Industries We Defend
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-600">
            Custom-tailored security posture aligned with industry-specific regulatory frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {industrySectors.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-rose-300 shadow-sm space-y-3">
                <div className="w-9 h-9 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#881337]" />
                </div>
                <h3 className="font-serif-header font-bold text-sm text-slate-900">
                  {ind.name}
                </h3>
                <p className="font-sans text-xs text-slate-600 leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            );
          })}
        </div>

      </section>

      {/* 9. GOOGLE REVIEWS CAROUSEL */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>4,343 VERIFIED CLIENT REVIEWS (4.8★)</span>
          </div>
          <h2 className="font-serif-header font-bold text-3xl text-slate-900">
            What Enterprise Leaders &amp; Partners Say
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative rounded-3xl bg-white border-2 border-rose-200 p-8 sm:p-12 shadow-xl">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            
            {/* Stars */}
            <div className="flex items-center justify-center space-x-1 text-amber-500">
              {[...Array(GOOGLE_REVIEWS[activeReviewIdx].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
              ))}
            </div>

            {/* Review Quote */}
            <blockquote className="font-serif-header font-normal text-base sm:text-xl text-slate-800 leading-relaxed italic">
              "{GOOGLE_REVIEWS[activeReviewIdx].text}"
            </blockquote>

            {/* Reviewer Details */}
            <div className="space-y-1">
              <div className="font-sans font-bold text-sm sm:text-base text-slate-900">
                {GOOGLE_REVIEWS[activeReviewIdx].name}
              </div>
              <div className="font-mono text-xs text-[#881337] font-semibold">
                {GOOGLE_REVIEWS[activeReviewIdx].role}
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Verified Review &bull; {GOOGLE_REVIEWS[activeReviewIdx].date}
              </div>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center justify-center space-x-4 pt-4">
              <button
                onClick={handlePrevReview}
                className="p-2.5 rounded-full bg-slate-100 hover:bg-rose-100 border border-slate-300 text-slate-700 cursor-pointer transition-colors"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-xs font-mono text-slate-500">
                {activeReviewIdx + 1} / {GOOGLE_REVIEWS.length}
              </div>
              <button
                onClick={handleNextReview}
                className="p-2.5 rounded-full bg-slate-100 hover:bg-rose-100 border border-slate-300 text-slate-700 cursor-pointer transition-colors"
                aria-label="Next Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

      </section>

      {/* 10. LATEST RESEARCH INSIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#881337]" />
              <span>THREAT RESEARCH &amp; INDUSTRY ADVISORIES</span>
            </div>
            <h2 className="font-serif-header font-bold text-3xl text-slate-900">
              Latest Cyber Defense Insights
            </h2>
          </div>
          <Link
            to="/blog"
            className="text-xs font-mono font-bold text-[#881337] hover:underline flex items-center space-x-1"
          >
            <span>View All Research Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl bg-white border border-slate-200 hover:border-rose-300 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#881337] font-bold border border-rose-200">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif-header font-bold text-base sm:text-lg text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="font-sans text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">{post.publishedDate}</span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-[#881337] font-bold hover:underline flex items-center space-x-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </section>

      {/* 11. FINAL CALL TO ACTION WITH CONSULTATION FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden border border-rose-500/30 dark-surface">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left CTA Info */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-rose-400 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-rose-400" />
                <span>CONFIDENTIAL &bull; PRODUCTION-SAFE &bull; NDA GUARANTEED</span>
              </div>

              <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-white leading-tight">
                Schedule Your Executive Cyber Consultation
              </h2>

              <p className="font-sans text-sm text-slate-300 leading-relaxed">
                Connect directly with our senior security architects to scope your penetration testing requirements, 24/7 SIEM monitoring deployment, or enterprise compliance audits under complete mutual confidentiality.
              </p>

              <div className="space-y-3 pt-2 font-mono text-xs text-slate-300">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-rose-400" />
                  <span>{COMPANY_FACTS.phones[0]} / {COMPANY_FACTS.phones[1]}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-rose-400" />
                  <span>{COMPANY_FACTS.emails[0]}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-rose-400" />
                  <span>Ganapathy, Coimbatore - 641006, Tamil Nadu</span>
                </div>
              </div>
            </div>

            {/* Right Consultation Form */}
            <div className="lg:col-span-6 bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-xl">
              {formSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif-header font-bold text-xl text-slate-900">
                    Consultation Request Received
                  </h3>
                  <p className="font-sans text-xs text-slate-600 max-w-sm mx-auto">
                    Our technical team in Coimbatore will review your scope and contact you within 2 hours under strict mutual NDA.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="btn-burgundy-filled px-6 py-2 rounded-xl font-mono text-xs font-bold text-white"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-xs">
                  <h3 className="font-serif-header font-bold text-lg text-slate-900">
                    Request Fast-Track Scoping Call
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-mono text-[11px] font-bold text-slate-700">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Arun Kumar"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#881337] focus:ring-1 focus:ring-[#881337] outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[11px] font-bold text-slate-700">Official Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. arun@enterprise.com"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#881337] focus:ring-1 focus:ring-[#881337] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-mono text-[11px] font-bold text-slate-700">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#881337] focus:ring-1 focus:ring-[#881337] outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[11px] font-bold text-slate-700">Organization / Enterprise</label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Organization Name"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#881337] focus:ring-1 focus:ring-[#881337] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[11px] font-bold text-slate-700">Primary Enterprise Service of Interest</label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#881337] focus:ring-1 focus:ring-[#881337] outline-none font-sans"
                    >
                      <option value="Penetration Testing (VAPT)">Penetration Testing (VAPT - Web, Mobile, API)</option>
                      <option value="Vulnerability Management & Security Audit">Vulnerability Management &amp; Security Audit</option>
                      <option value="24/7 Managed SOC Deployment">24/7 Managed SOC Deployment (Wazuh/Splunk)</option>
                      <option value="ISO 27001 & DPDP Act Compliance">ISO 27001, SOC 2 &amp; DPDP Act Compliance</option>
                      <option value="Red Team vs Blue Team Emulation">Red Team vs Blue Team Adversary Emulation</option>
                      <option value="Digital Forensics & 65B Investigation">Digital Forensics &amp; Section 65B Investigation</option>
                      <option value="IoT & Industrial OT SCADA Security">IoT &amp; Industrial OT SCADA Security</option>
                      <option value="AI Security & LLM Red Teaming">AI Security Architecture &amp; LLM Red Teaming</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[11px] font-bold text-slate-700">Scope Overview / Target Details</label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Brief details about target assets, expected deadlines, or specific compliance requirements..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#881337] focus:ring-1 focus:ring-[#881337] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-burgundy-filled py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg text-white"
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                    <span>Submit Confidential Request</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Trust marquee at the bottom */}
      <div className="space-y-4 text-center pt-6">
        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">
          DEFENDING LAW ENFORCEMENT, CRITICAL INFRASTRUCTURE &amp; ENTERPRISES PAN-INDIA
        </div>
        <TechMarquee />
      </div>

    </div>
  );
};
