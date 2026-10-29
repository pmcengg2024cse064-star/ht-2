import React, { useEffect } from 'react';
import { COMPANY_FACTS, SITE_URL } from '../../data/cyberData';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  primaryKeyword?: string;
  breadcrumbs?: BreadcrumbItem[];
  type?: 'website' | 'article' | 'service' | 'course';
  articleData?: {
    publishedDate: string;
    author: string;
    headline: string;
    image?: string;
  };
  serviceData?: {
    name: string;
    description: string;
  };
  courseData?: {
    name: string;
    description: string;
  };
  faqData?: {
    q: string;
    a: string;
  }[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical,
  primaryKeyword,
  breadcrumbs,
  type = 'website',
  articleData,
  serviceData,
  courseData,
  faqData,
}) => {
  useEffect(() => {
    // 1. Page Title
    if (title) {
      document.title = title;
    }

    // Helper to create or update meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // 2. Meta Description
    if (description) {
      setMetaTag('description', description);
    }

    // 3. Primary Keywords & Secondary
    if (primaryKeyword) {
      setMetaTag('keywords', `${primaryKeyword}, penetration testing Coimbatore, SOC as a service, DPDP Act compliance, ethical hacking course Coimbatore, cybersecurity training institute in Tamil Nadu, cyber defense center, cybersecurity company India`);
    }

    // 4. Canonical Tag
    const currentUrl = canonical || (typeof window !== 'undefined' ? `${SITE_URL}${window.location.pathname}` : SITE_URL);
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // 5. Open Graph Meta Tags
    setMetaTag('og:title', title || 'Hackup Technology - Cyber Defense & Academy', true);
    setMetaTag('og:description', description || 'Premier cybersecurity company in Coimbatore, South India.', true);
    setMetaTag('og:url', currentUrl, true);
    setMetaTag('og:type', type === 'article' ? 'article' : 'website', true);
    setMetaTag('og:site_name', 'Hackup Technology', true);
    setMetaTag('og:image', `${SITE_URL}/images/hackup_logo.png`, true);

    // 6. Twitter Card Tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title || 'Hackup Technology');
    setMetaTag('twitter:description', description || 'Premier cybersecurity company in Coimbatore.');
    setMetaTag('twitter:image', `${SITE_URL}/images/hackup_logo.png`);

    // 7. Structured Data (JSON-LD)
    const jsonLdScripts: HTMLScriptElement[] = [];

    // Base Organization, WebSite & LocalBusiness
    const orgSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'Hackup Technology Pvt Ltd',
          url: SITE_URL,
          logo: `${SITE_URL}/images/hackup_logo.png`,
          founder: {
            '@type': 'Person',
            name: COMPANY_FACTS.founderName,
            jobTitle: COMPANY_FACTS.founderTitle,
            description: `${COMPANY_FACTS.founderTitle} with 10+ years experience in sovereign cyber defense.`
          },
          contactPoint: [
            {
              '@type': 'ContactPoint',
              telephone: COMPANY_FACTS.phones[0],
              contactType: 'customer service',
              areaServed: 'IN',
              availableLanguage: ['English', 'Tamil']
            }
          ]
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'Hackup Technology',
          description: 'Premier Cybersecurity Firm & Cyber Defense Center',
          publisher: {
            '@id': `${SITE_URL}/#organization`
          },
          inLanguage: 'en-US'
        },
        {
          '@type': 'LocalBusiness',
          '@id': `${SITE_URL}/#localbusiness`,
          name: 'Hackup Technology Pvt Ltd',
          image: `${SITE_URL}/images/hackup_logo.png`,
          telephone: COMPANY_FACTS.phones[0],
          email: COMPANY_FACTS.emails[0],
          address: {
            '@type': 'PostalAddress',
            streetAddress: `${COMPANY_FACTS.headquarters.street}, ${COMPANY_FACTS.headquarters.area}`,
            addressLocality: COMPANY_FACTS.headquarters.city,
            postalCode: COMPANY_FACTS.headquarters.pincode,
            addressRegion: COMPANY_FACTS.headquarters.state,
            addressCountry: 'IN'
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: COMPANY_FACTS.googleRating.toString(),
            reviewCount: COMPANY_FACTS.googleReviewsCount.toString(),
            bestRating: '5',
            worstRating: '1'
          },
          priceRange: '₹₹₹'
        }
      ]
    };

    // BreadcrumbList Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.url.startsWith('http') ? crumb.url : `${SITE_URL}${crumb.url}`
        }))
      };
      const bScript = document.createElement('script');
      bScript.type = 'application/ld+json';
      bScript.id = 'jsonld-breadcrumbs';
      bScript.text = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(bScript);
      jsonLdScripts.push(bScript);
    }

    // Service Schema
    if (serviceData) {
      const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: serviceData.name,
        description: serviceData.description,
        provider: {
          '@id': `${SITE_URL}/#organization`
        },
        areaServed: {
          '@type': 'Country',
          name: 'India'
        }
      };
      const sScript = document.createElement('script');
      sScript.type = 'application/ld+json';
      sScript.id = 'jsonld-service';
      sScript.text = JSON.stringify(serviceSchema);
      document.head.appendChild(sScript);
      jsonLdScripts.push(sScript);
    }

    // Course Schema
    if (courseData) {
      const courseSchema = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: courseData.name,
        description: courseData.description,
        provider: {
          '@id': `${SITE_URL}/#organization`
        }
      };
      const cScript = document.createElement('script');
      cScript.type = 'application/ld+json';
      cScript.id = 'jsonld-course';
      cScript.text = JSON.stringify(courseSchema);
      document.head.appendChild(cScript);
      jsonLdScripts.push(cScript);
    }

    // FAQPage Schema
    if (faqData && faqData.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a
          }
        }))
      };
      const fScript = document.createElement('script');
      fScript.type = 'application/ld+json';
      fScript.id = 'jsonld-faq';
      fScript.text = JSON.stringify(faqSchema);
      document.head.appendChild(fScript);
      jsonLdScripts.push(fScript);
    }

    // Article Schema
    if (articleData) {
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: articleData.headline,
        datePublished: articleData.publishedDate,
        author: {
          '@type': 'Person',
          name: articleData.author
        },
        publisher: {
          '@id': `${SITE_URL}/#organization`
        },
        image: articleData.image ? (articleData.image.startsWith('http') ? articleData.image : `${SITE_URL}${articleData.image}`) : `${SITE_URL}/images/hackup_logo.png`
      };
      const aScript = document.createElement('script');
      aScript.type = 'application/ld+json';
      aScript.id = 'jsonld-article';
      aScript.text = JSON.stringify(articleSchema);
      document.head.appendChild(aScript);
      jsonLdScripts.push(aScript);
    }

    // Add Base Org Schema
    const baseScript = document.createElement('script');
    baseScript.type = 'application/ld+json';
    baseScript.id = 'jsonld-base-org';
    baseScript.text = JSON.stringify(orgSchema);
    document.head.appendChild(baseScript);
    jsonLdScripts.push(baseScript);

    return () => {
      // Clean up injected JSON-LD scripts on route unmount
      jsonLdScripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [title, description, canonical, primaryKeyword, breadcrumbs, type, articleData, serviceData, courseData, faqData]);

  return null;
};
