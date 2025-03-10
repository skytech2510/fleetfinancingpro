import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'neon';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  align?: 'left' | 'center' | 'right';
}

export function Button({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  align = 'left',
}: ButtonProps) {
  const baseStyles = `
    relative
    inline-flex
    rounded-lg
    font-medium
    select-none
    transition-all duration-200
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20
    disabled:pointer-events-none disabled:opacity-50
    overflow-hidden
    group
    backdrop-blur-md
  `;

  const alignStyles = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  const variantStyles = {
    primary: `
      bg-primary/80
      text-white
      hover:bg-primary/70
      active:bg-primary/60
      shadow-[0_4px_15px_rgba(0,86,179,0.15)]
      hover:shadow-[0_0_30px_rgba(0,86,179,0.3)]
      active:shadow-[0_0_15px_rgba(0,86,179,0.2)]
      active:scale-[0.98]
      after:absolute
      after:content-['']
      after:inset-0
      after:rounded-lg
      after:border
      after:border-white/20
      after:opacity-0
      hover:after:opacity-100
      after:transition-opacity
      after:duration-300
      before:absolute
      before:inset-0
      before:bg-gradient-to-r
      before:from-primary/40
      before:to-secondary/40
      before:opacity-0
      hover:before:opacity-100
      before:transition-opacity
      before:duration-300
      backdrop-blur-xl
      backdrop-saturate-150
    `,
    secondary: `
      bg-white/10
      text-white
      border border-white/20
      hover:bg-white/15
      hover:border-white/30
      active:bg-white/20
      active:scale-[0.98]
      shadow-[0_4px_15px_rgba(255,255,255,0.07)]
      hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]
      after:absolute
      after:inset-0
      after:rounded-lg
      after:bg-gradient-to-r
      after:from-white/5
      after:to-transparent
      after:opacity-0
      hover:after:opacity-100
      after:transition-opacity
      after:duration-300
      backdrop-blur-lg
      backdrop-saturate-150
    `,
    ghost: `
      text-white/70
      hover:text-white
      hover:bg-white/10
      active:bg-white/15
      active:scale-[0.98]
      shadow-[0_4px_15px_rgba(255,255,255,0.03)]
      after:absolute
      after:inset-0
      after:rounded-lg
      after:border
      after:border-white/0
      after:transition-all
      after:duration-300
      hover:after:border-white/20
      hover:after:scale-95
      backdrop-blur-sm
      backdrop-saturate-150
    `,
    neon: `
      bg-primary/10
      text-primary
      border border-primary/30
      shadow-[0_4px_15px_rgba(0,86,179,0.1)]
      hover:shadow-[0_0_30px_rgba(0,86,179,0.3)]
      hover:border-primary/50
      active:scale-[0.98]
      after:absolute
      after:inset-0
      after:rounded-lg
      after:bg-gradient-to-r
      after:from-primary/10
      after:to-secondary/10
      after:opacity-0
      hover:after:opacity-100
      after:transition-opacity
      after:duration-300
      before:absolute
      before:inset-0
      before:rounded-lg
      before:border
      before:border-primary/20
      before:opacity-0
      hover:before:opacity-100
      before:transition-opacity
      before:duration-300
      backdrop-blur-xl
      backdrop-saturate-200
    `,
  };

  const sizeStyles = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${alignStyles[align]}
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}