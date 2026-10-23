import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { COMPANY_FACTS, SITE_URL } from '../data/cyberData';
import { SEOHead } from '../components/common/SEOHead';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Enterprise VAPT & Audit Scoping',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fadeIn font-sans text-slate-900">
      
      {/* 1. SEO HEAD */}
      <SEOHead
        title="Contact Hackup Technology | Coimbatore HQ & Phone"
        description="Contact Hackup Technology in Ganapathy, Coimbatore. Phone: +91 93620 12339 / +91 96262 15976. 24/7 cyber incident consultation."
        canonical={`${SITE_URL}/contact`}
        primaryKeyword="cyber security company in Coimbatore"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact Us', url: '/contact' }
        ]}
      />

      {/* 2. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 font-mono text-xs text-slate-500">
        <Link to="/" className="hover:text-[#881337] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-[#881337] font-bold">Contact Us</span>
      </nav>

      {/* 3. HEADER */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-mono font-bold text-[#881337] shadow-sm">
          <MapPin className="w-4 h-4 text-[#881337]" />
          <span>GANAPATHY, COIMBATORE HQ &bull; 24/7 EMERGENCY INCIDENT HOTLINE</span>
        </div>

        <h1 className="font-serif-header font-black text-3xl sm:text-5xl text-slate-950 tracking-tight leading-tight">
          Connect with Our Cyber Security Headquarters
        </h1>

        <p className="font-sans text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
          Reach our executive advisory, enterprise VAPT auditing team, or academic relations department directly.
        </p>
      </div>

      {/* 4. MAIN DETAILS & FORM GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Verified Contact Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-white border-2 border-rose-200 p-8 shadow-xl space-y-6">
            <h2 className="font-serif-header font-bold text-xl text-slate-900 border-b border-rose-100 pb-3">
              Coimbatore Headquarters
            </h2>

            {/* Address */}
            <div className="flex items-start space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-[#881337]" />
              </div>
              <div className="space-y-1">
                <div className="font-mono text-xs uppercase font-bold text-slate-500">Physical Address</div>
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  <strong>Hackup Technology Pvt Ltd</strong><br />
                  {COMPANY_FACTS.headquarters.street},<br />
                  {COMPANY_FACTS.headquarters.area}, {COMPANY_FACTS.headquarters.city} - {COMPANY_FACTS.headquarters.pincode},<br />
                  {COMPANY_FACTS.headquarters.state}, {COMPANY_FACTS.headquarters.country}.
                </div>
              </div>
            </div>

            {/* Both Phone Numbers */}
            <div className="flex items-start space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4 text-[#881337]" />
              </div>
              <div className="space-y-1">
                <div className="font-mono text-xs uppercase font-bold text-slate-500">Phone Numbers</div>
                <div className="space-y-1 font-mono text-xs sm:text-sm">
                  <div>
                    <a href={`tel:${COMPANY_FACTS.phones[0].replace(/\s+/g, '')}`} className="text-[#881337] font-bold hover:underline">
                      {COMPANY_FACTS.phones[0]}
                    </a>
                    <span className="text-slate-500 text-[11px] block">Primary Advisory Hotline</span>
                  </div>
                  <div>
                    <a href={`tel:${COMPANY_FACTS.phones[1].replace(/\s+/g, '')}`} className="text-[#881337] font-bold hover:underline">
                      {COMPANY_FACTS.phones[1]}
                    </a>
                    <span className="text-slate-500 text-[11px] block">Academic &amp; Student Enquiries</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Both Emails */}
            <div className="flex items-start space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0 mt-0.5">
                <Mail className="w-4 h-4 text-[#881337]" />
              </div>
              <div className="space-y-1">
                <div className="font-mono text-xs uppercase font-bold text-slate-500">Official Emails</div>
                <div className="space-y-1 font-mono text-xs">
                  <div>
                    <a href={`mailto:${COMPANY_FACTS.emails[0]}`} className="text-slate-800 hover:text-[#881337] font-medium hover:underline">
                      {COMPANY_FACTS.emails[0]}
                    </a>
                  </div>
                  <div>
                    <a href={`mailto:${COMPANY_FACTS.emails[1]}`} className="text-[#881337] font-bold hover:underline">
                      {COMPANY_FACTS.emails[1]}
                    </a>
                    <span className="text-[10px] text-slate-500 block">Founder &amp; CEO Direct Inbox</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-start space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-4 h-4 text-[#881337]" />
              </div>
              <div className="space-y-1">
                <div className="font-mono text-xs uppercase font-bold text-slate-500">Operating Schedule</div>
                <div className="text-xs text-slate-700">
                  {COMPANY_FACTS.workingHours}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-rose-100 space-y-2">
              <div className="font-mono text-[10px] uppercase font-bold text-slate-500">Connect Directly</div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <a
                  href="https://linkedin.com/company/hackuptechnology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-[#881337] text-slate-700 font-bold transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://wa.me/919362012339?text=Hello%20Hackup%20Technology,%20I%20would%20like%20to%20enquire%20about%20cyber%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold transition-colors"
                >
                  WhatsApp Direct
                </a>
                <a
                  href="https://twitter.com/hackuptech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-[#881337] text-slate-700 font-bold transition-colors"
                >
                  Twitter / X
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Interactive Consultation Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-white border-2 border-rose-200 p-8 sm:p-10 shadow-xl space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#881337] font-bold uppercase tracking-wider">
                RAPID RESPONSE PROTOCOL
              </span>
              <h2 className="font-serif-header font-bold text-2xl text-slate-900">
                Send Us a Confidential Message
              </h2>
              <p className="font-sans text-xs text-slate-600">
                All client enquiries are protected under automatic mutual confidentiality.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-rose-50 border border-emerald-300 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-serif-header font-bold text-xl text-slate-900">Message Delivered</h3>
                <p className="font-sans text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  Thank you for reaching out. A security architect from our Coimbatore office will respond within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-burgundy-filled px-6 py-2 rounded-xl font-mono text-xs font-bold text-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[11px] font-bold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. S. Karthikeyan"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:border-[#881337] outline-none mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[11px] font-bold text-slate-700">Official Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. karthik@enterprise.in"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:border-[#881337] outline-none mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[11px] font-bold text-slate-700">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:border-[#881337] outline-none mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[11px] font-bold text-slate-700">Topic / Inquiry Nature</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:border-[#881337] outline-none mt-1 font-sans"
                    >
                      <option value="Enterprise VAPT & Audit Scoping">Enterprise VAPT &amp; Audit Scoping</option>
                      <option value="24/7 Managed SOC Deployment">24/7 Managed SOC Deployment</option>
                      <option value="ISO 27001 / DPDP Act Compliance">ISO 27001 / DPDP Act Compliance</option>
                      <option value="Digital Forensics & 65B Cyber Evidence">Digital Forensics &amp; 65B Cyber Evidence</option>
                      <option value="EC-Council Course Enrollment">EC-Council Course Enrollment</option>
                      <option value="College MoU & Campus Cyber CoE">College MoU &amp; Campus Cyber CoE</option>
                      <option value="Emergency Breach / Active Incident">Emergency Breach / Active Incident</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[11px] font-bold text-slate-700">Message / Scope Description *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your requirements, timeline, or asset scope..."
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:border-[#881337] outline-none mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-burgundy-filled w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl text-white"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Transmit Secure Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* 5. EMBEDDED MAP */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#881337] uppercase tracking-widest">
          <MapPin className="w-4 h-4 text-[#881337]" />
          <span>GEOGRAPHIC LOCATION &bull; GANAPATHY, COIMBATORE - 641006</span>
        </div>
        <div className="rounded-3xl overflow-hidden border-2 border-rose-200 shadow-xl h-80 sm:h-96 w-full bg-slate-100">
          <iframe
            title="Hackup Technology Headquarters Location Map"
            src="https://maps.google.com/maps?q=Hackup%20Technology,%20Ganapathy,%20Coimbatore,%20Tamil%20Nadu%20641006&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>

    </div>
  );
};
