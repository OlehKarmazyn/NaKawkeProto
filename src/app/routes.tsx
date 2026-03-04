import { createBrowserRouter, Navigate, Outlet } from 'react-router';
import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo.png';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { LangLayout } from './components/layout/LangLayout';

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const PackageStandard = lazy(() => import('./pages/PackageStandard').then((m) => ({ default: m.PackageStandard })));
const PackagePremium = lazy(() => import('./pages/PackagePremium').then((m) => ({ default: m.PackagePremium })));
const Privacy = lazy(() => import('./pages/Privacy').then((m) => ({ default: m.Privacy })));

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
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
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
