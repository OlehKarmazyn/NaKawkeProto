import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pl from '../locales/pl/translation.json';
import en from '../locales/en/translation.json';
import uk from '../locales/uk/translation.json';

/** Default and fallback language. Language is set from URL (see useLangFromUrl), not from localStorage. */
export const DEFAULT_LANG = 'pl';

/** Supported URL language codes. Invalid :lang in URL redirects to /pl/. */
export const SUPPORTED_LANGS = ['pl', 'en', 'uk'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export function isSupportedLang(lang: string): lang is SupportedLang {
  return SUPPORTED_LANGS.includes(lang as SupportedLang);
}

i18n.use(initReactI18next).init({
  resources: {
    pl: { translation: pl },
    en: { translation: en },
    uk: { translation: uk },
  },
  fallbackLng: DEFAULT_LANG,
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
