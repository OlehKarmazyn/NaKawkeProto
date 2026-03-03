import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MetallicButton } from '@/app/components/ui/MetallicButton';

/** Calculation constants (real data per location). */
const pricePerDrink = 8.5;
const costPerDrink = 2;
const rentPerMonth = 1000;

export const ProfitCalculator: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [modules, setModules] = useState(1);
  const [drinksPerDay, setDrinksPerDay] = useState(25);
  const [months, setMonths] = useState(1);

  const monthlyRevenue = drinksPerDay * pricePerDrink * 30 * modules;
  const monthlyCosts = drinksPerDay * costPerDrink * 30 * modules;
  const totalRent = rentPerMonth * modules;
  const monthlyProfit = monthlyRevenue - monthlyCosts - totalRent;
  const totalProfit = monthlyProfit * months;

  const locale = i18n.language?.startsWith('pl') ? 'pl-PL' : i18n.language?.startsWith('uk') ? 'uk-UA' : 'en-GB';
  const monthKey = months === 1 ? 'calculator.month_one' : months < 5 ? 'calculator.month_few' : 'calculator.month_many';
  const profitLabel = t('calculator.profitLabel', { count: months, months: t(monthKey) });

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-white mb-6">{t('calculator.title')}</h3>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-white/80 font-medium">{t('calculator.modulesLabel')}</label>
            <span className="text-2xl font-bold text-[#C0C0C0]">{modules}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={modules}
            onChange={(e) => setModules(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider-thumb"
            style={{
              background: `linear-gradient(to right, #C0C0C0 0%, #C0C0C0 ${((modules - 1) / 9) * 100}%, rgba(255,255,255,0.1) ${((modules - 1) / 9) * 100}%, rgba(255,255,255,0.1) 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-white/40 mt-1">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
            <span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-white/80 font-medium">{t('calculator.drinksLabel')}</label>
            <span className="text-2xl font-bold text-[#C0C0C0]">{drinksPerDay}</span>
          </div>
          <input
            type="range"
            min="10"
            max="210"
            step="1"
            value={drinksPerDay}
            onChange={(e) => setDrinksPerDay(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider-thumb"
            style={{
              background: `linear-gradient(to right, #C0C0C0 0%, #C0C0C0 ${((drinksPerDay - 10) / 200) * 100}%, rgba(255,255,255,0.1) ${((drinksPerDay - 10) / 200) * 100}%, rgba(255,255,255,0.1) 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-white/40 mt-1">
            <span>10</span><span>50</span><span>100</span><span>150</span><span>210</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-white/80 font-medium">{t('calculator.monthsLabel')}</label>
            <span className="text-2xl font-bold text-[#C0C0C0]">{months}</span>
          </div>
          <input
            type="range"
            min="1"
            max="12"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider-thumb"
            style={{
              background: `linear-gradient(to right, #C0C0C0 0%, #C0C0C0 ${((months - 1) / 11) * 100}%, rgba(255,255,255,0.1) ${((months - 1) / 11) * 100}%, rgba(255,255,255,0.1) 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-white/40 mt-1">
            <span>1</span><span>3</span><span>6</span><span>9</span><span>12</span>
          </div>
        </div>
      </div>

      <div className="backdrop-blur-md bg-white/5 border border-[#C0C0C0]/30 rounded-xl p-8 space-y-6">
        <div className="pb-6 border-b border-[#C0C0C0]/20">
          <div className="text-white/60 text-sm mb-2">{t('calculator.monthlyRevenue')}</div>
          <div className="text-3xl font-bold text-[#C0C0C0]">
            {monthlyRevenue.toLocaleString(locale)} zł
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white/70">{t('calculator.rent')}</span>
            <span className="text-lg font-semibold text-white/90">
              {totalRent.toLocaleString(locale)} zł
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/70">{t('calculator.products')}</span>
            <span className="text-lg font-semibold text-white/90">
              {monthlyCosts.toLocaleString(locale)} zł
            </span>
          </div>
        </div>

        <div className="pt-6 border-t border-[#C0C0C0]/20">
          <div className="text-white/60 text-sm mb-2">{profitLabel}</div>
          <div className="text-4xl font-bold text-[#C0C0C0] mb-6">
            {totalProfit.toLocaleString(locale)} zł
          </div>
          <MetallicButton>{t('calculator.cta')}</MetallicButton>
        </div>
      </div>
    </div>
  );
};
