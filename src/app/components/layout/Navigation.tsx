import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, useScroll } from 'motion/react';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';
import { MetallicButton } from '@/app/components/ui/MetallicButton';
import { NAV_LINKS } from '@/app/shared/constants/navigation';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const location = useLocation();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  // Scroll spy: активная секция — та, чей верх уже пересёк линию под шапкой (при появлении блока подсвечивается, при уходе — следующая).
  const TRIGGER_OFFSET_PX = 120; // линия под навбаром: секция считается "текущей", когда её top выше этой линии

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(null);
      return;
    }

    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));

    const updateActiveSection = () => {
      let active: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        // Последняя секция, чей верх уже прошёл линию — текущая
        if (top <= TRIGGER_OFFSET_PX) {
          active = id;
        }
      }
      // В самом верху страницы — первая секция
      if (active === null && sectionIds.length) active = sectionIds[0];
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
                  alt="Na Kawkę Logo"
                  className="h-10 w-auto filter drop-shadow-[0_0_10px_rgba(192,192,192,0.3)]"
                />
                <div className="hidden sm:block">
                  <div className="text-xl font-bold text-white">Na Kawkę</div>
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
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.a
                    key={link.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    href={link.href}
                    className={`relative font-medium group transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#C0C0C0] via-gold/50 to-white transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="hidden lg:block"
            >
              <MetallicButton>Otrzymać pełne wyliczenie zwrotu</MetallicButton>
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
            const isActive = activeSection === link.href.slice(1);
            return (
              <motion.a
                key={link.name}
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
                className={`py-3 border-b border-[#C0C0C0]/10 font-medium transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-white/80 hover:text-white'
                } text-xl`}
              >
                {link.name}
              </motion.a>
            );
          })}

          <div className="mt-4">
            <MetallicButton>Otrzymać pełne wyliczenie zwrotu</MetallicButton>
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
