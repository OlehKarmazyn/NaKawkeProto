import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'cookie_consent';

export type ConsentStatus = 'accepted' | 'rejected' | null;

function readStored(): ConsentStatus {
  try {
    return (localStorage.getItem(STORAGE_KEY) as ConsentStatus) ?? null;
  } catch {
    return null;
  }
}

type CookieConsentContextValue = {
  consent: ConsentStatus;
  accept: () => void;
  reject: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

/**
 * Single source of truth for cookie consent so GTM, GoogleAds consent updates,
 * and CookieBanner stay in sync when the user accepts or rejects without reload.
 */
export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentStatus>(readStored);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setConsent((e.newValue as ConsentStatus) ?? null);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setConsent('accepted');
  }, []);

  const reject = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    setConsent('rejected');
  }, []);

  return (
    <CookieConsentContext.Provider value={{ consent, accept, reject }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider');
  }
  return ctx;
}
