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

function unflattenTranslations(flat: Record<string, string>): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  Object.entries(flat).forEach(([key, value]) => {
    const parts = key.split('.');
    let current: Record<string, unknown> = result;

    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;

      if (isLast) {
        current[part] = value;
        return;
      }

      if (!current[part] || typeof current[part] !== 'object') {
        current[part] = {};
      }

      current = current[part] as Record<string, unknown>;
    });
  });

  return result;
}

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
    const plNested = unflattenTranslations(cached.data.pl);
    const enNested = unflattenTranslations(cached.data.en);
    const ukNested = unflattenTranslations(cached.data.uk);

    i18n.addResourceBundle('pl', 'translation', plNested, true, true);
    i18n.addResourceBundle('en', 'translation', enNested, true, true);
    i18n.addResourceBundle('uk', 'translation', ukNested, true, true);

    const currentLang = i18n.language || DEFAULT_LANG;
    await i18n.changeLanguage(currentLang);
    return;
  }

  try {
    const remote = await fetchContentTranslations();

    const plNested = unflattenTranslations(remote.pl);
    const enNested = unflattenTranslations(remote.en);
    const ukNested = unflattenTranslations(remote.uk);

    i18n.addResourceBundle('pl', 'translation', plNested, true, true);
    i18n.addResourceBundle('en', 'translation', enNested, true, true);
    i18n.addResourceBundle('uk', 'translation', ukNested, true, true);

    writeCache(remote);

    const currentLang = i18n.language || DEFAULT_LANG;
    await i18n.changeLanguage(currentLang);
  } catch (error) {
    // PocketBase is optional for rendering; static JSON remains as fallback.
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn('[i18n] Failed to load PocketBase translations', error);
    }
  }
}

export default i18n;
