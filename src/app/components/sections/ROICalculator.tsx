import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ProfitCalculator } from '@/app/components/features/ProfitCalculator';

const ECONOMICS_ROW_KEYS = [
  { metricKey: 'row1Metric', valueKey: 'row1Value', highlight: false },
  { metricKey: 'row2Metric', valueKey: 'row2Value', highlight: true },
  { metricKey: 'row3Metric', valueKey: 'row3Value', highlight: false },
  { metricKey: 'row4Metric', valueKey: 'row4Value', highlight: false },
  { metricKey: 'row5Metric', valueKey: 'row5Value', highlight: true },
] as const;

const NO_FRANCHISE_KEYS = [
  { benefit: 'noFranchise1Benefit', desc: 'noFranchise1Desc' },
  { benefit: 'noFranchise2Benefit', desc: 'noFranchise2Desc' },
  { benefit: 'noFranchise3Benefit', desc: 'noFranchise3Desc' },
  { benefit: 'noFranchise4Benefit', desc: 'noFranchise4Desc' },
  { benefit: 'noFranchise5Benefit', desc: 'noFranchise5Desc' },
  { benefit: 'noFranchise6Benefit', desc: 'noFranchise6Desc' },
] as const;

/** Economics section: metrics table, profit calculator, "Why no franchise" block. */
export const ROICalculator: React.FC = () => {
  const { t } = useTranslation();
  const economicsData = ECONOMICS_ROW_KEYS.map((row) => ({
    metric: t(`economics.${row.metricKey}`),
    value: t(`economics.${row.valueKey}`),
    highlight: row.highlight,
  }));
  const noFranchise = NO_FRANCHISE_KEYS.map((item) => ({
    benefit: t(`economics.${item.benefit}`),
    description: t(`economics.${item.desc}`),
  }));

  return (
    <section id="ekonomia" className="py-24 relative" aria-label={t('economics.ariaLabel')}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            {t('economics.title')} <span className="text-[#C0C0C0]">{t('economics.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {t('economics.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-24 max-w-4xl mx-auto"
        >
          <div className="backdrop-blur-md bg-white/5 border border-[#C0C0C0]/20 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {economicsData.map((row, index) => (
                    <tr
                      key={index}
                      className={`border-b border-[#C0C0C0]/10 hover:bg-white/5 transition-colors ${row.highlight ? 'bg-[#C0C0C0]/5' : ''}`}
                    >
                      <td className="px-8 py-5 text-white font-medium text-lg">{row.metric}</td>
                      <td
                        className={`px-8 py-5 text-right text-lg font-bold ${row.highlight ? 'text-[#C0C0C0]' : 'text-white/80'}`}
                      >
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              {t('economics.disclaimer')}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-24"
        >
          <h2 className="text-5xl font-bold text-white mb-6 text-center">
            {t('economics.calculatorTitle')} <span className="text-[#C0C0C0]">{t('economics.calculatorTitleHighlight')}</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto text-center mb-12">
            {t('economics.calculatorSubtitle')}
          </p>

          <div className="max-w-6xl mx-auto backdrop-blur-md bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-[#C0C0C0]/20 rounded-2xl p-8 lg:p-12">
            <ProfitCalculator />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-5xl font-bold text-white mb-6 text-center">
            {t('economics.noFranchiseTitle')} <span className="text-[#C0C0C0]">{t('economics.noFranchiseTitleHighlight')}</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto text-center mb-12">
            {t('economics.noFranchiseSubtitle')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {noFranchise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="backdrop-blur-md bg-white/5 border border-[#C0C0C0]/20 rounded-xl p-6 hover:border-[#C0C0C0]/40 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-[#C0C0C0] mb-3">{item.benefit}</h3>
                <p className="text-white/70 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
