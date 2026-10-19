import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown, 
  ArrowRight,
  ShieldAlert,
  Search,
  Server,
  FileCheck2,
  Flame,
  Cpu,
  FileSearch,
  GraduationCap,
  Briefcase,
  BookOpen,
  Award,
  Layers,
  Lock
} from 'lucide-react';
import { ENTERPRISE_SERVICES, ACADEMY_COURSES, COMPANY_FACTS } from '../../data/cyberData';

export type TabType = 'overview' | 'enterprise' | 'academy' | 'cyber-range' | 'internship' | 'community' | 'about';

interface NavbarProps {
  onRequestConsultation: (topic?: string) => void;
  onRequestAudit?: (serviceTitle?: string) => void;
  onBookDemo?: (courseTitle?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRequestConsultation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'services' | 'courses' | null>(null);
  const location = useLocation();
  const megaMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const coursesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close Courses dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        coursesDropdownRef.current && 
        !coursesDropdownRef.current.contains(event.target as Node)
      ) {
        setActiveMegaMenu((prev) => (prev === 'courses' ? null : prev));
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (menu: 'services' | 'courses') => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setActiveMegaMenu(menu);
  };

  const handleMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

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

  return (
    <>
      {/* 2. STICKY HEADER */}
      <header className="sticky top-0 z-50 w-full font-sans shadow-md">
        
        {/* FIXED CONTACT BAR ON SCROLL & AT TOP */}
        <div className="w-full bg-white/95 border-b border-slate-200 py-1.5 px-4 sm:px-6 lg:px-8 text-[11px] font-mono text-slate-700 shadow-xs backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
            
            <div className="flex items-center space-x-3 text-slate-700">
              <span className="hidden sm:inline-flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-[#881337]" />
                <span className="font-sans font-semibold text-slate-800">Ganapathy, Coimbatore</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="inline-flex items-center space-x-1.5 text-red-700 font-bold text-[10px] uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                <span>Active 24/7 Incident Hotline</span>
              </span>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4 shrink-0 font-semibold">
              <a 
                href={`tel:${COMPANY_FACTS.phones[0].replace(/\s+/g, '')}`} 
                className="transition-colors flex items-center space-x-1 text-[#881337] hover:text-[#5B0E1B] font-bold"
              >
                <Phone className="w-3 h-3 text-[#881337]" />
                <span>{COMPANY_FACTS.phones[0]}</span>
              </a>

              <span className="text-slate-300 hidden md:inline">|</span>

              <a 
                href={`tel:${COMPANY_FACTS.phones[1].replace(/\s+/g, '')}`} 
                className="transition-colors hidden md:flex items-center space-x-1 text-[#881337] hover:text-[#5B0E1B] font-semibold"
              >
                <Phone className="w-3 h-3 text-[#881337]" />
                <span>{COMPANY_FACTS.phones[1]}</span>
              </a>

              <span className="text-slate-300 hidden lg:inline">|</span>

              <a 
                href={`mailto:${COMPANY_FACTS.emails[0]}`} 
                className="transition-colors hidden lg:flex items-center space-x-1 text-slate-700 hover:text-[#881337] font-medium"
              >
                <Mail className="w-3 h-3 text-[#881337]" />
                <span>{COMPANY_FACTS.emails[0]}</span>
              </a>
            </div>

          </div>
        </div>

        {/* MAIN NAVIGATION BAR */}
        <div
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? 'bg-white/95 border-b border-slate-200 backdrop-blur-xl shadow-lg'
              : 'bg-white/90 border-b border-slate-200 backdrop-blur-lg'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              
              {/* Brand Logo */}
              <div className="flex items-center space-x-3 shrink-0">
                <Link
                  to="/"
                  className="flex items-center space-x-3 group text-left cursor-pointer"
                >
                  <div className="relative flex items-center justify-center w-11 h-11 rounded-xl overflow-hidden shadow-md border border-slate-200 group-hover:border-[#881337] transition-all bg-white p-1">
                    <img
                      src="/images/hackup_logo.png"
                      alt="Hackup Technology Official Logo"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-serif-header font-extrabold text-lg sm:text-xl tracking-wider text-slate-900 group-hover:text-[#881337] transition-colors">
                        HACKUP
                      </span>
                      <span className="font-serif-header font-bold text-sm sm:text-base tracking-widest text-[#881337]">
                        TECHNOLOGY
                      </span>
                    </div>
                    <div className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-slate-500 -mt-0.5 font-bold">
                      Art of Security
                    </div>
                  </div>
                </Link>
              </div>

              {/* TARGET DESKTOP NAVIGATION ITEMS */}
              <nav className="hidden lg:flex items-center space-x-1 font-mono text-xs font-semibold text-slate-700">
                
                {/* 1. Home */}
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition-colors ${
                      isActive ? 'text-[#881337] font-bold bg-rose-50' : 'hover:text-slate-950 hover:bg-slate-100'
                    }`
                  }
                >
                  Home
                </NavLink>

                {/* 2. Services Mega Menu */}
                <div 
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={handleMouseLeave}
                >
                  <NavLink
                    to="/services"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg transition-colors inline-flex items-center space-x-1 ${
                        isActive || location.pathname.startsWith('/services')
                          ? 'text-[#881337] font-bold bg-rose-50'
                          : 'hover:text-slate-950 hover:bg-slate-100'
                      }`
                    }
                  >
                    <span>Services</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMegaMenu === 'services' ? 'rotate-180 text-[#881337]' : ''}`} />
                  </NavLink>

                  {/* Mega Menu Dropdown for Services (White & Burgundy styling) */}
                  <AnimatePresence>
                    {activeMegaMenu === 'services' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[720px] rounded-2xl bg-white border-2 border-rose-200 shadow-2xl p-6 z-50"
                      >
                        <div className="flex items-center justify-between border-b border-rose-100 pb-3 mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#881337] animate-pulse" />
                            <span className="font-serif-header font-bold text-slate-900 text-sm">
                              Enterprise Cybersecurity Services
                            </span>
                          </div>
                          <Link
                            to="/services"
                            className="text-xs font-mono font-bold text-[#881337] hover:underline flex items-center space-x-1"
                          >
                            <span>Explore All Services</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                        {/* 8 Services Grid */}
                        <div className="grid grid-cols-2 gap-3">
                          {ENTERPRISE_SERVICES.map((srv) => {
                            const IconComponent = serviceIcons[srv.id] || ShieldAlert;
                            return (
                              <Link
                                key={srv.id}
                                to={`/services/${srv.id}`}
                                className="p-3 rounded-xl hover:bg-rose-50/70 border border-transparent hover:border-rose-200 transition-all flex items-start space-x-3 group"
                              >
                                <div className="w-8 h-8 rounded-lg bg-rose-100 border border-rose-300 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                                  <IconComponent className="w-4 h-4 text-[#881337]" />
                                </div>
                                <div className="space-y-0.5">
                                  <div className="font-semibold text-xs text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                                    {srv.shortTitle}
                                  </div>
                                  <div className="font-sans text-[11px] text-slate-500 line-clamp-1">
                                    {srv.tagline}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Portfolio */}
                <NavLink
                  to="/portfolio"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition-colors ${
                      isActive ? 'text-[#881337] font-bold bg-rose-50' : 'hover:text-slate-950 hover:bg-slate-100'
                    }`
                  }
                >
                  Portfolio
                </NavLink>

                {/* 4. About Us */}
                <NavLink
                  to="/about-us"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition-colors ${
                      isActive ? 'text-[#881337] font-bold bg-rose-50' : 'hover:text-slate-950 hover:bg-slate-100'
                    }`
                  }
                >
                  About Us
                </NavLink>

                {/* 5. Blog */}
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition-colors ${
                      isActive ? 'text-[#881337] font-bold bg-rose-50' : 'hover:text-slate-950 hover:bg-slate-100'
                    }`
                  }
                >
                  Blog
                </NavLink>

                {/* 6. Contact */}
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition-colors ${
                      isActive ? 'text-[#881337] font-bold bg-rose-50' : 'hover:text-slate-950 hover:bg-slate-100'
                    }`
                  }
                >
                  Contact
                </NavLink>

              </nav>

              {/* ACTION BUTTONS: Courses (White & Navy Blue) & Book Consultation (Burgundy) */}
              <div className="hidden lg:flex items-center space-x-3">
                {/* Courses Mega Menu Button (White & Navy Blue Theme - Opened on Click only) */}
                <div 
                  ref={coursesDropdownRef}
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={() => setActiveMegaMenu((prev) => prev === 'courses' ? null : 'courses')}
                    className="btn-navy-filled px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-lg cursor-pointer hover:scale-102 text-white"
                    aria-expanded={activeMegaMenu === 'courses'}
                    aria-haspopup="true"
                  >
                    <GraduationCap className="w-4 h-4 text-white" />
                    <span>Courses</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${activeMegaMenu === 'courses' ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mega Menu Dropdown for Courses (White and Navy Blue Theme - Click Triggered) */}
                  <AnimatePresence>
                    {activeMegaMenu === 'courses' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-[680px] rounded-2xl bg-white border-2 border-blue-200 shadow-2xl p-6 z-50 shadow-blue-950/20"
                      >
                        <div className="flex items-center justify-between border-b border-blue-100 pb-3 mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                            <span className="font-serif-header font-bold text-slate-900 text-sm">
                              EC-Council Accredited Training &amp; Internships
                            </span>
                          </div>
                          <Link
                            to="/courses"
                            onClick={() => setActiveMegaMenu(null)}
                            className="text-xs font-mono font-bold text-blue-900 hover:text-blue-700 hover:underline flex items-center space-x-1"
                          >
                            <span>View All Courses</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                        {/* 5 Courses List in White & Navy Blue */}
                        <div className="grid grid-cols-1 gap-2.5">
                          {ACADEMY_COURSES.map((course) => (
                            <Link
                              key={course.id}
                              to={`/courses/${course.id}`}
                              onClick={() => setActiveMegaMenu(null)}
                              className="p-3 rounded-xl hover:bg-blue-50/80 border border-transparent hover:border-blue-200 transition-all flex items-center justify-between group"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                  <GraduationCap className="w-4 h-4 text-[#1E3A8A]" />
                                </div>
                                <div>
                                  <div className="font-semibold text-xs text-slate-900 group-hover:text-blue-900 transition-colors">
                                    {course.title}
                                  </div>
                                  <div className="font-sans text-[11px] text-slate-500">
                                    {course.duration} &bull; {course.mode}
                                  </div>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                                {course.badge}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* TARGET CTA BUTTON: "Book Your Cyber Consultation" */}
                <button
                  onClick={() => onRequestConsultation('Executive Cyber Consultation')}
                  className="btn-burgundy-filled px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-xl cursor-pointer hover:scale-102 text-white"
                >
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Book Your Cyber Consultation</span>
                </button>
              </div>

              {/* Mobile Hamburger Menu Toggle */}
              <div className="flex lg:hidden items-center space-x-2">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950 cursor-pointer shadow-sm"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden w-full bg-white border-b border-slate-200 shadow-xl overflow-hidden font-mono text-xs"
            >
              <div className="px-5 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
                <Link
                  to="/"
                  className="block py-2 font-bold text-slate-900 border-b border-slate-100"
                >
                  Home
                </Link>

                {/* Services Section in Mobile */}
                <div className="space-y-1 py-1 border-b border-slate-100">
                  <div className="font-bold text-[#9E721D] uppercase text-[11px] flex items-center justify-between">
                    <span>Services</span>
                    <Link to="/services" className="text-[10px] underline font-normal text-slate-500">View All</Link>
                  </div>
                  <div className="grid grid-cols-1 gap-1 pl-2 pt-1 font-sans text-xs">
                    {ENTERPRISE_SERVICES.map((s) => (
                      <Link
                        key={s.id}
                        to={`/services/${s.id}`}
                        className="py-1 text-slate-700 hover:text-amber-800"
                      >
                        &bull; {s.shortTitle}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to="/institutions-workshops"
                  className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                >
                  Institutions &amp; Workshops (54+ Colleges)
                </Link>

                <Link
                  to="/portfolio"
                  className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                >
                  Portfolio &amp; Case Studies
                </Link>

                <Link
                  to="/about-us"
                  className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                >
                  About Us &amp; Leadership
                </Link>

                <Link
                  to="/gallery"
                  className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                >
                  Cyber Range Gallery
                </Link>

                <Link
                  to="/blog"
                  className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                >
                  Blog &amp; Cyber Research
                </Link>

                <Link
                  to="/contact"
                  className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                >
                  Contact Coimbatore HQ
                </Link>

                {/* Courses Section in Mobile - Located right next to Contact (White & Navy Blue Theme) */}
                <div className="space-y-1 py-1 border-b border-slate-100">
                  <div className="font-bold text-[#1E3A8A] uppercase text-[11px] flex items-center justify-between">
                    <span>Courses &amp; Training</span>
                    <Link to="/courses" className="text-[10px] underline font-normal text-blue-700">View All</Link>
                  </div>
                  <div className="grid grid-cols-1 gap-1 pl-2 pt-1 font-sans text-xs">
                    {ACADEMY_COURSES.map((c) => (
                      <Link
                        key={c.id}
                        to={`/courses/${c.id}`}
                        className="py-1 text-slate-700 hover:text-blue-800"
                      >
                        &bull; {c.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onRequestConsultation();
                    }}
                    className="w-full btn-gold-filled py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-center"
                  >
                    Book Your Cyber Consultation
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
