import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  GraduationCap, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Calendar, 
  MapPin,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface B2CDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledCourseTitle?: string;
}

export const B2CDemoModal: React.FC<B2CDemoModalProps> = ({
  isOpen,
  onClose,
  prefilledCourseTitle,
}) => {
  const [course, setCourse] = useState('Certified Ethical Hacker (CEH v13 AI-Powered)');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [collegeOrWork, setCollegeOrWork] = useState('');
  const [batchMode, setBatchMode] = useState('Coimbatore Lab (Ganapathy)');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState<string>('');
  const formRenderedAt = useRef<number>(Date.now());

  useEffect(() => {
    if (prefilledCourseTitle) {
      setCourse(prefilledCourseTitle);
    }
  }, [prefilledCourseTitle]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/registrations/training', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidateName: name,
          whatsappNumber: whatsapp,
          collegeOrCompany: collegeOrWork,
          programTitle: course,
          preferredMode: batchMode,
          website_url: honeypot,
          _form_rendered_at: formRenderedAt.current,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit registration. Please verify your details.');
      }

      setTrackingCode(data.trackingCode);
      setIsSubmitted(true);
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF6B00', '#00F0FF', '#10B981'],
      });
    } catch (err: any) {
      setSubmitError(err?.message || 'Network error registering for demo. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#0B1220] border border-rose-300 dark:border-rose-900/50 p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-slate-100 overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="flex items-center space-x-3 mb-5">
              <div className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800/60 text-[#881337] dark:text-rose-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-[10px] font-bold text-[#881337] dark:text-rose-300 uppercase tracking-wider bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded border border-rose-300 dark:border-rose-800/40">
                  FREE SYLLABUS &amp; LIVE DEMO PASS
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white mt-0.5">
                  Unlock Hands-on Cyber Training
                </h3>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed font-normal">
              Get official EC-Council curriculum blueprints, practical lab roadmaps, and reserve your seat for the upcoming demo batch in Ganapathy, Coimbatore.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vignesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm sm:text-xs text-slate-900 dark:text-white focus:border-[#881337] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                  WhatsApp Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210 (For Syllabus PDF)"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm sm:text-xs text-slate-900 dark:text-white focus:border-[#881337] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                  College / Current Company:
                </label>
                <input
                  type="text"
                  placeholder="e.g. PSG Tech / CIT / Working Professional"
                  value={collegeOrWork}
                  onChange={(e) => setCollegeOrWork(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm sm:text-xs text-slate-900 dark:text-white focus:border-[#881337] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                  Selected Certification Track:
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm sm:text-xs font-mono text-slate-900 dark:text-white focus:border-[#881337] focus:outline-none"
                >
                  <option value="Certified Ethical Hacker (CEH v13 AI-Powered)">Certified Ethical Hacker (CEH v13 AI-Powered)</option>
                  <option value="Practical SOC Analyst & Threat Hunting Bootcamp">Practical SOC Analyst &amp; Threat Hunting Bootcamp</option>
                  <option value="Certified Cloud Security Engineer (CCSE)">Certified Cloud Security Engineer (CCSE)</option>
                  <option value="Practical DevSecOps Engineer (ECDE)">Practical DevSecOps Engineer (ECDE)</option>
                  <option value="Coimbatore 1/3/6-Month Industrial Internship">Coimbatore 1/3/6-Month Industrial Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                  Preferred Batch Mode:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setBatchMode('Coimbatore Lab (Ganapathy)')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-mono font-semibold cursor-pointer border ${
                      batchMode === 'Coimbatore Lab (Ganapathy)'
                        ? 'bg-rose-100 dark:bg-rose-950/80 text-[#881337] dark:text-rose-300 border-rose-300 dark:border-rose-800/60'
                        : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    🏢 Coimbatore Offline
                  </button>
                  <button
                    type="button"
                    onClick={() => setBatchMode('Live Interactive Online')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-mono font-semibold cursor-pointer border ${
                      batchMode === 'Live Interactive Online'
                        ? 'bg-rose-100 dark:bg-rose-950/80 text-[#881337] dark:text-rose-300 border-rose-300 dark:border-rose-800/60'
                        : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    🌐 Live Online
                  </button>
                </div>
              </div>

              {submitError && (
                <div className="p-3 rounded-xl bg-rose-50 text-rose-900 border border-rose-300 font-mono text-xs">
                  {submitError}
                </div>
              )}

              {/* Honeypot field for bot protection (hidden from humans) */}
              <div aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}>
                <label htmlFor="hp_demo_url">Leave this field blank</label>
                <input
                  id="hp_demo_url"
                  type="text"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-mono font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#881337] to-[#7A1426] hover:from-[#5B0E1B] hover:to-[#881337] shadow-xl shadow-rose-950/30 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>{isSubmitting ? 'Securing Seat...' : 'Download Syllabus & Reserve Free Demo'}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-3xl bg-rose-100 dark:bg-rose-950/80 border border-rose-400 text-[#881337] dark:text-rose-300 mx-auto flex items-center justify-center shadow-lg shadow-rose-950/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
              Syllabus PDF &amp; Demo Pass Confirmed!
            </h4>

            {trackingCode && (
              <div className="inline-block px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 border border-emerald-400 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold">
                Registration Code: {trackingCode}
              </div>
            )}

            <p className="font-sans text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
              Welcome, <strong className="text-slate-900 dark:text-white">{name}</strong>! Your official EC-Council syllabus pack for <strong className="text-[#881337] dark:text-rose-400">{course}</strong> has been sent to <span className="font-mono text-[#881337] dark:text-white font-bold">{whatsapp}</span>.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 text-left space-y-2 font-medium">
              <div className="text-[#881337] dark:text-rose-400 font-bold uppercase">Your Batch Coordinates:</div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Mode: {batchMode}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-3.5 h-3.5 text-[#881337] dark:text-rose-400" />
                <span>Demo Timing: Upcoming Weekend 10:00 AM IST</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-[#881337] to-[#7A1426] hover:from-[#5B0E1B] hover:to-[#881337] transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
