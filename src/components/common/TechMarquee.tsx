import React from 'react';
import { Shield, Terminal, Cloud, Cpu, Lock, Network, Award, Server, Code, FileCheck2 } from 'lucide-react';

export const TechMarquee: React.FC = () => {
  const techItems = [
    { name: 'TÜV SÜD Assured', label: 'Audit Partner', icon: Award, color: 'text-amber-500 dark:text-amber-400', border: 'border-amber-500/30' },
    { name: 'DEFCON Coimbatore', label: 'Official Chapter Hub', icon: Shield, color: 'text-cyan-500 dark:text-cyan-400', border: 'border-cyan-500/30' },
    { name: 'Kali Linux', label: 'Offensive Kernel', icon: Terminal, color: 'text-blue-500 dark:text-blue-400', border: 'border-blue-500/30' },
    { name: 'Burp Suite Pro', label: 'Web/API VAPT', icon: Lock, color: 'text-orange-500 dark:text-orange-400', border: 'border-orange-500/30' },
    { name: 'Splunk & Wazuh', label: 'SOC SIEM Labs', icon: Server, color: 'text-emerald-500 dark:text-emerald-400', border: 'border-emerald-500/30' },
    { name: 'AWS & Azure Sec', label: 'Multi-Cloud Hardening', icon: Cloud, color: 'text-sky-500 dark:text-sky-400', border: 'border-sky-500/30' },
    { name: 'Kubernetes & Docker', label: 'Container Security', icon: Cpu, color: 'text-cyan-500 dark:text-cyan-300', border: 'border-cyan-500/30' },
    { name: 'Metasploit Pro', label: 'Adversary Simulation', icon: Terminal, color: 'text-rose-500 dark:text-red-400', border: 'border-rose-500/30' },
    { name: 'Wireshark & Zeek', label: 'Network Deep Triage', icon: Network, color: 'text-indigo-500 dark:text-blue-300', border: 'border-indigo-500/30' },
    { name: 'ISO 27001 / DPDP', label: 'Compliance Audits', icon: FileCheck2, color: 'text-emerald-600 dark:text-emerald-300', border: 'border-emerald-500/30' },
    { name: 'Python & Go', label: 'Custom Exploit Tooling', icon: Code, color: 'text-amber-500 dark:text-yellow-400', border: 'border-yellow-500/30' },
  ];

  return (
    <div className="relative py-6 bg-slate-100/80 border-y border-slate-200 overflow-hidden backdrop-blur-md">
      <div className="animate-marquee-infinite space-x-6 items-center flex">
        {[...techItems, ...techItems, ...techItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.name}-${idx}`}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-white border ${item.border} shadow-sm shrink-0 hover:border-[#B38728] transition-all group`}
            >
              <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200">
                <Icon className={`w-4 h-4 ${item.color} group-hover:scale-110 transition-transform`} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-semibold text-xs text-slate-800 group-hover:text-[#B38728] transition-colors">
                  {item.name}
                </span>
                <span className="font-mono text-[10px] text-slate-500 tracking-wider">
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
