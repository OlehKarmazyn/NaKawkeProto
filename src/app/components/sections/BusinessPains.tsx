import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { GlassCard } from '@/app/components/ui/GlassCard';
import { Clock, DollarSign, Users, TrendingDown } from 'lucide-react';

const PAIN_KEYS = [
  { icon: Clock, key: 'pain1' },
  { icon: DollarSign, key: 'pain2' },
  { icon: Users, key: 'pain3' },
  { icon: TrendingDown, key: 'pain4' },
] as const;

/** Business pains section: why traditional business is hard (4 cards). */
export const BusinessPains: React.FC = () => {
  const { t } = useTranslation();
  const pains = PAIN_KEYS.map(({ icon, key }) => ({
    icon,
    title: t(`pains.${key}Title`),
    description: t(`pains.${key}Desc`),
    impact: t(`pains.${key}Impact`),
  }));

  return (
    <section className="py-24 relative overflow-hidden" aria-label={t('pains.ariaLabel')}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            {t('pains.title')} <span className="text-[#C0C0C0]">{t('pains.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {t('pains.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
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
                <GlassCard className="h-full flex flex-col">
                  <div className="mb-4 w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#C0C0C0]/[0.52] to-[#C0C0C0]/[0.05] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#C0C0C0]" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{pain.title}</h3>
                  <p className="text-white/60 mb-4 text-sm leading-relaxed">{pain.description}</p>

                  <div className="mt-auto pt-4 border-t border-[#C0C0C0]/10">
                    {(() => {
                      const trimmed = pain.impact.trim();
                      if (!trimmed) {
                        return null;
                      }

                      const [firstWord, ...restWords] = trimmed.split(' ');
                      const restText = restWords.join(' ');

                      return (
                        <span className="text-sm text-white break-words">
                          <span className="text-[#87AEA6] font-semibold">{firstWord}</span>
                          {restText ? ` ${restText}` : null}
                        </span>
                      );
                    })()}
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
