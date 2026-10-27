import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Scale, Lock, ArrowLeft } from 'lucide-react';
import { COMPANY_FACTS, SITE_URL } from '../data/cyberData';
import { SEOHead } from '../components/common/SEOHead';

export const LegalPage: React.FC = () => {
  const location = useLocation();
  const isPrivacy = location.pathname.includes('privacy');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fadeIn font-sans text-slate-900">
      
      {/* SEO HEAD */}
      <SEOHead
        title={isPrivacy ? 'Privacy Policy | Hackup Technology Pvt Ltd' : 'Terms of Service | Hackup Technology Pvt Ltd'}
        description={
          isPrivacy
            ? 'Hackup Technology Privacy Policy. Learn how we safeguard your personal data in full compliance with the Indian DPDP Act 2023.'
            : 'Hackup Technology Terms of Service governing enterprise cybersecurity services, training programs, and NDA obligations.'
        }
        canonical={`${SITE_URL}${location.pathname}`}
        primaryKeyword={isPrivacy ? 'DPDP Act compliance' : 'cybersecurity company India'}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: isPrivacy ? 'Privacy Policy' : 'Terms of Service', url: location.pathname }
        ]}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 font-mono text-xs text-slate-500">
        <Link to="/" className="hover:text-[#9E721D] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-[#9E721D] font-bold">{isPrivacy ? 'Privacy Policy' : 'Terms of Service'}</span>
      </nav>

      {/* Header */}
      <div className="border-b border-slate-200 pb-6 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-mono text-amber-800 font-bold uppercase tracking-widest">
          <Scale className="w-4 h-4 text-amber-700" />
          <span>LEGAL &bull; STATUTORY GOVERNANCE &bull; DPDP ACT 2023</span>
        </div>
        <h1 className="font-serif-header font-black text-3xl sm:text-4xl text-slate-950">
          {isPrivacy ? 'Privacy Policy & Data Principal Rights' : 'Terms of Service & Engagement Conditions'}
        </h1>
        <p className="font-mono text-xs text-slate-500">
          Last Updated: January 2026 &bull; Hackup Technology Pvt Ltd, Coimbatore
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
        {isPrivacy ? (
          <>
            <section className="space-y-2">
              <h2 className="font-serif-header font-bold text-lg text-slate-900">1. Commitment to Data Protection &amp; Indian DPDP Act 2023</h2>
              <p>
                Hackup Technology Pvt Ltd ("Hackup", "we", "us") is dedicated to upholding the highest standards of data security and confidentiality. This Privacy Policy outlines our procedures regarding the collection, processing, storage, and erasure of personal data in strict conformity with the Digital Personal Data Protection (DPDP) Act 2023 of India and international best practices (ISO/IEC 27001:2022).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif-header font-bold text-lg text-slate-900">2. Categories of Information Collected</h2>
              <p>
                We only collect data necessary to fulfill technical service inquiries, training registrations, and client communications:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Identity &amp; Contact Data:</strong> Name, professional email address, telephone number, organization name, and designation.</li>
                <li><strong>Technical Engagement Data:</strong> Scoping questionnaires, IP ranges, target domains for VAPT assessments submitted under mutual NDA.</li>
                <li><strong>Academic &amp; Student Data:</strong> Enrollment details, EC-Council Aspen candidate credentials, and attendance records.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif-header font-bold text-lg text-slate-900">3. Rights of the Data Principal</h2>
              <p>
                Under the Indian DPDP Act 2023, you hold absolute rights to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access a summary of your personal data processed by Hackup.</li>
                <li>Request correction, completion, or updating of your information.</li>
                <li>Withdraw consent at any time and request erasure of your contact records.</li>
                <li>Lodge a grievance with our designated Data Protection Officer.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif-header font-bold text-lg text-slate-900">4. Contact Our Data Protection Officer</h2>
              <p>
                For questions regarding data processing or to exercise Data Principal rights, contact:<br />
                <strong>Email:</strong> <a href={`mailto:${COMPANY_FACTS.emails[0]}`} className="text-amber-800 font-bold hover:underline">{COMPANY_FACTS.emails[0]}</a><br />
                <strong>Address:</strong> {COMPANY_FACTS.headquarters.street}, {COMPANY_FACTS.headquarters.area}, {COMPANY_FACTS.headquarters.city} - {COMPANY_FACTS.headquarters.pincode}, Tamil Nadu, India.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h2 className="font-serif-header font-bold text-lg text-slate-900">1. Acceptance of Terms &amp; Scope of Services</h2>
              <p>
                By engaging Hackup Technology Pvt Ltd for cybersecurity consulting, penetration testing (VAPT), SOC deployment, or EC-Council certification training, you agree to comply with and be bound by these Terms of Service.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif-header font-bold text-lg text-slate-900">2. Rules of Engagement &amp; Authorization for VAPT</h2>
              <p>
                All offensive security testing, vulnerability assessments, and simulated attacks are performed strictly upon execution of written Authorization to Test and mutual Non-Disclosure Agreements (NDAs). Clients represent and warrant that they own or hold explicit written authority over all IP addresses, hostnames, and applications provided for assessment.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif-header font-bold text-lg text-slate-900">3. Confidentiality &amp; Intellectual Property</h2>
              <p>
                All audit reports, vulnerability findings, exploit proofs-of-concept, and network architectures are strictly confidential. Hackup Technology retains all proprietary rights over its testing methodologies, patented tool architectures (IN-PAT-2024-AI-FW8910 and IN-PAT-2023-RE-VAPT4421), and training courseware.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif-header font-bold text-lg text-slate-900">4. Jurisdiction &amp; Dispute Resolution</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the judicial courts in Coimbatore, Tamil Nadu.
              </p>
            </section>
          </>
        )}
      </div>

      <div className="pt-6 border-t border-slate-200 text-center">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 font-mono text-xs font-bold text-amber-800 hover:text-amber-950"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>

    </div>
  );
};
