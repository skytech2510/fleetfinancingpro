import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ANIMATION_DURATION, ANIMATION_EASING } from '../icons/IconSystem';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
}

export function Tooltip({ 
  content, 
  children, 
  position = 'top',
  delay = 300
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  // Position adjustments
  const positionStyles = {
    top: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      className: 'bottom-full mb-2 left-1/2 transform -translate-x-1/2',
    },
    right: {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      className: 'left-full ml-2 top-1/2 transform -translate-y-1/2',
    },
    bottom: {
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 0 },
      className: 'top-full mt-2 left-1/2 transform -translate-x-1/2',
    },
    left: {
      initial: { opacity: 0, x: 10 },
      animate: { opacity: 1, x: 0 },
      className: 'right-full mr-2 top-1/2 transform -translate-y-1/2',
    },
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`absolute z-50 ${positionStyles[position].className}`}
            initial={positionStyles[position].initial}
            animate={positionStyles[position].animate}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: ANIMATION_DURATION.STANDARD, 
              ease: ANIMATION_EASING 
            }}
          >
            <div className="bg-background/90 backdrop-blur-sm text-foreground px-3 py-1.5 rounded-md text-sm shadow-lg border border-primary/10 whitespace-nowrap">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}