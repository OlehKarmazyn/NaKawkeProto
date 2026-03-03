import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowLeft, Check } from 'lucide-react';
import { Navigation } from '@/app/components/layout/Navigation';
import { Footer } from '@/app/components/layout/Footer';
import { MetallicButton } from '@/app/components/ui/MetallicButton';
import { PageMeta } from '@/app/components/seo/PageMeta';
import { StructuredData } from '@/app/components/seo/StructuredData';
import { SITE_BASE_URL } from '@/app/shared/constants/seo';
import premiumImage from '@/assets/premium.png';

const SPEC_KEYS = [
  'spec1', 'spec2', 'spec3', 'spec4', 'spec5', 'spec6', 'spec7', 'spec8',
  'spec9', 'spec10', 'spec11', 'spec12',
] as const;
const BENEFIT_KEYS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export const PackagePremium: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const iconByKey: Record<string, string> = {
    spec1: '☕', spec2: '📦', spec3: '🥛', spec4: '📱', spec5: '🔊', spec6: '❄️',
    spec7: '🍯', spec8: '⚙️', spec9: '🥤', spec10: '🗑️', spec11: '📡', spec12: '✅',
  };
  const detailedSpecs = SPEC_KEYS.map((key) => ({
    title: t(`packagesPremium.${key}Title`),
    description: t(`packagesPremium.${key}Desc`),
    icon: iconByKey[key] ?? '✅',
  }));
  const benefits = BENEFIT_KEYS.map((i) => t(`packagesPremium.benefit${i}`));

  const PRODUCT_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Pakiet Premium — ${t('common.siteName')}`,
    description: t('packages.premiumSubtitle'),
    url: `${SITE_BASE_URL}/pakiet-premium`,
    offers: { '@type': 'Offer', price: '6500', priceCurrency: 'EUR' },
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      <PageMeta
        title={t('seo.premiumTitle')}
        description={t('seo.premiumDescription')}
        canonicalPath="/pakiet-premium"
      />
      <StructuredData schema={PRODUCT_SCHEMA} />
      <Navigation />

      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/#cennik"
              className="inline-flex items-center gap-2 text-[#C0C0C0] hover:text-white transition-colors mb-12"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t('packages.backToPricing')}</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <div className="inline-block bg-[#C0C0C0]/90 text-black px-6 py-2 rounded-full text-sm font-bold mb-6">
              {t('packages.premiumBadge')}
            </div>
            <h1 className="text-6xl font-bold text-white mb-6">
              Pakiet <span className="text-[#C0C0C0]">{t('packages.premium')}</span>
            </h1>
            <p className="text-xl text-white/70 mb-8">
              {t('packages.premiumSubtitle')}
            </p>
            <div className="flex items-baseline justify-center gap-3">
              <span className="text-7xl font-bold bg-gradient-to-r from-[#C0C0C0] to-white bg-clip-text text-transparent">
                €6,500
              </span>
              <span className="text-2xl text-white/60">{t('packages.netto')}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="relative backdrop-blur-md bg-gradient-to-br from-[#C0C0C0]/10 via-[#a8a8a8]/5 to-[#C0C0C0]/10 border border-[#C0C0C0]/40 rounded-2xl overflow-hidden p-12">
              <img
                src={premiumImage}
                alt={t('packages.premiumImageAlt')}
                className="w-full h-auto max-h-96 object-contain mx-auto"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              {t('packages.specsTitle')} <span className="text-[#C0C0C0]">{t('packages.specsTitleHighlight')}</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {detailedSpecs.map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="backdrop-blur-md bg-white/5 border border-[#C0C0C0]/20 rounded-xl p-6 hover:border-[#C0C0C0]/40 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{spec.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{spec.title}</h3>
                      <p className="text-white/70">{spec.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              {t('packages.whyPremium')} <span className="text-[#C0C0C0]">{t('packages.whyPremiumHighlight')}</span>
            </h2>

            <div className="backdrop-blur-md bg-gradient-to-r from-[#C0C0C0]/10 via-transparent to-[#C0C0C0]/10 border border-[#C0C0C0]/20 rounded-2xl p-8">
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-[#C0C0C0] mt-0.5 flex-shrink-0" />
                    <span className="text-white/90 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center backdrop-blur-md bg-gradient-to-r from-[#C0C0C0]/10 via-transparent to-[#C0C0C0]/10 border border-[#C0C0C0]/20 rounded-2xl p-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              {t('packages.ctaPremiumTitle')}
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              {t('packages.ctaPremiumText')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <MetallicButton>{t('packages.orderModule')}</MetallicButton>
              <MetallicButton>{t('packages.fullCalculation')}</MetallicButton>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
