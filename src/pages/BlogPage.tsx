import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  User, 
  ShieldCheck,
  Tag
} from 'lucide-react';
import { BLOG_POSTS, SITE_URL } from '../data/cyberData';
import { SEOHead } from '../components/common/SEOHead';

export const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const allTags = ['All', 'VAPT', 'Penetration Testing', 'DPDP Act', 'ISO 27001', 'SOC as a Service', 'AI Firewall'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fadeIn font-sans text-slate-900">
      
      {/* SEO HEAD */}
      <SEOHead
        title="Cybersecurity Insights & Threat Research | Hackup Blog"
        description="Authoritative cybersecurity research from Hackup Technology: VAPT guides, DPDP Act compliance, AI firewalls, and red team strategies."
        canonical={`${SITE_URL}/blog`}
        primaryKeyword="cybersecurity company India"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' }
        ]}
      />

      {/* Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-mono font-bold text-[#881337] shadow-sm">
          <Sparkles className="w-4 h-4 text-[#881337]" />
          <span>OFFENSIVE INTELLIGENCE &bull; REGULATORY RESEARCH &bull; TECHNICAL GUIDES</span>
        </div>

        <h1 className="font-serif-header font-black text-3xl sm:text-5xl text-slate-950 tracking-tight leading-tight">
          Cybersecurity Insights &amp; Threat Research
        </h1>

        <p className="font-sans text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
          Deep-dive technical advisories authored by active red team practitioners and compliance auditors at Hackup Technology.
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto pt-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search research articles..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-300 focus:border-[#881337] outline-none text-xs font-mono"
            />
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 font-mono text-xs">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full border transition-all cursor-pointer font-bold ${
                selectedTag === tag
                  ? 'bg-[#881337] text-white border-[#881337]'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-rose-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-3xl bg-white border-2 border-rose-200 hover:border-[#881337] p-8 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-[#881337] font-bold border border-rose-200">
                  {post.category}
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-serif-header font-bold text-xl text-slate-900 group-hover:text-[#881337] transition-colors leading-snug">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="font-sans text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {post.tags.slice(0, 3).map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-600">
                <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-950">
                  <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                </div>
                <span>{post.author.name}</span>
              </div>
              <Link
                to={`/blog/${post.slug}`}
                className="text-xs font-mono font-bold text-[#881337] hover:text-[#5B0E1B] hover:underline flex items-center space-x-1"
              >
                <span>Read</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
