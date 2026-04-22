import {
  createBrowserRouter,
  isRouteErrorResponse,
  Navigate,
  Outlet,
  useRouteError,
} from 'react-router';
import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo.webp';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { LangLayout } from './components/layout/LangLayout';
import { FloatingContactButton } from './components/features/FloatingContactButton';

const CHUNK_RELOAD_GUARD_KEY = 'lazy_chunk_reload_once';
const CHUNK_LOAD_ERROR_PATTERN =
  /Failed to fetch dynamically imported module|Importing a module script failed|ChunkLoadError|Loading chunk [\w-]+ failed/i;

function withChunkLoadRetry<T>(importer: () => Promise<T>): Promise<T> {
  return importer().catch((error: unknown) => {
    const alreadyReloaded = sessionStorage.getItem(CHUNK_RELOAD_GUARD_KEY) === 'true';
    const message = error instanceof Error ? error.message : String(error);
    const isChunkLoadError = CHUNK_LOAD_ERROR_PATTERN.test(message);

    if (isChunkLoadError && !alreadyReloaded) {
      sessionStorage.setItem(CHUNK_RELOAD_GUARD_KEY, 'true');
      window.location.reload();
      return new Promise<T>(() => undefined);
    }

    sessionStorage.removeItem(CHUNK_RELOAD_GUARD_KEY);
    throw error;
  });
}

const Home = lazy(() =>
  withChunkLoadRetry(() => import('./pages/Home').then((m) => ({ default: m.Home })))
);
const PackageStandard = lazy(() =>
  withChunkLoadRetry(() =>
    import('./pages/PackageStandard').then((m) => ({ default: m.PackageStandard }))
  )
);
const PackagePremium = lazy(() =>
  withChunkLoadRetry(() =>
    import('./pages/PackagePremium').then((m) => ({ default: m.PackagePremium }))
  )
);
const Privacy = lazy(() =>
  withChunkLoadRetry(() =>
    import('./pages/Privacy').then((m) => ({ default: m.Privacy }))
  )
);

function PageFallback() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center gap-3" aria-label={t('nav.loadingAria')}>
      <img src={logo} alt="" className="h-8 w-auto" width={96} height={32} aria-hidden="true" />
      <span className="text-white/60">{t('nav.loading')}</span>
    </div>
  );
}

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
      <FloatingContactButton />
    </>
  );
}

function RouteErrorBoundary() {
  const { t } = useTranslation();
  const error = useRouteError();
  const details = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : t('nav.appErrorUnknown');

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-6 py-10">
      <section
        className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center"
        aria-label={t('nav.appErrorAria')}
      >
        <img
          src={logo}
          alt=""
          className="mx-auto mb-4 h-8 w-auto"
          width={96}
          height={32}
          aria-hidden="true"
        />
        <h1 className="text-xl font-semibold">{t('nav.appErrorTitle')}</h1>
        <p className="mt-2 text-sm text-white/70">{t('nav.appErrorDescription')}</p>
        <p className="mt-4 rounded-lg border border-white/10 bg-black/20 p-3 text-left text-xs text-white/70">
          {details}
        </p>
        <button
          type="button"
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
          onClick={() => window.location.reload()}
        >
          {t('nav.appErrorReload')}
        </button>
      </section>
    </main>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/pl/" replace />,
      },
      {
        path: ':lang',
        Component: LangLayout,
        children: [
          {
            index: true,
            Component: () => (
              <Suspense fallback={<PageFallback />}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: 'pakiet-standard',
            Component: () => (
              <Suspense fallback={<PageFallback />}>
                <PackageStandard />
              </Suspense>
            ),
          },
          {
            path: 'pakiet-premium',
            Component: () => (
              <Suspense fallback={<PageFallback />}>
                <PackagePremium />
              </Suspense>
            ),
          },
          {
            path: 'polityka-prywatnosci',
            Component: () => (
              <Suspense fallback={<PageFallback />}>
                <Privacy />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
