import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{
        type: "spring",
        stiffness: 100, // Reduced for smoother motion
        damping: 15,    // Reduced for more bounce
        mass: 1,        // Added mass for more natural physics
        duration: 0.8   // Increased duration
      }}
    >
      {children}
    </motion.div>
  );
}