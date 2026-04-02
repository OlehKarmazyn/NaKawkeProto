import { useEffect } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

const GTM_ID = 'GTM-NRSHGTXK';

/**
 * Injects Google Tag Manager scripts only after the user has accepted cookies.
 * GTM is never loaded on consent "rejected" or when consent is still pending.
 * In development the script is also skipped.
 */
export function GTM() {
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (import.meta.env.DEV) return;
    if (consent !== 'accepted') return;

    // Inject <script> into <head>
    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),
            dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `;
    document.head.appendChild(script);

    // Inject <noscript> into <body>
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);

    return () => {
      script.remove();
      noscript.remove();
    };
  }, [consent]);

  return null;
}
