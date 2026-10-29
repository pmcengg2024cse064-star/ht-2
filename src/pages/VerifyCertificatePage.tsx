import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Copy, 
  Check, 
  Building2, 
  Calendar, 
  Award,
  Lock,
  ArrowRight
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { SITE_URL } from '../data/cyberData';

interface PublicCertificate {
  certificateId: string;
  category: string;
  recipientName: string;
  courseOrScopeTitle: string;
  institutionOrCompany?: string | null;
  issueDate: string;
  expiryDate?: string | null;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  verificationHash: string;
}

export const VerifyCertificatePage: React.FC = () => {
  const { certificateId } = useParams<{ certificateId?: string }>();
  const [queryId, setQueryId] = useState(certificateId || '');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [result, setResult] = useState<PublicCertificate | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);

  const fetchCertificate = async (id: string) => {
    const trimmed = id.trim().toUpperCase();
    if (!trimmed) return;

    setIsLoading(true);
    setErrorMessage(null);
    setResult(null);
    setHasSearched(true);

    try {
      const res = await fetch(`/api/certificates/verify?id=${encodeURIComponent(trimmed)}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to query certificate repository.');
        return;
      }

      if (!data.found || !data.certificate) {
        setResult(null);
      } else {
        setResult(data.certificate);
      }
    } catch {
      setErrorMessage('Network connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (certificateId) {
      setQueryId(certificateId);
      fetchCertificate(certificateId);
    }
  }, [certificateId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCertificate(queryId);
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fadeIn font-sans text-slate-900">
      
      {/* 1. SEO Head */}
      <SEOHead
        title="Public Certificate Verification | Hackup Technology"
        description="Verify the authenticity of Hackup Technology cybersecurity training certificates, internship credentials, and Safe-to-Host VAPT audit attestations."
        canonical={`${SITE_URL}/verify`}
        primaryKeyword="verify cybersecurity certificate hackup technology"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Certificate Verification', url: '/verify' },
        ]}
      />

      {/* 2. Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 font-mono text-xs text-slate-500">
        <Link to="/" className="hover:text-[#881337] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-[#881337] font-bold">Certificate Verification</span>
      </nav>

      {/* 3. Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-mono font-bold text-[#881337]">
          <ShieldCheck className="w-4 h-4 text-[#881337]" />
          <span>OFFICIAL ATTESTATION REPOSITORY &bull; TAMPER-PROOF VERIFICATION</span>
        </div>
        <h1 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          Verify Issued Credentials
        </h1>
        <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
          Verify the authenticity of professional certifications, student training completions, and enterprise Safe-to-Host VAPT attestations issued by Hackup Technology Pvt. Ltd.
        </p>
      </div>

      {/* 4. Search Form */}
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSearch} className="relative flex items-center shadow-lg rounded-2xl overflow-hidden border-2 border-rose-200 bg-white">
          <input
            type="text"
            required
            value={queryId}
            onChange={(e) => setQueryId(e.target.value)}
            placeholder="Enter Certificate ID (e.g. HCK-2026-CS-89211)..."
            className="w-full px-5 py-4 font-mono text-xs sm:text-sm uppercase text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="btn-burgundy-filled px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center space-x-1.5 shrink-0 disabled:opacity-50 cursor-pointer"
          >
            <Search className="w-4 h-4 text-white" />
            <span>{isLoading ? 'Verifying...' : 'Verify'}</span>
          </button>
        </form>
      </div>

      {/* 5. Verification Result Display */}
      {errorMessage && (
        <div className="max-w-xl mx-auto p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 font-mono text-xs text-center">
          {errorMessage}
        </div>
      )}

      {hasSearched && !isLoading && !errorMessage && !result && (
        <div className="max-w-xl mx-auto p-8 rounded-3xl bg-white border border-slate-200 shadow-md text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <XCircle className="w-6 h-6" />
          </div>
          <h3 className="font-serif-header font-bold text-lg text-slate-900">Certificate Not Found</h3>
          <p className="font-sans text-xs text-slate-600 max-w-sm mx-auto">
            No official record was found matching <span className="font-mono font-bold text-slate-900">"{queryId}"</span>. Please confirm the identifier printed on your certificate or report.
          </p>
        </div>
      )}

      {result && (
        <div className="max-w-2xl mx-auto rounded-3xl bg-white border-2 border-rose-200 shadow-2xl p-6 sm:p-10 space-y-6">
          
          {/* Top Status Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-rose-100 gap-4">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-slate-500 font-bold uppercase">CERTIFICATE IDENTIFIER</span>
              <div className="font-mono font-bold text-xl sm:text-2xl text-[#881337] tracking-wider">
                {result.certificateId}
              </div>
            </div>

            {result.status === 'ACTIVE' && (
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 font-mono text-xs font-bold shrink-0 self-start sm:self-auto">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>OFFICIALLY VERIFIED &bull; ACTIVE</span>
              </div>
            )}

            {result.status === 'REVOKED' && (
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-300 text-rose-800 font-mono text-xs font-bold shrink-0 self-start sm:self-auto">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>REVOKED CREDENTIAL</span>
              </div>
            )}

            {result.status === 'EXPIRED' && (
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-mono text-xs font-bold shrink-0 self-start sm:self-auto">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>ATTESTATION EXPIRED</span>
              </div>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-sans">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase font-bold text-slate-500">Issued To</span>
              <div className="font-serif-header font-bold text-lg text-slate-900">{result.recipientName}</div>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase font-bold text-slate-500">Category</span>
              <div className="font-mono font-bold text-slate-800">{result.category.replace(/_/g, ' ')}</div>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <span className="font-mono text-[10px] uppercase font-bold text-slate-500">Scope / Course Title</span>
              <div className="font-medium text-slate-800 text-sm leading-relaxed">{result.courseOrScopeTitle}</div>
            </div>

            {result.institutionOrCompany && (
              <div className="space-y-1 sm:col-span-2">
                <span className="font-mono text-[10px] uppercase font-bold text-slate-500">Institution / Corporate Client</span>
                <div className="font-medium text-slate-800">{result.institutionOrCompany}</div>
              </div>
            )}

            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase font-bold text-slate-500">Issue Date</span>
              <div className="font-mono font-medium text-slate-800">{result.issueDate}</div>
            </div>

            {result.expiryDate && (
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase font-bold text-slate-500">Validity Expiry</span>
                <div className="font-mono font-medium text-slate-800">{result.expiryDate}</div>
              </div>
            )}
          </div>

          {/* Cryptographic Hash Attestation */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-slate-500 uppercase flex items-center space-x-1.5">
                <Lock className="w-3.5 h-3.5 text-[#881337]" />
                <span>SHA-256 Anti-Tamper Attestation Digest</span>
              </span>
              <button
                onClick={() => handleCopyHash(result.verificationHash)}
                className="text-[11px] font-mono text-[#881337] hover:underline flex items-center space-x-1 cursor-pointer"
              >
                {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHash ? 'Copied' : 'Copy Hash'}</span>
              </button>
            </div>
            <div className="font-mono text-[11px] text-slate-700 break-all select-all bg-white p-2.5 rounded-lg border border-slate-200">
              {result.verificationHash}
            </div>
          </div>

          {/* Attestation Issuer Seal */}
          <div className="pt-4 border-t border-rose-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <div>Attested by Hackup Technology Pvt. Ltd.</div>
            <div>Coimbatore HQ &bull; ISO 27001 Aligned</div>
          </div>

        </div>
      )}

    </div>
  );
};
