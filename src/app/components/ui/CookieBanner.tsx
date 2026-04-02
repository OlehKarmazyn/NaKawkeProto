import { useCookieConsent } from '@/hooks/useCookieConsent';

/**
 * GDPR cookie consent banner.
 * Shown until the user either accepts or rejects tracking cookies.
 * Disappears permanently once a choice is stored in localStorage.
 */
export function CookieBanner() {
  const { consent, accept, reject } = useCookieConsent();

  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 sm:py-5"
    >
      <div
        className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#111111]/95 backdrop-blur-md
          shadow-[0_-4px_32px_rgba(0,0,0,0.5)] px-5 py-4 sm:px-7 sm:py-5
          flex flex-col sm:flex-row sm:items-center gap-4"
      >
        {/* Text */}
        <p className="flex-1 text-sm text-white/80 leading-relaxed">
          Ta strona używa cookies w celach analitycznych i marketingowych.
          <br />
          Więcej w{' '}
          <a
            href="/pl/polityka-prywatnosci"
            className="underline underline-offset-2 text-[#87AEA6] hover:text-[#87AEA6]/80 transition-colors"
          >
            Polityce prywatności
          </a>
          .
        </p>

        {/* Buttons */}
        <div className="flex gap-3 shrink-0">
          <button
            onClick={reject}
            className="px-5 py-2 rounded-xl text-sm font-medium text-white/60 border border-white/15
              hover:border-white/30 hover:text-white/80 transition-colors duration-200"
          >
            Odrzuć
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 rounded-xl text-sm font-bold text-black
              shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)]
              hover:-translate-y-px transition-all duration-200"
            style={{ background: 'linear-gradient(180deg, #666666, #D6D6D6, #666666)' }}
          >
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}
