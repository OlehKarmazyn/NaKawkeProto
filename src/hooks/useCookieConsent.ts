import { useState, useEffect } from 'react';

const STORAGE_KEY = 'cookie_consent';

export type ConsentStatus = 'accepted' | 'rejected' | null;

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY) as ConsentStatus) ?? null;
    } catch {
      return null;
    }
  });

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setConsent('accepted');
  };

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    setConsent('rejected');
  };

  return { consent, accept, reject };
}
