import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MetricCard } from './MetricCard';
import { ConnectionLines } from './ConnectionLines';
import { ModalBackdrop } from './ModalBackdrop';

interface Metric {
  id: string;
  value: string;
  label: string;
  insight: string;
  trend?: string;
  isPrimary?: boolean;
}

const metrics: Metric[] = [
  {
    id: 'financing',
    value: '$2B+',
    label: 'Total Financing',
    insight: '20.6% YoY increase in total financing volume, significantly outpacing industry average of 8.2%',
    trend: '+12.5% from last month',
    isPrimary: true
  },
  {
    id: 'vehicles',
    value: '15K+',
    label: 'Fleet Vehicles',
    insight: '36% of fleet vehicles are under 2 years old, indicating strong modernization strategy by clients'
  },
  {
    id: 'approval',
    value: '98%',
    label: 'Approval Rate',
    insight: 'Our proprietary AI decisioning engine processes applications 5x faster than industry standard with higher approval rates',
    isPrimary: true
  },
  {
    id: 'support',
    value: '24/7',
    label: 'Support',
    insight: '96% of urgent support requests are resolved within the first contact, exceeding SLA by 23%'
  }
];

export function MetricsGrid() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Staggered initialization of cards
    setIsInitialized(true);
    
    // Prevent body scrolling when a card is expanded
    if (expandedCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [expandedCard]);

  const handleExpand = (id: string) => {
    setExpandedCard(id);
  };

  const handleCollapse = () => {
    setExpandedCard(null);
  };

  return (
    <div ref={containerRef} className="relative z-10">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-center mb-16 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
      </motion.h2>

      {/* Removed metrics grid */}

      {/* Connection lines between metrics */}
      <ConnectionLines expandedCard={expandedCard} />
      
      {/* Modal backdrop for expanded state */}
      <ModalBackdrop isVisible={expandedCard !== null} onClick={handleCollapse} />
    </div>
  );
}