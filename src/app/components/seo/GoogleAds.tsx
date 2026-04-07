import { useEffect } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

const AW_ID = 'AW-18063421764';

/**
 * Injects Google Ads (gtag.js) conversion tracking script only after
 * the user has accepted cookies. Skipped in development.
 */
export function GoogleAds() {
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (import.meta.env.DEV) return;
    if (consent !== 'accepted') return;

    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${AW_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${AW_ID}');
    `;
    document.head.appendChild(script2);

    return () => {
      script1.remove();
      script2.remove();
    };
  }, [consent]);

  return null;
}
