import React from 'react';
import { motion } from 'motion/react';
import { ProfitCalculator } from './ProfitCalculator';

export const ROICalculator: React.FC = () => {
  const economicsData = [
    { metric: 'Koszt produkcji (1 kawa)', value: '~2 zł', highlight: false },
    { metric: 'Cena sprzedaży', value: '~8,5 zł', highlight: true },
    { metric: 'Sprzedaż dzienna', value: '25 filiżanek', highlight: false },
    { metric: 'Czynsz lokalizacji', value: '~1000 zł/mies.', highlight: false },
    { metric: 'Twój czysty zysk', value: 'ok. 3000 zł/mies.', highlight: true },
  ];
  
  const noFranchise = [
    { benefit: '0 zł opłaty wstępnej', description: 'Brak kosztów wejścia do franczyzy' },
    { benefit: '0 zł miesięcznych opłat', description: 'No Royalty – 100% zysków dla Ciebie' },
    { benefit: 'Brak narzuconych dostawców', description: 'Kupujesz składniki tam, gdzie chcesz' },
    { benefit: 'Brak opłat marketingowych', description: 'Twój marketing, Twoja strategia' },
    { benefit: 'Cały zysk w Twojej kieszeni', description: 'Wypracowany kapitał zostaje u Ciebie' },
  ];
  
  return (
    <section id="ekonomia" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Economics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">Ekonomia <span className="text-[#C0C0C0]">jednego punktu</span></h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Przejrzyste liczby, które mówią same za siebie
          </p>
        </motion.div>
        
        {/* Economics Table */}
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
                      <td className={`px-8 py-5 text-right text-lg font-bold ${row.highlight ? 'text-[#C0C0C0]' : 'text-white/80'}`}>
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
              *Wyliczenia oparte na rzeczywistych danych z działających punktów
            </p>
          </div>
        </motion.div>
        
        {/* Interactive Profit Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-24"
        >
          <h2 className="text-5xl font-bold text-white mb-6 text-center">
            Kalkulator <span className="text-[#C0C0C0]">zysku</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto text-center mb-12">
            Dostosuj parametry i zobacz swój potencjalny zysk
          </p>
          
          <div className="max-w-6xl mx-auto backdrop-blur-md bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-[#C0C0C0]/20 rounded-2xl p-8 lg:p-12">
            <ProfitCalculator />
          </div>
        </motion.div>
        
        {/* Why No Franchise Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6 text-center">
            Dlaczego <span className="text-[#C0C0C0]">bez franczyzy?</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto text-center mb-12">
            Zatrzymaj 100% wypracowanego zysku
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