import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  GraduationCap,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { COMPANY_FACTS } from '../../data/cyberData';

export type TabType = 'overview' | 'enterprise' | 'academy' | 'cyber-range' | 'internship' | 'community' | 'about';

interface NavbarProps {
  onRequestConsultation: (topic?: string) => void;
  onRequestAudit?: (serviceTitle?: string) => void;
  onBookDemo?: (courseTitle?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRequestConsultation,
  onBookDemo,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isServices = location.pathname.startsWith('/services');
  const isCourses = location.pathname.startsWith('/courses');
  const isCorporate = !isServices && !isCourses;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavAnchor = (e: React.MouseEvent<HTMLAnchorElement>, targetPath: string, hash: string) => {
    if (location.pathname === targetPath) {
      e.preventDefault();
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* 2. STICKY HEADER */}
      <header className="sticky top-0 z-50 w-full font-sans shadow-md">
        
        {/* FIXED CONTACT / TRUST BAR ON SCROLL & AT TOP */}
        <div className="w-full bg-white/95 border-b border-slate-200 py-1.5 px-4 sm:px-6 lg:px-8 text-[11px] font-mono text-slate-700 shadow-xs backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
            
            {/* Left Context-Sensitive Trust Badge */}
            <div className="flex items-center space-x-3 text-slate-700">
              {isServices ? (
                <>
                  <span className="hidden sm:inline-flex items-center space-x-1.5 text-slate-900 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#881337]" />
                    <span>TÜV SÜD Assured Security Audit Partner</span>
                  </span>
                  <span className="text-slate-300 hidden sm:inline">|</span>
                  <span className="inline-flex items-center space-x-1.5 text-[#881337] font-bold text-[10px] uppercase tracking-wider">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                    </span>
                    <span>24/7 Managed SOC Hotline</span>
                  </span>
                </>
              ) : isCourses ? (
                <>
                  <span className="hidden sm:inline-flex items-center space-x-1.5 text-slate-900 font-semibold">
                    <GraduationCap className="w-3.5 h-3.5 text-[#881337]" />
                    <span>Official EC-Council ATC &bull; 65%+ Hands-On Labs</span>
                  </span>
                  <span className="text-slate-300 hidden sm:inline">|</span>
                  <span className="inline-flex items-center space-x-1.5 text-emerald-700 font-bold text-[10px] uppercase tracking-wider">
                    <span>Admissions Open: CEH v13 AI Cohort</span>
                  </span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline-flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-[#881337]" />
                    <span className="font-sans font-semibold text-slate-800">Ganapathy, Coimbatore HQ</span>
                  </span>
                  <span className="text-slate-300 hidden sm:inline">|</span>
                  <span className="inline-flex items-center space-x-1.5 text-red-700 font-bold text-[10px] uppercase tracking-wider">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                    </span>
                    <span>Active 24/7 Incident Hotline</span>
                  </span>
                </>
              )}
            </div>

            {/* Right Contact Direct Dial */}
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
              
              {/* Brand Logo & Experience Identity */}
              <div className="flex items-center space-x-3 shrink-0">
                <Link
                  to="/"
                  className="flex items-center space-x-3 group text-left cursor-pointer"
                  title="Return to Corporate Homepage"
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
                        {isServices ? 'SERVICES' : isCourses ? 'ACADEMY' : 'TECHNOLOGY'}
                      </span>
                    </div>
                    <div className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-slate-500 -mt-0.5 font-bold">
                      {isServices 
                        ? 'Cyber Defense & VAPT' 
                        : isCourses 
                        ? 'Education & Cyber Labs' 
                        : 'Art of Security'}
                    </div>
                  </div>
                </Link>
              </div>

              {/* DESKTOP NAVIGATION ITEMS (DYNAMICALLY ADAPTED BY EXPERIENCE) */}
              <nav className="hidden lg:flex items-center space-x-1 font-mono text-xs font-semibold text-slate-700">
                
                {/* 1. SERVICES EXPERIENCE NAVIGATION */}
                {isServices && (
                  <>
                    <Link
                      to="/"
                      className="px-2.5 py-2 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-100 flex items-center space-x-1 font-semibold transition-colors mr-1"
                      title="Back to Corporate Homepage"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 text-[#881337]" />
                      <span>Corporate</span>
                    </Link>

                    <a
                      href="/services#overview"
                      onClick={(e) => handleNavAnchor(e, '/services', '#overview')}
                      className="px-2.5 py-2 rounded-lg hover:text-[#881337] hover:bg-rose-50 transition-colors"
                    >
                      Overview
                    </a>

                    <a
                      href="/services#services-catalog"
                      onClick={(e) => handleNavAnchor(e, '/services', '#services-catalog')}
                      className="px-2.5 py-2 rounded-lg hover:text-[#881337] hover:bg-rose-50 transition-colors"
                    >
                      All Services
                    </a>

                    <a
                      href="/services#why-hackup"
                      onClick={(e) => handleNavAnchor(e, '/services', '#why-hackup')}
                      className="px-2.5 py-2 rounded-lg hover:text-[#881337] hover:bg-rose-50 transition-colors"
                    >
                      Why Hackup
                    </a>

                    <a
                      href="/services#industries"
                      onClick={(e) => handleNavAnchor(e, '/services', '#industries')}
                      className="px-2.5 py-2 rounded-lg hover:text-[#881337] hover:bg-rose-50 transition-colors"
                    >
                      Industries
                    </a>

                    <a
                      href="/services#process"
                      onClick={(e) => handleNavAnchor(e, '/services', '#process')}
                      className="px-2.5 py-2 rounded-lg hover:text-[#881337] hover:bg-rose-50 transition-colors"
                    >
                      Process
                    </a>

                    <a
                      href="/services#faqs"
                      onClick={(e) => handleNavAnchor(e, '/services', '#faqs')}
                      className="px-2.5 py-2 rounded-lg hover:text-[#881337] hover:bg-rose-50 transition-colors"
                    >
                      FAQs
                    </a>
                  </>
                )}

                {/* 2. COURSES EXPERIENCE NAVIGATION */}
                {isCourses && (
                  <>
                    <Link
                      to="/"
                      className="px-2.5 py-2 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-100 flex items-center space-x-1 font-semibold transition-colors mr-1"
                      title="Back to Corporate Homepage"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 text-[#881337]" />
                      <span>Corporate</span>
                    </Link>

                    <a
                      href="/courses#courses-hero"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#courses-hero')}
                      className="px-2.5 py-2 rounded-lg hover:text-[#881337] hover:bg-rose-50 transition-colors"
                    >
                      Overview
                    </a>

                    <a
                      href="/courses#trust-credibility"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#trust-credibility')}
                      className="px-2.5 py-2 rounded-lg hover:text-[#881337] hover:bg-rose-50 transition-colors"
                    >
                      Why Trust Us
                    </a>


                    <a
                      href="/courses#featured-courses"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#featured-courses')}
                      className="px-2.5 py-2 rounded-lg hover:text-[#881337] hover:bg-rose-50 transition-colors"
                    >
                      Courses
                    </a>

                    <a
                      href="/courses#cyber-labs"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#cyber-labs')}
                      className="px-2.5 py-2 rounded-lg hover:text-[#881337] hover:bg-rose-50 transition-colors"
                    >
                      Cyber Labs
                    </a>

                    <a
                      href="/courses#for-colleges"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#for-colleges')}
                      className="px-2.5 py-2 rounded-lg hover:text-[#881337] hover:bg-rose-50 transition-colors"
                    >
                      For Colleges
                    </a>

                    <a
                      href="/courses#faqs"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#faqs')}
                      className="px-2.5 py-2 rounded-lg hover:text-[#881337] hover:bg-rose-50 transition-colors"
                    >
                      FAQs
                    </a>
                  </>
                )}

                {/* 3. CORPORATE HOMEPAGE NAVIGATION */}
                {isCorporate && (
                  <>
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
                  </>
                )}

              </nav>

              {/* ACTION BUTTONS (EXPERIENCE SPECIFIC CONVERSION CTAS) */}
              <div className="hidden lg:flex items-center space-x-3">
                
                {/* If on Services Experience */}
                {isServices && (
                  <>
                    <button
                      onClick={() => onRequestConsultation('Book a Cybersecurity Consultation')}
                      className="btn-burgundy-filled px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-xl cursor-pointer hover:scale-102 text-white"
                    >
                      <ShieldCheck className="w-4 h-4 text-white" />
                      <span>Book a Cybersecurity Consultation</span>
                    </button>
                  </>
                )}

                {/* If on Courses Experience */}
                {isCourses && (
                  <>
                    <button
                      onClick={() => onBookDemo ? onBookDemo('Explore Courses & Admissions') : onRequestConsultation('Course Enrolment')}
                      className="btn-burgundy-filled px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-xl cursor-pointer hover:scale-102 text-white"
                    >
                      <GraduationCap className="w-4 h-4 text-white" />
                      <span>Explore Courses</span>
                    </button>
                  </>
                )}

                {/* If on Corporate Homepage */}
                {isCorporate && (
                  <>
                    <Link
                      to="/courses"
                      className="px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 border border-rose-200 bg-rose-50/80 hover:bg-[#881337] text-[#881337] hover:text-white shadow-sm transition-all duration-200 cursor-pointer hover:scale-102"
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Courses</span>
                    </Link>

                    <button
                      onClick={() => onRequestConsultation('Executive Cyber Consultation')}
                      className="btn-burgundy-filled px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-xl cursor-pointer hover:scale-102 text-white"
                    >
                      <ShieldCheck className="w-4 h-4 text-white" />
                      <span>Book Your Cyber Consultation</span>
                    </button>
                  </>
                )}

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

        {/* MOBILE DRAWER (EXPERIENCE-SPECIFIC USER JOURNEYS) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden w-full bg-white border-b border-slate-200 shadow-xl overflow-hidden font-mono text-xs"
            >
              <div className="px-5 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
                
                {/* 1. SERVICES MOBILE DRAWER */}
                {isServices && (
                  <>
                    <Link
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2 py-2 font-bold text-[#881337] border-b border-slate-100"
                    >
                      <ArrowLeft className="w-4 h-4 text-[#881337]" />
                      <span>Corporate Homepage</span>
                    </Link>

                    <a
                      href="/services#overview"
                      onClick={(e) => handleNavAnchor(e, '/services', '#overview')}
                      className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                    >
                      Services Overview
                    </a>

                    <a
                      href="/services#services-catalog"
                      onClick={(e) => handleNavAnchor(e, '/services', '#services-catalog')}
                      className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                    >
                      All 8 Enterprise Services
                    </a>

                    <a
                      href="/services#why-hackup"
                      onClick={(e) => handleNavAnchor(e, '/services', '#why-hackup')}
                      className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                    >
                      Why Hackup (Practitioner-Led)
                    </a>

                    <a
                      href="/services#industries"
                      onClick={(e) => handleNavAnchor(e, '/services', '#industries')}
                      className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                    >
                      Industries We Defend
                    </a>

                    <a
                      href="/services#process"
                      onClick={(e) => handleNavAnchor(e, '/services', '#process')}
                      className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                    >
                      5-Stage Safe-to-Host Process
                    </a>

                    <a
                      href="/services#faqs"
                      onClick={(e) => handleNavAnchor(e, '/services', '#faqs')}
                      className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                    >
                      Engagement &amp; Scoping FAQs
                    </a>


                    <div className="pt-1">
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onRequestConsultation('Book a Cybersecurity Consultation');
                        }}
                        className="w-full btn-burgundy-filled py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-center text-white"
                      >
                        Book a Cybersecurity Consultation
                      </button>
                    </div>
                  </>
                )}

                {/* 2. COURSES MOBILE DRAWER */}
                {isCourses && (
                  <>
                    <Link
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2 py-2 font-bold text-[#881337] border-b border-slate-100"
                    >
                      <ArrowLeft className="w-4 h-4 text-[#881337]" />
                      <span>Corporate Homepage</span>
                    </Link>

                    <a
                      href="/courses#courses-hero"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#courses-hero')}
                      className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                    >
                      Courses Overview
                    </a>

                    <a
                      href="/courses#trust-credibility"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#trust-credibility')}
                      className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                    >
                      Why Trust Hackup for Training
                    </a>


                    <a
                      href="/courses#featured-courses"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#featured-courses')}
                      className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                    >
                      Featured Courses Catalogue
                    </a>

                    <a
                      href="/courses#cyber-labs"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#cyber-labs')}
                      className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                    >
                      Hands-On Cyber Labs
                    </a>

                    <a
                      href="/courses#for-colleges"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#for-colleges')}
                      className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                    >
                      Training for Colleges &amp; Institutions
                    </a>

                    <a
                      href="/courses#faqs"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#faqs')}
                      className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                    >
                      Learner FAQs
                    </a>


                    <div className="pt-1">
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (onBookDemo) {
                            onBookDemo('Courses Mobile Enrolment');
                          } else {
                            onRequestConsultation('Course Enrolment');
                          }
                        }}
                        className="w-full btn-burgundy-filled py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-center text-white"
                      >
                        Explore Courses / Talk to Trainer
                      </button>
                    </div>
                  </>
                )}

                {/* 3. CORPORATE MOBILE DRAWER */}
                {isCorporate && (
                  <>
                    <Link
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 font-bold text-slate-900 border-b border-slate-100"
                    >
                      Home
                    </Link>


                    <Link
                      to="/about-us"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                    >
                      About Us &amp; Leadership
                    </Link>

                    <Link
                      to="/gallery"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                    >
                      Cyber Range Gallery
                    </Link>

                    <Link
                      to="/blog"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                    >
                      Blog &amp; Cyber Research
                    </Link>

                    <Link
                      to="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                    >
                      Contact Coimbatore HQ
                    </Link>

                    <div className="pt-2 pb-1">
                      <Link
                        to="/courses"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 text-white bg-[#881337] hover:bg-[#6e0f2c] shadow-lg text-center transition-all"
                      >
                        <GraduationCap className="w-4 h-4 text-white" />
                        <span>Courses &amp; Certifications</span>
                      </Link>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onRequestConsultation('Corporate Consultation Request');
                        }}
                        className="w-full btn-burgundy-filled py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-center text-white"
                      >
                        Book Your Cyber Consultation
                      </button>
                    </div>
                  </>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
