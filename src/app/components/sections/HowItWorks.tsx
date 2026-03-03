import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ShoppingCart, MapPin, Package, Cog, TrendingUp } from 'lucide-react';

const STEP_KEYS = [
  { number: 1, icon: ShoppingCart, titleKey: 'step1Title', descriptionKey: 'step1Description' },
  { number: 2, icon: MapPin, titleKey: 'step2Title', descriptionKey: 'step2Description' },
  { number: 3, icon: Package, titleKey: 'step3Title', descriptionKey: 'step3Description' },
  { number: 4, icon: Cog, titleKey: 'step4Title', descriptionKey: 'step4Description' },
  { number: 5, icon: TrendingUp, titleKey: 'step5Title', descriptionKey: 'step5Description' },
] as const;

export const HowItWorks: React.FC = () => {
  const { t } = useTranslation();
  const steps = STEP_KEYS.map((step) => ({
    number: step.number,
    icon: step.icon,
    title: t(`howItWorks.${step.titleKey}`),
    description: t(`howItWorks.${step.descriptionKey}`),
  }));

  return (
    <section id="jak-to-dziala" className="py-24 relative bg-transparent" aria-label={t('howItWorks.ariaLabel')}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            {t('howItWorks.title')}{' '}
            <span className="text-[#C0C0C0]">{t('howItWorks.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-4 mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-4 h-0.5 bg-gradient-to-r from-[#C0C0C0]/40 to-transparent z-0">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-[#C0C0C0]/40 rotate-45" />
                    </div>
                  )}

                  <div className="relative backdrop-blur-md bg-gradient-to-br from-[#C0C0C0]/5 to-transparent border border-[#C0C0C0]/20 rounded-2xl p-6 h-full transition-all duration-300 hover:border-[#C0C0C0]/60 hover:shadow-[0_0_40px_rgba(192,192,192,0.2)] hover:scale-105">
                    <div className="absolute top-4 right-4 text-8xl font-bold text-[#C0C0C0]/5 leading-none">
                      {step.number}
                    </div>

                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C0C0C0]/30 to-[#C0C0C0]/10 flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(192,192,192,0.3)] transition-all duration-300">
                        <Icon className="w-6 h-6 text-[#C0C0C0]" />
                      </div>

                      <div className="text-sm font-bold text-[#C0C0C0]/60 mb-2">
                        {t('howItWorks.stepLabel', { number: step.number })}
                      </div>

                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#C0C0C0] transition-colors duration-300">
                        {step.title}
                      </h3>

                      <p className="text-white/60 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="backdrop-blur-md bg-gradient-to-r from-[#C0C0C0]/10 via-transparent to-[#C0C0C0]/10 border border-[#C0C0C0]/20 rounded-2xl p-8 max-w-3xl mx-auto">
            <p className="text-white/80 text-lg">
              {t('howItWorks.cta')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

