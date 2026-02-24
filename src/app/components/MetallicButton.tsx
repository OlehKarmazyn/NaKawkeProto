import React from 'react';

interface MetallicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const MetallicButton: React.FC<MetallicButtonProps> = ({ 
  children, 
  variant = 'primary',
  className = '',
  ...props 
}) => {
  return (
    <button
      className={`
        relative px-8 py-4 font-semibold text-black overflow-hidden
        rounded-lg transition-all duration-300
        ${variant === 'primary' 
          ? 'bg-gradient-to-r from-[#a8a8a8] via-[#C0C0C0] to-[#a8a8a8]' 
          : 'bg-gradient-to-r from-[#888888] via-[#a0a0a0] to-[#888888]'
        }
        hover:shadow-[0_0_30px_rgba(192,192,192,0.6)]
        hover:scale-105
        active:scale-95
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
    </button>
  );
};
