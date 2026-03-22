import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router';
import { Analytics } from './components/seo/Analytics';
import { SetDocumentLang } from './components/seo/SetDocumentLang';
import { router } from './routes';

export default function App() {
  return (
    <HelmetProvider>
      <SetDocumentLang />
      <Analytics />
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}