import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import {
  Check,
  X,
  Package,
  HeadphonesIcon,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { MetallicButton } from '@/app/components/ui/MetallicButton';
import { SECTION_IDS } from '@/app/shared/constants/navigation';

const COMPARISON_ROW_KEYS = [1, 2, 3, 4, 5, 6] as const;

const SERVICE_ICONS = [
  Package,
  HeadphonesIcon,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Users,
] as const;

function scrollToSection(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/** Comparison section: Na Kawkę vs traditional franchise + included support + CTA. */
export const FranchiseComparison: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="porownanie"
      className="py-24 relative"
      aria-label={t('franchiseComparison.ariaLabel')}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-[#C0C0C0]/20 to-[#C0C0C0]/10 border border-[#C0C0C0]/30 rounded-full px-6 py-2 mb-6">
            <span className="text-[#C0C0C0] font-bold">
              {t('franchiseComparison.badge')}
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t('franchiseComparison.title')}
            <span className="text-[#C0C0C0]">{t('franchiseComparison.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-white/70">
            {t('franchiseComparison.subtitle')}
          </p>
        </motion.div>

        {/* Comparison Table */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-white/5 via-white/[0.02] to-white/5 border border-[#C0C0C0]/20">
            <div className="grid grid-cols-3 gap-6 p-6 border-b border-[#C0C0C0]/20 bg-gradient-to-r from-[#C0C0C0]/10 to-transparent">
              <div className="font-bold text-white/60">{t('franchiseComparison.tableCriteria')}</div>
              <div className="font-bold text-[#C0C0C0] text-center">
                <span className="inline-flex items-center gap-2" aria-hidden="true">
                  <Sparkles className="w-5 h-5" />
                  <span>{t('franchiseComparison.tableNaKawke')}</span>
                </span>
              </div>
              <div className="font-bold text-white/60 text-center">
                {t('franchiseComparison.tableFranchise')}
              </div>
            </div>

            {COMPARISON_ROW_KEYS.map((rowNum, index) => (
              <motion.div
                key={rowNum}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="grid grid-cols-3 gap-6 p-6 border-b border-[#C0C0C0]/10 hover:bg-white/5 transition-colors duration-300 last:border-b-0"
              >
                <div className="text-white font-medium">
                  {t(`franchiseComparison.row${rowNum}Feature`)}
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 text-[#C0C0C0] font-bold">
                    <Check className="w-5 h-5 text-green-400 shrink-0" aria-hidden="true" />
                    <span>{t(`franchiseComparison.row${rowNum}NaKawke`)}</span>
                  </span>
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 text-white/60">
                    <X className="w-5 h-5 text-red-400 shrink-0" aria-hidden="true" />
                    <span>{t(`franchiseComparison.row${rowNum}Franchise`)}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What's Included */}
        <div className="max-w-6xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-4xl font-bold text-white mb-4">
              {t('franchiseComparison.supportTitle')}
              <span className="text-[#C0C0C0]">{t('franchiseComparison.supportTitleHighlight')}</span>
            </h3>
            <p className="text-xl text-white/70">
              {t('franchiseComparison.supportSubtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_ICONS.map((Icon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="backdrop-blur-md bg-white/5 border border-[#C0C0C0]/20 rounded-xl p-6 hover:border-[#C0C0C0]/40 hover:bg-white/10 transition-all duration-300 group"
              >
                <div
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C0C0C0]/20 to-[#C0C0C0]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                >
                  <Icon className="w-7 h-7 text-[#C0C0C0]" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">
                  {t(`franchiseComparison.service${index + 1}Title`)}
                </h4>
                <p className="text-white/70 leading-relaxed">
                  {t(`franchiseComparison.service${index + 1}Desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="backdrop-blur-md bg-gradient-to-r from-[#C0C0C0]/10 via-transparent to-[#C0C0C0]/10 border border-[#C0C0C0]/30 rounded-2xl p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('franchiseComparison.ctaTitle')}
              <span className="text-[#C0C0C0]">{t('franchiseComparison.ctaTitleHighlight')}</span>
            </h3>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              {t('franchiseComparison.ctaSubtitle')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <MetallicButton type="button" onClick={() => scrollToSection(SECTION_IDS.contact)}>
                {t('franchiseComparison.ctaStart')}
              </MetallicButton>
              <MetallicButton type="button" onClick={() => scrollToSection(SECTION_IDS.economics)}>
                {t('franchiseComparison.ctaCalculation')}
              </MetallicButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
