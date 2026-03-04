import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { GlassCard } from '@/app/components/ui/GlassCard';
import { CheckCircle2 } from 'lucide-react';
import mainMachineImage from '@/assets/simple-automat.webp';

const BULLET_LINE_HEIGHT = 20;

interface BulletPointProps {
  boldText: string;
  restText: string;
}

const BulletPoint: React.FC<BulletPointProps> = ({ boldText, restText }) => (
  <div className="flex items-start self-stretch gap-[7px] w-full max-md:max-w-full" style={{ lineHeight: `${BULLET_LINE_HEIGHT}px` }}>
    <div className="bg-white w-2 h-2 rounded-[26843500px] shrink-0 mt-[6px]" />
    <div
      className="flex-1 min-w-0 pr-8"
      style={{ lineHeight: `${BULLET_LINE_HEIGHT}px`, letterSpacing: 0 }}
    >
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: '18px',
          lineHeight: `${BULLET_LINE_HEIGHT}px`,
          letterSpacing: 0,
          color: '#ADD2C7',
        }}
      >
        {boldText}{' '}
      </span>
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: `${BULLET_LINE_HEIGHT}px`,
          letterSpacing: 0,
          color: '#ffffff',
        }}
      >
        {restText}
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
          <span
            className="font-bold"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '20px',
              color: 'var(--color-gold)',
            }}
          >
            {t('common.siteName')}
          </span>{' '}
          <span
            className="text-white/90"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
            }}
          >
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
      <div className="space-y-1.5">
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

const HEADLINE_KEYS = [1, 2, 3, 4] as const;

const BusinessFeatures: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-md:max-w-full flex flex-col gap-y-4">
      {HEADLINE_KEYS.map((n) => (
        <BulletPoint
          key={n}
          boldText={t(`about.headline${n}Bold`)}
          restText={t(`about.headline${n}Rest`)}
        />
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
