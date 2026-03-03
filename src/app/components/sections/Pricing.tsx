import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { PricingCard } from '@/app/components/features/PricingCard';
import { MetallicButton } from '@/app/components/ui/MetallicButton';
import { useContactForm } from '@/hooks/useContactForm';
import standardImage from '@/assets/simple.png';
import premiumImage from '@/assets/main-machine.webp';

/** Pricing section: two plan cards (Standard / Premium) and contact form (CTA). */
export const Pricing: React.FC = () => {
  const { t } = useTranslation();
  const [ctaName, setCtaName] = useState('');
  const [ctaPhone, setCtaPhone] = useState('');
  const [ctaEmail, setCtaEmail] = useState('');
  const { status, errorMessage, submit } = useContactForm();
  const [submitDisabledUntil, setSubmitDisabledUntil] = useState(0);

  const standardFeatures = [
    t('pricing.standardFeature1'),
    t('pricing.standardFeature2'),
    t('pricing.standardFeature3'),
  ];
  const premiumFeatures = [
    t('pricing.premiumFeature1'),
    t('pricing.premiumFeature2'),
    t('pricing.premiumFeature3'),
  ];
  const detailedSpecsStandard = [
    `${t('packagesStandard.spec1Title')}: ${t('packagesStandard.spec1Desc')}`,
    `${t('packagesStandard.spec2Title')}: ${t('packagesStandard.spec2Desc')}`,
    `${t('packagesStandard.spec3Title')}: ${t('packagesStandard.spec3Desc')}`,
    `${t('packagesStandard.spec4Title')}: ${t('packagesStandard.spec4Desc')}`,
    `${t('packagesStandard.spec5Title')}: ${t('packagesStandard.spec5Desc')}`,
    `${t('packagesStandard.spec6Title')}: ${t('packagesStandard.spec6Desc')}`,
    `${t('packagesStandard.spec7Title')}: ${t('packagesStandard.spec7Desc')}`,
    `${t('packagesStandard.spec8Title')}: ${t('packagesStandard.spec8Desc')}`,
  ];
  const detailedSpecsPremium = [
    `${t('packagesPremium.spec1Title')}: ${t('packagesPremium.spec1Desc')}`,
    `${t('packagesPremium.spec2Title')}: ${t('packagesPremium.spec2Desc')}`,
    `${t('packagesPremium.spec3Title')}: ${t('packagesPremium.spec3Desc')}`,
    `${t('packagesPremium.spec4Title')}: ${t('packagesPremium.spec4Desc')}`,
    `${t('packagesPremium.spec5Title')}: ${t('packagesPremium.spec5Desc')}`,
    `${t('packagesPremium.spec6Title')}: ${t('packagesPremium.spec6Desc')}`,
    `${t('packagesPremium.spec7Title')}: ${t('packagesPremium.spec7Desc')}`,
    `${t('packagesPremium.spec8Title')}: ${t('packagesPremium.spec8Desc')}`,
    `${t('packagesPremium.spec9Title')}: ${t('packagesPremium.spec9Desc')}`,
    `${t('packagesPremium.spec10Title')}: ${t('packagesPremium.spec10Desc')}`,
    `${t('packagesPremium.spec11Title')}: ${t('packagesPremium.spec11Desc')}`,
    `${t('packagesPremium.spec12Title')}: ${t('packagesPremium.spec12Desc')}`,
  ];

  useEffect(() => {
    if (status === 'success') {
      setSubmitDisabledUntil(Date.now() + 30_000);
      setCtaName('');
      setCtaPhone('');
      setCtaEmail('');
    }
  }, [status]);

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit({
      name: ctaName,
      phone: ctaPhone,
      message: ctaEmail ? `Email: ${ctaEmail}` : undefined,
    });
  };

  const isSubmitDisabled = status === 'loading' || Date.now() < submitDisabledUntil;

  return (
    <section className="relative" aria-label={t('pricing.ariaLabel')}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C0C0C0]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div id="cennik">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-24"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              {t('pricing.title')} <span className="text-[#C0C0C0]">{t('pricing.titleHighlight')}</span>
            </h2>
            <p className="text-base sm:text-xl text-white/70 max-w-2xl mx-auto px-0">
              {t('pricing.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-16 sm:mb-24">
            <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="min-w-0"
          >
            <PricingCard
              title={t('pricing.standardTitle')}
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
            className="min-w-0"
          >
            <PricingCard
              title={t('pricing.premiumTitle')}
              price="6,500"
              features={premiumFeatures}
              imageUrl={premiumImage}
              badge={t('pricing.premiumBadge')}
              detailedSpecs={detailedSpecsPremium}
              detailsLink="/pakiet-premium"
            />
          </motion.div>
        </div>
        </div>

        <motion.div
          id="kontakt"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="backdrop-blur-md bg-gradient-to-r from-[#C0C0C0]/10 via-transparent to-[#C0C0C0]/10 border border-[#C0C0C0]/20 rounded-2xl p-6 sm:p-8 lg:p-12 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {t('pricing.ctaTitle')}
            </h3>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              {t('pricing.ctaSubtitle')}
            </p>
            {errorMessage && (
              <p className="mb-4 text-red-400 text-sm" role="alert" aria-live="polite">
                {errorMessage}
              </p>
            )}
            {status === 'success' && (
              <p className="mb-4 text-[#C0C0C0] font-medium" role="status" aria-live="polite">
                {t('form.success')}
              </p>
            )}
            <form onSubmit={handleCtaSubmit} className="space-y-4 text-left">
              <div>
                <label htmlFor="cta-name" className="block text-sm font-medium text-white/80 mb-2">
                  {t('form.nameLabel')}
                </label>
                <input
                  id="cta-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={ctaName}
                  onChange={(e) => setCtaName(e.target.value)}
                  placeholder={t('form.namePlaceholder')}
                  className="w-full h-12 px-4 rounded-xl border border-[#C0C0C0]/30 bg-white/5 text-white placeholder:text-white/40 focus:border-[#C0C0C0]/60 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="cta-phone" className="block text-sm font-medium text-white/80 mb-2">
                  {t('form.phoneLabel')}
                </label>
                <input
                  id="cta-phone"
                  type="tel"
                  name="tel"
                  autoComplete="tel"
                  value={ctaPhone}
                  onChange={(e) => setCtaPhone(e.target.value)}
                  placeholder={t('form.phonePlaceholder')}
                  className="w-full h-12 px-4 rounded-xl border border-[#C0C0C0]/30 bg-white/5 text-white placeholder:text-white/40 focus:border-[#C0C0C0]/60 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="cta-email" className="block text-sm font-medium text-white/80 mb-2">
                  {t('form.emailLabel')}
                </label>
                <input
                  id="cta-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={ctaEmail}
                  onChange={(e) => setCtaEmail(e.target.value)}
                  placeholder={t('form.emailPlaceholder')}
                  className="w-full h-12 px-4 rounded-xl border border-[#C0C0C0]/30 bg-white/5 text-white placeholder:text-white/40 focus:border-[#C0C0C0]/60 focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/20 transition-colors"
                />
              </div>
              <div className="pt-2">
                <MetallicButton type="submit" className="w-full" disabled={isSubmitDisabled}>
                  {status === 'loading' ? t('form.submitting') : t('form.submit')}
                </MetallicButton>
              </div>
            </form>
          </div>

          <div className="mt-12 sm:mt-16 mb-12 sm:mb-16 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 max-w-3xl mx-auto text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#87AEA6] to-[#D8D8D8] bg-clip-text text-transparent mb-2">
                {t('pricing.stat1Value')}
              </div>
              <div className="text-white/60 text-sm sm:text-base">{t('pricing.stat1Label')}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#87AEA6] to-[#D8D8D8] bg-clip-text text-transparent mb-2">
                {t('pricing.stat2Value')}
              </div>
              <div className="text-white/60 text-sm sm:text-base">{t('pricing.stat2Label')}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#87AEA6] to-[#D8D8D8] bg-clip-text text-transparent mb-2">
                {t('pricing.stat3Value')}
              </div>
              <div className="text-white/60 text-sm sm:text-base">{t('pricing.stat3Label')}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
