import React, { useState } from 'react';
import { Check, ChevronRight, RotateCcw } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MetallicButton } from './MetallicButton';
import { Link } from 'react-router';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isRecommended?: boolean;
  imageUrl: string;
  badge?: string;
  detailedSpecs: string[];
  detailsLink: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({ 
  title, 
  price, 
  features, 
  isRecommended = false,
  imageUrl,
  badge,
  detailedSpecs,
  detailsLink
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative perspective-1000">
      <div 
        className={`
          relative w-full transition-transform duration-700 transform-style-3d
          ${isFlipped ? 'rotate-y-180' : ''}
        `}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* FRONT SIDE — relative so card height is driven by content */}
        <div 
          className={`
            relative w-full flex flex-col backdrop-blur-md rounded-2xl overflow-hidden
            border transition-all duration-300 backface-hidden
            ${isRecommended 
              ? 'bg-gradient-to-br from-[#C0C0C0]/10 via-[#a8a8a8]/5 to-[#C0C0C0]/10 border-[#C0C0C0]/40 border-gold-accent shadow-[0_0_40px_rgba(192,192,192,0.2)]' 
              : 'bg-white/5 border-[#C0C0C0]/20'
            }
            hover:border-[#C0C0C0]/60 hover:border-gold-accent hover:shadow-[0_0_30px_rgba(192,192,192,0.15)]
          `}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Image — larger area for automats */}
          <div className="relative flex-shrink-0 h-72 pt-4 flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent">
            {isRecommended && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-[#a8a8a8] via-[#C0C0C0] to-[#a8a8a8] text-black px-3 py-1 rounded-lg text-xs font-bold z-10">
                POLECANE
              </div>
            )}
            <ImageWithFallback 
              src={imageUrl}
              alt={title}
              className="w-full h-full max-h-72 object-contain object-top"
            />
            {badge && (
              <div className="absolute top-4 right-4 bg-[#C0C0C0]/90 text-black px-3 py-1 rounded-lg text-xs font-bold">
                {badge}
              </div>
            )}
          </div>

          {/* Content — no flex-1, natural height */}
          <div className="p-6 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            
            <div className="mb-4">
              <div className="text-sm text-white/60 mb-1">Koszt sprzętu</div>
              <span className="text-4xl font-bold bg-gradient-to-r from-[#C0C0C0] to-white bg-clip-text text-transparent">
                €{price}
              </span>
              <span className="text-white/60 ml-2 text-sm">netto</span>
            </div>
            
            <ul className="space-y-2 mb-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#C0C0C0] mt-0.5 flex-shrink-0" />
                  <span className="text-white/80 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="space-y-2">
              <MetallicButton className="w-full">
                Zamówić moduł
              </MetallicButton>
              <div className="flex gap-3 items-center justify-between">
                <button
                  onClick={() => setIsFlipped(true)}
                  className="flex-1 min-w-0 px-4 py-2.5 rounded-xl border border-[#C0C0C0]/30 text-white/90 hover:bg-[#C0C0C0]/10 hover:border-[#C0C0C0]/50 transition-all duration-300 flex items-center justify-center gap-2 group text-sm"
                >
                  <span className="truncate">Zobacz specyfikacje</span>
                  <RotateCcw className="w-4 h-4 flex-shrink-0 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <Link
                  to={detailsLink}
                  className="flex-1 min-w-0 px-4 py-2.5 rounded-xl border border-[#C0C0C0]/30 text-white/90 hover:bg-[#C0C0C0]/10 hover:border-[#C0C0C0]/50 transition-all duration-300 flex items-center justify-center gap-2 group text-sm"
                >
                  <span className="truncate">Szczegółowe specyfikacje</span>
                  <ChevronRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* BACK SIDE — absolute to overlay, same size as front */}
        <div 
          className={`
            absolute top-0 left-0 right-0 bottom-0 backdrop-blur-md rounded-2xl overflow-hidden
            border bg-gradient-to-br from-[#C0C0C0]/10 via-[#0A0A0A] to-[#C0C0C0]/5 border-[#C0C0C0]/40
            backface-hidden rotate-y-180
          `}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">{title}</h3>
              <button
                onClick={() => setIsFlipped(false)}
                className="p-2 rounded-lg border border-[#C0C0C0]/30 text-[#C0C0C0] hover:bg-[#C0C0C0]/10 hover:border-[#C0C0C0]/50 transition-all duration-300"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            <div className="text-sm text-[#C0C0C0]/80 mb-4 font-semibold">
              Skrócony przegląd specyfikacji
            </div>

            <div className="flex-grow overflow-y-auto space-y-4 mb-6">
              {detailedSpecs.map((spec, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 pb-3 border-b border-[#C0C0C0]/10"
                >
                  <div className="w-2 h-2 rounded-full bg-[#C0C0C0] mt-2 flex-shrink-0" />
                  <span className="text-white/90 text-sm leading-relaxed">{spec}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#C0C0C0]/20 pt-6">
              <div className="text-sm text-white/60 mb-2">Koszt sprzętu</div>
              <span className="text-4xl font-bold bg-gradient-to-r from-[#C0C0C0] to-white bg-clip-text text-transparent">
                €{price}
              </span>
              <span className="text-white/60 ml-2">netto</span>
              
              <MetallicButton className="w-full mt-4">
                Zamówić moduł
              </MetallicButton>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backfaceVisibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};