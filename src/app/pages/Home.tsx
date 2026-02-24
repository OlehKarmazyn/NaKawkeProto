import React from 'react';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { WhatIsNaKawke } from '../components/WhatIsNaKawke';
import { BusinessPains } from '../components/BusinessPains';
import { Autonomy } from '../components/Autonomy';
import { ROICalculator } from '../components/ROICalculator';
import { Pricing } from '../components/Pricing';
import { Footer } from '../components/Footer';

export const Home: React.FC = () => {
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
