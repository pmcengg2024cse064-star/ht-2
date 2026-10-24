import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  Award, 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  ArrowUpRight, 
  ExternalLink,
  Lock,
  Cpu,
  Terminal,
  Activity,
  HeartPulse,
  Server,
  Zap,
  Quote,
  Users,
  Compass,
  Check,
  ChevronRight,
  BookOpen,
  Download
} from 'lucide-react';
import { AcademicFootprint } from '../components/institutional/AcademicFootprint';
import { PatentsSection } from '../components/founder/PatentsSection';
import { FaqSection } from '../components/faq/FaqSection';

interface AboutPageProps {
  onOpenDisclosure?: () => void;
  onRequestConsultation?: () => void;
  onRequestAudit?: (serviceTitle?: string) => void;
  onBookAcademicDemo?: (subject?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenDisclosure,
  onRequestConsultation,
  onRequestAudit,
  onBookAcademicDemo,
}) => {
  const [activeSectorIndex, setActiveSectorIndex] = useState<number>(0);

  const verifiedMetrics = [
    {
      num: '1,00,000+',
      label: 'Minds Empowered',
      desc: 'Students, Faculty, Corporate Staff & Police Officers Trained',
      icon: Users
    },
    {
      num: '2,100+',
      label: 'Enterprise Projects',
      desc: 'High-Assurance VAPT Audits & Penetration Tests Completed',
      icon: ShieldCheck
    },
    {
      num: '10,000+',
      label: 'Engaged Clients & Alumni',
      desc: 'Active Retained Clients, Blue Team Trainees & Placed Alumni',
      icon: Compass
    },
    {
      num: '560+',
      label: 'Awards & Recognitions',
      desc: 'Including NICA National Entrepreneur of the Year & State Honors',
      icon: Award
    }
  ];

  const sectorOperations = [
    {
      id: 'police',
      title: 'Law Enforcement & Police Cyber Cells',
      subtitle: 'State Defense & Forensic Intelligence',
      icon: Scale,
      color: '#D4AF37',
      description: 'Active technical advisory for Tamil Nadu Police Cyber Crime Department and district Cyber Crime Cells. We conduct specialized digital forensic investigations, volatile memory acquisition, crypto transaction tracing, and author Section 65B digital evidence dossiers for Indian judicial courts.',
      deliverables: [
        'High-profile digital evidence acquisition & forensic chain of custody',
        'Financial fraud tracing & cryptocurrency transaction ledger audits',
        'State-wide cyber crime officers capacity building masterclasses',
        'Forensic readiness training on EnCase, FTK Imager & Volatility'
      ]
    },
    {
      id: 'enterprise-bfsi',
      title: 'Enterprise IT & BFSI Banking Corridors',
      subtitle: 'Critical Infrastructure & Core Ledgers',
      icon: Building2,
      color: '#38BDF8',
      description: 'Comprehensive manual penetration testing (VAPT), Privilege Access Management (PAM), and API security auditing for fintech, core banking networks, NBFCs, and global software product companies operating under RBI and SEBI mandates.',
      deliverables: [
        'Zero-downtime manual exploit verification & business logic flaw discovery',
        'Just-In-Time (JIT) Privilege Access Management (PAM) architecture',
        'RBI Cyber Security Framework & SEBI CS compliance attestation',
        'Automated CI/CD security gates and developer remediation blueprints'
      ]
    },
    {
      id: 'education',
      title: 'Higher Education & Advanced Research',
      subtitle: 'Curriculum Modernization & On-Campus CoE',
      icon: GraduationCap,
      color: '#10B981',
      description: 'Serving as the official cybersecurity curriculum modernization partner (Board of Studies) and Cyber Center of Excellence (CoE) installer across 54+ universities, engineering institutions, and autonomous colleges in South India.',
      deliverables: [
        'Turnkey high-tech on-campus Cyber Range sandbox labs deployment',
        'B.Tech / M.Tech / BCA syllabus design aligned with EC-Council and industry needs',
        'Faculty Development Programs (FDP) on offensive cyber warfare',
        'Direct campus-to-corporate placement pipelines with 40+ MNC partners'
      ]
    },
    {
      id: 'healthcare',
      title: 'Healthcare, Life Sciences & Cloud Infrastructure',
      subtitle: 'Zero-Trust Architecture & Data Protection',
      icon: HeartPulse,
      color: '#EC4899',
      description: 'Hardening multi-cloud hospital management clusters, PACS imaging systems, and patient databases against targeted ransomware exfiltration, ensuring strict alignment with the Indian DPDP Act 2023 and HIPAA security rules.',
      deliverables: [
        'AWS, Azure & Hybrid Kubernetes cluster CIS benchmark hardening',
        'Protected Health Information (PHI) encryption at rest and in transit',
        'Ransomware outbreak containment & 90-minute DFIR emergency SLA',
        'DPDP Act 2023 Data Principal consent architecture and privacy impact reviews'
      ]
    },
    {
      id: 'community',
      title: 'Community Defense & DEFCON Coimbatore',
      subtitle: 'Grassroots Security Research & CTFs',
      icon: Terminal,
      color: '#A855F7',
      description: 'Leading and sponsoring the official DEFCON Coimbatore Chapter (#DC91422). We foster open-source threat intelligence sharing, organize bi-monthly technical workshops, and host competitive CTF hackathons for aspiring ethical hackers.',
      deliverables: [
        'Bi-monthly free community meetups on cutting-edge zero-day vectors',
        'Hands-on Capture The Flag (CTF) hackathons with cash prize pools',
        'Adversarial AI & LLM red teaming open research groups',
        'Mentorship for independent security researchers and bug bounty hunters'
      ]
    }
  ];

  return (
    <div className="space-y-20 animate-fadeIn pb-20 overflow-hidden">
      
      {/* 1. PAGE HEADER & HERO: THE INSTITUTIONAL GENESIS */}
      <section className="relative pt-10 sm:pt-14 pb-16 overflow-hidden">
        
        {/* Ambient Halos */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-amber-500/10 blur-[160px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb & Eyebrow */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
              <Link to="/" className="text-slate-400 hover:text-[#D4AF37] transition-colors">
                HOME
              </Link>
              <span className="text-slate-600">/</span>
              <span className="text-[#D4AF37] font-semibold">ABOUT HACKUP TECHNOLOGY</span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-slate-400 hidden sm:inline font-medium">
                FOUNDED IN 2013 IN COIMBATORE, TAMIL NADU
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-header font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.14]">
              Defending Critical Digital Frontiers.{' '}
              <span className="text-gold-pure block mt-2">
                Nurturing the Nation's Cyber Defense Workforce.
              </span>
            </h1>

            {/* Sub-Headline */}
            <p className="font-sans text-sm sm:text-base lg:text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed font-normal">
              Hackup Technology is an executive cybersecurity consultancy, defense research firm, and EC-Council Accredited Training Center trusted by enterprise leaders, law enforcement agencies, and academic institutions across India.
            </p>

            {/* Hero Badges with Emerald Glow */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-3">
              {[
                { label: 'Official EC-Council Partner', icon: Award },
                { label: 'Affiliated with TANCCAO', icon: ShieldCheck },
                { label: '2 Proprietary Cyber Patents', icon: Sparkles },
                { label: 'Tamil Nadu Police Cyber Cell Consultant', icon: Scale },
              ].map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={idx}
                    className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-amber-300 text-xs font-mono font-bold text-slate-800 shadow-sm backdrop-blur-md"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping inline-block shrink-0" />
                    <Icon className="w-3.5 h-3.5 text-[#9E721D]" />
                    <span>{badge.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-6">
              <button
                onClick={() => {
                  if (onRequestAudit) onRequestAudit('Enterprise Infrastructure VAPT');
                  else if (onRequestConsultation) onRequestConsultation();
                }}
                className="w-full sm:w-auto btn-gold-filled px-8 py-4 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Schedule Enterprise Audit</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={() => {
                  if (onBookAcademicDemo) onBookAcademicDemo('Academic Institution MoU & Cyber Range Setup');
                  else if (onRequestConsultation) onRequestConsultation();
                }}
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer font-bold"
              >
                <GraduationCap className="w-4 h-4 text-amber-700" />
                <span>Institutional &amp; Academic Tie-ups</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 2. DYNAMIC VERIFIED METRICS RIBBON (FRAMER MOTION COUNTERS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border-2 border-amber-300 p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden">
          
          {/* Gold Shimmer Bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            {verifiedMetrics.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`pt-4 sm:pt-0 ${idx !== 0 ? 'sm:pl-6 lg:pl-8' : ''} space-y-2`}
                >
                  <div className="flex items-center space-x-2 text-[#9E721D]">
                    <Icon className="w-4 h-4" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      {item.label}
                    </span>
                  </div>

                  <div className="font-serif-header font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                    {item.num}
                  </div>

                  <p className="font-sans text-xs text-slate-600 leading-snug">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. VISION, MISSION & CORE PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Our Vision */}
          <div className="rounded-3xl bg-white border-2 border-amber-300 hover:border-[#D4AF37] p-8 sm:p-10 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 text-xs font-mono font-bold text-[#9E721D] uppercase border border-amber-200">
                <Compass className="w-3.5 h-3.5" />
                <span>INSTITUTIONAL VISION</span>
              </div>

              <h2 className="font-serif-header font-bold text-2xl sm:text-3xl text-slate-900 leading-snug">
                Global Standards in Ethical Defense
              </h2>

              <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                To achieve national and global leadership as a high-standard, dependable cybersecurity advisory and training powerhouse—creating curious, ethical, and elite cyber practitioners capable of safeguarding modern technological ecosystems.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-3 text-xs font-mono text-slate-700">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#9E721D]" />
                <span>Zero False-Positives</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#9E721D]" />
                <span>Sovereign Security</span>
              </div>
            </div>
          </div>

          {/* Card 2: Our Mission & Approach */}
          <div className="rounded-3xl bg-white border-2 border-amber-300 hover:border-[#D4AF37] p-8 sm:p-10 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 text-xs font-mono font-bold text-[#9E721D] uppercase border border-amber-200">
                <Zap className="w-3.5 h-3.5" />
                <span>MISSION &amp; CORE PHILOSOPHY</span>
              </div>

              <h2 className="font-serif-header font-bold text-2xl sm:text-3xl text-slate-900 leading-snug">
                Bridging Modern Privilege &amp; Continuous Learning
              </h2>

              {/* Guiding Quote */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border-l-4 border-[#D4AF37] border-y border-r border-amber-200 italic font-serif-display text-sm sm:text-base text-slate-800">
                "We can teach a lesson for a day, but if we cultivate relentless curiosity, the learning continues for a lifetime."
              </div>

              <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                Modernizing Privileged Access Management (PAM), Zero-Trust frameworks, Cloud/DevOps infrastructure protection, and practical attack simulation for both corporate infrastructure and higher education.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-3 text-xs font-mono text-slate-700">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#9E721D]" />
                <span>Zero-Trust PAM Architecture</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#9E721D]" />
                <span>Continuous Lab Apprenticeship</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. FOUNDER & EXECUTIVE LEADERSHIP: DINESH PARANTHAGAN (M.C.A., Ph.D.) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border-2 border-amber-300 p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
          
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="font-mono text-xs uppercase font-bold text-[#9E721D] tracking-widest">
              VISIONARY LEADERSHIP
            </span>
            <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900">
              Dr. Dinesh Paranthagan <span className="text-sm font-mono font-normal text-slate-500">M.C.A., Ph.D.</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-600">
              Founder &amp; Chief Executive Officer, Hackup Technology Pvt Ltd
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Portrait & Executive Card */}
            <div className="lg:col-span-5 space-y-5 text-center">
              
              <div className="relative inline-block mx-auto group">
                <div className="w-64 sm:w-72 lg:w-80 h-80 sm:h-96 rounded-3xl p-1.5 bg-gradient-to-b from-[#D4AF37] via-[#C4A77D] to-[#881337] shadow-xl mx-auto group-hover:scale-102 transition-transform duration-500">
                  <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-950 flex items-center justify-center relative">
                    <img
                      src="/images/founder_dinesh.jpg"
                      alt="Dr. Dinesh Paranthagan - Founder & CEO"
                      className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex flex-col justify-end p-5 text-left z-10 dark-overlay-content">
                      <span 
                        className="font-serif-header font-bold text-xl text-white drop-shadow-md"
                        style={{ color: '#FFFFFF' }}
                      >
                        Dinesh Paranthagan
                      </span>
                      <span className="font-mono text-xs text-amber-300 font-semibold drop-shadow">
                        M.C.A., Ph.D. • Founder &amp; CEO
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 bg-white border border-amber-300 px-4 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5 whitespace-nowrap">
                  <ShieldCheck className="w-4 h-4 text-[#9E721D]" />
                  <span className="font-mono text-[10px] uppercase font-bold text-amber-950 tracking-wider">
                    POLICE ADVISOR &amp; PATENT HOLDER
                  </span>
                </div>
              </div>

              {/* Credentials Tags */}
              <div className="pt-3 flex flex-wrap justify-center gap-2 font-mono text-[11px]">
                <span className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-semibold">
                  Founder &amp; CEO
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-semibold">
                  Cyber Security Specialist
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-semibold">
                  EC-Council Certified Instructor
                </span>
              </div>

              <div className="pt-2 flex flex-wrap justify-center gap-2">
                <a
                  href="/downloads/Dinesh_Paranthagan_Executive_Profile.pdf"
                  download="Dinesh_Paranthagan_Executive_Profile.pdf"
                  className="btn-burgundy-filled inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-white shadow-md hover:scale-102 transition-transform cursor-pointer"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Download Profile (PDF)</span>
                </a>
                <a
                  href="https://linkedin.com/in/dinesh-paranthagan"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold-outline inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider"
                >
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="w-4 h-4 text-[#9E721D]" />
                </a>
              </div>

            </div>

            {/* Right Column: Official Roles & Impact */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="space-y-3 font-sans text-xs sm:text-sm">
                
                {/* 1. Secretary General */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-amber-300 transition-colors">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-[#9E721D] shrink-0" />
                    <span className="font-serif-header font-bold text-base text-slate-900">
                      Secretary General – TANCCAO
                    </span>
                  </div>
                  <p className="text-slate-600 pl-6 leading-relaxed">
                    Leads the <strong className="text-slate-900">Tamil Nadu Cyber Crime Action Organisation (TANCCAO)</strong>, spearheading state-wide industry-government threat intelligence sharing and public cyber safety frameworks.
                  </p>
                </div>

                {/* 2. Police Consultant */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-amber-300 transition-colors">
                  <div className="flex items-center space-x-2">
                    <Scale className="w-4 h-4 text-[#9E721D] shrink-0" />
                    <span className="font-serif-header font-bold text-base text-slate-900">
                      Consultant – Tamil Nadu Police Cyber Crime Department
                    </span>
                  </div>
                  <p className="text-slate-600 pl-6 leading-relaxed">
                    Technical consultant for state cyber crime divisions and Coimbatore Cyber Cell on high-profile digital forensic investigations, memory extraction, dark web tracing, and Section 65B litigation evidence dossiers.
                  </p>
                </div>

                {/* 3. Academic Council & BOS */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-amber-300 transition-colors">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4 text-[#9E721D] shrink-0" />
                    <span className="font-serif-header font-bold text-base text-slate-900">
                      Board of Studies (BOS) &amp; Academic Council Member
                    </span>
                  </div>
                  <p className="text-slate-600 pl-6 leading-relaxed">
                    Active Board of Studies member across <strong className="text-slate-900">8 premier universities</strong> and Academic Council member for <strong className="text-slate-900">4 higher education institutions</strong>, architecting modern practical cyber degrees.
                  </p>
                </div>

                {/* 4. Smart India Hackathon Evaluator */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-amber-300 transition-colors">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-[#9E721D] shrink-0" />
                    <span className="font-serif-header font-bold text-base text-slate-900">
                      National Hackathon Evaluator &amp; SIH Mentor
                    </span>
                  </div>
                  <p className="text-slate-600 pl-6 leading-relaxed">
                    Appointed National Mentor and Grand Finale Judge for the <strong className="text-slate-900">Smart India Hackathon (SIH)</strong> under the Ministry of Education &amp; AICTE, guiding winning teams building sovereign defense systems.
                  </p>
                </div>

                {/* 5. Proprietary Patents */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#9E721D] shrink-0" />
                    <span className="font-serif-header font-bold text-base text-amber-900">
                      Proprietary Patent Holder
                    </span>
                  </div>
                  <p className="text-slate-700 pl-6 leading-relaxed">
                    Inventor and holder of 2 published Indian cybersecurity patents for sovereign cyber defense and automated security architectures.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. PROVEN SECTOR OPERATIONS & ENTERPRISE EXPERIENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="font-mono text-xs uppercase font-bold tracking-widest text-[#B8860B]">
            OPERATIONAL FOOTPRINT &amp; SECTORS
          </div>
          <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900">
            Proven Sector Operations &amp; Enterprise Experience
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-600">
            From police evidence preservation to multi-terabyte financial transaction corridors, explore our battle-tested operational domains.
          </p>
        </div>

        {/* Interactive Sector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {sectorOperations.map((sec, idx) => {
            const Icon = sec.icon;
            const isSelected = activeSectorIndex === idx;

            return (
              <button
                key={sec.id}
                onClick={() => setActiveSectorIndex(idx)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-amber-50/80 border-2 border-amber-500 shadow-xl shadow-amber-500/10'
                    : 'bg-white border border-slate-200 hover:border-amber-300 shadow-sm'
                }`}
              >
                <div className="space-y-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-inner"
                    style={{ backgroundColor: `${sec.color}15`, color: sec.color, border: `1px solid ${sec.color}40` }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif-header font-bold text-sm text-slate-900 line-clamp-2">
                    {sec.title}
                  </h3>
                </div>

                <div className="font-mono text-[10px] text-slate-500 font-semibold">
                  Sector {idx + 1} of 5 →
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Sector Deep-Dive Slate */}
        <div className="mt-6 p-6 sm:p-8 rounded-3xl bg-white border-2 border-amber-400/40 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-amber-800 uppercase">
                {sectorOperations[activeSectorIndex].subtitle}
              </span>
              <h3 className="font-serif-header font-bold text-2xl text-slate-900">
                {sectorOperations[activeSectorIndex].title}
              </h3>
            </div>

            <button
              onClick={() => {
                if (onRequestAudit) onRequestAudit(sectorOperations[activeSectorIndex].title);
                else if (onRequestConsultation) onRequestConsultation();
              }}
              className="btn-gold-filled px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider self-start md:self-auto cursor-pointer"
            >
              Inquire for Sector Advisory →
            </button>
          </div>

          <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
            {sectorOperations[activeSectorIndex].description}
          </p>

          <div className="space-y-2">
            <div className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
              Core Technical Deliverables &amp; Outcomes:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sectorOperations[activeSectorIndex].deliverables.map((item, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-800 flex items-start space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* 6. ACADEMIC LEGACY: 54+ PARTNER INSTITUTIONS ACROSS TAMIL NADU */}
      <AcademicFootprint 
        onPartnerInquiry={(college) => {
          if (onBookAcademicDemo) onBookAcademicDemo(college ? `Institutional Collaboration for ${college}` : 'Campus Center of Excellence');
          else if (onRequestConsultation) onRequestConsultation();
        }}
      />

      {/* 7. OUR OPERATING PILLARS: DUAL CAPABILITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="font-mono text-xs uppercase font-bold tracking-widest text-[#B8860B]">
            OPERATIONAL ARCHITECTURE
          </div>
          <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900">
            Our Operating Pillars: Dual Capability
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-600">
            Bridging offensive enterprise consulting with accredited hands-on academic mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Pillar 1: Offensive & Defensive Advisory (B2B) */}
          <div className="rounded-3xl bg-white border-2 border-amber-400 hover:border-amber-500 p-8 sm:p-10 flex flex-col justify-between space-y-6 shadow-xl transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300">
                  PILLAR 1: B2B ASSURANCE
                </span>
                <Building2 className="w-6 h-6 text-amber-700" />
              </div>

              <h3 className="font-serif-header font-bold text-2xl text-slate-900">
                Offensive &amp; Defensive Cyber Advisory
              </h3>

              <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                Zero-downtime Penetration Testing, 24/7 SIEM SOC deployments, and Digital Forensics for banking, SaaS, and government installations.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  'Full-Spectrum VAPT (Web, Mobile, Network, API, Cloud)',
                  'SOC Deployment & 24/7 SIEM (Wazuh, Splunk, Elastic)',
                  'Digital Forensics & Incident Response (DFIR & Litigation)',
                  'Privilege Access Management (PAM) & Zero-Trust Governance'
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs font-mono text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <Link
                to="/enterprise"
                className="btn-gold-filled w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Explore Enterprise Suite</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Pillar 2: Hackup Academy & Global Certifications (B2C) */}
          <div className="rounded-3xl bg-white border-2 border-rose-300 hover:border-[#881337] p-8 sm:p-10 flex flex-col justify-between space-y-6 shadow-xl transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase font-bold px-3 py-1 rounded-full bg-rose-50 text-[#881337] border border-rose-200">
                  PILLAR 2: B2C &amp; ACADEMIC
                </span>
                <GraduationCap className="w-6 h-6 text-[#881337]" />
              </div>

              <h3 className="font-serif-header font-bold text-2xl text-slate-900">
                Hackup Academy &amp; Global Certifications
              </h3>

              <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Official EC-Council flagship certification training, 100% hands-on Cyber Range attack-defense simulations, and college industrial internships.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  'Official EC-Council Flagship Tracks (CEH v13, CPENT, CSA, CHFI)',
                  'Hands-On Cyber Range (100% Practical Attack/Defense Labs)',
                  'College Industrial Internships (1, 3, and 6-month tracks)',
                  'Direct MNC Placement Referrals with 40+ Hiring Partners'
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs font-mono text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#881337] shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <Link
                to="/academy"
                className="btn-burgundy-filled w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg text-white"
              >
                <span>Explore Academy Tracks</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Proprietary Patents Embedded */}
      <PatentsSection onRequestAudit={() => onRequestAudit && onRequestAudit('Patented AI Defense & VAPT')} />

      {/* 8. CLOSING CTA & INSTITUTIONAL INQUIRIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-white via-amber-50/50 to-white border-2 border-amber-300 p-8 sm:p-12 lg:p-14 text-center space-y-8 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span className="font-mono text-xs uppercase font-bold text-amber-900">
                COLLABORATE &amp; SECURE
              </span>
            </div>

            <h2 className="font-serif-header font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight">
              Partner with Tamil Nadu's Premier <span className="text-amber-800">Cyber Defense Team</span>.
            </h2>

            <p className="font-sans text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Whether you are an enterprise seeking infrastructure audits, a university looking for academic tie-ups, or a student aspiring to become an ethical hacker.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                if (onRequestAudit) onRequestAudit('Enterprise Security Audit Scope');
                else if (onRequestConsultation) onRequestConsultation();
              }}
              className="w-full sm:w-auto btn-gold-filled px-8 py-4 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl cursor-pointer"
            >
              <span>Schedule Enterprise Security Audit</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => {
                if (onBookAcademicDemo) onBookAcademicDemo('Admissions & Academic Tie-up Proposal');
                else if (onRequestConsultation) onRequestConsultation();
              }}
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 flex items-center justify-center space-x-2 shadow-lg transition-all cursor-pointer"
            >
              <span>Contact Admissions &amp; Academic Tie-ups</span>
              <ExternalLink className="w-4 h-4 text-amber-800" />
            </button>
          </div>

          {/* Official Contacts Strip */}
          <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-700">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-amber-700" />
              <span>Ganapathy, Coimbatore - 641006</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-amber-700" />
              <a href="tel:+919362012339" className="hover:text-amber-800 transition-colors">
                +91 93620 12339 / +91 96262 15976
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-amber-700" />
              <a href="mailto:dinesh@hackuptechnology.com" className="hover:text-amber-900 transition-colors text-amber-800 font-semibold">
                dinesh@hackuptechnology.com
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <FaqSection />

    </div>
  );
};
