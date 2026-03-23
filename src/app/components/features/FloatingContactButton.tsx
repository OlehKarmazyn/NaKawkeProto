import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useLangPath, pathWithoutLang } from '@/hooks/useLangPath';

/** Floating CTA button that scrolls to contact form section. */
export const FloatingContactButton: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const path = useLangPath();
  const [bottomOffset, setBottomOffset] = useState(24);

  useEffect(() => {
    const updatePosition = () => {
      const footer = document.querySelector('footer');
      if (!footer) {
        setBottomOffset(24);
        return;
      }

      const rect = footer.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight || 0;

      if (rect.top < viewportHeight) {
        const overlap = viewportHeight - rect.top;
        setBottomOffset(24 + overlap);
      } else {
        setBottomOffset(24);
      }
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  const handleClick = () => {
    const contactSection = document.getElementById('kontakt');
    const isHome = pathWithoutLang(window.location.pathname) === '/';

    if (isHome && contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    navigate(path('/'), { state: { scrollTo: 'kontakt' } });
  };

  return (
    <div
      className="fixed right-6 z-50"
      style={{ bottom: `${bottomOffset}px` }}
      aria-hidden="false"
    >
      <motion.button
        type="button"
        onClick={handleClick}
        animate={{ scale: [1, 1.08, 1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="relative min-w-[56px] min-h-[56px] flex items-center justify-center rounded-full bg-[#C0C0C0] text-[#0A0A0A] shadow-[0_0_24px_rgba(192,192,192,0.4)] hover:bg-[#a8a8a8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C0C0]"
        aria-label={t('nav.cta')}
        title={t('nav.cta')}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </div>
  );
};
