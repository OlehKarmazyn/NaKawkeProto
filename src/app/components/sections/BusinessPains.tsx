import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '@/app/components/ui/GlassCard';
import { Clock, DollarSign, Users, TrendingDown } from 'lucide-react';

const pains = [
  {
    icon: Clock,
    title: 'Wysokie opłaty wstępne i ropalty',
    description:
      'Masz dość wysokich opłat wstępnych i miesięcznych ropalty? Twoje pieniądze pracują na franczyzę zamiast na Ciebie.',
    impact: 'Tysięce miesięcznie',
  },
  {
    icon: DollarSign,
    title: 'Duże koszty stałe',
    description:
      'Boisz się dużych kosztów stałych na start? Tradycyjne kawiarnie wymagają ogromnych nakładów początkowych.',
    impact: 'Ryzyko kapitałowe',
  },
  {
    icon: Users,
    title: 'Problemy kadrowe',
    description:
      'Nie chcesz być zależny od humorów i zwolnień lekarskich pracowników? Pensje, grafiki, ZUS to ciągły ból głowy.',
    impact: 'Brak kontroli',
  },
  {
    icon: TrendingDown,
    title: 'Nieprzejrzysta ekonomia',
    description:
      'Szukasz modelu biznesowego z przejrzystą ekonomią? Ukryte koszty i narzuceni dostawcy niszczą marże.',
    impact: 'Niska rentowność',
  },
];

/** Секция «Боли бизнеса»: почему традиционный бизнес сложен (4 карточки). */
export const BusinessPains: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Dlaczego tradycyjny biznes <span className="text-[#C0C0C0]">jest trudny?</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Na Kawkę – przejmij kontrolę nad swoim kapitałem
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pains.map((pain, index) => {
            const Icon = pain.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard>
                  <div className="mb-4 w-12 h-12 rounded-lg bg-gradient-to-br from-[#C0C0C0]/20 to-[#C0C0C0]/5 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#C0C0C0]" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{pain.title}</h3>
                  <p className="text-white/60 mb-4 text-sm leading-relaxed">{pain.description}</p>

                  <div className="pt-4 border-t border-[#C0C0C0]/10">
                    <span className="text-red-400 font-semibold text-sm">{pain.impact}</span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
