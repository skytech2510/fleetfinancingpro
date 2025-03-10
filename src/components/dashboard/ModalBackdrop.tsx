import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalBackdropProps {
  isVisible: boolean;
  onClick: () => void;
}

export function ModalBackdrop({ isVisible, onClick }: ModalBackdropProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClick}
        />
      )}
    </AnimatePresence>
  );
}