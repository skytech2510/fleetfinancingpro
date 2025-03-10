import React from 'react';

type GradientType = 'primary' | 'success' | 'alert' | 'neutral';
type GradientLevel = 'subtle' | 'standard' | 'prominent' | 'dramatic';

interface GradientBorderProps {
  children: React.ReactNode;
  type?: GradientType;
  level?: GradientLevel;
  className?: string;
  animated?: boolean;
  angle?: number;
}

export function GradientBorder({
  children,
  type = 'primary',
  level = 'standard',
  className = '',
  animated = false,
  angle = 135,
}: GradientBorderProps) {
  // Gradient colors based on type
  const gradientColors = {
    primary: 'from-primary to-secondary',
    success: 'from-success to-success/60',
    alert: 'from-warning to-warning/60',
    neutral: 'from-muted to-muted/60',
  };

  // Opacity based on level
  const levelOpacity = {
    subtle: 'opacity-15',
    standard: 'opacity-40',
    prominent: 'opacity-100',
    dramatic: 'opacity-100 shadow-glow',
  };

  // Additional classes for dramatic level
  const dramaticClass = level === 'dramatic' ? 'shadow-[0_0_20px_rgba(0,86,179,0.3)]' : '';

  // Animation class
  const animationClass = animated ? 'animated-gradient' : '';

  return (
    <div 
      className={`
        relative 
        p-[1px] 
        rounded-lg 
        overflow-hidden
        ${className}
      `}
    >
      <div 
        className={`
          absolute 
          inset-0 
          bg-gradient-to-r 
          ${gradientColors[type]} 
          ${levelOpacity[level]}
          ${dramaticClass}
          ${animationClass}
        `}
        style={{ 
          transform: `rotate(${angle}deg)`,
          transformOrigin: 'center',
        }}
      />
      <div className="relative bg-background rounded-[calc(0.5rem-1px)]">
        {children}
      </div>
    </div>
  );
}