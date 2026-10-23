import React from 'react';
import { Calculator } from 'lucide-react';
import { DualEstimatorPathFinder } from '../components/interactive/DualEstimatorPathFinder';
import { FaqSection } from '../components/faq/FaqSection';
import { SITE_URL } from '../data/cyberData';
import { SEOHead } from '../components/common/SEOHead';

interface EstimatorPageProps {
  onRequestAuditWithScope: (scopeDetails: any) => void;
  onEnrollCustomTrack: (trackDetails: any) => void;
}

export const EstimatorPage: React.FC<EstimatorPageProps> = ({
  onRequestAuditWithScope,
  onEnrollCustomTrack,
}) => {
  return (
    <div className="space-y-16 animate-fadeIn pb-16">
      <SEOHead
        title="Cybersecurity Cost & Training Scope Estimator | Hackup Tech"
        description="Calculate enterprise VAPT audit timelines and regulatory scopes, or map your personalized 3-stage cybersecurity career training path."
        canonical={`${SITE_URL}/estimate`}
        primaryKeyword="VAPT cost estimator"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Estimator', url: '/estimate' }
        ]}
      />
      
      {/* Estimator Hero */}
      <section className="relative pt-12 pb-8 overflow-hidden text-center space-y-4 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 shadow-sm">
          <Calculator className="w-4 h-4 text-amber-700" />
          <span className="font-mono text-xs uppercase tracking-widest text-amber-900 font-bold">
            INSTANT SCOPE &amp; CAREER ROADMAP GENERATOR
          </span>
        </div>

        <h1 className="font-serif-header font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight">
          Interactive <span className="text-amber-800">Configurator</span>
        </h1>

        <p className="font-sans text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Calculate your enterprise VAPT turnaround timelines and regulatory scope, or generate a tailored 3-stage cybersecurity career roadmap based on your current experience.
        </p>
      </section>

      {/* Estimator Component */}
      <DualEstimatorPathFinder
        onRequestAuditWithScope={onRequestAuditWithScope}
        onEnrollCustomTrack={onEnrollCustomTrack}
      />

      {/* FAQs */}
      <FaqSection />

    </div>
  );
};
