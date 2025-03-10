import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  className?: string;
}

export function Checkbox({ id, checked, onChange, label, className = '' }: CheckboxProps) {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <motion.div 
        className="relative group"
        whileTap={{ scale: 0.95 }}
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <motion.div
          className={`
            w-5 h-5 rounded-md flex items-center justify-center
            transition-all duration-200 cursor-pointer
            border-2 backdrop-blur-xl
            ${checked 
              ? 'bg-primary border-primary shadow-[0_0_10px_rgba(255,16,240,0.3)]' 
              : 'border-primary/20 hover:border-primary/40 bg-black/40 hover:bg-black/60'
            }
            group-hover:scale-105 group-active:scale-95
          `}
          initial={false}
          animate={{
            scale: checked ? 1 : 0.95,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: checked ? 1 : 0,
              scale: checked ? 1 : 0.5
            }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 25
            }}
          >
            <Check className="w-4 h-4 text-white stroke-[3]" /> {/* Updated check icon */}
          </motion.div>
        </motion.div>
        
        {/* Enhanced glow effect */}
        <motion.div
          className="absolute inset-0 rounded-md -z-10"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,16,240,0.3), transparent 70%)',
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: checked ? 1 : 0,
            scale: checked ? 1.2 : 1
          }}
          transition={{
            duration: 0.2
          }}
        />
      </motion.div>
      
      {label && (
        <label 
          htmlFor={id} 
          className="text-sm text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-200"
        >
          {label}
        </label>
      )}
    </div>
  );
}