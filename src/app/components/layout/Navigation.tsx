import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { motion, useScroll } from 'motion/react';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';
import { MetallicButton } from '@/app/components/ui/MetallicButton';
import { LanguageSwitcher } from '@/app/components/ui/LanguageSwitcher';
import { NAV_LINKS } from '@/app/shared/constants/navigation';

const PRIVACY_PATH = '/polityka-prywatnosci';

export const Navigation: React.FC = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isPrivacyPage = location.pathname === PRIVACY_PATH;

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  // Scroll spy: active section is the one that *contains* the trigger line below the header.
  // So we switch only when the line actually enters/leaves a section (no flash on short sections).
  // Exception: "kontakt" highlights when its CTA block is visible in the viewport.
  const TRIGGER_OFFSET_PX = 120; // line below navbar: section is "current" when this line is inside its bounds

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(null);
      return;
    }

    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1) as string);

    const updateActiveSection = () => {
      let active: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();

        if (id === 'kontakt') {
          // Kontakt: highlight only when the CTA block is visible in the viewport
          const isVisible =
            rect.top < window.innerHeight && rect.bottom > TRIGGER_OFFSET_PX;
          if (isVisible) active = id;
        } else {
          // Other sections: section is active when the trigger line (120px from top) lies inside it
          if (rect.top <= TRIGGER_OFFSET_PX && rect.bottom > TRIGGER_OFFSET_PX) active = id;
        }
      }
      // At the very top — no section contains the line yet → first section
      if (active === null && sectionIds.length) {
        const firstEl = document.getElementById(sectionIds[0]);
        if (firstEl) {
          const firstRect = firstEl.getBoundingClientRect();
          if (firstRect.top > TRIGGER_OFFSET_PX) active = sectionIds[0];
        }
      }
      // Scrolled past all sections → keep last section active
      if (active === null && sectionIds.length) {
        const lastEl = document.getElementById(sectionIds[sectionIds.length - 1]);
        if (lastEl) {
          const lastRect = lastEl.getBoundingClientRect();
          if (lastRect.bottom <= TRIGGER_OFFSET_PX) active = sectionIds[sectionIds.length - 1];
        }
      }
      // Fallback: line is in a gap (e.g. between sections) — use section whose top is closest above the line
      if (active === null && sectionIds.length) {
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el && el.getBoundingClientRect().top <= TRIGGER_OFFSET_PX) {
            active = sectionIds[i];
            break;
          }
        }
      }
      setActiveSection(active);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, [location.pathname]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-xl bg-[#0A0A0A]/80 border-b border-[#C0C0C0]/20 shadow-[0_1px_0_0_var(--gold-accent)] shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => {
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 cursor-pointer no-underline"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <img
                  src={logo}
                  alt={t('nav.logoAlt')}
                  className="h-10 w-auto filter drop-shadow-[0_0_10px_rgba(192,192,192,0.3)]"
                />
                <div className="hidden sm:block">
                  <div className="text-xl font-bold text-white">{t('common.siteName')}</div>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:flex items-center gap-8"
            >
              {NAV_LINKS.map((link, index) => {
                const sectionId = link.href.slice(1);
                const isActive = activeSection === sectionId;
                const linkClass = `relative font-medium group transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-white/80 hover:text-white'
                }`;
                const underlineClass = `absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#C0C0C0] via-gold/50 to-white transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`;
                return isHome ? (
                  <motion.a
                    key={link.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    href={link.href}
                    className={linkClass}
                  >
                    {t(`nav.${link.id}`)}
                    <span className={underlineClass} />
                  </motion.a>
                ) : (
                  <Link
                    key={link.id}
                    to="/"
                    state={{ scrollTo: sectionId }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={linkClass}
                  >
                    {t(`nav.${link.id}`)}
                    <span className={underlineClass} />
                  </Link>
                );
              })}
            </motion.div>

            {/* CTA + Language dropdown (right of button) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="hidden lg:flex items-center gap-4"
            >
              {isHome ? (
                <MetallicButton onClick={() => scrollToSection('#kontakt')}>
                  {t('nav.cta')}
                </MetallicButton>
              ) : (
                <Link
                  to="/"
                  state={{ scrollTo: 'kontakt' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative px-8 py-4 font-semibold text-black overflow-hidden rounded-lg transition-all duration-300 bg-gradient-to-r from-[#a8a8a8] via-[#C0C0C0] to-[#a8a8a8] hover:shadow-[0_0_30px_rgba(192,192,192,0.6)] hover:scale-105 active:scale-95 inline-block"
                >
                  <span className="relative z-10">{t('nav.cta')}</span>
                </Link>
              )}
              {!isPrivacyPage && <LanguageSwitcher />}
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-[#C0C0C0] transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? 0 : '100%',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-20 right-0 bottom-0 w-full sm:w-80 bg-[#0A0A0A]/95 backdrop-blur-xl border-l border-[#C0C0C0]/20 z-40 lg:hidden ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-6 gap-6">
          {NAV_LINKS.map((link, index) => {
            const sectionId = link.href.slice(1);
            const isActive = activeSection === sectionId;
            const itemClass = `py-3 border-b border-[#C0C0C0]/10 font-medium transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-white/80 hover:text-white'
            } text-xl`;
            return isHome ? (
              <motion.a
                key={link.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : 20,
                }}
                transition={{ duration: 0.3, delay: isMobileMenuOpen ? index * 0.05 : 0 }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                href={link.href}
                className={itemClass}
              >
                {t(`nav.${link.id}`)}
              </motion.a>
            ) : (
              <Link
                key={link.id}
                to="/"
                state={{ scrollTo: sectionId }}
                onClick={() => setIsMobileMenuOpen(false)}
                className={itemClass}
              >
                {t(`nav.${link.id}`)}
              </Link>
            );
          })}

          <div className="mt-4 flex flex-col gap-3">
            {isHome ? (
              <MetallicButton onClick={() => scrollToSection('#kontakt')}>
                {t('nav.cta')}
              </MetallicButton>
            ) : (
              <Link
                to="/"
                state={{ scrollTo: 'kontakt' }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative px-8 py-4 font-semibold text-black overflow-hidden rounded-lg transition-all duration-300 bg-gradient-to-r from-[#a8a8a8] via-[#C0C0C0] to-[#a8a8a8] hover:shadow-[0_0_30px_rgba(192,192,192,0.6)] hover:scale-105 active:scale-95 inline-block text-center"
              >
                <span className="relative z-10">{t('nav.cta')}</span>
              </Link>
            )}
            {!isPrivacyPage && <LanguageSwitcher />}
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}
    </>
  );
};
