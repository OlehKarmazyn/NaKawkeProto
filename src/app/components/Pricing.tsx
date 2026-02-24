import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PricingCard } from './PricingCard';
import { MetallicButton } from './MetallicButton';
import standardImage from '@/assets/simple.png';
import premiumImage from '@/assets/premium.png';

export const Pricing: React.FC = () => {
  const standardFeatures = [
    'Gorące napoje espresso',
    'Autonomiczna praca 24/7',
    'Najlepsza opłacalność'
  ];
  
  const premiumFeatures = [
    'Gorące i zimne napoje',
    'Autonomiczna praca 24/7',
    'Rozszerzona funkcjonalność'
  ];

  const detailedSpecsStandard = [
    'Liczba napojów: 12 różnych napojów',
    'Proste serwisowanie techniczne',
    'Zwiększona pojemność pojemników',
    'Jeden pojemnik na ziarnistą kawę — 1,5 kg',
    'Trzy dodatkowe pojemniki po 2,4 l każdy (na mleko, czekoladę, karmel)',
    'Dotykowy wybór napojów',
    'Połączenie Wi-Fi',
    'Telemetria',
    'Gwarancja na sprzęt'
  ];

  const detailedSpecsPremium = [
    'Liczba napojów: do 24 różnych napojów',
    'Jeden pojemnik na ziarnistą kawę — 3 kg',
    'Sześć dodatkowych pojemników po 4 l każdy (mleko, czekolada, karmel, herbata, milkshake)',
    'Ekran dotykowy: 21,5 cala',
    'Głośnik — dla wsparcia głosowego',
    'Lodówka: od +2°C do +8°C',
    'Stacja syropowa: 4 rodzaje',
    'Bloki zaparzające: osobno dla kawy (14 g) i herbaty liściastej',
    'Automatyczne wydawanie kubków: na 300–400 szt.',
    'Pojemnik na odpady: 20 l',
    'Połączenie: Wi-Fi, telemetria',
    'Gwarancja na sprzęt'
  ];

  const [ctaName, setCtaName] = useState('');
  const [ctaPhone, setCtaPhone] = useState('');
  const [ctaEmail, setCtaEmail] = useState('');

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send to backend or email service
  };

  return (
    <section id="cennik" className="py-24 relative">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C0C0C0]/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Koszt <span className="text-[#C0C0C0]">sprzętu</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            To nie jest wydatek. To inwestycja w fizyczny środek trwały, który zarabia od pierwszego dnia.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PricingCard
              title="Pakiet Standard"
              price="4,500"
              features={standardFeatures}
              isRecommended
              imageUrl={standardImage}
              detailedSpecs={detailedSpecsStandard}
              detailsLink="/pakiet-standard"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PricingCard
              title="Pakiet Premium"
              price="6,500"
              features={premiumFeatures}
              imageUrl={premiumImage}
              badge="+ ZIMNE NAPOJE"
              detailedSpecs={detailedSpecsPremium}
              detailsLink="/pakiet-premium"
            />
          </motion.div>
        </div>
        
        {/* CTA Section — form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="backdrop-blur-md bg-gradient-to-r from-[#C0C0C0]/10 via-transparent to-[#C0C0C0]/10 border border-[#C0C0C0]/20 rounded-2xl p-12 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Zacznij swój biznes kawowy już dziś
            </h3>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Skontaktuj się z nami, aby otrzymać pełny plan zwrotu z inwestycji i poznać terminy dostawy modułów.
            </p>
            <form onSubmit={handleCtaSubmit} className="space-y-4 text-left">
              <div>
                <label htmlFor="cta-name" className="block text-sm font-medium text-white/80 mb-2">
                  Imię
                </label>
                <input
                  id="cta-name"
                  type="text"
                  value={ctaName}
                  onChange={(e) => setCtaName(e.target.value)}
                  placeholder="Jan Kowalski"
                  className="w-full h-12 px-4 rounded-xl border border-[#C0C0C0]/30 bg-white/5 text-white placeholder:text-white/40 focus:border-[#C0C0C0]/60 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="cta-phone" className="block text-sm font-medium text-white/80 mb-2">
                  Numer telefonu
                </label>
                <input
                  id="cta-phone"
                  type="tel"
                  value={ctaPhone}
                  onChange={(e) => setCtaPhone(e.target.value)}
                  placeholder="+48 123 456 789"
                  className="w-full h-12 px-4 rounded-xl border border-[#C0C0C0]/30 bg-white/5 text-white placeholder:text-white/40 focus:border-[#C0C0C0]/60 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="cta-email" className="block text-sm font-medium text-white/80 mb-2">
                  E-mail
                </label>
                <input
                  id="cta-email"
                  type="email"
                  value={ctaEmail}
                  onChange={(e) => setCtaEmail(e.target.value)}
                  placeholder="jan@example.com"
                  className="w-full h-12 px-4 rounded-xl border border-[#C0C0C0]/30 bg-white/5 text-white placeholder:text-white/40 focus:border-[#C0C0C0]/60 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20 transition-colors"
                />
              </div>
              <div className="pt-2">
                <MetallicButton type="submit" className="w-full">
                  Otrzymać prezentację
                </MetallicButton>
              </div>
            </form>
          </div>
          
          <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-[#C0C0C0] mb-2">8–12 miesięcy</div>
              <div className="text-white/60">Średni czas zwrotu</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#C0C0C0] mb-2">1000 zł</div>
              <div className="text-white/60">Miesięczny koszt operacyjny</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#C0C0C0] mb-2">0%</div>
              <div className="text-white/60">Opłat franczyzowych</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};