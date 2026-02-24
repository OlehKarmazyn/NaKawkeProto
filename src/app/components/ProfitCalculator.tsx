import React, { useState } from 'react';
import { MetallicButton } from './MetallicButton';

export const ProfitCalculator: React.FC = () => {
  const [modules, setModules] = useState(1);
  const [drinksPerDay, setDrinksPerDay] = useState(25);
  const [months, setMonths] = useState(1);

  // Calculations based on real data
  const pricePerDrink = 8.5;
  const costPerDrink = 2;
  const rentPerMonth = 1000;

  const monthlyRevenue = drinksPerDay * pricePerDrink * 30 * modules;
  const monthlyCosts = drinksPerDay * costPerDrink * 30 * modules;
  const totalRent = rentPerMonth * modules;
  const monthlyProfit = monthlyRevenue - monthlyCosts - totalRent;
  const totalProfit = monthlyProfit * months;

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Left side - Sliders */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-white mb-6">Rozrachunok zysku</h3>
        
        {/* Modules Slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-white/80 font-medium">Liczba modułów</label>
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
              background: `linear-gradient(to right, #C0C0C0 0%, #C0C0C0 ${((modules - 1) / 9) * 100}%, rgba(255,255,255,0.1) ${((modules - 1) / 9) * 100}%, rgba(255,255,255,0.1) 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-white/40 mt-1">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
          </div>
        </div>

        {/* Drinks per Day Slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-white/80 font-medium">Liczba napojów dziennie</label>
            <span className="text-2xl font-bold text-[#C0C0C0]">{drinksPerDay}</span>
          </div>
          <input
            type="range"
            min="10"
            max="210"
            step="10"
            value={drinksPerDay}
            onChange={(e) => setDrinksPerDay(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider-thumb"
            style={{
              background: `linear-gradient(to right, #C0C0C0 0%, #C0C0C0 ${((drinksPerDay - 10) / 200) * 100}%, rgba(255,255,255,0.1) ${((drinksPerDay - 10) / 200) * 100}%, rgba(255,255,255,0.1) 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-white/40 mt-1">
            <span>10</span>
            <span>50</span>
            <span>100</span>
            <span>150</span>
            <span>210</span>
          </div>
        </div>

        {/* Months Slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-white/80 font-medium">Liczba miesięcy</label>
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
              background: `linear-gradient(to right, #C0C0C0 0%, #C0C0C0 ${((months - 1) / 11) * 100}%, rgba(255,255,255,0.1) ${((months - 1) / 11) * 100}%, rgba(255,255,255,0.1) 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-white/40 mt-1">
            <span>1</span>
            <span>3</span>
            <span>6</span>
            <span>9</span>
            <span>12</span>
          </div>
        </div>
      </div>

      {/* Right side - Results */}
      <div className="backdrop-blur-md bg-white/5 border border-[#C0C0C0]/30 rounded-xl p-8 space-y-6">
        <div className="pb-6 border-b border-[#C0C0C0]/20">
          <div className="text-white/60 text-sm mb-2">Obrót miesięczny</div>
          <div className="text-3xl font-bold text-[#C0C0C0]">
            {monthlyRevenue.toLocaleString('pl-PL')} zł
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white/70">Czynsz</span>
            <span className="text-lg font-semibold text-white/90">
              {totalRent.toLocaleString('pl-PL')} zł
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-white/70">Produkty</span>
            <span className="text-lg font-semibold text-white/90">
              {monthlyCosts.toLocaleString('pl-PL')} zł
            </span>
          </div>
        </div>

        <div className="pt-6 border-t border-[#C0C0C0]/20">
          <div className="text-white/60 text-sm mb-2">CZYSTY ZYSK ({months} {months === 1 ? 'miesiąc' : months < 5 ? 'miesiące' : 'miesięcy'})</div>
          <div className="text-4xl font-bold text-[#C0C0C0] mb-6">
            {totalProfit.toLocaleString('pl-PL')} zł
          </div>

          <MetallicButton>
            Otrzymać szczegółowy plan
          </MetallicButton>
        </div>
      </div>
    </div>
  );
};