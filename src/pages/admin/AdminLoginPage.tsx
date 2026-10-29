import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error || !data.session) {
        setErrorMessage(error?.message || 'Invalid email or password.');
        setIsLoading(false);
        return;
      }

      // Verify active admin profile via server API
      const res = await fetch('/api/admin/me', {
        headers: {
          Authorization: `Bearer ${data.session.access_token}`,
        },
      });

      const profileData = await res.json();
      if (!res.ok || !profileData.success) {
        // Sign out unauthorized user
        await supabase.auth.signOut();
        setErrorMessage(profileData.error || 'Access denied: You do not have an active staff profile.');
        setIsLoading(false);
        return;
      }

      navigate('/admin');
    } catch (err: any) {
      setErrorMessage(err?.message || 'Login failed due to a network error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 font-sans text-slate-900">
      <div className="w-full max-w-md bg-white border-2 border-rose-200 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-[#881337] flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <span className="font-mono text-[10px] font-bold text-[#881337] uppercase tracking-wider bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            STAFF ACCESS ONLY
          </span>
          <h1 className="font-serif-header font-bold text-2xl text-slate-900 pt-1">
            Hackup Command Center
          </h1>
          <p className="font-sans text-xs text-slate-600">
            Authorized administrative login for security advisors, instructors, and auditors.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-mono flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-[#881337] shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs font-sans">
          <div>
            <label className="font-mono text-[11px] font-bold text-slate-700">Official Staff Email</label>
            <div className="relative mt-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@hackuptechnology.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#881337] outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="font-mono text-[11px] font-bold text-slate-700">Password</label>
            <div className="relative mt-1">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#881337] outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-burgundy-filled py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl text-white disabled:opacity-50 cursor-pointer"
          >
            <span>{isLoading ? 'Authenticating...' : 'Sign In to Portal'}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </form>

        <div className="pt-2 text-center">
          <Link to="/" className="font-mono text-xs text-slate-500 hover:text-[#881337] transition-colors">
            &larr; Return to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
};
