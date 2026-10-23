import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  ArrowRight, 
  ShieldCheck, 
  GraduationCap, 
  Building2,
  Tag
} from 'lucide-react';
import { BLOG_POSTS, ENTERPRISE_SERVICES, ACADEMY_COURSES, COMPANY_FACTS, SITE_URL } from '../data/cyberData';
import { SEOHead } from '../components/common/SEOHead';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];
  const relatedService = ENTERPRISE_SERVICES.find((s) => s.id === post.relatedServiceSlug);
  const relatedCourse = ACADEMY_COURSES.find((c) => c.id === post.relatedCourseSlug);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fadeIn font-sans text-slate-900">
      
      {/* 1. SEO HEAD & ARTICLE SCHEMA */}
      <SEOHead
        title={post.metaTitle}
        description={post.metaDescription}
        canonical={`${SITE_URL}/blog/${post.slug}`}
        primaryKeyword={post.primaryKeyword}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` }
        ]}
        type="article"
        articleData={{
          headline: post.title,
          publishedDate: post.publishedDate,
          author: post.author.name,
          image: post.author.avatar
        }}
      />

      {/* 2. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 font-mono text-xs text-slate-500">
        <Link to="/" className="hover:text-[#881337] transition-colors">Home</Link>
        <span>/</span>
        <Link to="/blog" className="hover:text-[#881337] transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-[#881337] font-bold line-clamp-1">{post.title}</span>
      </nav>

      {/* 3. ARTICLE HEADER */}
      <div className="space-y-6 border-b border-slate-200 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="px-3 py-1 rounded-full bg-rose-100 text-[#881337] font-bold border border-rose-200">
            {post.category}
          </span>
          <span className="flex items-center space-x-1 text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.publishedDate}</span>
          </span>
          <span className="flex items-center space-x-1 text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </span>
        </div>

        <h1 className="font-serif-header font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-950 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="font-sans text-base sm:text-lg text-slate-700 leading-relaxed italic border-l-4 border-[#881337] pl-4">
          {post.excerpt}
        </p>

        {/* Author Byline */}
        <div className="flex items-center space-x-3 pt-2">
          <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-950 border border-rose-200">
            <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-serif-header font-bold text-sm text-slate-900">{post.author.name}</div>
            <div className="font-mono text-xs text-[#881337] font-semibold">{post.author.role}</div>
          </div>
        </div>
      </div>

      {/* 4. MAIN ARTICLE CONTENT */}
      <div className="space-y-8 font-sans text-slate-800 text-base leading-relaxed">
        {post.content.map((sec, idx) => (
          <div key={idx} className="space-y-3">
            <h2 className="font-serif-header font-bold text-2xl text-slate-950 pt-2">
              {sec.heading}
            </h2>
            <p className="text-slate-700 leading-relaxed font-normal">
              {sec.body}
            </p>
          </div>
        ))}

        {/* Tags */}
        <div className="pt-6 border-t border-slate-200">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <Tag className="w-4 h-4 text-slate-400" />
            {post.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 5. INTERNAL LINKING: RELATED SERVICE & RELATED COURSE */}
      <div className="p-8 rounded-3xl bg-rose-50/70 border-2 border-rose-200 shadow-md space-y-6">
        <h3 className="font-serif-header font-bold text-xl text-slate-900">
          Apply These Insights in Your Organization or Career
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relatedService && (
            <div className="p-5 rounded-2xl bg-white border border-rose-200 space-y-2">
              <span className="font-mono text-[10px] uppercase font-bold text-[#881337] bg-rose-100 px-2 py-0.5 rounded">
                Related Enterprise Service
              </span>
              <h4 className="font-serif-header font-bold text-base text-slate-900">
                {relatedService.shortTitle}
              </h4>
              <p className="font-sans text-xs text-slate-600 line-clamp-2">
                {relatedService.description}
              </p>
              <Link
                to={`/services/${relatedService.id}`}
                className="btn-burgundy-filled inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white mt-2"
              >
                <span>View Service Scope</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>
            </div>
          )}

          {relatedCourse && (
            <div className="p-5 rounded-2xl bg-white border border-rose-200 space-y-2">
              <span className="font-mono text-[10px] uppercase font-bold text-[#881337] bg-rose-100 px-2 py-0.5 rounded">
                Related Certification Track
              </span>
              <h4 className="font-serif-header font-bold text-base text-slate-900">
                {relatedCourse.title}
              </h4>
              <p className="font-sans text-xs text-slate-600 line-clamp-2">
                {relatedCourse.description}
              </p>
              <Link
                to={`/courses/${relatedCourse.id}`}
                className="btn-burgundy-filled inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white mt-2"
              >
                <span>Explore Course Track</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 6. BACK TO BLOGS */}
      <div className="pt-4 text-center">
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 font-mono text-xs font-bold text-[#881337] hover:text-[#5B0E1B]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Cybersecurity Articles</span>
        </Link>
      </div>

    </div>
  );
};
