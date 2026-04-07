import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router';
import { Analytics } from './components/seo/Analytics';
import { GoogleAds } from './components/seo/GoogleAds';
import { GTM } from './components/seo/GTM';
import { SetDocumentLang } from './components/seo/SetDocumentLang';
import { CookieBanner } from './components/ui/CookieBanner';
import { router } from './routes';

export default function App() {
  return (
    <HelmetProvider>
      <SetDocumentLang />
      <Analytics />
      <GTM />
      <GoogleAds />
      <RouterProvider router={router} />
      <CookieBanner />
    </HelmetProvider>
  );
}