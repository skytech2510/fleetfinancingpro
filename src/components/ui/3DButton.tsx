import React from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_DURATION, ANIMATION_EASING } from '../icons/IconSystem';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  depth?: 'low' | 'medium' | 'high';
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button3D({
  children,
  variant = 'primary',
  size = 'md',
  depth = 'medium',
  className = '',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
  ...props
}: ButtonProps) {
  const baseStyles = "relative font-medium rounded-lg focus:outline-none transition-all transform";
  
  const variantStyles = {
    primary: `
      bg-gradient-to-r from-primary to-primary/90
      text-white
      border border-primary/30
    `,
    secondary: `
      bg-card/80
      text-foreground
      border border-white/10
    `,
    outline: `
      bg-transparent
      text-primary
      border border-primary/50
    `,
    ghost: `
      bg-transparent
      text-foreground
      border-0
      hover:bg-white/5
    `,
  };
  
  const sizeStyles = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };
  
  const depthValues = {
    low: 2,
    medium: 4,
    high: 6,
  };
  
  const shadowColor = variant === 'primary' ? 'rgba(0, 86, 179, 0.4)' : 'rgba(0, 0, 0, 0.2)';
  
  // 3D Button animation variants
  const buttonVariants = {
    initial: {
      y: -depthValues[depth],
      boxShadow: `0 ${depthValues[depth]}px 0 0 ${shadowColor}`,
    },
    hover: {
      y: -Math.floor(depthValues[depth] * 1.5),
      boxShadow: `0 ${Math.floor(depthValues[depth] * 1.5)}px 0 0 ${shadowColor}`,
    },
    tap: {
      y: 0,
      boxShadow: `0 0px 0 0 ${shadowColor}`,
      transition: {
        duration: 0.1,
      },
    },
    disabled: {
      opacity: 0.6,
      y: 0,
      boxShadow: `0 0px 0 0 ${shadowColor}`,
    },
  };

  return (
    <motion.button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      initial="initial"
      whileHover={!disabled && !loading ? "hover" : undefined}
      whileTap={!disabled && !loading ? "tap" : undefined}
      animate={disabled || loading ? "disabled" : "initial"}
      variants={buttonVariants}
      transition={{
        duration: ANIMATION_DURATION.QUICK,
        ease: ANIMATION_EASING,
      }}
      disabled={disabled || loading}
      {...props}
    >
      <div className="relative flex items-center justify-center gap-2">
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        
        {icon && iconPosition === 'left' && !loading && (
          <span className="relative">{icon}</span>
        )}
        
        <span className="relative">{children}</span>
        
        {icon && iconPosition === 'right' && !loading && (
          <span className="relative">{icon}</span>
        )}
      </div>
      
      {/* Highlight for the top edge */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20 rounded-t-lg" />
      
      {/* Shadow base - the "floor" our button sits on */}
      {!disabled && !loading && (
        <div 
          className={`absolute inset-x-0 -bottom-[${depthValues[depth]}px] h-[${depthValues[depth]}px] ${
            variant === 'primary' ? 'bg-primary/40' : 'bg-black/20'
          } rounded-b-lg blur-[1px]`}
          style={{
            height: `${depthValues[depth]}px`,
            bottom: `-${depthValues[depth]}px`,
          }}
        />
      )}
    </motion.button>
  );
}