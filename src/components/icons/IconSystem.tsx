import React from 'react';
import { motion } from 'framer-motion';

// Define standard icon animation durations
export const ANIMATION_DURATION = {
  QUICK: 0.15,
  STANDARD: 0.3,
  COMPLEX: 0.7,
};

// Custom easing function as specified in guidelines
export const ANIMATION_EASING = [0.25, 0.1, 0.25, 1];

export type IconSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type IconVariant = 'default' | 'hover' | 'active' | 'disabled' | 'error' | 'premium';
export type IconCategory = 'navigation' | 'action' | 'status' | 'financial' | 'fleet' | 'ui';

export interface IconSystemProps {
  children: React.ReactNode;
  size?: IconSize;
  variant?: IconVariant;
  category?: IconCategory;
  filled?: boolean;
  isAnimated?: boolean;
  className?: string;
  onClick?: () => void;
  title?: string;
  testId?: string;
}

const sizeToPixels = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  '2xl': 64,
};

const sizeToStrokeWidth = {
  sm: 1.5,
  md: 2,
  lg: 2,
  xl: 2.5,
  '2xl': 3,
};

export function IconSystem({
  children,
  size = 'md',
  variant = 'default',
  category = 'ui',
  filled = false,
  isAnimated = true,
  className = '',
  onClick,
  title,
  testId,
}: IconSystemProps) {
  const sizeInPixels = sizeToPixels[size];
  const strokeWidth = sizeToStrokeWidth[size];
  
  // Basic hover animation variants
  const animationVariants = {
    default: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.5 },
  };

  // Category-specific styling
  const categoryStyles = {
    navigation: 'text-primary',
    action: 'text-accent',
    status: 'text-secondary',
    financial: 'text-primary',
    fleet: 'text-primary',
    ui: 'text-foreground',
  };

  // Variant-specific styling
  const variantStyles = {
    default: '',
    hover: 'text-primary',
    active: 'text-accent',
    disabled: 'opacity-50',
    error: 'text-destructive',
    premium: 'text-gradient',
  };

  // Gradient background for premium indicators
  const premiumGradient = variant === 'premium' ? 
    'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent' : '';
  
  // Apply semi-filled style when filled is true
  const fillStyle = filled ? 'fill-current opacity-50' : 'fill-none';

  return (
    <motion.div
      initial="default"
      whileHover={isAnimated && !onClick ? "hover" : undefined}
      whileTap={isAnimated ? "tap" : undefined}
      variants={isAnimated ? animationVariants : undefined}
      transition={{ 
        duration: ANIMATION_DURATION.QUICK, 
        ease: ANIMATION_EASING 
      }}
      className={`
        inline-flex items-center justify-center
        ${onClick ? 'cursor-pointer' : ''}
        ${categoryStyles[category]}
        ${variantStyles[variant]}
        ${premiumGradient}
        ${className}
      `}
      onClick={onClick}
      data-testid={testId}
      style={{ 
        width: sizeInPixels, 
        height: sizeInPixels,
      }}
      aria-hidden={!title}
      role={title ? 'img' : undefined}
      aria-label={title}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            width: sizeInPixels,
            height: sizeInPixels,
            strokeWidth,
            className: `${fillStyle} ${child.props.className || ''}`,
            'aria-hidden': 'true',
          });
        }
        return child;
      })}
    </motion.div>
  );
}