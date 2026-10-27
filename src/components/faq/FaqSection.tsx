import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQ_DATA } from '../../data/cyberData';

export const FaqSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'enterprise' | 'academy'>('enterprise');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const currentFaqs = activeTab === 'enterprise' ? FAQ_DATA.enterprise : FAQ_DATA.academy;

  return (
    <section className="relative py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 font-mono text-xs font-bold shadow-sm">
            <HelpCircle className="w-4 h-4 text-[#B38728]" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="font-serif-header font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Everything You Need to Know
          </h2>

          {/* Toggle */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-white border border-slate-200 shadow-md mt-2">
            <button
              onClick={() => {
                setActiveTab('enterprise');
                setOpenIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'enterprise'
                  ? 'bg-[#881337] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏢 Enterprise VAPT &amp; Audits
            </button>
            <button
              onClick={() => {
                setActiveTab('academy');
                setOpenIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === 'academy'
                  ? 'bg-[#B38728] text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🎓 Academy &amp; EC-Council Training
            </button>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {currentFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 hover:border-[#B38728]/50 transition-all overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif-header font-bold text-sm sm:text-base text-slate-900">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-100 border border-slate-200 shrink-0 text-slate-600 transition-transform ${isOpen ? 'rotate-180 text-[#B38728]' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm font-sans text-slate-700 leading-relaxed border-t border-slate-100 mt-1 animate-fadeIn font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
