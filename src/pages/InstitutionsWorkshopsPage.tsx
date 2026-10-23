import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  Award, 
  Users, 
  Terminal, 
  Check, 
  Send, 
  CheckCircle2, 
  MapPin, 
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { PARTNER_INSTITUTIONS, COMPANY_FACTS, FOUNDER_PROFILE, SITE_URL } from '../data/cyberData';
import { SEOHead } from '../components/common/SEOHead';

interface InstitutionsWorkshopsPageProps {
  onRequestConsultation: (topic?: string) => void;
}

export const InstitutionsWorkshopsPage: React.FC<InstitutionsWorkshopsPageProps> = ({
  onRequestConsultation
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [formData, setFormData] = useState({
    facultyName: '',
    designation: '',
    collegeName: '',
    email: '',
    phone: '',
    workshopType: 'Campus Cyber Center of Excellence (CoE)',
    expectedStudents: '100 - 250'
  });
  const [submitted, setSubmitted] = useState(false);

  const categories = ['All', 'Premier Tech & Universities', 'Heritage & Arts Institutions', 'Polytechnic & Specialized'];

  const filteredInstitutions = selectedCategory === 'All'
    ? PARTNER_INSTITUTIONS
    : PARTNER_INSTITUTIONS.filter((inst) => inst.category === selectedCategory);

  const handleWorkshopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const workshopTracks = [
    {
      title: 'Ethical Hacking & Web App VAPT Bootcamps',
      duration: '2 to 3 Days Intensive Hands-on',
      desc: 'OWASP Top 10 exploitation, Burp Suite Pro masterclass, and live network pivoting for engineering students.'
    },
    {
      title: 'Faculty Development Programs (FDP)',
      duration: '5 Days AICTE / Anna University Aligned',
      desc: 'Empowering faculty members with offensive security lab setup techniques, memory forensics, and syllabus guidance.'
    },
    {
      title: 'Campus Center of Excellence (CoE) Setup',
      duration: 'Turnkey Institutional Partnership',
      desc: 'Installing dedicated physical & cloud cyber ranges, continuous batch certifications, and direct corporate placement linkages.'
    },
    {
      title: 'Law Enforcement & Cyber Crime Forensics',
      duration: '1 to 2 Days Specialized Seminar',
      desc: 'Digital evidence seizure under Section 65B, mobile phone extraction, and financial fraud tracing.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fadeIn font-sans text-slate-900">
      
      {/* SEO HEAD */}
      <SEOHead
        title="Ethical Hacking Workshop for Colleges | 54+ Partners"
        description="Ethical hacking workshop for colleges across Tamil Nadu. Campus Cyber Range Center of Excellence (CoE), FDPs, and curriculum modernization."
        canonical={`${SITE_URL}/institutions-workshops`}
        primaryKeyword="ethical hacking workshop for colleges"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Institutions & Workshops', url: '/institutions-workshops' }
        ]}
      />

      {/* Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-xs font-mono font-bold text-amber-900 shadow-sm">
          <GraduationCap className="w-4 h-4 text-amber-700" />
          <span>54+ PARTNER COLLEGES &bull; 1,00,000+ MINDS TRAINED &bull; COIMBATORE HQ</span>
        </div>

        <h1 className="font-serif-header font-black text-3xl sm:text-5xl text-slate-950 tracking-tight leading-tight">
          Ethical Hacking Workshops &amp; Campus Center of Excellence
        </h1>

        <p className="font-sans text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
          Transform your institution into a sovereign cybersecurity hub. Under the direct leadership of Dr. Dinesh Paranthagan (BOS Member for 8 Universities), we establish turnkey Cyber Centers of Excellence, deliver premier Faculty Development Programs, and sponsor hackathons.
        </p>
      </div>

      {/* 4 Workshop Tracks Grid */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="font-mono text-xs text-amber-800 font-bold uppercase tracking-widest">
            ACADEMIC ENGAGEMENTS
          </span>
          <h2 className="font-serif-header font-bold text-2xl sm:text-3xl text-slate-900">
            Specialized College Programs &amp; Workshops
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workshopTracks.map((track, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white border-2 border-amber-300 shadow-md space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded">
                  {track.duration}
                </span>
                <h3 className="font-serif-header font-bold text-base text-slate-900">
                  {track.title}
                </h3>
                <p className="font-sans text-xs text-slate-600 leading-relaxed">
                  {track.desc}
                </p>
              </div>
              <button
                onClick={() => onRequestConsultation(`Institutional Workshop: ${track.title}`)}
                className="btn-gold-filled w-full py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider"
              >
                Request Workshop &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 54+ Partner Colleges Directory */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="font-serif-header font-bold text-2xl text-slate-900">
              54+ Partner Universities &amp; Colleges
            </h2>
            <p className="font-sans text-xs text-slate-600">
              Filtering across South India’s premier technical, heritage, and polytechnic institutions.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full border transition-all cursor-pointer font-bold ${
                  selectedCategory === cat
                    ? 'bg-amber-900 text-white border-amber-900 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-amber-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInstitutions.map((inst, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-300 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                  {inst.badge}
                </span>
                <span className="font-mono text-[11px] text-slate-500">
                  {inst.location}
                </span>
              </div>
              <h3 className="font-serif-header font-bold text-sm text-slate-900">
                {inst.name}
              </h3>
              <p className="font-sans text-xs text-slate-600">
                &bull; {inst.engagement}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Workshop Booking Form for Colleges */}
      <div className="p-8 sm:p-12 rounded-3xl bg-amber-50 border-2 border-amber-300 shadow-xl max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-amber-800 font-bold uppercase tracking-widest">
            COLLEGE MOU &amp; WORKSHOP ENQUIRY
          </span>
          <h2 className="font-serif-header font-bold text-2xl sm:text-3xl text-slate-900">
            Book a Workshop or Cyber CoE for Your Campus
          </h2>
          <p className="font-sans text-xs text-slate-600">
            Connect directly with our academic tie-up coordinators to schedule workshops and MoU signing.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-white border border-emerald-300 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-serif-header font-bold text-lg text-slate-900">Campus Workshop Request Received</h4>
            <p className="font-sans text-xs text-slate-600">
              Our academic relations team in Coimbatore will contact your department to finalize dates and topic schedules.
            </p>
          </div>
        ) : (
          <form onSubmit={handleWorkshopSubmit} className="space-y-4 font-sans text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[11px] font-bold text-slate-700">Faculty / Coordinator Name *</label>
                <input
                  type="text"
                  required
                  value={formData.facultyName}
                  onChange={(e) => setFormData({ ...formData, facultyName: e.target.value })}
                  placeholder="e.g. Dr. K. Murugan, HOD"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-amber-500 outline-none bg-white mt-1"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] font-bold text-slate-700">Designation / Department *</label>
                <input
                  type="text"
                  required
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="e.g. Associate Professor, CSE"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-amber-500 outline-none bg-white mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[11px] font-bold text-slate-700">College / Institution Name *</label>
                <input
                  type="text"
                  required
                  value={formData.collegeName}
                  onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                  placeholder="Full College / University Name"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-amber-500 outline-none bg-white mt-1"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] font-bold text-slate-700">Official Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="hod.cse@college.edu.in"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-amber-500 outline-none bg-white mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[11px] font-bold text-slate-700">Phone Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 93620 12339"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-amber-500 outline-none bg-white mt-1"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] font-bold text-slate-700">Program Track of Interest</label>
                <select
                  value={formData.workshopType}
                  onChange={(e) => setFormData({ ...formData, workshopType: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-amber-500 outline-none bg-white mt-1 font-sans"
                >
                  <option value="Campus Cyber Center of Excellence (CoE)">Campus Cyber Center of Excellence (CoE)</option>
                  <option value="2-Day Ethical Hacking & VAPT Hands-on Workshop">2-Day Ethical Hacking & VAPT Hands-on Workshop</option>
                  <option value="Faculty Development Program (FDP)">Faculty Development Program (FDP)</option>
                  <option value="Curriculum Modernization & Board of Studies Advisory">Curriculum Modernization & Board of Studies Advisory</option>
                  <option value="Student Industrial Internship Batches">Student Industrial Internship Batches</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn-gold-filled w-full py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg"
            >
              <Send className="w-3.5 h-3.5 text-slate-950" />
              <span>Submit Workshop Request</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
