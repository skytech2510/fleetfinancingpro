import React from 'react';
import { motion } from 'framer-motion';
import { IconSystem, IconSystemProps, ANIMATION_DURATION, ANIMATION_EASING } from './IconSystem';
import { ArrowRight, ArrowUpRight, Menu, X, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

// Animated icon that toggles between Menu and X icons
export function MenuToggleIcon({
  isOpen,
  ...props
}: Omit<IconSystemProps, 'children' | 'category'> & { isOpen: boolean }) {
  return (
    <IconSystem {...props} category="ui" isAnimated={false}>
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { rotate: 90, opacity: 0, scale: 0.3 },
          closed: { rotate: 0, opacity: 1, scale: 1 },
        }}
        transition={{ duration: ANIMATION_DURATION.STANDARD, ease: ANIMATION_EASING }}
        style={{ position: 'absolute' }}
      >
        <Menu />
      </motion.div>
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={{
          closed: { rotate: -90, opacity: 0, scale: 0.3 },
          open: { rotate: 0, opacity: 1, scale: 1 },
        }}
        transition={{ duration: ANIMATION_DURATION.STANDARD, ease: ANIMATION_EASING }}
      >
        <X />
      </motion.div>
    </IconSystem>
  );
}

// Arrow that animates right on hover
export function AnimatedArrowIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="action" isAnimated={false}>
      <motion.div
        whileHover={{ x: 3 }}
        transition={{ duration: ANIMATION_DURATION.QUICK, ease: ANIMATION_EASING }}
      >
        <ArrowRight />
      </motion.div>
    </IconSystem>
  );
}

// Arrow that animates diagonally on hover
export function AnimatedDiagonalArrowIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="action" isAnimated={false}>
      <motion.div
        whileHover={{ x: 3, y: -3 }}
        transition={{ duration: ANIMATION_DURATION.QUICK, ease: ANIMATION_EASING }}
      >
        <ArrowUpRight />
      </motion.div>
    </IconSystem>
  );
}

// Success icon that animates on completion
export function AnimatedSuccessIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="status" isAnimated={false}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 400, 
          damping: 15,
          duration: ANIMATION_DURATION.COMPLEX 
        }}
      >
        <CheckCircle />
      </motion.div>
    </IconSystem>
  );
}

// Chevron that rotates on toggle
export function ToggleChevronIcon({
  isOpen,
  ...props
}: Omit<IconSystemProps, 'children' | 'category'> & { isOpen: boolean }) {
  return (
    <IconSystem {...props} category="ui" isAnimated={false}>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: ANIMATION_DURATION.STANDARD, ease: ANIMATION_EASING }}
      >
        <ChevronDown />
      </motion.div>
    </IconSystem>
  );
}