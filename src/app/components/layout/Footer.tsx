import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import logo from '@/assets/logo.png';
import { SECTION_IDS } from '@/app/shared/constants/navigation';

export const Footer: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (pathname === '/') {
      document.querySelector(`#${hash}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate(`/#${hash}`, { state: { scrollTo: hash } });
    }
  };

  return (
    <footer className="relative py-12 border-t border-[#C0C0C0]/20 border-t-gold-accent">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src={logo} alt="Na Kawkę" className="h-8 w-auto" />
              <span className="text-lg font-bold text-white">Na Kawkę</span>
            </div>
            <p className="text-white/60 text-sm leading-snug">
              Premium autonomiczne rozwiązania kawowe dla nowoczesnych biznesów.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2 text-sm">Produkt</h4>
            <ul className="space-y-1 text-white/60 text-sm">
              <li>
                <a
                  href={`/#${SECTION_IDS.benefits}`}
                  className="hover:text-[#C0C0C0] transition-colors"
                  onClick={(e) => handleAnchorClick(e, SECTION_IDS.benefits)}
                >
                  Zalety
                </a>
              </li>
              <li>
                <a
                  href={`/#${SECTION_IDS.pricing}`}
                  className="hover:text-[#C0C0C0] transition-colors"
                  onClick={(e) => handleAnchorClick(e, SECTION_IDS.pricing)}
                >
                  Cennik
                </a>
              </li>
              <li>
                <a
                  href={`/#${SECTION_IDS.economics}`}
                  className="hover:text-[#C0C0C0] transition-colors"
                  onClick={(e) => handleAnchorClick(e, SECTION_IDS.economics)}
                >
                  Ekonomia
                </a>
              </li>
              <li>
                <Link to="/pakiet-standard" className="hover:text-[#C0C0C0] transition-colors">
                  Pakiet Standard
                </Link>
              </li>
              <li>
                <Link to="/pakiet-premium" className="hover:text-[#C0C0C0] transition-colors">
                  Pakiet Premium
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2 text-sm">Firma</h4>
            <ul className="space-y-1 text-white/60 text-sm">
              <li>
                <a
                  href={`/#${SECTION_IDS.about}`}
                  className="hover:text-[#C0C0C0] transition-colors"
                  onClick={(e) => handleAnchorClick(e, SECTION_IDS.about)}
                >
                  O nas
                </a>
              </li>
              <li>
                <a
                  href={`/#${SECTION_IDS.contact}`}
                  className="hover:text-[#C0C0C0] transition-colors"
                  onClick={(e) => handleAnchorClick(e, SECTION_IDS.contact)}
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2 text-sm">Prawne</h4>
            <ul className="space-y-1 text-white/60 text-sm">
              <li className="hover:text-[#C0C0C0] transition-colors cursor-pointer">
                Polityka Prywatności
              </li>
              <li className="hover:text-[#C0C0C0] transition-colors cursor-pointer">Regulamin</li>
              <li className="hover:text-[#C0C0C0] transition-colors cursor-pointer">
                Polityka Cookies
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-[#C0C0C0]/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/40 text-xs">© 2026 Na Kawkę. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-4">
            <a href="#" className="text-white/60 hover:text-[#C0C0C0] transition-colors text-sm">
              Instagram
            </a>
            <a href="#" className="text-white/60 hover:text-[#C0C0C0] transition-colors text-sm">
              Telegram
            </a>
            <a href="#" className="text-white/60 hover:text-[#C0C0C0] transition-colors text-sm">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
