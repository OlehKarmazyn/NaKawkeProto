import { createRoot } from 'react-dom/client';
import i18n, { initI18n, loadRemoteTranslations } from '@/lib/i18n';
import App from './app/App';
import './styles/index.css';

async function bootstrap() {
  await initI18n();
  await loadRemoteTranslations();

  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Root container element with id "root" not found');
  }

  createRoot(container).render(<App />);
}

void bootstrap().catch((error) => {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.error('[main] Failed to bootstrap application', error);
  }
  // In production, fail fast; rendering without translations would break UX assumptions.
  throw error;
});
  