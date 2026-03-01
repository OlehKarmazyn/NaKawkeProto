import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/** Syncs document.documentElement.lang with current i18n language (pl, en, uk). */
export function SetDocumentLang() {
  const { i18n } = useTranslation();
  useEffect(() => {
    const lang = i18n.language?.slice(0, 2) ?? 'pl';
    document.documentElement.lang = lang;
  }, [i18n.language]);
  return null;
}
