import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Navigation } from '@/app/components/layout/Navigation';
import { Footer } from '@/app/components/layout/Footer';
import { Hero } from '@/app/components/sections/Hero';
import { WhatIsNaKawke } from '@/app/components/sections/WhatIsNaKawke';
import { BusinessPains } from '@/app/components/sections/BusinessPains';
import { Autonomy } from '@/app/components/sections/Autonomy';
import { ROICalculator } from '@/app/components/sections/ROICalculator';
import { Pricing } from '@/app/components/sections/Pricing';

/** Главная страница: лендинг из секций (Hero → О нас → Боли → Автономия → Экономика/калькулятор → Цены → Контакт). */
export const Home: React.FC = () => {
  const location = useLocation();

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
      <Navigation />
      <Hero />
      <WhatIsNaKawke />
      <BusinessPains />
      <Autonomy />
      <ROICalculator />
      <Pricing />
      <Footer />
    </div>
  );
};
