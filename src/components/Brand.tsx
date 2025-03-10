import React from 'react';
import { Truck } from 'lucide-react';
import { IconSystem } from './icons/IconSystem';

interface BrandProps {
  variant?: 'full' | 'compact';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Brand({ variant = 'full', size = 'md', className = '' }: BrandProps) {
  const sizes = {
    sm: {
      logo: 'w-8 h-8',
      text: 'text-xl',
      spacing: 'gap-1.5',
    },
    md: {
      logo: 'w-10 h-10',
      text: 'text-2xl',
      spacing: 'gap-2',
    },
    lg: {
      logo: 'w-12 h-12',
      text: 'text-3xl',
      spacing: 'gap-3',
    },
  };

  return (
    <div className={`flex items-center ${sizes[size].spacing} ${className}`}>
      <div className={`${sizes[size].logo} rounded-xl bg-primary/10 flex items-center justify-center`}>
        <IconSystem size={size} category="fleet" variant="default">
          <Truck />
        </IconSystem>
      </div>
      
      {(variant === 'full' || (variant === 'compact' && size !== 'sm')) && (
        <span className={`${sizes[size].text} font-bold gradient-text`}>
          {variant === 'full' ? 'FleetFinancingPro' : 'FFP'}
        </span>
      )}
    </div>
  );
}