import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo.png';
import { SECTION_IDS } from '@/app/shared/constants/navigation';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
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

  // Phone assembled in JS so it's not in static HTML; data-nosnippet keeps it out of search snippets
  const phone = '+48' + ' 518' + ' 128' + ' 149';

  return (
    <footer className="relative py-12 border-t border-[#C0C0C0]/20 border-t-gold-accent">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src={logo} alt={t('footer.logoAlt')} className="h-8 w-auto" />
              <span className="text-lg font-bold text-white">{t('common.siteName')}</span>
            </div>
            <p className="text-white/60 text-sm leading-snug mb-3">
              {t('footer.tagline')}
            </p>
            <p className="text-white/70 text-sm">
              {t('footer.companyName')} &nbsp;|&nbsp; {t('footer.nip')}
            </p>
            <p className="text-white/60 text-sm mt-1">
              {t('footer.address')}
            </p>
            <p className="text-white/60 text-sm mt-1">
              <a href={`mailto:${t('footer.email')}`} className="hover:text-[#C0C0C0] transition-colors">
                {t('footer.email')}
              </a>
              {' · '}
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-[#C0C0C0] transition-colors">
                <span data-nosnippet>{phone}</span>
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2 text-sm">{t('footer.product')}</h4>
            <ul className="space-y-1 text-white/60 text-sm">
              <li>
                <a
                  href={`/#${SECTION_IDS.benefits}`}
                  className="hover:text-[#C0C0C0] transition-colors"
                  onClick={(e) => handleAnchorClick(e, SECTION_IDS.benefits)}
                >
                  {t('footer.benefits')}
                </a>
              </li>
              <li>
                <a
                  href={`/#${SECTION_IDS.pricing}`}
                  className="hover:text-[#C0C0C0] transition-colors"
                  onClick={(e) => handleAnchorClick(e, SECTION_IDS.pricing)}
                >
                  {t('footer.pricing')}
                </a>
              </li>
              <li>
                <a
                  href={`/#${SECTION_IDS.economics}`}
                  className="hover:text-[#C0C0C0] transition-colors"
                  onClick={(e) => handleAnchorClick(e, SECTION_IDS.economics)}
                >
                  {t('footer.economics')}
                </a>
              </li>
              <li>
                <Link to="/pakiet-standard" className="hover:text-[#C0C0C0] transition-colors">
                  {t('footer.packageStandard')}
                </Link>
              </li>
              <li>
                <Link to="/pakiet-premium" className="hover:text-[#C0C0C0] transition-colors">
                  {t('footer.packagePremium')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2 text-sm">{t('footer.company')}</h4>
            <ul className="space-y-1 text-white/60 text-sm">
              <li>
                <a
                  href={`/#${SECTION_IDS.about}`}
                  className="hover:text-[#C0C0C0] transition-colors"
                  onClick={(e) => handleAnchorClick(e, SECTION_IDS.about)}
                >
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <a
                  href={`/#${SECTION_IDS.contact}`}
                  className="hover:text-[#C0C0C0] transition-colors"
                  onClick={(e) => handleAnchorClick(e, SECTION_IDS.contact)}
                >
                  {t('footer.contact')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2 text-sm">{t('footer.legal')}</h4>
            <ul className="space-y-1 text-white/60 text-sm">
              <li>
                <Link to="/polityka-prywatnosci" className="hover:text-[#C0C0C0] transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li className="hover:text-[#C0C0C0] transition-colors cursor-pointer">{t('footer.terms')}</li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-[#C0C0C0]/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/40 text-xs">
            <Link to="/polityka-prywatnosci" className="hover:text-[#C0C0C0] transition-colors">
              {t('footer.privacy')}
            </Link>
            {' · '}
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
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
