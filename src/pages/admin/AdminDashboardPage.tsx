import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  GraduationCap, 
  Award, 
  FileSpreadsheet, 
  ShieldAlert, 
  LogOut, 
  Search, 
  Plus, 
  Upload, 
  Download, 
  CheckCircle2, 
  Trash2, 
  RefreshCw
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export interface VerifiedStaffProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'AUDITOR' | 'INSTRUCTOR';
  is_active: boolean;
}

type ActiveTab = 'enquiries' | 'registrations' | 'programs' | 'certificates' | 'export' | 'audit_logs';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState<VerifiedStaffProfile | null>(null);
  const [token, setToken] = useState<string>('');
  const [activeTab, setActiveTab] = useState<ActiveTab>('enquiries');
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Tab Data States
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // New Certificate Modal State
  const [showCertModal, setShowCertModal] = useState(false);
  const [newCert, setNewCert] = useState({
    certificateId: '',
    category: 'STUDENT_TRAINING',
    recipientName: '',
    courseOrScopeTitle: '',
    institutionOrCompany: '',
    issueDate: new Date().toISOString().slice(0, 10),
    expiryDate: '',
  });

  // Bulk Import Modal State
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importFeedback, setImportFeedback] = useState<string | null>(null);

  // 1. Initial Authentication Check
  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/admin/login');
        return;
      }

      const accessToken = data.session.access_token;
      setToken(accessToken);

      try {
        const res = await fetch('/api/admin/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const json = await res.json();
        if (!res.ok || !json.success) {
          await supabase.auth.signOut();
          navigate('/admin/login');
          return;
        }

        setStaff(json.staff);
        // If instructor, default to registrations since enquiries are restricted
        if (json.staff.role === 'INSTRUCTOR') {
          setActiveTab('registrations');
        }
      } catch {
        navigate('/admin/login');
      } finally {
        setIsLoadingAuth(false);
      }
    }

    checkAuth();
  }, [navigate]);

  // 2. Fetch Data for Active Tab
  const loadData = async () => {
    if (!token) return;
    setIsLoadingData(true);

    try {
      if (activeTab === 'enquiries') {
        const res = await fetch(`/api/admin/enquiries?status=${filterStatus}&search=${encodeURIComponent(searchTerm)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setEnquiries(data.enquiries || []);
      } else if (activeTab === 'registrations') {
        const res = await fetch(`/api/admin/registrations?status=${filterStatus}&search=${encodeURIComponent(searchTerm)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setRegistrations(data.registrations || []);
      } else if (activeTab === 'programs') {
        const res = await fetch('/api/admin/programs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setPrograms(data.programs || []);
      } else if (activeTab === 'certificates') {
        const res = await fetch(`/api/admin/certificates?status=${filterStatus}&search=${encodeURIComponent(searchTerm)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setCertificates(data.certificates || []);
      } else if (activeTab === 'audit_logs') {
        const res = await fetch('/api/admin/audit-logs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setAuditLogs(data.logs || []);
      }
    } catch (err: any) {
      console.error('Error fetching tab data:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (!isLoadingAuth && token) {
      loadData();
    }
  }, [activeTab, filterStatus, isLoadingAuth, token]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  // Status Updater Helper
  const handleUpdateStatus = async (type: 'enquiry' | 'registration' | 'certificate', id: string, newStatus: string) => {
    const endpoint = type === 'enquiry' ? '/api/admin/enquiries' : type === 'registration' ? '/api/admin/registrations' : '/api/admin/certificates';
    try {
      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        loadData();
      } else {
        alert(data.error || 'Failed to update status.');
      }
    } catch {
      alert('Network error updating record.');
    }
  };

  // Delete Helper (Super Admin only)
  const handleDelete = async (type: 'enquiry' | 'registration' | 'certificate', id: string) => {
    if (!window.confirm('Are you sure you want to delete this record? This action is logged.')) return;
    const endpoint = type === 'enquiry' ? `/api/admin/enquiries?id=${id}` : type === 'registration' ? `/api/admin/registrations?id=${id}` : `/api/admin/certificates?id=${id}`;
    try {
      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        loadData();
      } else {
        alert(data.error || 'Failed to delete record.');
      }
    } catch {
      alert('Network error deleting record.');
    }
  };

  // Issue Certificate
  const handleCreateCert = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCert),
      });
      const data = await res.json();
      if (data.success) {
        setShowCertModal(false);
        setNewCert({
          certificateId: '',
          category: 'STUDENT_TRAINING',
          recipientName: '',
          courseOrScopeTitle: '',
          institutionOrCompany: '',
          issueDate: new Date().toISOString().slice(0, 10),
          expiryDate: '',
        });
        loadData();
      } else {
        alert(data.error || 'Failed to issue certificate.');
      }
    } catch {
      alert('Network error issuing certificate.');
    }
  };

  // Bulk Import
  const handleBulkImport = async (dryRun: boolean) => {
    try {
      let records: any[];
      try {
        records = JSON.parse(importJsonText);
      } catch {
        alert('Invalid JSON array. Please ensure valid JSON formatting.');
        return;
      }

      const res = await fetch('/api/admin/certificates-import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ records, dryRun }),
      });
      const data = await res.json();
      setImportFeedback(JSON.stringify(data, null, 2));

      if (data.success && !dryRun) {
        loadData();
      }
    } catch {
      alert('Network error during bulk import.');
    }
  };

  // Download Excel
  const handleDownloadExcel = async (exportType: string) => {
    try {
      const res = await fetch(`/api/admin/export?type=${exportType}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const errJson = await res.json();
        alert(errJson.error || 'Export failed.');
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hackup_${exportType}_${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      alert('Network error downloading Excel file.');
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center font-mono text-xs text-slate-500">
        Authenticating staff credentials...
      </div>
    );
  }

  if (!staff) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans text-slate-900">
      
      {/* 1. Portal Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-rose-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[10px] font-bold text-white uppercase bg-[#881337] px-2.5 py-0.5 rounded-full">
              PORTAL: {staff.role}
            </span>
            <span className="text-xs font-mono text-emerald-700 font-bold">&bull; Active Session</span>
          </div>
          <h1 className="font-serif-header font-bold text-2xl text-slate-900 mt-1">
            Welcome, {staff.full_name}
          </h1>
          <p className="font-mono text-xs text-slate-500">{staff.email}</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => loadData()}
            className="p-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 transition-colors text-slate-700 cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingData ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleSignOut}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-[#881337] font-mono text-xs font-bold transition-colors flex items-center space-x-2 border border-slate-200 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {staff.role !== 'INSTRUCTOR' && (
          <button
            onClick={() => { setActiveTab('enquiries'); setSearchTerm(''); }}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'enquiries'
                ? 'bg-[#881337] text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Service Enquiries</span>
          </button>
        )}

        <button
          onClick={() => { setActiveTab('registrations'); setSearchTerm(''); }}
          className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'registrations'
              ? 'bg-[#881337] text-white shadow-md'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Training Registrations</span>
        </button>

        <button
          onClick={() => { setActiveTab('programs'); setSearchTerm(''); }}
          className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'programs'
              ? 'bg-[#881337] text-white shadow-md'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Training Catalogue</span>
        </button>

        <button
          onClick={() => { setActiveTab('certificates'); setSearchTerm(''); }}
          className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'certificates'
              ? 'bg-[#881337] text-white shadow-md'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Certificates Repository</span>
        </button>

        <button
          onClick={() => setActiveTab('export')}
          className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'export'
              ? 'bg-[#881337] text-white shadow-md'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Excel Export Center</span>
        </button>

        {staff.role !== 'INSTRUCTOR' && (
          <button
            onClick={() => setActiveTab('audit_logs')}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'audit_logs'
                ? 'bg-[#881337] text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Audit Trail</span>
          </button>
        )}
      </div>

      {/* 3. TAB CONTENT */}

      {/* TAB A: SERVICE ENQUIRIES */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by company, name, email or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && loadData()}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-sans outline-none focus:border-[#881337]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-slate-500">Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="IN_SCOPING">IN_SCOPING</option>
                <option value="PROPOSAL_SENT">PROPOSAL_SENT</option>
                <option value="WON">WON</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono text-[11px]">
                <tr>
                  <th className="p-3.5">Code</th>
                  <th className="p-3.5">Company &amp; Contact</th>
                  <th className="p-3.5">Service &amp; Scope</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Created</th>
                  {['SUPER_ADMIN', 'ADMIN'].includes(staff.role) && <th className="p-3.5 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400 font-mono text-xs">
                      No service enquiries found.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[#881337]">{enq.enquiry_code}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{enq.company_name || 'N/A'}</div>
                        <div className="text-slate-600">{enq.contact_name} &bull; <a href={`mailto:${enq.work_email}`} className="text-[#881337] hover:underline">{enq.work_email}</a></div>
                        <div className="text-slate-500 font-mono text-[11px]">{enq.phone_number}</div>
                      </td>
                      <td className="p-3.5 max-w-xs">
                        <div className="font-semibold text-slate-800">{enq.service_interest}</div>
                        <div className="text-slate-500 truncate">{enq.target_scope || enq.message || 'Standard scoping'}</div>
                      </td>
                      <td className="p-3.5">
                        {['SUPER_ADMIN', 'ADMIN'].includes(staff.role) ? (
                          <select
                            value={enq.status}
                            onChange={(e) => handleUpdateStatus('enquiry', enq.id, e.target.value)}
                            className="px-2 py-1 rounded border border-slate-300 font-mono text-xs font-bold bg-white"
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="IN_SCOPING">IN_SCOPING</option>
                            <option value="PROPOSAL_SENT">PROPOSAL_SENT</option>
                            <option value="WON">WON</option>
                            <option value="CLOSED">CLOSED</option>
                          </select>
                        ) : (
                          <span className="font-mono text-xs font-bold text-slate-700">{enq.status}</span>
                        )}
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-slate-500">
                        {new Date(enq.created_at).toLocaleDateString()}
                      </td>
                      {['SUPER_ADMIN', 'ADMIN'].includes(staff.role) && (
                        <td className="p-3.5 text-right">
                          {staff.role === 'SUPER_ADMIN' && (
                            <button
                              onClick={() => handleDelete('enquiry', enq.id)}
                              className="p-1.5 text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Enquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB B: TRAINING REGISTRATIONS */}
      {activeTab === 'registrations' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search candidate name, phone or registration code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && loadData()}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-sans outline-none focus:border-[#881337]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-slate-500">Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="WON">WON (Enrolled)</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono text-[11px]">
                <tr>
                  <th className="p-3.5">Reg Code</th>
                  <th className="p-3.5">Candidate</th>
                  <th className="p-3.5">Track &amp; Mode</th>
                  <th className="p-3.5">College / Company</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Date</th>
                  {['SUPER_ADMIN', 'ADMIN'].includes(staff.role) && <th className="p-3.5 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400 font-mono text-xs">
                      No training registrations found.
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[#881337]">{reg.registration_code}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{reg.candidate_name}</div>
                        <div className="text-slate-600 font-mono text-[11px]"><a href={`https://wa.me/${reg.whatsapp_number.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">{reg.whatsapp_number}</a></div>
                        {reg.email && <div className="text-slate-500 text-[11px]">{reg.email}</div>}
                      </td>
                      <td className="p-3.5 max-w-xs">
                        <div className="font-semibold text-slate-800">{reg.program_title}</div>
                        <div className="font-mono text-[10px] text-slate-500 uppercase">{reg.preferred_mode.replace(/_/g, ' ')}</div>
                      </td>
                      <td className="p-3.5 text-slate-600">{reg.college_or_company || 'N/A'}</td>
                      <td className="p-3.5">
                        {['SUPER_ADMIN', 'ADMIN'].includes(staff.role) ? (
                          <select
                            value={reg.status}
                            onChange={(e) => handleUpdateStatus('registration', reg.id, e.target.value)}
                            className="px-2 py-1 rounded border border-slate-300 font-mono text-xs font-bold bg-white"
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="WON">WON</option>
                            <option value="CLOSED">CLOSED</option>
                          </select>
                        ) : (
                          <span className="font-mono text-xs font-bold text-slate-700">{reg.status}</span>
                        )}
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-slate-500">
                        {new Date(reg.created_at).toLocaleDateString()}
                      </td>
                      {['SUPER_ADMIN', 'ADMIN'].includes(staff.role) && (
                        <td className="p-3.5 text-right">
                          {staff.role === 'SUPER_ADMIN' && (
                            <button
                              onClick={() => handleDelete('registration', reg.id)}
                              className="p-1.5 text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Registration"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB C: TRAINING CATALOGUE & BATCHES */}
      {activeTab === 'programs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif-header font-bold text-lg text-slate-900">Training Programs &amp; Batches</h3>
              <p className="font-sans text-xs text-slate-500">Configured curriculum tracks and upcoming lab batches.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {programs.map((prog) => (
              <div key={prog.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#881337] bg-rose-50 px-2 py-0.5 rounded">
                    {prog.category}
                  </span>
                  <span className={`font-mono text-xs font-bold ${prog.is_published ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {prog.is_published ? '● Published' : '○ Draft'}
                  </span>
                </div>
                <h4 className="font-bold text-base text-slate-900">{prog.title}</h4>
                <div className="flex items-center space-x-3 text-xs text-slate-500 font-mono">
                  <span>Duration: {prog.duration}</span>
                  <span>&bull;</span>
                  <span>Level: {prog.level}</span>
                </div>
                
                {/* Batches count */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-600">Active Batches: {prog.training_batches?.length || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB D: CERTIFICATES REPOSITORY */}
      {activeTab === 'certificates' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search certificate ID or recipient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && loadData()}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-sans outline-none focus:border-[#881337]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {['SUPER_ADMIN', 'ADMIN'].includes(staff.role) && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowImportModal(true)}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-mono text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Bulk Import</span>
                </button>
                <button
                  onClick={() => setShowCertModal(true)}
                  className="btn-burgundy-filled px-4 py-2 rounded-xl font-mono text-xs font-bold text-white flex items-center space-x-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Issue Certificate</span>
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono text-[11px]">
                <tr>
                  <th className="p-3.5">Certificate ID</th>
                  <th className="p-3.5">Recipient</th>
                  <th className="p-3.5">Scope / Track</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Issue Date</th>
                  {['SUPER_ADMIN', 'ADMIN'].includes(staff.role) && <th className="p-3.5 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {certificates.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400 font-mono text-xs">
                      No certificates in repository.
                    </td>
                  </tr>
                ) : (
                  certificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[#881337]">{cert.certificate_id}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{cert.recipient_name}</div>
                        {cert.institution_or_company && <div className="text-slate-500 text-[11px]">{cert.institution_or_company}</div>}
                      </td>
                      <td className="p-3.5 max-w-xs text-slate-800 font-medium">{cert.course_or_scope_title}</td>
                      <td className="p-3.5 font-mono text-[10px] uppercase text-slate-500">{cert.category.replace(/_/g, ' ')}</td>
                      <td className="p-3.5">
                        {['SUPER_ADMIN', 'ADMIN'].includes(staff.role) ? (
                          <select
                            value={cert.status}
                            onChange={(e) => handleUpdateStatus('certificate', cert.id, e.target.value)}
                            className="px-2 py-1 rounded border border-slate-300 font-mono text-xs font-bold bg-white"
                          >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="REVOKED">REVOKED</option>
                            <option value="EXPIRED">EXPIRED</option>
                          </select>
                        ) : (
                          <span className="font-mono text-xs font-bold">{cert.status}</span>
                        )}
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-slate-500">{cert.issue_date}</td>
                      {['SUPER_ADMIN', 'ADMIN'].includes(staff.role) && (
                        <td className="p-3.5 text-right">
                          {staff.role === 'SUPER_ADMIN' && (
                            <button
                              onClick={() => handleDelete('certificate', cert.id)}
                              className="p-1.5 text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Certificate"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB E: EXCEL EXPORT CENTER */}
      {activeTab === 'export' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-serif-header font-bold text-2xl text-slate-900">Excel Export Center</h3>
            <p className="font-sans text-xs text-slate-600">
              Export authorized database tables to structured, styled .xlsx spreadsheets. User text is automatically sanitized against formula injection (CWE-1236).
            </p>
          </div>

          <div className="space-y-4">
            {staff.role !== 'INSTRUCTOR' && (
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">B2B Service Enquiries</h4>
                  <p className="font-mono text-xs text-slate-500">Client leads, VAPT audit scopes, NDA statuses.</p>
                </div>
                <button
                  onClick={() => handleDownloadExcel('service_enquiries')}
                  className="btn-burgundy-filled px-4 py-2 rounded-xl font-mono text-xs font-bold text-white flex items-center space-x-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-white" />
                  <span>Download .xlsx</span>
                </button>
              </div>
            )}

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">Training Registrations</h4>
                <p className="font-mono text-xs text-slate-500">Student demo enrollments, WhatsApp contacts, batch modes.</p>
              </div>
              <button
                onClick={() => handleDownloadExcel('training_registrations')}
                className="btn-burgundy-filled px-4 py-2 rounded-xl font-mono text-xs font-bold text-white flex items-center space-x-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-white" />
                <span>Download .xlsx</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">Certificates Repository</h4>
                <p className="font-mono text-xs text-slate-500">Issued credentials, SHA-256 digests, validity periods.</p>
              </div>
              <button
                onClick={() => handleDownloadExcel('certificates')}
                className="btn-burgundy-filled px-4 py-2 rounded-xl font-mono text-xs font-bold text-white flex items-center space-x-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-white" />
                <span>Download .xlsx</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB F: AUDIT TRAIL */}
      {activeTab === 'audit_logs' && staff.role !== 'INSTRUCTOR' && (
        <div className="space-y-4">
          <div>
            <h3 className="font-serif-header font-bold text-lg text-slate-900">Tamper-Proof Audit Trail</h3>
            <p className="font-sans text-xs text-slate-500">Immutable administrative log records for regulatory compliance (DPDP Act 2023 / ISO 27001).</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono text-[11px]">
                <tr>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Action</th>
                  <th className="p-3.5">Entity</th>
                  <th className="p-3.5">Staff Actor</th>
                  <th className="p-3.5">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                {auditLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">No audit events recorded yet.</td>
                  </tr>
                ) : (
                  auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 text-slate-500">{new Date(log.created_at).toLocaleString()}</td>
                      <td className="p-3.5 font-bold text-[#881337]">{log.action}</td>
                      <td className="p-3.5 text-slate-700">{log.entity_type}</td>
                      <td className="p-3.5 text-slate-900 font-semibold">{log.admin_profiles?.full_name || 'System / Service Role'}</td>
                      <td className="p-3.5 max-w-sm truncate text-slate-500">{JSON.stringify(log.details || {})}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ISSUE CERTIFICATE MODAL */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl border border-rose-200 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif-header font-bold text-xl text-slate-900">Issue New Certificate</h3>
            
            <form onSubmit={handleCreateCert} className="space-y-3 font-sans text-xs">
              <div>
                <label className="font-mono text-[11px] font-bold text-slate-700">Certificate ID *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HCK-2026-CS-89211"
                  value={newCert.certificateId}
                  onChange={(e) => setNewCert({ ...newCert, certificateId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono uppercase mt-1 outline-none"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] font-bold text-slate-700">Recipient Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={newCert.recipientName}
                  onChange={(e) => setNewCert({ ...newCert, recipientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 mt-1 outline-none"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] font-bold text-slate-700">Category *</label>
                <select
                  value={newCert.category}
                  onChange={(e) => setNewCert({ ...newCert, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono mt-1 outline-none"
                >
                  <option value="STUDENT_TRAINING">STUDENT_TRAINING</option>
                  <option value="INDUSTRIAL_INTERNSHIP">INDUSTRIAL_INTERNSHIP</option>
                  <option value="SAFE_TO_HOST_VAPT">SAFE_TO_HOST_VAPT</option>
                  <option value="FACULTY_DEVELOPMENT">FACULTY_DEVELOPMENT</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] font-bold text-slate-700">Course / Scope Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Certified Ethical Hacker (CEH v13)"
                  value={newCert.courseOrScopeTitle}
                  onChange={(e) => setNewCert({ ...newCert, courseOrScopeTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 mt-1 outline-none"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] font-bold text-slate-700">Institution / Company</label>
                <input
                  type="text"
                  placeholder="e.g. PSG College of Technology"
                  value={newCert.institutionOrCompany}
                  onChange={(e) => setNewCert({ ...newCert, institutionOrCompany: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 mt-1 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[11px] font-bold text-slate-700">Issue Date *</label>
                  <input
                    type="date"
                    required
                    value={newCert.issueDate}
                    onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono mt-1 outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] font-bold text-slate-700">Expiry Date</label>
                  <input
                    type="date"
                    value={newCert.expiryDate}
                    onChange={(e) => setNewCert({ ...newCert, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono mt-1 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCertModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-mono text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-burgundy-filled px-5 py-2 rounded-xl font-mono text-xs font-bold text-white cursor-pointer"
                >
                  Issue &amp; Hash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BULK IMPORT MODAL */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl border border-rose-200 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif-header font-bold text-xl text-slate-900">Bulk Import Historical Certificates</h3>
            <p className="font-sans text-xs text-slate-600">
              Paste a JSON array of certificate objects. Use <strong className="font-mono">Preview / Validate</strong> first before committing to production.
            </p>

            <textarea
              rows={8}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder={`[\n  {\n    "certificateId": "HCK-2025-CEH-1001",\n    "category": "STUDENT_TRAINING",\n    "recipientName": "K. Balaji",\n    "courseOrScopeTitle": "Certified Ethical Hacker",\n    "institutionOrCompany": "CIT Coimbatore",\n    "issueDate": "2025-06-15"\n  }\n]`}
              className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none"
            />

            {importFeedback && (
              <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-[11px] font-mono overflow-x-auto max-h-48">
                {importFeedback}
              </pre>
            )}

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => { setShowImportModal(false); setImportFeedback(null); }}
                className="px-4 py-2 rounded-xl border border-slate-300 font-mono text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => handleBulkImport(true)}
                  className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-300 font-mono text-xs font-bold text-slate-800 hover:bg-slate-200 cursor-pointer"
                >
                  Dry-Run Preview
                </button>
                <button
                  type="button"
                  onClick={() => handleBulkImport(false)}
                  className="btn-burgundy-filled px-5 py-2 rounded-xl font-mono text-xs font-bold text-white cursor-pointer"
                >
                  Commit Import
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
