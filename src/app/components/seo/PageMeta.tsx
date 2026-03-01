import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_BASE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '@/app/shared/constants/seo';

export interface PageMetaProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  /** When true, adds robots noindex,follow — for legal pages (privacy, terms) that should not appear in search results but remain linkable. */
  robotsNoIndex?: boolean;
}

/** Page-level SEO: title, description, canonical, OG, Twitter Card. */
export const PageMeta: React.FC<PageMetaProps> = ({
  title,
  description,
  canonicalPath,
  ogImage = DEFAULT_OG_IMAGE,
  robotsNoIndex = false,
}) => {
  const path = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  const canonical = `${SITE_BASE_URL}${path}`;
  const fullTitle = title.length > 45 ? title : `${title} | ${SITE_NAME}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {robotsNoIndex && <meta name="robots" content="noindex, follow" />}
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="pl" href={canonical} />
      <link rel="alternate" hrefLang="en" href={canonical} />
      <link rel="alternate" hrefLang="uk" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
