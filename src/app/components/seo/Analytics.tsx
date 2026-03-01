import { useEffect } from 'react';

const UMAMI_SCRIPT_URL = 'https://umami.digital-office.pl/script.js';
const UMAMI_WEBSITE_ID = 'feb49e80-62dc-463c-86af-735e69b79ac0';

/**
 * Injects Umami analytics script only in production build.
 * When running locally (Vite dev server), the script is not loaded — no tracking in development.
 */
export function Analytics() {
  useEffect(() => {
    if (import.meta.env.DEV) return;

    const script = document.createElement('script');
    script.defer = true;
    script.src = UMAMI_SCRIPT_URL;
    script.setAttribute('data-website-id', UMAMI_WEBSITE_ID);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
