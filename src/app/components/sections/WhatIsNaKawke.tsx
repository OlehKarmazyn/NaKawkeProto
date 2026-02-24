import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '@/app/components/ui/GlassCard';
import { CheckCircle2 } from 'lucide-react';
import realAutomatImage from '@/assets/real-aoutomat.jpg';

const headlines = [
  'Gotowy biznes kawowy bez franczyzy',
  'Autonomiczna kawiarnia z zyskiem około 3000 zł miesięcznie',
  'Twój biznes. Twoje zasady. Twój dochód',
  'Samoobsługowa kawiarnia nowej generacji',
];

const keyPoints = ['Bez franczyzy', 'Bez ropalty', 'Bez miesięcznych zobowiązań'];

/** Секция «О нас»: что такое Na Kawkę, ключевые тезисы, изображение. */
export const WhatIsNaKawke: React.FC = () => {
  return (
    <section id="o-nas" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image Section */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="relative"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-[#C0C0C0]/30 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#C0C0C0]/20 to-transparent z-10 pointer-events-none" />
                    <img
                      src={realAutomatImage}
                      alt="Na Kawkę - Autonomiczny moduł kawowy"
                      className="w-full h-[500px] object-cover"
                    />
                  </div>

                  <div className="absolute -bottom-6 -right-6 rounded-2xl border border-[#C0C0C0]/20 border-gold-accent bg-[#0A0A0A]/95 backdrop-blur-md px-6 py-5 shadow-[0_0_30px_var(--gold-accent)]">
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#C0C0C0] via-gold to-[#C0C0C0] bg-clip-text text-transparent">
                        3000 zł
                      </div>
                      <div className="text-sm font-semibold text-white/80 mt-1">średni zysk/mies.</div>
                    </div>
                  </div>
                </motion.div>

                {/* Content Section */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <div className="space-y-4 mb-8">
                    {headlines.map((headline, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#C0C0C0] mt-2 flex-shrink-0" />
                        <h3 className="text-lg font-bold text-white leading-tight">{headline}</h3>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-[#C0C0C0]/20 pt-6 mb-6">
                    <p className="text-white/90 text-base leading-relaxed mb-3">
                      <span className="text-[#C0C0C0] font-bold">Na Kawkę</span> - to gotowy moduł
                      samoobsługowej kawiarni.
                    </p>
                    <p className="text-white/80 text-base leading-relaxed">
                      Kupujesz urządzenie, instalujesz w wybranej lokalizacji i zarabiasz na
                      sprzedaży kawy bezpośrednio klientom.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {keyPoints.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                        className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-lg border border-[#C0C0C0]/20"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#C0C0C0] flex-shrink-0" />
                        <span className="text-white font-semibold">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
