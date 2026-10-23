import React from 'react';
import { Shield, Users, Trophy, Sparkles, MessageSquare, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { DefconChapterHub } from '../components/community/DefconChapterHub';
import { DefconContactSection } from '../components/community/DefconContactSection';
import { SITE_URL } from '../data/cyberData';
import { SEOHead } from '../components/common/SEOHead';

interface CommunityPageProps {
  onGetInvolved: (title: string) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onGetInvolved }) => {
  return (
    <div className="space-y-16 animate-fadeIn pb-16">
      <SEOHead
        title="DEFCON Coimbatore Chapter (#DC91422) | Hackup Community"
        description="Official DEFCON Coimbatore Chapter (#DC91422). Monthly red team workshops, Kovai HackCon CTFs, and ethical hacker meetups in Tamil Nadu."
        canonical={`${SITE_URL}/community`}
        primaryKeyword="DEFCON Coimbatore community"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Community', url: '/community' }
        ]}
      />
      
      {/* Community Dedicated Hero */}
      <section className="relative pt-12 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 shadow-sm">
            <Users className="w-4 h-4 text-amber-700" />
            <span className="font-mono text-xs uppercase tracking-widest text-amber-900 font-bold">
              TAMIL NADU ETHICAL HACKER COMMUNITY HUB
            </span>
          </div>

          <h1 className="font-serif-header font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-wide leading-tight">
            DEFCON Coimbatore &amp; <span className="text-amber-800">Research Hub</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Connect with 1,200+ security researchers, attend monthly red team technical workshops, and compete in the Kovai HackCon CTF tournament.
          </p>
        </div>
      </section>

      {/* DEFCON Meetup & CTF Hub */}
      <DefconChapterHub onRSVP={onGetInvolved} />

      {/* Integrated Contact Section */}
      <DefconContactSection onGetInvolvedCommunity={() => onGetInvolved('DEFCON Community Pass')} />

    </div>
  );
};
