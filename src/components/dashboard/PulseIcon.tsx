import React from 'react';
import { motion } from 'framer-motion';

interface PulseIconProps {
  color?: string;
  size?: number;
}

export function PulseIcon({ color = '#FF7849', size = 6 }: PulseIconProps) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        style={{ 
          width: size, 
          height: size, 
          borderRadius: '50%', 
          backgroundColor: color
        }}
      />
      <motion.div
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: size, 
          height: size, 
          borderRadius: '50%', 
          backgroundColor: color,
          opacity: 0.8
        }}
        animate={{ scale: [1, 3], opacity: [0.8, 0] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  );
}