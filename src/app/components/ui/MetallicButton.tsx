import React from 'react';

interface MetallicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/** Primary CTA pill-style button used across the landing. */
export const MetallicButton: React.FC<MetallicButtonProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center text-center py-[15px] px-[31px]
        rounded-2xl border-0
        shadow-[0_2px_8px_rgba(0,0,0,0.15)]
        transition-transform duration-200
        hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:-translate-y-px
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#87AEA6]
        ${className}
      `}
      style={{
        background: 'linear-gradient(180deg, #666666, #D6D6D6, #666666)',
      }}
      {...props}
    >
      <span className="text-black text-base font-bold leading-6">
        {children}
      </span>
    </button>
  );
};
