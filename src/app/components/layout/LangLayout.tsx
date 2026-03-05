import { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useLangFromUrl } from '@/hooks/useLangFromUrl';

/**
 * Layout for all /:lang/* routes. Syncs i18n with URL lang, redirects en/uk away from
 * polityka-prywatnosci to /pl/polityka-prywatnosci. Renders Outlet only after i18n
 * matches URL lang to avoid flash of wrong language.
 */
export function LangLayout() {
  const currentLang = useLangFromUrl();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const [langReady, setLangReady] = useState(false);

  useEffect(() => {
    if (i18n.language?.startsWith(currentLang)) {
      setLangReady(true);
      return;
    }
    const onLangChanged = () => {
      if (i18n.language?.startsWith(currentLang)) {
        setLangReady(true);
      }
    };
    i18n.on('languageChanged', onLangChanged);
    return () => {
      i18n.off('languageChanged', onLangChanged);
    };
  }, [currentLang, pathname, navigate, i18n]);

  if (!lang || !langReady) {
    return null;
  }

  return <Outlet />;
}
