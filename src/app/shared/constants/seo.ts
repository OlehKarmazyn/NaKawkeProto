/** Base URL for canonical and OG (no trailing slash). */
export const SITE_BASE_URL =
  (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: { VITE_SITE_URL?: string } }).env?.VITE_SITE_URL) ||
  'https://nakawke.pl';

export const DEFAULT_OG_IMAGE = `${SITE_BASE_URL}/og-image.png`;

export const SITE_NAME = 'Na Kawkę';
