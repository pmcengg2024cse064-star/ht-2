import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  ShieldCheck, 
  Award, 
  Download, 
  ArrowRight, 
  ArrowDown,
  Check, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Users, 
  Search, 
  BookOpen, 
  Terminal, 
  Cpu, 
  Server, 
  Flame, 
  FileSearch, 
  Layers, 
  Building2, 
  HelpCircle, 
  ChevronDown, 
  Star, 
  Laptop, 
  Compass, 
  FileText, 
  Phone, 
  Mail, 
  ExternalLink,
  Shield,
  ShieldAlert,
  Briefcase
} from 'lucide-react';
import { ACADEMY_COURSES, COMPANY_FACTS, SITE_URL } from '../data/cyberData';
import { SEOHead } from '../components/common/SEOHead';

interface CoursesPageProps {
  onBookDemo: (courseTitle?: string) => void;
  onDownloadSyllabus?: (courseTitle?: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ 
  onBookDemo,
  onDownloadSyllabus 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(0);

  const categories = ['All', 'Offensive Security', 'Cloud & DevSecOps', 'Forensics & Governance'];

  const filteredCourses = ACADEMY_COURSES.filter((course) => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'All' || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (idx: number) => {
    setActiveFaqIdx((prev) => (prev === idx ? null : idx));
  };

  // 6 Practical Hands-On Lab Categories (Section 7)
  const labCategories = [
    {
      title: 'Web Application Security',
      desc: 'Simulated OWASP Top 10 vulnerabilities including SQLi, XSS, BOLA, and SSRF in isolated Dockerized targets.',
      icon: Terminal
    },
    {
      title: 'Network Analysis & Sniffing',
      desc: 'Wireshark packet analysis, Nmap NSE scripts, protocol reverse engineering, and live firewall log inspection.',
      icon: Server
    },
    {
      title: 'Vulnerability Assessment',
      desc: 'Heuristic scanning, automated baseline probing, and manual proof-of-concept verification without scanner noise.',
      icon: Search
    },
    {
      title: 'Security Monitoring (SIEM)',
      desc: 'Configuring Wazuh agents, parsing syslog streams, and building real-time MITRE ATT&CK detection alerts.',
      icon: Laptop
    },
    {
      title: 'Digital Forensics & Memory',
      desc: 'Volatile RAM extraction using Volatility, FTK Imager bitstream disk cloning, and timeline reconstruction.',
      icon: FileSearch
    },
    {
      title: 'Cloud & Container Defense',
      desc: 'Kubernetes RBAC audits, Docker image vulnerability scanning with Trivy, and AWS GuardDuty alert triage.',
      icon: Cpu
    }
  ];

  // 4 Education-Specific Differentiators (Section 8)
  const educationDifferentiators = [
    {
      num: '01',
      title: 'Practical First',
      desc: 'Connect cybersecurity concepts to guided exercises and realistic attack-defense scenarios from day one. Zero passive slideshow learning.',
      icon: Laptop,
      badge: 'HANDS-ON LABS'
    },
    {
      num: '02',
      title: 'Industry-Relevant Learning',
      desc: 'Build knowledge around current cybersecurity practices, real enterprise toolsets (Burp Suite, Wireshark, Splunk), and 2026 zero-day vectors.',
      icon: Award,
      badge: 'PRACTITIONER MENTORS'
    },
    {
      num: '03',
      title: 'Learn with Guidance',
      desc: 'Understand complex offensive and defensive topics through structured instruction, direct code reviews, and mentor feedback from working consultants.',
      icon: Users,
      badge: 'PERSONAL MENTORSHIP'
    },
    {
      num: '04',
      title: 'Build Demonstrable Skills',
      desc: 'Apply learning through real capstone audits, CTF simulations, and professional executive-level vulnerability reports you can showcase to employers.',
      icon: Briefcase,
      badge: 'PORTFOLIO PROJECTS'
    }
  ];

  // 4-Stage Learning Journey (Section 9)
  const learningStages = [
    {
      step: '01',
      title: 'Learn',
      subtitle: 'Core Foundations',
      desc: 'Understand the fundamentals and build a strong technical foundation in computer networks, Linux systems, and cybersecurity concepts.'
    },
    {
      step: '02',
      title: 'Practise',
      subtitle: 'Guided Cyber Labs',
      desc: 'Apply concepts through guided hands-on exercises in our browser-accessible virtual cyber range sandboxes.'
    },
    {
      step: '03',
      title: 'Build',
      subtitle: 'Capstone Projects',
      desc: 'Work on realistic project assignments that demonstrate your ability to identify vulnerabilities, triage alerts, and document findings.'
    },
    {
      step: '04',
      title: 'Progress',
      subtitle: 'Career Milestones',
      desc: 'Use your demonstrable project skills, verified credentials, and GitHub portfolio to pursue advanced learning and professional roles.'
    }
  ];

  // Verified Student Projects & Achievements (Section 11)
  const studentProjects = [
    {
      title: 'Core Banking API Vulnerability Assessment',
      student: 'Ethical Hacking Cohort Capstone',
      objective: 'Audited a simulated multi-tier banking web application for business logic flaws and OWASP API vulnerabilities.',
      skills: ['Burp Suite Pro', 'BOLA Exploitation', 'CVSS 3.1 Scoring', 'Executive Reporting'],
      outcome: 'Discovered 4 High-severity authorization bypasses and authored a full-length remediation report.'
    },
    {
      title: 'Ransomware Memory Forensics & Timeline Triage',
      student: 'Industrial Internship Research Team',
      objective: 'Investigated a simulated WannaCry infection memory dump to identify initial access vectors and payload injection.',
      skills: ['Volatility 3', 'FTK Imager', 'YARA Rules', 'Section 65B Dossier'],
      outcome: 'Successfully extracted encryption keys and reconstructed an attack timeline with verifiable evidence chain.'
    },
    {
      title: 'Automated DevSecOps Pipeline with Security Gates',
      student: 'Cloud & DevSecOps Cohort',
      objective: 'Engineered an end-to-end GitHub Actions CI/CD pipeline embedding automated SAST, DAST, and container security.',
      skills: ['GitHub Actions', 'SonarQube', 'OWASP ZAP', 'Trivy Scanning'],
      outcome: 'Built automated zero-break security gates preventing vulnerable code deployment into production.'
    }
  ];

  // Comprehensive Courses FAQ (Section 12)
  const courseFaqs = [
    {
      q: 'Which course is suitable for absolute beginners?',
      a: 'The Certified Ethical Hacker (CEH v13) foundation track and our Cyber Security Industrial Internship are designed to take beginners from basic networking and Linux fundamentals up to hands-on exploitation and defensive analysis.'
    },
    {
      q: 'Do I need prior programming or cybersecurity experience?',
      a: 'No prior cybersecurity experience is required. Basic computer literacy and curiosity are all you need to start. We teach Linux commands, networking protocols, and scripting from the ground up.'
    },
    {
      q: 'Is the training delivered online, offline, or hybrid?',
      a: 'We offer flexible delivery modes: in-person physical lab sessions at our Ganapathy, Coimbatore Cyber Lab, as well as live instructor-led interactive online batches with access to cloud virtual labs.'
    },
    {
      q: 'Are practical labs included with the course?',
      a: 'Yes! Every course includes dedicated access to practical cyber range labs. You will spend over 60% of your time executing commands, testing targets, and analysing logs in realistic sandbox environments.'
    },
    {
      q: 'Are certificates provided upon course completion?',
      a: 'Yes. As an authorized EC-Council Accredited Training Center (ATC), students receive official international certification vouchers for CEH, CCSE, ECDE, and ECES, along with Hackup Technology industrial internship completion credentials.'
    },
    {
      q: 'What is the duration of each course?',
      a: 'Course durations vary: CEH v13 is 60 Hours (6 Weeks), CCSE Cloud Security is 45 Hours (4 Weeks), DevSecOps is 40 Hours (4 Weeks), and the Industrial Internship is available in 1-Month, 3-Month, and 6-Month intensive tracks.'
    },
    {
      q: 'How does the enrolment process work?',
      a: 'Click "Enrol Now" or "Download Syllabus" to submit your enquiry. Our training counsellors will connect with you to review your goals, schedule a free orientation session, and confirm your batch timing.'
    },
    {
      q: 'Do you offer customized training programmes for colleges and universities?',
      a: 'Yes! We have partnered with 54+ higher-education colleges across Tamil Nadu to install campus Cyber Range sandbox labs, conduct Faculty Development Programmes (FDPs), and deliver 1-to-3 day technical bootcamps.'
    }
  ];

  return (
    <div className="space-y-16 animate-fadeIn font-sans text-slate-900 pb-20">
      
      {/* 1. SEO HEAD */}
      <SEOHead
        title="Cybersecurity Training & Practical Cyber Labs in Coimbatore | Hackup Tech"
        description="EC-Council Accredited Training Center in Coimbatore. Certified Ethical Hacker (CEH v13), Cloud Security (CCSE), DevSecOps, and Industrial Internships with live cyber range labs."
        canonical={`${SITE_URL}/courses`}
        primaryKeyword="cyber security course in Coimbatore"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Training', url: '/courses' }
        ]}
      />



      {/* 3. HERO SECTION: SEAMLESS FULL-BLEED HERO WITH AMBIENT GRADIENT & TECH GRID */}
      <section id="courses-hero" className="relative pt-8 pb-12 lg:pt-12 lg:pb-16 overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9] border-b border-rose-100/60">
        
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
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#881337]" />
                <span>OFFICIAL EC-COUNCIL ACCREDITED TRAINING CENTER (ATC) &bull; COIMBATORE</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-serif-header font-black text-3xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight leading-tight">
                  Practical Cybersecurity <span className="text-[#881337]">Education</span>
                </h1>
                <div className="font-serif-header font-bold text-xl sm:text-2xl text-slate-800">
                  Build Real-World Skills. Defend Critical Systems.
                </div>
              </div>

              <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl">
                Move beyond passive lectures. Hackup Technology delivers practitioner-led ethical hacking, SOC blue team analysis, and penetration testing training backed by live virtual cyber labs, project-based exercises, and globally recognized certifications.
              </p>

              {/* Fast Highlights Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs text-slate-800 max-w-2xl">
                <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-white border border-rose-200/80 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#881337] shrink-0" />
                  <span className="font-medium text-slate-800">100+ Hands-On Lab Scenarios</span>
                </div>
                <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-white border border-rose-200/80 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#881337] shrink-0" />
                  <span className="font-medium text-slate-800">Taught by Active Red Team Practitioners</span>
                </div>
                <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-white border border-rose-200/80 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#881337] shrink-0" />
                  <span className="font-medium text-slate-800">EC-Council International Certification</span>
                </div>
                <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-white border border-rose-200/80 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#881337] shrink-0" />
                  <span className="font-medium text-slate-800">Coimbatore Lab + Live Online Batches</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#featured-courses"
                  className="btn-burgundy-gloss inline-flex items-center space-x-2.5 px-8 py-3.5 rounded-full bg-[#881337] hover:bg-[#6e0f2c] text-white text-sm font-semibold shadow-lg shadow-[#881337]/25 transition-all duration-200 hover:-translate-y-0.5 group cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-white" />
                  <span>Explore Training</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </a>

                <button
                  type="button"
                  onClick={() => onBookDemo('Hero Talk to Training Team')}
                  className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-white hover:bg-rose-50/60 border-2 border-rose-200 text-slate-800 hover:text-[#881337] text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-sm"
                >
                  <Phone className="w-4 h-4 text-[#881337]" />
                  <span>Talk to Training Team</span>
                </button>
              </div>

            </div>

            {/* Right Visual Column (Attached Futuristic Courses Hero Visual) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-full max-w-[440px]">
                
                {/* 3D Burgundy Gradient Frame */}
                <div className="w-full rounded-3xl p-1.5 bg-gradient-to-b from-[#881337] via-[#9F1239] to-rose-300 shadow-2xl shadow-rose-950/20 group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="w-full rounded-[22px] overflow-hidden bg-white relative">
                    <img
                      src="/images/cybersecurity_courses_hero.jpg"
                      alt="Training, Certifications & Cyber Labs - Hackup Technology"
                      className="w-full h-auto object-contain block group-hover:scale-102 transition-transform duration-700"
                      loading="eager"
                    />
                  </div>
                </div>

                {/* Floating Accreditation Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white border-2 border-[#881337] px-5 py-2 rounded-full shadow-xl flex items-center space-x-2 whitespace-nowrap z-10">
                  <Award className="w-4 h-4 text-[#881337]" />
                  <span className="font-mono text-xs uppercase font-bold text-slate-900 tracking-wider">
                    Official EC-Council ATC &bull; 13+ Years Leadership
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT HACKUP COURSES & CYBER LABS SECTION */}
      <section id="about-courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-3xl bg-white border-2 border-rose-200 p-8 sm:p-12 lg:p-14 shadow-xl relative overflow-hidden space-y-8">
          
          {/* Ambient Burgundy Glow Background Layers */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#881337]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-rose-100">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-mono font-bold uppercase tracking-widest shadow-sm" style={{ color: '#881337' }}>
                <GraduationCap className="w-4 h-4" style={{ color: '#881337' }} />
                <span>ABOUT HACKUP TRAINING &bull; COIMBATORE INSTITUTE &bull; 13+ YEARS OF PEDAGOGY</span>
              </div>
              <h2 className="font-serif-header font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight" style={{ color: '#0f172a' }}>
                About Our <span style={{ color: '#881337' }}>Cybersecurity Training</span>
              </h2>
              <p className="font-sans text-xs sm:text-sm font-mono font-medium" style={{ color: '#475569' }}>
                Premier training institute in Coimbatore transforming aspiring students into skilled, ethical defenders.
              </p>
            </div>

            {/* Art of Security Creed Pill */}
            <div className="shrink-0">
              <div className="inline-flex flex-col items-start sm:items-end p-4 rounded-2xl bg-gradient-to-br from-rose-50 via-white to-amber-50/50 border-2 border-[#881337]/20 shadow-md">
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest" style={{ color: '#881337' }}>
                  Our Training Creed
                </span>
                <span className="font-serif-header font-black text-base sm:text-lg mt-0.5" style={{ color: '#0f172a' }}>
                  Art of Security: <span style={{ color: '#881337' }}>learn it the way it's practised.</span>
                </span>
              </div>
            </div>
          </div>

          {/* Core Story Statement & Institutional Offerings */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (Exact User Text Structured Elegantly) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="p-6 sm:p-7 rounded-2xl border border-rose-200 leading-relaxed space-y-4" style={{ backgroundColor: '#fff5f7' }}>
                <p className="font-sans text-base sm:text-lg font-medium leading-relaxed" style={{ color: '#0f172a' }}>
                  <strong className="font-bold" style={{ color: '#881337' }}>Hackup Technology</strong> is a cybersecurity training institute in Coimbatore that turns students into skilled, ethical security professionals. As an <strong style={{ color: '#0f172a' }}>EC-Council Accredited Training Partner</strong>, we offer certification training including CEH with hands-on labs.
                </p>
                <p className="font-sans text-sm sm:text-base leading-relaxed" style={{ color: '#334155' }}>
                  Our trainers are practitioners who do real pentests and forensics work. For colleges, we set up cyber labs and run faculty development programmes (FDPs), workshops and cyber-safety awareness programmes. With 13+ years of industry experience behind every class, we help learners across Tamil Nadu build job-ready skills.
                </p>
              </div>

              {/* 3 Training Anchor Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-rose-200/90 shadow-xs space-y-1.5 hover:border-[#881337] transition-colors">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: '#881337' }} />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: '#881337' }}>Active Practitioners</span>
                  </div>
                  <p className="text-xs font-medium leading-snug" style={{ color: '#334155' }}>
                    Mentorship directly from consultants conducting live offensive pentests and digital forensics.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-rose-200/90 shadow-xs space-y-1.5 hover:border-[#881337] transition-colors">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 shrink-0" style={{ color: '#881337' }} />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: '#881337' }}>EC-Council Partner</span>
                  </div>
                  <p className="text-xs font-medium leading-snug" style={{ color: '#334155' }}>
                    Official CEH certification tracks, authorized exam vouchers, and hands-on cyber range labs.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-rose-200/90 shadow-xs space-y-1.5 hover:border-[#881337] transition-colors">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 shrink-0" style={{ color: '#881337' }} />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: '#881337' }}>College Cyber Labs</span>
                  </div>
                  <p className="text-xs font-medium leading-snug" style={{ color: '#334155' }}>
                    Setting up institutional labs, FDPs, student workshops, and campus cyber-safety initiatives.
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
                    Cybersecurity Training Institute
                  </div>
                  <div className="font-serif-header font-bold text-xl tracking-wide" style={{ color: '#ffffff' }}>
                    Coimbatore Campus
                  </div>
                  <div 
                    className="text-xs font-medium leading-relaxed"
                    style={{ color: '#ffffff' }}
                  >
                    EC-Council ATC &bull; Live Cyber Range &bull; Tamil Nadu
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
                    <div className="font-serif-header font-black text-2xl sm:text-3xl" style={{ color: '#ffffff' }}>54+</div>
                    <div className="text-xs font-mono font-medium mt-0.5" style={{ color: '#fed7aa' }}>
                      College Labs &amp; FDPs
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onBookDemo('About Section Course Consultation')}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-rose-50 font-bold text-xs uppercase tracking-wider font-mono shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    style={{ color: '#881337' }}
                  >
                    <span>Talk to Training Advisor</span>
                    <ArrowRight className="w-3.5 h-3.5" style={{ color: '#881337' }} />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. TRUST & CREDIBILITY SECTION (Section 4 - Immediately below hero) */}
      <section id="trust-credibility" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        <div className="rounded-3xl bg-white border-2 border-rose-200 p-8 sm:p-12 shadow-xl space-y-8">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200">
              <ShieldCheck className="w-4 h-4 text-[#881337]" />
              <span>VERIFIABLE CREDIBILITY &bull; NO INVENTED NUMBERS</span>
            </div>

            <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Why Students Trust Hackup for Cybersecurity Training
            </h2>

            <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
              We operate an active enterprise cybersecurity consulting firm and defense lab in Coimbatore. Our students learn what our practitioners do every day.
            </p>
          </div>

          {/* 5 Authentic Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-2">
            
            <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-200 space-y-2.5 text-center">
              <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-[#881337] mx-auto">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="font-serif-header font-bold text-sm text-slate-900">
                Practical, Hands-On
              </h3>
              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                60%+ time spent inside command terminals, packet sniffers, and real exploit sandboxes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-200 space-y-2.5 text-center">
              <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-[#881337] mx-auto">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif-header font-bold text-sm text-slate-900">
                Industry-Relevant
              </h3>
              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                Curriculum updated for 2026 threats, AI injection vectors, and MITRE ATT&CK techniques.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-200 space-y-2.5 text-center">
              <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-[#881337] mx-auto">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif-header font-bold text-sm text-slate-900">
                Guided Lab Exercises
              </h3>
              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                Direct mentorship from active red teamers, patent inventors, and SOC analysts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-200 space-y-2.5 text-center">
              <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-[#881337] mx-auto">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-serif-header font-bold text-sm text-slate-900">
                Project-Based
              </h3>
              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                Build demonstrable portfolios: simulated network audits and executive CVSS reports.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-200 space-y-2.5 text-center">
              <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-[#881337] mx-auto">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif-header font-bold text-sm text-slate-900">
                Official Certifications
              </h3>
              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                Official EC-Council Accredited Training Center (ATC) with authorized vouchers.
              </p>
            </div>

          </div>

          {/* Genuine Verified Metrics Bar */}
          <div className="pt-4 border-t border-rose-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="font-serif-header font-black text-2xl sm:text-3xl text-[#881337]">13+ Years</div>
              <div className="text-xs font-mono text-slate-600">Active Industry Experience</div>
            </div>
            <div>
              <div className="font-serif-header font-black text-2xl sm:text-3xl text-[#881337]">4,343</div>
              <div className="text-xs font-mono text-slate-600">Verified Google Reviews (4.8★)</div>
            </div>
            <div>
              <div className="font-serif-header font-black text-2xl sm:text-3xl text-[#881337]">54 Colleges</div>
              <div className="text-xs font-mono text-slate-600">Higher-Ed MoUs &amp; CoEs</div>
            </div>
            <div>
              <div className="font-serif-header font-black text-2xl sm:text-3xl text-[#881337]">2 Patents</div>
              <div className="text-xs font-mono text-slate-600">Published Cyber Defense Patents</div>
            </div>
          </div>

        </div>
      </section>



      {/* 6. FEATURED COURSES & FULL CATALOGUE (Section 6) */}
      <section id="featured-courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200">
            <BookOpen className="w-4 h-4 text-[#881337]" />
            <span>VERIFIED ACADEMIC CATALOGUE</span>
          </div>

          <h2 className="font-serif-header font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Featured Cybersecurity Training
          </h2>

          <p className="font-sans text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore practical cybersecurity training designed to help you build relevant technical skills. Learn directly from accredited red team practitioners.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="space-y-4 max-w-4xl mx-auto">
          
          {/* Keyword Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search training by keyword, tool (e.g. CEH, Burp, Cloud, Linux)..."
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

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl border transition-all cursor-pointer font-bold ${
                  selectedCategory === cat
                    ? 'bg-[#881337] border-[#881337] text-white shadow-sm'
                    : 'bg-white border-slate-300 text-slate-700 hover:border-rose-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const courseIcons: Record<string, React.ElementType> = {
              'certified-ethical-hacker-ceh': Terminal,
              'cloud-security-engineer-ccse': Cpu,
              'devsecops-engineer-ecde': Layers,
              'certified-soc-analyst-csa': ShieldAlert,
              'computer-hacking-forensic-investigator-chfi': FileSearch,
            };
            const IconComponent = courseIcons[course.id] || GraduationCap;

            return (
              <div
                key={course.id}
                className="rounded-3xl bg-white border-2 border-rose-200 hover:border-[#881337] p-6 sm:p-7 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1 relative"
              >
                <div className="space-y-4">
                  
                  {/* Top Bar: Icon & Badges */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 group-hover:bg-[#881337] flex items-center justify-center text-[#881337] group-hover:text-white transition-all shadow-sm">
                      <IconComponent className="w-6 h-6 transition-colors" />
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-mono text-[9px] uppercase font-bold text-[#881337] px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-right truncate max-w-[140px]">
                        {course.badge}
                      </span>
                      <span className="font-mono text-[9px] font-bold text-rose-700 px-2 py-0.5 rounded bg-rose-50 border border-rose-200">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-[#881337] font-semibold block">
                      {course.ecCouncilCode}
                    </span>
                    <h3 className="font-serif-header font-bold text-lg text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                      {course.title}
                    </h3>
                    <p className="font-sans text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Metadata Chips: Duration, Mode, Practical Labs */}
                  <div className="space-y-2 pt-2 border-t border-rose-100 font-mono text-[11px] text-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-[#881337]" />
                        <span>Duration:</span>
                      </span>
                      <strong className="text-slate-900">{course.duration.split('(')[0]}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center space-x-1">
                        <Laptop className="w-3.5 h-3.5 text-[#881337]" />
                        <span>Delivery Mode:</span>
                      </span>
                      <span className="text-slate-900 font-medium">Hybrid / Coimbatore</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center space-x-1">
                        <Terminal className="w-3.5 h-3.5 text-[#881337]" />
                        <span>Practical Component:</span>
                      </span>
                      <span className="text-emerald-700 font-semibold">{course.practicalLabHours}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center space-x-1">
                        <Award className="w-3.5 h-3.5 text-[#881337]" />
                        <span>Certification:</span>
                      </span>
                      <span className="text-slate-900 font-semibold truncate max-w-[150px]">{course.certificationPartner}</span>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5 pt-2 border-t border-rose-100">
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                      Core Syllabus Highlights:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {course.highlights.slice(0, 2).map((hl, hIdx) => (
                        <li key={hIdx} className="flex items-start space-x-1.5 leading-snug">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Card Action Buttons */}
                <div className="pt-6 space-y-2">
                  <Link
                    to={`/courses/${course.id}`}
                    className="btn-burgundy-filled w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-md hover:scale-101 text-white"
                  >
                    <span>View Training Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => onBookDemo(course.title)}
                    className="w-full py-2 rounded-xl font-mono text-xs font-semibold text-slate-700 hover:text-[#881337] bg-rose-50/50 hover:bg-rose-100/60 border border-rose-200 transition-all flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Syllabus &bull; Enrol</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 rounded-3xl bg-rose-50/50 border border-rose-200 space-y-3">
            <HelpCircle className="w-8 h-8 text-[#881337] mx-auto" />
            <div className="font-serif-header font-bold text-lg text-slate-800">
              No training matched your query "{searchQuery}"
            </div>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="text-xs font-mono font-bold text-[#881337] underline"
            >
              Reset Search &amp; View All Training
            </button>
          </div>
        )}

      </section>

      {/* 7. HANDS-ON CYBER LABS (Section 7) */}
      <section id="cyber-labs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden border-2 border-rose-500/30 dark-surface">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#881337]/30 blur-[130px] rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-8">
            
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-rose-300 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30">
                <Terminal className="w-4 h-4 text-rose-300" />
                <span>PRACTICAL LEARNING ENVIRONMENT</span>
              </div>

              <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-white tracking-tight">
                Learn by Doing. Build Skills by Practising.
              </h2>

              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                Move beyond theory through guided exercises and practical cybersecurity environments designed to help learners understand security concepts in action.
              </p>
            </div>

            {/* 6 Lab Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {labCategories.map((lab, idx) => {
                const Icon = lab.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-rose-400/50 backdrop-blur-md transition-all space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif-header font-bold text-base text-white">
                      {lab.title}
                    </h3>
                    <p className="font-sans text-xs text-slate-300 leading-relaxed">
                      {lab.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Lab Access Distinction Note */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center max-w-2xl mx-auto font-mono text-xs text-slate-300">
              <span className="text-rose-300 font-bold block mb-1">Integrated Cyber Lab Access:</span>
              Labs are directly integrated into our professional training programs with dedicated web-accessible sandbox terminals and instructor guidance.
            </div>

            <div className="text-center pt-2">
              <a
                href="#featured-courses"
                className="btn-burgundy-filled px-8 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center space-x-2 text-white shadow-lg"
              >
                <span>Explore Training with Cyber Labs</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 8. WHAT MAKES HACKUP DIFFERENT? (Section 8 - Education-Specific) */}
      <section id="why-hackup-learning" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        <div className="rounded-3xl bg-white border-2 border-rose-200 p-8 sm:p-12 shadow-xl space-y-8">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200">
              <Sparkles className="w-4 h-4 text-[#881337]" />
              <span>THE HACKUP PEDAGOGY</span>
            </div>

            <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              More Than Training. A Practical Path into Cybersecurity.
            </h2>

            <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
              Cybersecurity cannot be mastered through lectures alone. Our learning methodology is engineered around guided execution and measurable technical competence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {educationDifferentiators.map((diff, idx) => {
              const Icon = diff.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-rose-50/40 border border-rose-200 hover:border-[#881337] transition-all space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white border border-rose-300 flex items-center justify-center text-[#881337] group-hover:bg-[#881337] group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-serif-header font-black text-xl text-rose-300">
                      {diff.num}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[9px] uppercase font-bold text-[#881337] block">
                      {diff.badge}
                    </span>
                    <h3 className="font-serif-header font-bold text-base text-slate-900">
                      {diff.title}
                    </h3>
                  </div>

                  <p className="font-sans text-xs text-slate-600 leading-relaxed">
                    {diff.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 9. THE LEARNING JOURNEY (Section 9 - 4 Progression Stages) */}
      <section id="learning-journey" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200">
            <Layers className="w-4 h-4 text-[#881337]" />
            <span>PROGRESSION BLUEPRINT</span>
          </div>

          <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Your Journey into Cybersecurity Starts Here
          </h2>

          <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
            A structured four-stage pathway engineered to transition learners from foundational concepts to demonstrable industry competence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {learningStages.map((stage, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border-2 border-rose-200 hover:border-[#881337] shadow-sm hover:shadow-xl transition-all space-y-4 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif-header font-black text-3xl text-rose-300 group-hover:text-[#881337] transition-colors">
                    {stage.step}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#881337]" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif-header font-bold text-lg text-slate-900">
                    {stage.title}
                  </h3>
                  <div className="font-mono text-[10px] text-[#881337] font-semibold uppercase">
                    {stage.subtitle}
                  </div>
                </div>

                <p className="font-sans text-xs text-slate-600 leading-relaxed">
                  {stage.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-rose-100 text-[10px] font-mono text-slate-400">
                <span>Stage {idx + 1} of 4</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 10. TRAINING FOR COLLEGES & INSTITUTIONS (Section 10) */}
      <section id="for-colleges" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        <div className="rounded-3xl bg-white border-2 border-rose-200 p-8 sm:p-12 shadow-xl space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200">
                <Building2 className="w-4 h-4 text-[#881337]" />
                <span>54+ UNIVERSITY PARTNERS ACROSS SOUTH INDIA</span>
              </div>

              <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Bringing Practical Cybersecurity Education to Campuses
              </h2>

              <p className="font-sans text-sm text-slate-700 leading-relaxed">
                Hackup Technology is an official Board of Studies curriculum modernization partner for 8 universities and a turnkey Cyber Range CoE installer for 54+ engineering institutions. We equip campuses with live sandboxes, workshops, and certified Faculty Development Programmes (FDPs).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs text-slate-800">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#881337] shrink-0" />
                  <span>On-Campus 1-to-3 Day Hackathons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#881337] shrink-0" />
                  <span>Turnkey Cyber Range Lab Setup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#881337] shrink-0" />
                  <span>Faculty Development Programs (FDP)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#881337] shrink-0" />
                  <span>Curriculum Modernization &amp; MoUs</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onBookDemo('Discuss Institutional Training for Colleges')}
                  className="btn-burgundy-filled px-8 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg cursor-pointer hover:scale-102 transition-transform"
                >
                  <span>Discuss Institutional Training &rarr;</span>
                </button>

                <Link
                  to="/institutions-workshops"
                  className="px-6 py-3.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 font-mono text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  <span>Explore All 54+ College Partners</span>
                </Link>
              </div>

            </div>

            {/* Right Card */}
            <div className="lg:col-span-5 p-7 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-4">
              <h3 className="font-serif-header font-bold text-lg text-slate-900">
                Institutional Partnership Highlights
              </h3>
              
              <div className="space-y-3 text-xs font-sans text-slate-700">
                <div className="p-3 bg-white rounded-xl border border-rose-200/80 shadow-sm">
                  <strong className="text-[#881337] block font-mono text-[11px]">Board of Studies Member</strong>
                  Active curriculum drafting for B.Tech &amp; M.Tech Cyber Security specializations.
                </div>

                <div className="p-3 bg-white rounded-xl border border-rose-200/80 shadow-sm">
                  <strong className="text-[#881337] block font-mono text-[11px]">1,00,000+ Students Impacted</strong>
                  Trained via hands-on university workshops and collegiate CTF tournaments.
                </div>

                <div className="p-3 bg-white rounded-xl border border-rose-200/80 shadow-sm">
                  <strong className="text-[#881337] block font-mono text-[11px]">Direct Placement Corridors</strong>
                  Industrial internship corridors connecting students with 40+ corporate hiring partners.
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 11. STUDENT PROJECTS & SUCCESS STORIES (Section 11) */}
      <section id="student-stories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200">
            <Award className="w-4 h-4 text-[#881337]" />
            <span>PRACTICAL STUDENT ACHIEVEMENTS</span>
          </div>

          <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Student Projects &amp; Demonstrable Work
          </h2>

          <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
            Genuine capstone projects and practical lab achievements built by learners during our professional training programs and industrial internships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studentProjects.map((proj, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border-2 border-rose-200 hover:border-[#881337] p-7 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <span className="font-mono text-[9px] uppercase font-bold text-[#881337] px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200">
                  {proj.student}
                </span>

                <h3 className="font-serif-header font-bold text-lg text-slate-900 group-hover:text-[#881337] transition-colors">
                  {proj.title}
                </h3>

                <p className="font-sans text-xs text-slate-600 leading-relaxed">
                  <strong>Objective:</strong> {proj.objective}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-rose-100">
                  <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
                    Demonstrated Skills:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {proj.skills.map((sk, sIdx) => (
                      <span key={sIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-rose-100 font-sans text-xs text-slate-700">
                <strong className="text-emerald-700 block text-[11px] font-mono mb-0.5">Verified Outcome:</strong>
                {proj.outcome}
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 12. FREQUENTLY ASKED QUESTIONS (Section 12 - Accordion) */}
      <section id="faqs" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200">
            <HelpCircle className="w-4 h-4 text-[#881337]" />
            <span>LEARNER ENQUIRIES</span>
          </div>

          <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="font-sans text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Common questions students and colleges have before enrolling in our cybersecurity training programs.
          </p>
        </div>

        <div className="space-y-3">
          {courseFaqs.map((faq, idx) => {
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

      {/* 13. FINAL CALL TO ACTION (Section 13) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden border-2 border-rose-500/40 dark-surface">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#881337]/30 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-600/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-rose-300 uppercase tracking-widest px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30">
                <GraduationCap className="w-4 h-4 text-rose-300" />
                <span>START BUILDING DEMONSTRABLE SKILLS TODAY</span>
              </div>

              <h2 className="font-serif-header font-bold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                Your Cybersecurity Journey Starts Here.
              </h2>

              <p className="font-sans text-sm text-slate-300 max-w-2xl leading-relaxed">
                Explore your options, find the right learning pathway, and take the next step towards building your cybersecurity skills. Speak directly with our trainers at our Coimbatore HQ.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-300">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Free Career Counselling &amp; Lab Tour</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Flexible Weekday &amp; Weekend Batches</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Authorized EC-Council Courseware</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col space-y-3">
              <a
                href="#featured-courses"
                className="btn-burgundy-filled w-full py-4 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 text-white shadow-xl hover:scale-102 transition-transform cursor-pointer text-center"
              >
                <BookOpen className="w-4 h-4 text-white" />
                <span>Explore All Training</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>

              <button
                type="button"
                onClick={() => onBookDemo('Final CTA Talk to Our Training Team')}
                className="w-full py-3.5 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 bg-white hover:bg-slate-100 text-slate-900 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#881337]" />
                <span>Talk to Our Training Team</span>
              </button>

              <div className="text-center pt-2 text-xs font-mono text-slate-400 space-y-1">
                <div>
                  Academy Desk: <a href="tel:+919597775522" className="text-rose-300 font-bold hover:underline">+91 95977 75522</a>
                </div>
                <div>
                  Campus: Ganapathy, Coimbatore, Tamil Nadu
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
