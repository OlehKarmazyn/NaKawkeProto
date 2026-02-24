import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import { Menu, X } from 'lucide-react';
import logo from 'figma:asset/0c0405b0a3229ac0cadccb122f06312f47e96f7f.png';
import { MetallicButton } from './MetallicButton';

const navLinks = [
  { name: 'O nas', href: '#o-nas' },
  { name: 'Zalety', href: '#zalety' },
  { name: 'Ekonomia', href: '#ekonomia' },
  { name: 'Cennik', href: '#cennik' },
  { name: 'Kontakt', href: '#kontakt' }
];

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

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
            ? 'backdrop-blur-xl bg-[#0A0A0A]/80 border-b border-[#C0C0C0]/20 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img 
                src={logo} 
                alt="Na Kawkę Logo" 
                className="h-12 w-auto filter drop-shadow-[0_0_10px_rgba(192,192,192,0.3)]"
              />
              <div className="hidden sm:block">
                <div className="text-xl font-bold text-white">Na Kawkę</div>
                
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:flex items-center gap-8"
            >
              {navLinks.map((link, index) => (
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
                  className="relative text-white/80 hover:text-white transition-colors duration-300 font-medium group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#C0C0C0] to-white group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="hidden lg:block"
            >
              <MetallicButton>
                Otrzymać pełne wyliczenie zwrotu
              </MetallicButton>
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
          x: isMobileMenuOpen ? 0 : '100%'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-20 right-0 bottom-0 w-full sm:w-80 bg-[#0A0A0A]/95 backdrop-blur-xl border-l border-[#C0C0C0]/20 z-40 lg:hidden ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-6 gap-6">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : 20
              }}
              transition={{ duration: 0.3, delay: isMobileMenuOpen ? index * 0.05 : 0 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              href={link.href}
              className="text-xl text-white/80 hover:text-white transition-colors duration-300 font-medium py-3 border-b border-[#C0C0C0]/10"
            >
              {link.name}
            </motion.a>
          ))}
          
          <div className="mt-4">
            <MetallicButton>
              Otrzymać pełne wyliczenie zwrotu
            </MetallicButton>
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