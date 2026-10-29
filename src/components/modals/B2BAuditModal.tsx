import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Lock,
  UploadCloud
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TurnstileWidget } from '../common/TurnstileWidget';

interface B2BAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledScope?: any;
}

export const B2BAuditModal: React.FC<B2BAuditModalProps> = ({
  isOpen,
  onClose,
  prefilledScope,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>('TEST_PASS_TOKEN');

  // Form State
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    workEmail: '',
    phoneNumber: '',
    targetScope: 'Full-Stack VAPT (Web + APIs + Mobile)',
    complianceGoal: 'ISO 27001 & DPDP Act 2023',
    testingWindow: 'Within 2 Weeks',
    requiresNDA: true,
    notes: '',
  });

  useEffect(() => {
    if (prefilledScope) {
      setFormData((prev) => ({
        ...prev,
        targetScope: `${prefilledScope.webAppsCount || 2} Web Apps, ${prefilledScope.mobileAppsCount || 1} Mobile Apps, ${prefilledScope.cloudAccounts || 1} Cloud Envs`,
        complianceGoal: prefilledScope.complianceFramework || prev.complianceGoal,
      }));
    }
  }, [prefilledScope]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/enquiries/service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          contactName: formData.contactName,
          workEmail: formData.workEmail,
          phoneNumber: formData.phoneNumber,
          targetScope: formData.targetScope,
          complianceGoal: formData.complianceGoal,
          testingWindow: formData.testingWindow,
          requiresNDA: formData.requiresNDA,
          message: formData.notes,
          serviceInterest: 'B2B Enterprise Security Assessment',
          sourcePage: 'b2b_audit_modal',
          turnstileToken,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit enquiry. Please check your information.');
      }

      setTrackingCode(data.trackingCode);
      setStep(4);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#3B82F6', '#10B981'],
      });
    } catch (err: any) {
      setSubmitError(err?.message || 'Network error submitting request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-[#0B1220] border border-rose-300 dark:border-rose-900/60 p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-slate-100 overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-900/40 text-[#881337] dark:text-rose-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-[10px] font-bold text-[#881337] dark:text-rose-300 uppercase tracking-wider bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900/40">
                B2B ENGAGEMENT CONFIGURATOR
              </span>
              <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                {step < 4 ? `Step ${step} of 3` : 'Verified'}
              </span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white mt-1">
              Request Enterprise Security Assessment
            </h3>
          </div>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className={`h-1.5 rounded-full ${step >= 1 ? 'bg-gradient-to-r from-[#881337] to-[#BE123C]' : 'bg-slate-200 dark:bg-slate-800'}`} />
            <div className={`h-1.5 rounded-full ${step >= 2 ? 'bg-gradient-to-r from-[#881337] to-[#BE123C]' : 'bg-slate-200 dark:bg-slate-800'}`} />
            <div className={`h-1.5 rounded-full ${step >= 3 ? 'bg-gradient-to-r from-[#881337] to-[#BE123C]' : 'bg-slate-200 dark:bg-slate-800'}`} />
          </div>
        )}

        {/* STEP 1: Company & Contact Information */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex FinTech Pvt Ltd"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm sm:text-xs text-slate-900 dark:text-white focus:border-[#881337] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                  Your Full Name &amp; Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh S. (CTO / Head of Sec)"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm sm:text-xs text-slate-900 dark:text-white focus:border-[#881337] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                  Official Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm sm:text-xs text-slate-900 dark:text-white focus:border-[#881337] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                  Direct Phone / Mobile *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm sm:text-xs text-slate-900 dark:text-white focus:border-[#881337] focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-slate-950/80 border border-rose-200 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-400 flex items-center space-x-2 font-medium">
              <Lock className="w-4 h-4 text-[#881337] dark:text-rose-400 shrink-0" />
              <span>Strictly confidential. Protected by Hackup Standard Non-Disclosure.</span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  if (!formData.companyName || !formData.contactName || !formData.workEmail) {
                    alert('Please fill out the required company information.');
                    return;
                  }
                  setStep(2);
                }}
                className="btn-gold-filled w-full sm:w-auto px-6 py-3 rounded-xl font-mono font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Continue to Target Scope</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Target Scope & Compliance */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                Primary Assessment Scope:
              </label>
              <select
                value={formData.targetScope}
                onChange={(e) => setFormData({ ...formData, targetScope: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white focus:border-[#881337] focus:outline-none"
              >
                <option value="Full-Stack VAPT (Web + APIs + Mobile)">Full-Stack VAPT (Web Apps, REST/GraphQL APIs, iOS/Android)</option>
                <option value="Cloud Security & Kubernetes CIS Hardening">Cloud Infrastructure (AWS/Azure/GCP) &amp; Kubernetes Hardening</option>
                <option value="Red Team Adversary Simulation (APT Drill)">Full-Scope Red Team Adversary Simulation (Black-box)</option>
                <option value="Digital Forensics & Incident Response (DFIR)">Digital Forensics &amp; Active Incident Response Triage</option>
                <option value="Continuous VMaaS Subscription">Continuous Vulnerability Management as a Service (VMaaS)</option>
                <option value="Compliance Advisory (ISO 27001 / DPDP Act)">ISO 27001:2022 &amp; Indian DPDP Act 2023 Readiness</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                Target Compliance / Regulatory Standard:
              </label>
              <select
                value={formData.complianceGoal}
                onChange={(e) => setFormData({ ...formData, complianceGoal: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white focus:border-[#881337] focus:outline-none"
              >
                <option value="ISO 27001 & DPDP Act 2023">ISO/IEC 27001:2022 &amp; Indian DPDP Act 2023</option>
                <option value="SOC 2 Type II Security">AICPA SOC 2 Type II Trust Principles</option>
                <option value="RBI / SEBI Cyber Security Mandate">RBI / SEBI Cybersecurity Framework for FinTech &amp; Banks</option>
                <option value="Commercial Vendor Assessment">Commercial Safe-to-Host Client Vendor Assessment</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                Specific Targets or Environment Notes:
              </label>
              <textarea
                rows={2}
                placeholder="Mention number of endpoints, staging URLs, or specific cloud accounts..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:border-[#881337] focus:outline-none"
              />
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl font-mono text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="btn-gold-filled px-6 py-3 rounded-xl font-mono font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Timeline &amp; NDA Signoff</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Timeline, NDA & Submission */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 font-semibold">
                Preferred Audit Start Window:
              </label>
              <select
                value={formData.testingWindow}
                onChange={(e) => setFormData({ ...formData, testingWindow: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white focus:border-[#881337] focus:outline-none"
              >
                <option value="Emergency (Within 48 Hours)">⚡ Immediate / Emergency (Within 48 Hours)</option>
                <option value="Within 2 Weeks">Within 2 Weeks (Recommended)</option>
                <option value="Next Month">Next Month / End of Quarter</option>
                <option value="Annual Continuous Contract">Annual Recurring / Continuous Retainer</option>
              </select>
            </div>

            {/* NDA Checkbox */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <label className="flex items-start space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.requiresNDA}
                  onChange={(e) => setFormData({ ...formData, requiresNDA: e.target.checked })}
                  className="mt-0.5 accent-rose-900 rounded cursor-pointer"
                />
                <span className="text-xs font-sans text-slate-700 dark:text-slate-300 font-medium">
                  <strong className="text-slate-900 dark:text-white font-semibold">Mutual Non-Disclosure Agreement (NDA):</strong> Request Hackup Technology's standard dual-signed mutual NDA prior to scoping disclosure.
                </span>
              </label>
            </div>

            {/* Summary Preview */}
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 font-mono text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
              <div className="text-[#881337] dark:text-rose-300 font-bold uppercase">Engagement Summary:</div>
              <div>Company: <span className="text-slate-900 dark:text-white font-semibold">{formData.companyName || 'Apex FinTech'}</span></div>
              <div>Scope: <span className="text-slate-900 dark:text-white font-semibold">{formData.targetScope}</span></div>
              <div>Lead Attestation: <span className="text-emerald-700 dark:text-emerald-400 font-bold">Safe-to-Host + 30-Day Re-test</span></div>
            </div>

            {submitError && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-900 border border-rose-300 font-mono text-xs">
                {submitError}
              </div>
            )}

            <TurnstileWidget action="service_enquiry" onVerify={(t) => setTurnstileToken(t)} />

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl font-mono text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                ← Back
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold-filled px-6 py-3.5 rounded-xl font-mono font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSubmitting ? 'Securing Config...' : 'Submit Audit Request'}</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Success Confirmation */}
        {step === 4 && (
          <div className="text-center py-6 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-3xl bg-rose-100 dark:bg-rose-950/40 border border-rose-300 text-[#881337] dark:text-rose-300 mx-auto flex items-center justify-center shadow-lg shadow-rose-900/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
              Assessment Scope Request Received!
            </h4>

            {trackingCode && (
              <div className="inline-block px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 border border-emerald-400 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold">
                Tracking Reference: {trackingCode}
              </div>
            )}

            <p className="font-sans text-sm text-slate-700 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-slate-900 dark:text-white">{formData.contactName || 'Client'}</strong>. Our Principal Red Team Lead in Coimbatore has received your scope details for <strong className="text-[#881337] dark:text-rose-300">{formData.companyName}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 max-w-md mx-auto text-left space-y-1.5 font-medium">
              <div className="text-[#881337] dark:text-rose-300 font-bold uppercase mb-1">Next Immediate Steps:</div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Draft Mutual NDA dispatched to {formData.workEmail || 'your email'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Technical scoping call scheduled within 4 business hours</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onClose}
                className="btn-gold-filled px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
