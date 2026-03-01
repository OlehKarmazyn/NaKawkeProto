import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Scrolls window to top when route pathname changes (e.g. navigating to polityka-prywatnosci).
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
