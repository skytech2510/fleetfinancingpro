import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConnectionLinesProps {
  expandedCard: string | null;
}

// Define connections between metrics
const connections = [
  { from: 'financing', to: 'vehicles', id: 'connection-1-2' },
  { from: 'financing', to: 'approval', id: 'connection-1-3' },
  { from: 'vehicles', to: 'support', id: 'connection-2-4' }
];

export function ConnectionLines({ expandedCard }: ConnectionLinesProps) {
  const [paths, setPaths] = useState<{ id: string, d: string }[]>([]);
  const [activeConnection, setActiveConnection] = useState<string | null>(null);

  // Update connection paths based on current card positions
  useEffect(() => {
    // Skip if a card is expanded
    if (expandedCard) return;

    const updatePaths = () => {
      const cards = document.querySelectorAll('[data-metric-id]');
      const cardPositions: Record<string, { x: number, y: number }> = {};
      
      cards.forEach((card) => {
        const id = card.getAttribute('data-metric-id');
        const rect = card.getBoundingClientRect();
        
        if (id) {
          cardPositions[id] = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          };
        }
      });
      
      const newPaths = connections.map((conn) => {
        const fromCard = cardPositions[conn.from];
        const toCard = cardPositions[conn.to];
        
        if (fromCard && toCard) {
          const bezierX = (fromCard.x + toCard.x) / 2;
          const bezierY = Math.min(fromCard.y, toCard.y) - 50;
          
          return {
            id: conn.id,
            d: `M${fromCard.x},${fromCard.y} Q${bezierX},${bezierY} ${toCard.x},${toCard.y}`
          };
        }
        
        return { id: conn.id, d: '' };
      }).filter(path => path.d);
      
      setPaths(newPaths);
    };
    
    // Initial update
    setTimeout(updatePaths, 500);
    
    // Update on resize
    window.addEventListener('resize', updatePaths);
    
    return () => {
      window.removeEventListener('resize', updatePaths);
    };
  }, [expandedCard]);

  // Set active connection when hovering over a metric card
  useEffect(() => {
    const cards = document.querySelectorAll('[data-metric-id]');
    
    const handleMouseEnter = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      const id = card.getAttribute('data-metric-id');
      
      if (id) {
        setActiveConnection(id);
      }
    };
    
    const handleMouseLeave = () => {
      setActiveConnection(null);
    };
    
    cards.forEach((card) => {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0, 86, 179, 0.7)" />
          <stop offset="100%" stopColor="rgba(44, 206, 217, 0.7)" />
        </linearGradient>
      </defs>
      
      {paths.map((path) => {
        const isActive = connections.some(conn => 
          (conn.id === path.id) && 
          (conn.from === activeConnection || conn.to === activeConnection)
        );
        
        return (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="url(#connectionGradient)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isActive ? 0.8 : 0,
              strokeDashoffset: isActive ? [0, -8] : 0
            }}
            transition={{ 
              opacity: { duration: 0.3 },
              strokeDashoffset: { 
                duration: 1, 
                ease: "linear", 
                repeat: Infinity 
              }
            }}
            style={{ 
              filter: isActive ? 'drop-shadow(0 0 2px var(--primary))' : 'none'
            }}
          />
        );
      })}
    </svg>
  );
}