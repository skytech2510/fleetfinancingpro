import React from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'premium';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

export function Badge({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '' 
}: BadgeProps) {
  const variantStyles = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-destructive/10 text-destructive',
    info: 'bg-accent/10 text-accent',
    premium: 'bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  // Apply special effects for premium badges
  const premiumEffect = variant === 'premium' 
    ? 'backdrop-blur-sm border border-primary/20 shadow-[0_0_10px_rgba(0,86,179,0.2)]' 
    : '';

  return (
    <span 
      className={`
        inline-flex items-center justify-center 
        font-medium rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${premiumEffect}
        ${className}
      `}
    >
      {children}
    </span>
  );
}