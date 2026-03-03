import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { GlassCard } from '@/app/components/ui/GlassCard';
import { UserX, TrendingUp, Copy } from 'lucide-react';

const BENEFIT_KEYS = [
  { icon: UserX, key: 'benefit1' },
  { icon: TrendingUp, key: 'benefit2' },
  { icon: Copy, key: 'benefit3' },
] as const;

/** Autonomy and business model section: 3 benefits without franchise. */
export const Autonomy: React.FC = () => {
  const { t } = useTranslation();
  const benefits = BENEFIT_KEYS.map(({ icon, key }) => ({
    icon,
    title: t(`autonomy.${key}Title`),
    description: t(`autonomy.${key}Desc`),
    highlight: t(`autonomy.${key}Highlight`),
  }));

  return (
    <section id="zalety" className="py-24 relative" aria-labelledby="zalety-heading">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 id="zalety-heading" className="text-5xl font-bold text-white mb-6">
            {t('autonomy.title')} <span className="text-[#C0C0C0]">{t('autonomy.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {t('autonomy.subtitle')}
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
                <GlassCard className="h-full bg-gradient-to-br from-[#181818] via-[#9C9C9C] to-[#181818] border-none hover:border-none hover:shadow-none">
                  <div className="mb-6 w-16 h-16 rounded-xl bg-gradient-to-br from-[#D4D4D4] to-[#111111] flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 text-center">{benefit.title}</h3>
                  <p className="text-white/70 mb-6 text-center leading-relaxed">
                    {benefit.description}
                  </p>

                  <div className="pt-4 border-t border-[#C0C0C0]/20 text-center">
                    <span className="text-white font-bold">{benefit.highlight}</span>
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
