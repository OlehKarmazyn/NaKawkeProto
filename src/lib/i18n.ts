import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pl from '../locales/pl/translation.json';
import en from '../locales/en/translation.json';
import uk from '../locales/uk/translation.json';
import { fetchContentTranslations } from '@/services/content';

/** Default and fallback language. Language is set from URL (see useLangFromUrl), not from localStorage. */
export const DEFAULT_LANG = 'pl';

/** Supported URL language codes. Invalid :lang in URL redirects to /pl/. */
export const SUPPORTED_LANGS = ['pl', 'en', 'uk'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export function isSupportedLang(lang: string): lang is SupportedLang {
  return SUPPORTED_LANGS.includes(lang as SupportedLang);
}

const resources = {
  pl: { translation: pl },
  en: { translation: en },
  uk: { translation: uk },
} as const;

export async function initI18n(): Promise<void> {
  if (i18n.isInitialized) {
    return;
  }

  i18n.use(initReactI18next);

  await i18n.init({
    resources,
    fallbackLng: DEFAULT_LANG,
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

const SESSION_STORAGE_KEY = 'pb_translations';
const CACHE_TTL_MS = 5 * 60 * 1000;

interface CachedTranslations {
  timestamp: number;
  data: {
    pl: Record<string, string>;
    en: Record<string, string>;
    uk: Record<string, string>;
  };
}

function readCache(): CachedTranslations | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CachedTranslations;
    if (typeof parsed.timestamp !== 'number' || !parsed.data) {
      return null;
    }

    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function writeCache(data: CachedTranslations['data']): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const payload: CachedTranslations = {
      timestamp: Date.now(),
      data,
    };
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Best-effort cache, ignore failures.
  }
}

export async function loadRemoteTranslations(): Promise<void> {
  const cached = readCache();

  if (cached) {
    i18n.addResourceBundle('pl', 'translation', cached.data.pl, true, true);
    i18n.addResourceBundle('en', 'translation', cached.data.en, true, true);
    i18n.addResourceBundle('uk', 'translation', cached.data.uk, true, true);
    return;
  }

  try {
    const remote = await fetchContentTranslations();

    i18n.addResourceBundle('pl', 'translation', remote.pl, true, true);
    i18n.addResourceBundle('en', 'translation', remote.en, true, true);
    i18n.addResourceBundle('uk', 'translation', remote.uk, true, true);

    writeCache(remote);
  } catch (error) {
    // PocketBase is optional for rendering; static JSON remains as fallback.
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn('[i18n] Failed to load PocketBase translations', error);
    }
  }
}

export default i18n;
