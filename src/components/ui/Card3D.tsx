import React from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_DURATION, ANIMATION_EASING } from '../icons/IconSystem';

interface Card3DProps {
  children: React.ReactNode;
  depth?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
  isPremium?: boolean;
  hoverEffect?: 'lift' | 'tilt' | 'glow' | 'none';
}

export function Card3D({
  children,
  depth = 'medium',
  interactive = true,
  className = '',
  onClick,
  isPremium = false,
  hoverEffect = 'lift'
}: Card3DProps) {
  // Define shadow depth based on the depth prop
  const shadowDepth = {
    low: isPremium 
      ? 'shadow-[0_4px_10px_rgba(0,86,179,0.2)]' 
      : 'shadow-[0_2px_5px_rgba(0,0,0,0.1)]',
    medium: isPremium 
      ? 'shadow-[0_8px_20px_rgba(0,86,179,0.25)]' 
      : 'shadow-[0_4px_10px_rgba(0,0,0,0.15)]',
    high: isPremium 
      ? 'shadow-[0_16px_30px_rgba(0,86,179,0.3)]' 
      : 'shadow-[0_8px_20px_rgba(0,0,0,0.2)]',
  };

  // Define elevation (y-offset) based on depth
  const elevation = {
    low: -1,
    medium: -3,
    high: -6
  };

  // Define hover animations based on the effect type
  const getHoverAnimation = () => {
    switch(hoverEffect) {
      case 'lift':
        return { 
          y: elevation[depth] - 4,
          boxShadow: isPremium 
            ? '0 16px 30px rgba(0,86,179,0.35)' 
            : '0 20px 25px rgba(0,0,0,0.15)' 
        };
      case 'tilt':
        return { 
          rotateX: -5, 
          rotateY: 5, 
          y: elevation[depth] - 2,
          boxShadow: isPremium 
            ? '0 14px 25px rgba(0,86,179,0.3)' 
            : '0 15px 20px rgba(0,0,0,0.12)' 
        };
      case 'glow':
        return { 
          y: elevation[depth] - 2,
          boxShadow: isPremium 
            ? '0 10px 30px rgba(0,86,179,0.4)' 
            : '0 12px 25px rgba(0,0,0,0.18)' 
        };
      case 'none':
      default:
        return {};
    }
  };

  // Animation variants
  const variants = {
    initial: { 
      y: elevation[depth],
      rotateX: 0,
      rotateY: 0,
      boxShadow: isPremium 
        ? `0 ${4 * (depth === 'low' ? 1 : depth === 'medium' ? 2 : 4)}px ${8 * (depth === 'low' ? 1 : depth === 'medium' ? 2 : 4)}px rgba(0,86,179,0.2)` 
        : `0 ${4 * (depth === 'low' ? 1 : depth === 'medium' ? 2 : 4)}px ${8 * (depth === 'low' ? 1 : depth === 'medium' ? 2 : 4)}px rgba(0,0,0,0.1)` 
    },
    hover: getHoverAnimation(),
    tap: { 
      y: 0,
      rotateX: 0,
      rotateY: 0,
      boxShadow: isPremium 
        ? '0 2px 5px rgba(0,86,179,0.15)' 
        : '0 2px 5px rgba(0,0,0,0.1)' 
    },
  };

  // Define premium border effect
  const premiumBorder = isPremium 
    ? 'border border-primary/20 bg-gradient-to-b from-background to-background/90'
    : 'border border-white/5 bg-card/95';

  return (
    <motion.div
      className={`
        relative 
        overflow-hidden 
        rounded-xl 
        backdrop-blur-sm
        ${interactive ? 'cursor-pointer' : ''}
        ${shadowDepth[depth]}
        ${premiumBorder}
        ${className}
      `}
      initial="initial"
      whileHover={interactive && hoverEffect !== 'none' ? "hover" : undefined}
      whileTap={interactive ? "tap" : undefined}
      variants={variants}
      transition={{ 
        duration: ANIMATION_DURATION.STANDARD, 
        ease: ANIMATION_EASING 
      }}
      onClick={onClick}
      style={{ 
        transformStyle: "preserve-3d",
        perspective: 1000,
        willChange: interactive ? "transform, box-shadow" : "auto"
      }}
    >
      {children}
      
      {/* Premium glow effect */}
      {isPremium && (
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
      
      {/* Top highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10 opacity-50 pointer-events-none" />
      
      {/* Bottom shadow */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-black/20 opacity-50 pointer-events-none" />
    </motion.div>
  );
}