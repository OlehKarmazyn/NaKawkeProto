import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/app/components/layout/Navigation';
import { Footer } from '@/app/components/layout/Footer';
import { Hero } from '@/app/components/sections/Hero';
import { WhatIsNaKawke } from '@/app/components/sections/WhatIsNaKawke';
import { BusinessPains } from '@/app/components/sections/BusinessPains';
import { Autonomy } from '@/app/components/sections/Autonomy';
import { HowItWorks } from '@/app/components/sections/HowItWorks';
import { ROICalculator } from '@/app/components/sections/ROICalculator';
import { Pricing } from '@/app/components/sections/Pricing';
import { PageMeta } from '@/app/components/seo/PageMeta';
import { StructuredData } from '@/app/components/seo/StructuredData';
import { SITE_BASE_URL } from '@/app/shared/constants/seo';

/** Home page: landing composed of sections (Hero → About → Pains → Autonomy → Economics/calculator → Pricing → Contact). */
export const Home: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const LOCAL_BUSINESS_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: t('common.siteName'),
    description: t('seo.homeDescription'),
    url: SITE_BASE_URL,
  };

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (scrollTo) {
      const el = document.getElementById(scrollTo);
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      <PageMeta
        title={t('seo.homeTitle')}
        description={t('seo.homeDescription')}
        canonicalPath="/"
      />
      <StructuredData schema={LOCAL_BUSINESS_SCHEMA} />
      <Navigation />
      <Hero />
      <WhatIsNaKawke />
      <BusinessPains />
      <Autonomy />
      <HowItWorks />
      <ROICalculator />
      <Pricing />
      <Footer />
    </div>
  );
};
