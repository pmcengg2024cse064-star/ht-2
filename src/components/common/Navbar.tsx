import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ShieldCheck, 
  Phone, 
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

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
  const navigate = useNavigate();

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

  const scrollToAnchor = (hash: string) => {
    const element = document.querySelector(hash);
    if (!element) return;

    const headerElement = document.querySelector('header');
    const headerHeight = headerElement ? headerElement.getBoundingClientRect().height : 120;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = Math.max(0, elementPosition - headerHeight - 14);

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  const handleNavAnchor = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    targetPath: string,
    hash: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const isCurrentPage = location.pathname.replace(/\/$/, '') === targetPath.replace(/\/$/, '');

    if (isCurrentPage) {
      setTimeout(() => {
        scrollToAnchor(hash);
      }, 160);
    } else {
      navigate(`${targetPath}${hash}`);
    }
  };

  return (
    <>
      {/* 2. STICKY HEADER */}
      <header className="sticky top-0 z-50 w-full font-sans shadow-md">
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
                      href="/services#about-services"
                      onClick={(e) => handleNavAnchor(e, '/services', '#about-services')}
                      className="px-2.5 py-2 rounded-lg hover:text-[#881337] hover:bg-rose-50 transition-colors"
                    >
                      About Hackup
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
                      href="/courses#about-courses"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#about-courses')}
                      className="px-2.5 py-2 rounded-lg hover:text-[#881337] hover:bg-rose-50 transition-colors"
                    >
                      About Academy
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
                      Training
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
                      onClick={() => onBookDemo ? onBookDemo('Explore Training & Admissions') : onRequestConsultation('Training Enrolment')}
                      className="btn-burgundy-filled px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-xl cursor-pointer hover:scale-102 text-white"
                    >
                      <GraduationCap className="w-4 h-4 text-white" />
                      <span>Explore Training</span>
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
                      <span>Training</span>
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

              {/* Mobile Right Actions & Hamburger Menu Toggle */}
              <div className="flex lg:hidden items-center space-x-2">
                {isServices && (
                  <button
                    onClick={() => onRequestConsultation('Book a Cybersecurity Consultation')}
                    className="btn-burgundy-filled px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg font-mono text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-sm cursor-pointer text-white"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    <span>Consult</span>
                  </button>
                )}

                {isCourses && (
                  <button
                    onClick={() => onBookDemo ? onBookDemo('Explore Training & Admissions') : onRequestConsultation('Training Enrolment')}
                    className="btn-burgundy-filled px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg font-mono text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-sm cursor-pointer text-white"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-white" />
                    <span>Explore</span>
                  </button>
                )}

                {isCorporate && (
                  <button
                    onClick={() => onRequestConsultation('Corporate Consultation Request')}
                    className="btn-burgundy-filled px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg font-mono text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-sm cursor-pointer text-white"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    <span>Consult</span>
                  </button>
                )}

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950 cursor-pointer shadow-sm active:bg-slate-200"
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
              className="lg:hidden w-full bg-white border-b border-slate-200 shadow-2xl overflow-hidden font-mono text-xs"
            >
              <div className="px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
                
                {/* 1. SERVICES MOBILE DRAWER */}
                {isServices && (
                  <>
                    <Link
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-bold text-[#881337] bg-rose-50/60 border border-rose-100 transition-colors"
                    >
                      <span className="flex items-center space-x-2">
                        <ArrowLeft className="w-4 h-4 text-[#881337]" />
                        <span>Corporate Homepage</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#881337]/60" />
                    </Link>

                    <button
                      type="button"
                      onClick={(e) => handleNavAnchor(e, '/services', '#overview')}
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-semibold text-slate-800 hover:text-[#881337] hover:bg-rose-50/80 active:bg-rose-100/90 border border-slate-100 transition-colors cursor-pointer"
                    >
                      <span>Services Overview</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleNavAnchor(e, '/services', '#about-services')}
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-semibold text-slate-800 hover:text-[#881337] hover:bg-rose-50/80 active:bg-rose-100/90 border border-slate-100 transition-colors cursor-pointer"
                    >
                      <span>About Hackup (13+ Years Experience)</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleNavAnchor(e, '/services', '#services-catalog')}
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-semibold text-slate-800 hover:text-[#881337] hover:bg-rose-50/80 active:bg-rose-100/90 border border-slate-100 transition-colors cursor-pointer"
                    >
                      <span>All 8 Enterprise Services</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleNavAnchor(e, '/services', '#why-hackup')}
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-semibold text-slate-800 hover:text-[#881337] hover:bg-rose-50/80 active:bg-rose-100/90 border border-slate-100 transition-colors cursor-pointer"
                    >
                      <span>Why Hackup (Practitioner-Led)</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleNavAnchor(e, '/services', '#industries')}
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-semibold text-slate-800 hover:text-[#881337] hover:bg-rose-50/80 active:bg-rose-100/90 border border-slate-100 transition-colors cursor-pointer"
                    >
                      <span>Industries We Defend</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleNavAnchor(e, '/services', '#process')}
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-semibold text-slate-800 hover:text-[#881337] hover:bg-rose-50/80 active:bg-rose-100/90 border border-slate-100 transition-colors cursor-pointer"
                    >
                      <span>5-Stage Safe-to-Host Process</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleNavAnchor(e, '/services', '#faqs')}
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-semibold text-slate-800 hover:text-[#881337] hover:bg-rose-50/80 active:bg-rose-100/90 border border-slate-100 transition-colors cursor-pointer"
                    >
                      <span>Engagement &amp; Scoping FAQs</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onRequestConsultation('Book a Cybersecurity Consultation');
                        }}
                        className="w-full min-h-[48px] btn-burgundy-filled py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-center text-white flex items-center justify-center space-x-2 shadow-lg"
                      >
                        <ShieldCheck className="w-4 h-4 text-white" />
                        <span>Book a Cybersecurity Consultation</span>
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
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-bold text-[#881337] bg-rose-50/60 border border-rose-100 transition-colors"
                    >
                      <span className="flex items-center space-x-2">
                        <ArrowLeft className="w-4 h-4 text-[#881337]" />
                        <span>Corporate Homepage</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#881337]/60" />
                    </Link>

                    <button
                      type="button"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#courses-hero')}
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-semibold text-slate-800 hover:text-[#881337] hover:bg-rose-50/80 active:bg-rose-100/90 border border-slate-100 transition-colors cursor-pointer"
                    >
                      <span>Training Overview</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#about-courses')}
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-semibold text-slate-800 hover:text-[#881337] hover:bg-rose-50/80 active:bg-rose-100/90 border border-slate-100 transition-colors cursor-pointer"
                    >
                      <span>About Hackup Academy</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#trust-credibility')}
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-semibold text-slate-800 hover:text-[#881337] hover:bg-rose-50/80 active:bg-rose-100/90 border border-slate-100 transition-colors cursor-pointer"
                    >
                      <span>Why Trust Hackup for Training</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#featured-courses')}
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-semibold text-slate-800 hover:text-[#881337] hover:bg-rose-50/80 active:bg-rose-100/90 border border-slate-100 transition-colors cursor-pointer"
                    >
                      <span>Featured Training Catalogue</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#cyber-labs')}
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-semibold text-slate-800 hover:text-[#881337] hover:bg-rose-50/80 active:bg-rose-100/90 border border-slate-100 transition-colors cursor-pointer"
                    >
                      <span>Hands-On Cyber Labs</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#for-colleges')}
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-semibold text-slate-800 hover:text-[#881337] hover:bg-rose-50/80 active:bg-rose-100/90 border border-slate-100 transition-colors cursor-pointer"
                    >
                      <span>Training for Colleges &amp; Institutions</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleNavAnchor(e, '/courses', '#faqs')}
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-semibold text-slate-800 hover:text-[#881337] hover:bg-rose-50/80 active:bg-rose-100/90 border border-slate-100 transition-colors cursor-pointer"
                    >
                      <span>Learner FAQs</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (onBookDemo) {
                            onBookDemo('Training Mobile Enrolment');
                          } else {
                            onRequestConsultation('Training Enrolment');
                          }
                        }}
                        className="w-full min-h-[48px] btn-burgundy-filled py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-center text-white flex items-center justify-center space-x-2 shadow-lg"
                      >
                        <GraduationCap className="w-4 h-4 text-white" />
                        <span>Explore Training / Talk to Trainer</span>
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
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-bold text-slate-900 hover:text-[#881337] hover:bg-rose-50/80 border border-slate-100 transition-colors"
                    >
                      <span>Home</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>

                    <Link
                      to="/about-us"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-semibold text-slate-800 hover:text-[#881337] hover:bg-rose-50/80 border border-slate-100 transition-colors"
                    >
                      <span>About Us &amp; Leadership</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>

                    <Link
                      to="/gallery"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-semibold text-slate-800 hover:text-[#881337] hover:bg-rose-50/80 border border-slate-100 transition-colors"
                    >
                      <span>Cyber Range Gallery</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>

                    <Link
                      to="/blog"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-semibold text-slate-800 hover:text-[#881337] hover:bg-rose-50/80 border border-slate-100 transition-colors"
                    >
                      <span>Blog &amp; Cyber Research</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>

                    <Link
                      to="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-semibold text-slate-800 hover:text-[#881337] hover:bg-rose-50/80 border border-slate-100 transition-colors"
                    >
                      <span>Contact Coimbatore HQ</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>

                    <div className="pt-2 pb-1">
                      <Link
                        to="/courses"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full min-h-[44px] py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 text-white bg-[#881337] hover:bg-[#6e0f2c] shadow-lg text-center transition-all"
                      >
                        <GraduationCap className="w-4 h-4 text-white" />
                        <span>Training &amp; Certifications</span>
                      </Link>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onRequestConsultation('Corporate Consultation Request');
                        }}
                        className="w-full min-h-[48px] btn-burgundy-filled py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-center text-white flex items-center justify-center space-x-2 shadow-lg"
                      >
                        <ShieldCheck className="w-4 h-4 text-white" />
                        <span>Book Your Cyber Consultation</span>
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
