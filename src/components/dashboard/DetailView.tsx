import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface DetailViewProps {
  id: string;
}

interface DetailData {
  title: string;
  stats: { label: string; value: string }[];
}

const detailsData: Record<string, DetailData> = {
  financing: {
    title: 'Total Financing Analysis',
    stats: [
      { label: 'Q1 2024', value: '$427M' },
      { label: 'Q2 2024', value: '$512M' },
      { label: 'Q3 2024', value: '$583M' },
      { label: 'Q4 2024 (Proj)', value: '$624M' },
    ]
  },
  vehicles: {
    title: 'Fleet Vehicles Analysis',
    stats: [
      { label: 'Commercial', value: '7.2K' },
      { label: 'Passenger', value: '4.3K' },
      { label: 'Specialty', value: '2.8K' },
      { label: 'EV Fleet', value: '0.7K' },
    ]
  },
  approval: {
    title: 'Approval Rate Analysis',
    stats: [
      { label: 'Enterprise', value: '99.4%' },
      { label: 'Mid-Market', value: '98.2%' },
      { label: 'Small Business', value: '95.7%' },
      { label: 'Public Sector', value: '97.5%' },
    ]
  },
  support: {
    title: 'Support Performance Analysis',
    stats: [
      { label: 'Avg Response', value: '4m12s' },
      { label: 'Resolution', value: '98.3%' },
      { label: 'CSAT Score', value: '4.9/5' },
      { label: 'Availability', value: '24/7' },
    ]
  }
};

export function DetailView({ id }: DetailViewProps) {
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const details = detailsData[id];

  useEffect(() => {
    // Simulate chart loading
    const timer = setTimeout(() => {
      setCanvasLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 bg-card/95 backdrop-blur-xl z-20 p-6 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">{details.title}</h3>
      </div>
      
      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {details.stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="p-3 rounded-lg border border-primary/10 bg-black/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className="text-xl font-mono font-bold text-primary">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>
      
      {/* Fake chart area */}
      <motion.div
        className="flex-1 rounded-lg border border-primary/10 bg-black/30 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: canvasLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-full w-full p-4 flex items-center justify-center">
          <div className="flex flex-col items-center">
            {!canvasLoaded ? (
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
            ) : (
              <div className="text-center text-muted-foreground text-sm">
                <p>Interactive chart visualization will appear here</p>
                <p className="mt-2 text-xs">Data visualization requires Chart.js integration</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}