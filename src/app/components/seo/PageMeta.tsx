import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';
import { SITE_BASE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '@/app/shared/constants/seo';
import { pathWithoutLang, langPath } from '@/hooks/useLangPath';
import { SUPPORTED_LANGS } from '@/lib/i18n';

export interface PageMetaProps {
  title: string;
  description: string;
  /** Kept for backwards compatibility; canonical and hreflang are derived from current URL (useLocation). */
  canonicalPath: string;
  ogImage?: string;
  /** When true, adds robots noindex,follow — for legal pages (privacy, terms) that should not appear in search results but remain linkable. */
  robotsNoIndex?: boolean;
}

/** Page-level SEO: title, description, canonical, OG, Twitter Card. Canonical and hreflang use current URL (lang-prefixed). */
export const PageMeta: React.FC<PageMetaProps> = ({
  title,
  description,
  ogImage = DEFAULT_OG_IMAGE,
  robotsNoIndex = false,
}) => {
  const { pathname } = useLocation();
  const pathSeg = pathWithoutLang(pathname);
  const canonicalPathFull = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const canonical = `${SITE_BASE_URL}${canonicalPathFull}`;
  const fullTitle = title.length > 45 ? title : `${title} | ${SITE_NAME}`;

  const alternateUrls = SUPPORTED_LANGS.map((lang) => ({
    lang,
    url: `${SITE_BASE_URL}${langPath(lang, pathSeg)}`,
  }));
  const defaultUrl = `${SITE_BASE_URL}${langPath('pl', pathSeg)}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {robotsNoIndex && <meta name="robots" content="noindex, follow" />}
      <link rel="canonical" href={canonical} />
      {alternateUrls.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={defaultUrl} />
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
