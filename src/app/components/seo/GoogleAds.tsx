import { useEffect } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

/**
 * Updates Google Consent Mode v2 when the user accepts or rejects cookies.
 * The gtag.js script itself is loaded unconditionally in index.html so that
 * Google can always detect the tag on the page.
 */
export function GoogleAds() {
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (typeof window.gtag !== 'function') return;

    if (consent === 'accepted') {
      window.gtag('consent', 'update', {
        ad_storage:         'granted',
        ad_user_data:       'granted',
        ad_personalization: 'granted',
        analytics_storage:  'granted',
      });
    } else if (consent === 'rejected') {
      window.gtag('consent', 'update', {
        ad_storage:         'denied',
        ad_user_data:       'denied',
        ad_personalization: 'denied',
        analytics_storage:  'denied',
      });
    }
  }, [consent]);

  return null;
}
