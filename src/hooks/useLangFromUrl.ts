import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import i18n, { DEFAULT_LANG, isSupportedLang } from '@/lib/i18n';

/**
 * Reads :lang from the URL, validates it (pl | en | uk), syncs i18n and returns the current lang.
 * Invalid lang redirects to /pl/. Call this inside a route under /:lang.
 */
export function useLangFromUrl(): string {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lang || !isSupportedLang(lang)) {
      navigate('/pl/', { replace: true });
      return;
    }
    void i18n.changeLanguage(lang);
  }, [lang, navigate]);

  return lang && isSupportedLang(lang) ? lang : DEFAULT_LANG;
}
