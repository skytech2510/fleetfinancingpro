import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PulseIcon } from './PulseIcon';
import { DetailView } from './DetailView';

interface MetricCardProps {
  id: string;
  value: string;
  label: string;
  insight: string;
  trend?: string;
  index: number;
  isExpanded: boolean;
  onExpand: (id: string) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  isPrimary?: boolean;
  isInitialized: boolean;
}

export function MetricCard({
  id,
  value,
  label,
  insight,
  trend,
  index,
  isExpanded,
  onExpand,
  containerRef,
  isPrimary = false,
  isInitialized
}: MetricCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Track card's original dimensions and position for expanded animation
  useEffect(() => {
    if (isExpanded && cardRef.current && containerRef.current) {
      // Calculate the center position for the expanded card
      const containerRect = containerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      
      setPosition({
        x: containerRect.width / 2 - cardRef.current.offsetWidth / 2,
        y: containerRect.height / 2 - cardRef.current.offsetHeight / 2 + scrollY
      });
    }
  }, [isExpanded, containerRef]);

  // Staggered initialization animation
  useEffect(() => {
    if (isInitialized) {
      const timer = setTimeout(() => {
        setInitialized(true);
      }, index * 200);
      
      return () => clearTimeout(timer);
    }
  }, [isInitialized, index]);

  // Handle mouse movement for tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isExpanded || !cardRef.current) return;
    
    const card = cardRef.current;
    const cardRect = card.getBoundingClientRect();
    const centerX = cardRect.left + cardRect.width / 2;
    const centerY = cardRect.top + cardRect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const offsetX = ((mouseX - centerX) / (cardRect.width / 2)) * 5;
    const offsetY = ((mouseY - centerY) / (cardRect.height / 2)) * 5;
    
    // Apply 3D transformation
    card.style.transform = `perspective(1000px) rotateY(${offsetX}deg) rotateX(${-offsetY}deg) translateY(-5px) translateZ(10px)`;
    
    // Dynamic lighting effect
    const normalizedX = (offsetX + 5) / 10;
    const normalizedY = (offsetY + 5) / 10;
    const gradientX = 50 + normalizedX * 30;
    const gradientY = 50 + normalizedY * 30;
    
    card.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(24, 32, 50, 0.8) 0%, rgba(8, 11, 18, 0.95) 80%)`;
  };

  const handleMouseLeave = () => {
    if (isExpanded || !cardRef.current) return;
    
    // Reset transforms and effects
    cardRef.current.style.transform = '';
    cardRef.current.style.background = '';
    setIsHovering(false);
    setShowTooltip(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    
    // Show tooltip after a short delay
    setTimeout(() => {
      if (isHovering) {
        setShowTooltip(true);
      }
    }, 300);
  };

  const getCardVariants = () => {
    return {
      hidden: { 
        opacity: 0,
        y: 20,
        scale: 0.95
      },
      visible: { 
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }
      },
      expanded: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        x: '-50%',
        y: '-50%',
        zIndex: 100,
        width: 'calc(min(90vw, 600px))',
        height: 'calc(min(80vh, 400px))',
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30
        }
      }
    };
  };

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative overflow-hidden rounded-xl backdrop-blur-sm cursor-pointer
        ${isPrimary 
          ? 'border border-primary/20 bg-gradient-to-b from-background to-background/90'
          : 'border border-white/5 bg-card/95'
        }
        ${isExpanded ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'}
        transform-style-preserve-3d
        transition-shadow duration-300
      `}
      variants={getCardVariants()}
      initial="hidden"
      animate={isExpanded ? "expanded" : initialized ? "visible" : "hidden"}
      onClick={() => !isExpanded && onExpand(id)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Glowing edge effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 rounded-xl"
        animate={{ opacity: isHovering && !isExpanded ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `linear-gradient(135deg, 
            rgba(255, 0, 0, 0) 0%, 
            rgba(0, 212, 255, 0.05) 25%, 
            rgba(0, 86, 179, 0.05) 75%, 
            rgba(255, 0, 0, 0) 100%)`
        }}
      />

      {/* Scan line effect */}
      <motion.div 
        className="absolute left-0 w-full h-0.5 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, 
            rgba(44, 206, 217, 0) 0%, 
            rgba(44, 206, 217, 0.5) 50%, 
            rgba(44, 206, 217, 0) 100%)`,
          filter: 'blur(1px)',
          opacity: 0.3
        }}
        animate={{
          top: ['0%', '100%'],
          opacity: [0, 0.3, 0.3, 0]
        }}
        transition={{
          duration: 8,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
          times: [0, 0.1, 0.9, 1]
        }}
      />

      {/* Card Content */}
      <div className="p-6 h-full flex flex-col justify-center relative z-10">
        <motion.div
          className={`
            font-mono font-bold text-4xl mb-2 relative
            ${isPrimary ? 'text-primary' : 'text-cyan-400'}
          `}
          initial={{ opacity: 0 }}
          animate={{ opacity: initialized ? 1 : 0 }}
          transition={{ delay: 0.2 }}
          style={{
            textShadow: isPrimary 
              ? '0 0 15px rgba(0, 86, 179, 0.4)' 
              : '0 0 15px rgba(44, 206, 217, 0.4)'
          }}
        >
          {value}
          
          {/* Text stroke effect */}
          <span 
            className="absolute left-0.5 top-0.5 -z-10 opacity-60 blur-[1px]"
            style={{
              color: 'transparent',
              WebkitTextStroke: `1px ${isPrimary ? 'rgba(0, 86, 179, 0.3)' : 'rgba(44, 206, 217, 0.3)'}`
            }}
          >
            {value}
          </span>
        </motion.div>

        <motion.div
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: initialized ? 1 : 0 }}
          transition={{ delay: 0.3 }}
        >
          {label}
        </motion.div>

        {trend && (
          <motion.div
            className="text-xs text-green-400 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: initialized ? 1 : 0 }}
            transition={{ delay: 0.4 }}
          >
            {trend}
          </motion.div>
        )}

        {/* Progress timeline */}
        <motion.div
          className="absolute bottom-4 left-6 right-6 h-0.5 bg-primary/10 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: initialized ? 1 : 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary/30 to-primary/80 relative"
            style={{ width: '60%' }}
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            transition={{ delay: 0.8, duration: 1.5, ease: 'easeOut' }}
          >
            {/* Progress dot */}
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"
            />
            
            {/* Dashed forecast line */}
            <div
              className="absolute top-0 left-full h-full w-[40%]"
              style={{
                background: `linear-gradient(90deg, rgba(75, 107, 251, 0.8) 0%, rgba(75, 107, 251, 0.3) 100%)`,
                clipPath: `repeating-linear-gradient(to right, rgba(75, 107, 251, 0.8) 0%, rgba(75, 107, 251, 0.8) 6px, transparent 6px, transparent 12px)`,
                opacity: 0.5
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Insight tooltip */}
      <AnimatePresence>
        {showTooltip && !isExpanded && (
          <motion.div
            className="absolute -bottom-28 left-4 w-[calc(100%-2rem)] bg-black/90 border border-primary/20 rounded-lg p-3 z-20 pointer-events-none"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ 
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-1">
              <PulseIcon color={isPrimary ? 'var(--primary)' : 'var(--secondary)'} />
              <span>{id === 'financing' ? 'Financing Growth' : 
                     id === 'vehicles' ? 'Vehicle Acquisition' :
                     id === 'approval' ? 'AI-Powered Decisioning' : 'Customer Success'}</span>
            </div>
            <p className="text-xs text-foreground/80">{insight}</p>
            
            {/* Tooltip arrow */}
            <div
              className="absolute w-3 h-3 bg-black/90 border-l border-t border-primary/20 transform rotate-45 -top-1.5 left-5"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded view content */}
      <AnimatePresence>
        {isExpanded && (
          <DetailView id={id} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}