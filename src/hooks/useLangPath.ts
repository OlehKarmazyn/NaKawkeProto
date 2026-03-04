import { useParams } from 'react-router';
import { useMemo } from 'react';
import { DEFAULT_LANG, isSupportedLang } from '@/lib/i18n';

/**
 * Strips /:lang from pathname. E.g. /pl/pakiet-standard → /pakiet-standard, /en/ → /.
 */
export function pathWithoutLang(pathname: string): string {
  const without = pathname.replace(/^\/(pl|en|uk)(?=\/|$)/, '') || '/';
  return without || '/';
}

/**
 * Returns the current :lang from the URL (for use inside /:lang/* routes).
 * Safe when used outside (e.g. redirect): falls back to DEFAULT_LANG.
 */
export function useLang(): string {
  const { lang } = useParams<{ lang: string }>();
  return lang && isSupportedLang(lang) ? lang : DEFAULT_LANG;
}

/**
 * Builds a lang-prefixed path. Use for all internal <Link to={...}> and navigate().
 * @param lang - Language code (pl | en | uk)
 * @param path - Path without lang: '/' | '/pakiet-standard' | '/#cennik' | '/polityka-prywatnosci'
 */
export function langPath(lang: string, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (p === '/' || p === '') {
    return `/${lang}/`;
  }
  return `/${lang}${p}`;
}

/**
 * Hook that returns a function to build lang-prefixed paths with the current URL lang.
 * Usage: const path = useLangPath(); <Link to={path('/pakiet-standard')} />
 */
export function useLangPath(): (path: string) => string {
  const lang = useLang();
  return useMemo(() => (path: string) => langPath(lang, path), [lang]);
}
