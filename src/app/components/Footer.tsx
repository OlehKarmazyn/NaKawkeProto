import React from 'react';
import { Coffee } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="kontakt" className="relative py-16 border-t border-[#C0C0C0]/20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#C0C0C0] to-[#a8a8a8] rounded-lg flex items-center justify-center">
                <Coffee className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-bold text-white">Na Kawkę</span>
            </div>
            <p className="text-white/60 text-sm">
              Premium autonomiczne rozwiązania kawowe dla nowoczesnych biznesów.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Produkt</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="hover:text-[#C0C0C0] transition-colors cursor-pointer">Funkcje</li>
              <li className="hover:text-[#C0C0C0] transition-colors cursor-pointer">Cennik</li>
              <li className="hover:text-[#C0C0C0] transition-colors cursor-pointer">Kalkulator ROI</li>
              <li className="hover:text-[#C0C0C0] transition-colors cursor-pointer">Case Studies</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Firma</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="hover:text-[#C0C0C0] transition-colors cursor-pointer">O nas</li>
              <li className="hover:text-[#C0C0C0] transition-colors cursor-pointer">Kariera</li>
              <li className="hover:text-[#C0C0C0] transition-colors cursor-pointer">Partnerzy</li>
              <li className="hover:text-[#C0C0C0] transition-colors cursor-pointer">Kontakt</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Prawne</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="hover:text-[#C0C0C0] transition-colors cursor-pointer">Polityka Prywatności</li>
              <li className="hover:text-[#C0C0C0] transition-colors cursor-pointer">Regulamin</li>
              <li className="hover:text-[#C0C0C0] transition-colors cursor-pointer">Polityka Cookies</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[#C0C0C0]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2026 Na Kawkę. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/60 hover:text-[#C0C0C0] transition-colors text-sm">
              LinkedIn
            </a>
            <a href="#" className="text-white/60 hover:text-[#C0C0C0] transition-colors text-sm">
              Twitter
            </a>
            <a href="#" className="text-white/60 hover:text-[#C0C0C0] transition-colors text-sm">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};