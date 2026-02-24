import React from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Check } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { MetallicButton } from '../components/MetallicButton';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export const PackageStandard: React.FC = () => {
  const detailedSpecs = [
    {
      title: 'Liczba napojów',
      description: '12 różnych napojów',
      icon: '☕'
    },
    {
      title: 'Serwisowanie',
      description: 'Proste serwisowanie techniczne',
      icon: '🔧'
    },
    {
      title: 'Pojemnik na kawę',
      description: 'Jeden pojemnik na ziarnistą kawę — 1,5 kg',
      icon: '📦'
    },
    {
      title: 'Dodatkowe pojemniki',
      description: 'Trzy pojemniki po 2,4 l każdy (na mleko, czekoladę, karmel)',
      icon: '🥛'
    },
    {
      title: 'Interface',
      description: 'Dotykowy wybór napojów',
      icon: '📱'
    },
    {
      title: 'Łączność',
      description: 'Połączenie Wi-Fi',
      icon: '📡'
    },
    {
      title: 'Monitoring',
      description: 'Telemetria - pełna kontrola zdalnie',
      icon: '📊'
    },
    {
      title: 'Wsparcie',
      description: 'Gwarancja na sprzęt',
      icon: '✅'
    }
  ];

  const benefits = [
    'Kompaktowy rozmiar idealny na mniejsze lokalizacje',
    'Najniższy koszt wejścia - tylko €4,500',
    'Najszybszy zwrot z inwestycji - średnio 4 miesiące',
    'Niskie koszty operacyjne',
    'Łatwe w obsłudze i serwisowaniu',
    'Autonomiczna praca 24/7 bez personelu'
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      <Navigation />
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* Back button */}
          <Link 
            to="/#cennik"
            className="inline-flex items-center gap-2 text-[#C0C0C0] hover:text-white transition-colors mb-12"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Powrót do cennika</span>
          </Link>

          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-[#a8a8a8] via-[#C0C0C0] to-[#a8a8a8] text-black px-6 py-2 rounded-full text-sm font-bold mb-6">
              POLECANE
            </div>
            <h1 className="text-6xl font-bold text-white mb-6">
              Pakiet <span className="text-[#C0C0C0]">Standard</span>
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Jetinno JL22 - Idealne rozwiązanie dla rozpoczynających biznes kawowy
            </p>
            <div className="flex items-baseline justify-center gap-3">
              <span className="text-7xl font-bold bg-gradient-to-r from-[#C0C0C0] to-white bg-clip-text text-transparent">
                €4,500
              </span>
              <span className="text-2xl text-white/60">netto</span>
            </div>
          </div>

          {/* Image */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative backdrop-blur-md bg-gradient-to-br from-[#C0C0C0]/10 via-[#a8a8a8]/5 to-[#C0C0C0]/10 border border-[#C0C0C0]/40 rounded-2xl overflow-hidden p-12">
              <ImageWithFallback
                src="figma:asset/bbb8d2f9fee95665d7f98a00dee77fd153deb685.png"
                alt="Pakiet Standard - Jetinno JL22"
                className="w-full h-auto max-h-96 object-contain mx-auto"
              />
            </div>
          </div>

          {/* Detailed Specs */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              Szczegółowe <span className="text-[#C0C0C0]">specyfikacje</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {detailedSpecs.map((spec, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md bg-white/5 border border-[#C0C0C0]/20 rounded-xl p-6 hover:border-[#C0C0C0]/40 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{spec.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{spec.title}</h3>
                      <p className="text-white/70">{spec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              Dlaczego <span className="text-[#C0C0C0]">Standard?</span>
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
          </div>

          {/* CTA */}
          <div className="max-w-3xl mx-auto text-center backdrop-blur-md bg-gradient-to-r from-[#C0C0C0]/10 via-transparent to-[#C0C0C0]/10 border border-[#C0C0C0]/20 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Gotowy na start?
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Zamów Pakiet Standard już dziś i zacznij zarabiać w ciągu kilku tygodni
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <MetallicButton>
                Zamówić moduł
              </MetallicButton>
              <MetallicButton>
                Otrzymać pełne wyliczenie zwrotu
              </MetallicButton>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
