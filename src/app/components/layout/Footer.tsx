import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo.webp';
import { SECTION_IDS } from '@/app/shared/constants/navigation';
import { DEVELOPER_NAME } from '@/app/shared/constants/seo';
import { useLangPath, pathWithoutLang } from '@/hooks/useLangPath';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const path = useLangPath();
  const isHome = pathWithoutLang(pathname) === '/' || pathWithoutLang(pathname) === '';
  const instagramUrl = t('footer.instagramUrl');
  const facebookUrl = t('footer.facebookUrl');

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (isHome) {
      document.querySelector(`#${hash}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate(`${path('/')}#${hash}`, { state: { scrollTo: hash } });
    }
  };

  // Phone from i18n (PocketBase can override); assembled in JS so not in static HTML; data-nosnippet keeps it out of search snippets
  const phone = t('footer.phone');

  return (
    <footer className="relative pt-12 pb-6 border-t border-[#C0C0C0]/20">
      <div className="container mx-auto px-6">
        <div className="grid mb-6 gap-y-6 gap-x-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src={logo} alt={t('footer.logoAlt')} className="h-8 w-auto" />
              <span className="text-lg font-bold text-white">{t('common.siteName')}</span>
            </div>
            <p className="text-white/60 text-sm leading-snug mb-3">
              {t('footer.tagline')}
            </p>
            <p className="text-white font-semibold text-sm mb-0.5">
              {t('footer.contactName')}
            </p>
            <p className="text-white/70 text-sm mb-3">
              {t('footer.businessType')}
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

          <div className="md:mx-auto">
            <h4 className="text-white font-semibold mb-2 text-sm">{t('footer.product')}</h4>
            <ul className="space-y-1 text-white/60 text-sm">
              <li>
                <a
                  href={`${path('/')}#${SECTION_IDS.benefits}`}
                  className="hover:text-[#C0C0C0] transition-colors"
                  onClick={(e) => handleAnchorClick(e, SECTION_IDS.benefits)}
                >
                  {t('footer.benefits')}
                </a>
              </li>
              <li>
                <a
                  href={`${path('/')}#${SECTION_IDS.pricing}`}
                  className="hover:text-[#C0C0C0] transition-colors"
                  onClick={(e) => handleAnchorClick(e, SECTION_IDS.pricing)}
                >
                  {t('footer.pricing')}
                </a>
              </li>
              <li>
                <a
                  href={`${path('/')}#${SECTION_IDS.economics}`}
                  className="hover:text-[#C0C0C0] transition-colors"
                  onClick={(e) => handleAnchorClick(e, SECTION_IDS.economics)}
                >
                  {t('footer.economics')}
                </a>
              </li>
              <li>
                <Link to={path('/pakiet-standard')} className="hover:text-[#C0C0C0] transition-colors">
                  {t('footer.packageStandard')}
                </Link>
              </li>
              <li>
                <Link to={path('/pakiet-premium')} className="hover:text-[#C0C0C0] transition-colors">
                  {t('footer.packagePremium')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:mx-auto">
            <h4 className="text-white font-semibold mb-2 text-sm">{t('footer.company')}</h4>
            <ul className="space-y-1 text-white/60 text-sm">
              <li>
                <a
                  href={`${path('/')}#${SECTION_IDS.about}`}
                  className="hover:text-[#C0C0C0] transition-colors"
                  onClick={(e) => handleAnchorClick(e, SECTION_IDS.about)}
                >
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <a
                  href={`${path('/')}#${SECTION_IDS.contact}`}
                  className="hover:text-[#C0C0C0] transition-colors"
                  onClick={(e) => handleAnchorClick(e, SECTION_IDS.contact)}
                >
                  {t('footer.contact')}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:mx-auto">
            <h4 className="text-white font-semibold mb-2 text-sm">{t('footer.legal')}</h4>
            <ul className="space-y-1 text-white/60 text-sm">
              <li>
                <Link to={path('/polityka-prywatnosci')} className="hover:text-[#C0C0C0] transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-[#C0C0C0]/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-white/40 text-xs">
              <Link to={path('/polityka-prywatnosci')} className="hover:text-[#C0C0C0] transition-colors">
                {t('footer.privacy')}
              </Link>
              {' · '}
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
            <p className="text-white/40 text-xs">
              <a
                href="https://digital-office.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C0C0C0] transition-colors"
              >
                {t('footer.developedBy', { company: DEVELOPER_NAME })}
              </a>
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-[#C0C0C0] transition-colors text-sm"
            >
              Instagram
            </a>
            <a href="#" className="text-white/60 hover:text-[#C0C0C0] transition-colors text-sm">
              Telegram
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-[#C0C0C0] transition-colors text-sm"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
