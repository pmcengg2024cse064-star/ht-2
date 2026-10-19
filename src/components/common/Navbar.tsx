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
  GraduationCap
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
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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

                {/* 2. Services (Instant 1-Click Redirect) */}
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition-colors ${
                      isActive || location.pathname.startsWith('/services')
                        ? 'text-[#881337] font-bold bg-rose-50'
                        : 'hover:text-slate-950 hover:bg-slate-100'
                    }`
                  }
                >
                  Services
                </NavLink>

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

              {/* ACTION BUTTONS: Courses (Instant 1-Click Redirect) & Book Consultation (Burgundy) */}
              <div className="hidden lg:flex items-center space-x-3">
                {/* Courses Button (White & Navy Blue Theme - Redirects instantly on one click) */}
                <Link
                  to="/courses"
                  className="btn-navy-filled px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-lg cursor-pointer hover:scale-102 text-white"
                >
                  <GraduationCap className="w-4 h-4 text-white" />
                  <span>Courses</span>
                </Link>

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
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 font-bold text-slate-900 border-b border-slate-100"
                >
                  Home
                </Link>

                {/* Services in Mobile */}
                <Link
                  to="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 font-semibold text-slate-700 border-b border-slate-100 hover:text-[#881337]"
                >
                  Services
                </Link>

                <Link
                  to="/institutions-workshops"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                >
                  Institutions &amp; Workshops (54+ Colleges)
                </Link>

                <Link
                  to="/portfolio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 font-semibold text-slate-700 border-b border-slate-100"
                >
                  Portfolio &amp; Case Studies
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

                {/* Courses in Mobile */}
                <Link
                  to="/courses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 font-semibold text-[#1E3A8A] border-b border-slate-100 hover:text-blue-900"
                >
                  Courses &amp; Training
                </Link>

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
