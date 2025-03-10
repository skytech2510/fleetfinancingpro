import React from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_DURATION, ANIMATION_EASING } from '../icons/IconSystem';

// This component wraps any content with 3D effects as specified in the guidelines
interface Icon3DProps {
  children: React.ReactNode;
  depth?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

export function Icon3D({
  children,
  depth = 'medium',
  interactive = true,
  className = '',
  onClick,
  active = false,
}: Icon3DProps) {
  // Define shadow depth based on the depth prop
  const shadowDepth = {
    low: 'shadow-[0_2px_4px_rgba(0,0,0,0.2)]',
    medium: 'shadow-[0_4px_8px_rgba(0,0,0,0.25)]',
    high: 'shadow-[0_8px_16px_rgba(0,0,0,0.3)]',
  };

  // Define 3D transform based on the depth prop
  const transformDepth = {
    low: { y: active ? 0 : -1 },
    medium: { y: active ? 0 : -2 },
    high: { y: active ? 0 : -4 },
  };

  // Hover animation variants
  const variants = {
    initial: { 
      y: transformDepth[depth].y,
      boxShadow: `0 ${4 * (depth === 'low' ? 1 : depth === 'medium' ? 2 : 4)}px ${8 * (depth === 'low' ? 1 : depth === 'medium' ? 2 : 4)}px rgba(0,0,0,0.25)` 
    },
    hover: { 
      y: transformDepth[depth].y - 2,
      boxShadow: `0 ${6 * (depth === 'low' ? 1 : depth === 'medium' ? 2 : 4)}px ${12 * (depth === 'low' ? 1 : depth === 'medium' ? 2 : 4)}px rgba(0,0,0,0.3)` 
    },
    tap: { 
      y: 0,
      boxShadow: `0 ${2 * (depth === 'low' ? 1 : depth === 'medium' ? 2 : 4)}px ${4 * (depth === 'low' ? 1 : depth === 'medium' ? 2 : 4)}px rgba(0,0,0,0.2)` 
    },
  };

  return (
    <motion.div
      className={`
        relative 
        overflow-hidden 
        rounded-lg 
        ${interactive ? 'cursor-pointer' : ''}
        ${shadowDepth[depth]}
        ${className}
      `}
      initial="initial"
      whileHover={interactive ? "hover" : undefined}
      whileTap={interactive ? "tap" : undefined}
      animate={active ? "tap" : "initial"}
      variants={variants}
      transition={{ 
        duration: ANIMATION_DURATION.QUICK, 
        ease: ANIMATION_EASING 
      }}
      onClick={onClick}
    >
      {children}
      <div className="absolute inset-0 border border-white/10 rounded-lg pointer-events-none" />
    </motion.div>
  );
}