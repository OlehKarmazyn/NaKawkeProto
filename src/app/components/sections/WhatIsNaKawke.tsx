import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { GlassCard } from '@/app/components/ui/GlassCard';
import { CheckCircle2 } from 'lucide-react';
import mainMachineImage from '@/assets/simple-automat.webp';

interface BulletPointProps {
  text: string;
}

const BulletPoint: React.FC<BulletPointProps> = ({ text }) => (
  <div className="flex items-center self-stretch mb-4 gap-[7px] w-full max-md:max-w-full">
    <div className="bg-white w-2 h-2 rounded-[26843500px]" />
    <div className="flex flex-1 flex-col pr-8">
      <span className="text-[#ADD2C7] text-base leading-relaxed">
        {text}
      </span>
    </div>
  </div>
);

interface BenefitItemProps {
  text: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ text }) => (
  <div className="flex flex-wrap gap-3 items-center w-full rounded-xl min-h-[50px] max-md:max-w-full">
    <CheckCircle2 className="w-5 h-5 text-[var(--color-gold)] flex-shrink-0" />
    <div className="flex flex-col justify-center items-start self-stretch py-px my-auto">
      <div className="z-10 max-md:max-w-full text-white font-semibold">
        {text}
      </div>
    </div>
  </div>
);

const BusinessDescription: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-6 mt-7 w-full leading-7 text-gray-200 border-t border-white/10 max-md:max-w-full">
      <div className="flex gap-2.5 justify-center items-center w-full max-md:max-w-full">
        <p className="flex-1 self-stretch my-auto basis-0 max-md:max-w-full text-base leading-relaxed">
          <span className="font-semibold" style={{ color: 'var(--color-gold)' }}>
            {t('common.siteName')}
          </span>{' '}
          <span className="font-normal text-white/90">
            {t('about.intro1')}{' '}
            {t('about.intro2')}
          </span>
        </p>
      </div>
    </section>
  );
};

const BenefitsList: React.FC = () => {
  const { t } = useTranslation();
  const benefits = [
    t('about.keyPoint1'),
    t('about.keyPoint2'),
    t('about.keyPoint3'),
  ];

  return (
    <section className="pt-3 mt-7 w-full font-semibold border-t border-white/10 min-h-[173px] max-md:max-w-full">
      <div className="space-y-3">
        {benefits.map((benefit) => (
          <BenefitItem key={benefit} text={benefit} />
        ))}
      </div>
    </section>
  );
};

const ProfitCard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="absolute bottom-4 right-4 z-10">
      <div className="min-w-[11rem] h-24 px-6 bg-gradient-to-b from-[#b0b0b0] via-white to-[#b0b0b0] rounded-2xl shadow-2xl inline-flex flex-col justify-center items-center text-black text-center">
        <div className="flex flex-col items-center">
          <div className="text-center justify-start text-black text-3xl font-bold leading-9 whitespace-nowrap">
            {t('economics.row5Value')}
          </div>
          <div className="opacity-80 mt-1">
            <div className="text-center justify-start text-black text-sm font-semibold leading-5">
              {t('about.statLabel')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BusinessFeatures: React.FC = () => {
  const { t } = useTranslation();
  const features = [
    t('about.headline1'),
    t('about.headline2'),
    t('about.headline3'),
    t('about.headline4'),
  ];

  return (
    <div className="w-full text-lg leading-none max-md:max-w-full">
      {features.map((feature) => (
        <BulletPoint key={feature} text={feature} />
      ))}
    </div>
  );
};

/** About section: what Na Kawkę is, key points, image. */
export const WhatIsNaKawke: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="o-nas" className="py-24 relative" aria-labelledby="o-nas-heading">
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
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="relative flex justify-center"
                >
                  <div className="relative inline-block">
                    <img
                      src={mainMachineImage}
                      alt={t('about.imageAlt')}
                      className="w-full max-w-sm h-auto rounded-2xl"
                    />
                    <ProfitCard />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-base font-bold text-white"
                >
                  <h2 id="o-nas-heading" className="sr-only">
                    {t('about.ariaLabel')}
                  </h2>

                  <BusinessFeatures />
                  <BusinessDescription />
                  <BenefitsList />
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
