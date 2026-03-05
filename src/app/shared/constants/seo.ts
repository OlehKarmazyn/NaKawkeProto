/** Base URL for canonical and OG (no trailing slash). */
export const SITE_BASE_URL =
  (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: { VITE_SITE_URL?: string } }).env?.VITE_SITE_URL) ||
  'https://nakawke.pl';

export const DEFAULT_OG_IMAGE = `${SITE_BASE_URL}/multi-automats.webp`;

export const SITE_NAME = 'Na Kawkę';

export const DEVELOPER_NAME = 'Digital Office';

export const PRIVACY_META = {
  title: 'Polityka Prywatności | Na Kawkę',
  description:
    'Polityka prywatności serwisu Na Kawkę — informacje o przetwarzaniu danych osobowych, plikach cookies i prawach użytkownika.',
};
