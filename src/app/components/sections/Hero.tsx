import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { MetallicButton } from '@/app/components/ui/MetallicButton';
import { ChevronDown } from 'lucide-react';
import heroMainContainer from '@/assets/main-Container.webp';

/** Hero section of the main page: headline, offer, CTA, vending machines image. */
export const Hero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section
      className="relative flex items-center overflow-hidden pt-24 sm:pt-28 pb-24 sm:pb-28"
      aria-label={t('hero.ariaLabel')}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#C0C0C0]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-[#C0C0C0]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">{t('hero.titleLine1')}</span>
              <br />
              <span className="bg-gradient-to-r from-[#C0C0C0] via-white to-[#C0C0C0] bg-clip-text text-transparent">
                {t('hero.titleLine2')}
              </span>
            </h1>

            <p className="text-xl text-white/70 mb-8 max-w-lg">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-4">
              <MetallicButton>{t('hero.cta')}</MetallicButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#87AEA6] to-[#D8D8D8] bg-clip-text text-transparent mb-1">
                  3000 zł
                </div>
                <div className="text-sm text-white/60">{t('hero.statProfit')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#87AEA6] to-[#D8D8D8] bg-clip-text text-transparent mb-1">
                  24/7
                </div>
                <div className="text-sm text-white/60">{t('hero.stat24_7')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#87AEA6] to-[#D8D8D8] bg-clip-text text-transparent mb-1">
                  0 zł
                </div>
                <div className="text-sm text-white/60">{t('hero.statRoyalty')}</div>
              </div>
            </div>
          </motion.div>

          {/* Right content - Coffee Machine */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#C0C0C0]/20 to-transparent rounded-3xl blur-3xl" />
              <div className="relative rounded-3xl overflow-hidden border border-[#C0C0C0]/20">
                <img
                  src={heroMainContainer}
                  alt={t('hero.imageAlt')}
                  width={800}
                  height={533}
                  className="w-full h-auto"
                  loading="eager"
                  decoding="async"
                  {...({
                    fetchpriority: 'high',
                  } as React.ImgHTMLAttributes<HTMLImageElement>)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-[#C0C0C0]/50" />
      </motion.div>
    </section>
  );
};
