import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '@/app/components/ui/GlassCard';
import { UserX, TrendingUp, Copy } from 'lucide-react';

const benefits = [
  {
    icon: UserX,
    title: 'Bez personelu',
    description: 'Brak pensji, brak grafików, brak problemów kadrowych.',
    highlight: 'Zero kosztów osobowych',
  },
  {
    icon: TrendingUp,
    title: 'Prosta ekonomia',
    description: 'Koszt kubka kawy to ok. 2 zł. Sprzedaż za ok. 8,5 zł.',
    highlight: 'Marża powyżej 60%',
  },
  {
    icon: Copy,
    title: 'Skalowalność',
    description: 'Jeden punkt = 3000 zł zysku. Trzy punkty = 9000 zł zysku.',
    highlight: 'Łatwo powielisz ten model',
  },
];

/** Секция «Автономия и модель бизнеса»: 3 преимущества без франшизы. */
export const Autonomy: React.FC = () => {
  return (
    <section id="zalety" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Autonomia i <span className="text-[#C0C0C0]">Model Biznesowy</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Biznes, który pracuje na Ciebie, nie odwrotnie
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <GlassCard className="h-full">
                  <div className="mb-6 w-16 h-16 rounded-xl bg-gradient-to-br from-[#C0C0C0]/30 to-[#C0C0C0]/10 flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 text-[#C0C0C0]" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 text-center">{benefit.title}</h3>
                  <p className="text-white/70 mb-6 text-center leading-relaxed">
                    {benefit.description}
                  </p>

                  <div className="pt-4 border-t border-[#C0C0C0]/20 text-center">
                    <span className="text-[#C0C0C0] font-bold">{benefit.highlight}</span>
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
