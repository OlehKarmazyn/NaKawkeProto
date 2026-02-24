import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

/** Стеклянная карточка с размытием и золотистой обводкой — используется в секциях лендинга. */
export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`
        relative backdrop-blur-md bg-white/5
        border border-[#C0C0C0]/20 border-gold-accent rounded-xl p-6
        hover:border-[#C0C0C0]/40 hover:border-gold-accent transition-all duration-300
        hover:shadow-[0_0_20px_rgba(192,192,192,0.1)]
        ${className}
      `}
    >
      {children}
    </div>
  );
};
