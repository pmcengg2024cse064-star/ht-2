import React from 'react';
import { Terminal, Shield, Flame, Award, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CyberRangeVisualizer } from '../components/academy/CyberRangeVisualizer';
import { SITE_URL } from '../data/cyberData';
import { SEOHead } from '../components/common/SEOHead';

interface CyberRangePageProps {
  onRequestDemo: () => void;
}

export const CyberRangePage: React.FC<CyberRangePageProps> = ({ onRequestDemo }) => {
  return (
    <div className="space-y-16 animate-fadeIn pb-16">
      <SEOHead
        title="Live Cyber Range Sandbox & Attack Lab | Hackup Tech"
        description="Experience hands-on offensive & defensive topology simulations at Hackup Technology's Coimbatore Cyber Range. Zero static slides, 2,200+ attack tools."
        canonical={`${SITE_URL}/cyber-range`}
        primaryKeyword="cyber range Coimbatore"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Cyber Range', url: '/cyber-range' }
        ]}
      />
      
      {/* Cyber Range Dedicated Hero */}
      <section className="relative pt-12 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800/60 shadow-md">
            <Terminal className="w-4 h-4 text-[#881337] dark:text-rose-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#881337] dark:text-rose-300 font-bold">
              LIVE SIMULATION ENVIRONMENT • ZERO STATIC SLIDES
            </span>
          </div>

          <h1 className="font-serif-header font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-wide leading-tight">
            The Hackup <span className="text-[#881337] dark:text-rose-400">Cyber Range</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Experience real attack-defense topology simulation. Click the vectors below to test simulated SQL Injections, Kerberoasting, and Cloud Container Escapes against live targets.
          </p>
        </div>
      </section>

      {/* Interactive Visualizer Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CyberRangeVisualizer />
      </div>

      {/* Cyber Range Specs & Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-sans shadow-md">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 border border-rose-300 dark:border-rose-800/60 flex items-center justify-center text-[#881337] dark:text-rose-400">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="font-serif-header font-bold text-lg text-slate-900 dark:text-white">2,200+ Attack Tools Loaded</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Dedicated Kali subnets pre-configured with Burp Suite Professional, Metasploit Pro, BloodHound, Impacket, and custom Python exploitation toolkits.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-sans shadow-md">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 border border-rose-300 dark:border-rose-800/60 flex items-center justify-center text-[#881337] dark:text-rose-400">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-serif-header font-bold text-lg text-slate-900 dark:text-white">Enterprise Blue Team Telemetry</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Real-time Splunk &amp; Wazuh SIEM log collection, Zeek network flow monitors, and Sysmon endpoints receiving active cyber breach telemetry.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-sans shadow-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif-header font-bold text-lg text-slate-900 dark:text-white">Dedicated VPN Credentials</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Enrolled students receive dedicated WireGuard / OpenVPN lab access credentials to practice from home or on-premise at our Ganapathy Coimbatore lab.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 space-y-4 border border-rose-300 dark:border-rose-900/40 shadow-xl">
          <h3 className="font-serif-header font-bold text-2xl text-slate-900 dark:text-white">
            Want Full Access to Our Coimbatore Cyber Range?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-normal">
            Enroll in our CEH v13 or Practical SOC Analyst cohorts to receive personal VPN credentials to 2,200+ attack tools and target subnets.
          </p>
          <div className="pt-2 max-w-md sm:max-w-none mx-auto">
            <button
              onClick={onRequestDemo}
              className="btn-burgundy-filled w-full sm:w-auto px-7 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center space-x-2 cursor-pointer shadow-xl text-white"
            >
              <span>Book a Live Cyber Range Demo Session</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
