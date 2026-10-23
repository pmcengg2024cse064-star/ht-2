import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Terminal, 
  Users, 
  GraduationCap, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { GALLERY_ITEMS, SITE_URL } from '../data/cyberData';
import { SEOHead } from '../components/common/SEOHead';

export const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Workshops', 'Cyber Range', 'DEFCON Meetup', 'Police Training'];

  const filteredItems = filter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fadeIn font-sans text-slate-900">
      
      {/* SEO HEAD */}
      <SEOHead
        title="Cyber Range & Event Gallery | Hackup Technology"
        description="Visual gallery of Hackup Technology’s Coimbatore Cyber Range, DEFCON Coimbatore 2026 meetups, campus hackathons, and police workshops."
        canonical={`${SITE_URL}/gallery`}
        primaryKeyword="cybersecurity training institute in Tamil Nadu"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Gallery', url: '/gallery' }
        ]}
      />

      {/* Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-xs font-mono font-bold text-amber-900 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>CYBER RANGE &bull; FIELD WORKSHOPS &bull; DEFCON COIMBATORE 2026</span>
        </div>

        <h1 className="font-serif-header font-black text-3xl sm:text-5xl text-slate-950 tracking-tight leading-tight">
          Visual Gallery &amp; Operational Highlights
        </h1>

        <p className="font-sans text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
          Glimpses into our live cyber warfare drills, hands-on student bootcamps at our Ganapathy Cyber Lab, state police commissionerate masterclasses, and community DEFCON meetups.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full border transition-all cursor-pointer font-bold ${
                filter === cat
                  ? 'bg-amber-900 text-white border-amber-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-amber-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-white border-2 border-amber-300 overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
          >
            <div className="h-64 sm:h-72 w-full overflow-hidden bg-slate-950 relative image-banner-dark">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-950/90 text-amber-300 border border-amber-400/50 text-xs font-mono font-bold backdrop-blur-md z-10">
                <span>{item.category}</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-10 dark-overlay-content">
                <div className="flex items-center space-x-3 text-xs font-mono text-slate-200 mb-1 drop-shadow">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{item.location}</span>
                  </span>
                  <span>&bull;</span>
                  <span>{item.date}</span>
                </div>
                <h3 
                  className="font-serif-header font-bold text-xl text-white drop-shadow-md"
                  style={{ color: '#FFFFFF' }}
                >
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="p-6">
              <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Community DEFCON Highlight */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest">
            GRASSROOTS RESEARCH &bull; OPEN TO ALL RESEARCHERS
          </span>
          <h3 className="font-serif-header font-bold text-2xl sm:text-3xl text-white">
            DEFCON Coimbatore Chapter (#DC91422) – 2026
          </h3>
          <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-xl">
            Sponsoring bi-monthly community meetups, live hardware hacking villages, and CTF challenges for independent researchers and ethical hackers.
          </p>
        </div>
        <Link
          to="/community"
          className="btn-gold-filled px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shrink-0"
        >
          <span>Join DEFCON Chapter</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </Link>
      </div>

    </div>
  );
};
