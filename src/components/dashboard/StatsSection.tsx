import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { MetricsGrid } from './MetricsGrid';

export function StatsSection() {
  const controls = useAnimation();
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('stats-section');
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8;
      
      if (isVisible) {
        controls.start('visible');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  return (
    <section 
      id="stats-section" 
      className="py-20 relative overflow-hidden"
    >
      {/* Background digital grid effect */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none z-0" />
      
      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none z-0" id="particles-container" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <motion.h2
            className="text-4xl font-bold text-center mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <span className="gradient-text">Industry-Leading</span>{" "}
            <span className="text-white">Performance</span>
          </motion.h2>
          
          <motion.p 
            className="text-center text-muted-foreground max-w-xl mx-auto mb-16"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            Our platform delivers exceptional results with cutting-edge technology 
            and strategic financial solutions tailored for your fleet
          </motion.p>
          
          <MetricsGrid />
        </motion.div>
      </div>
    </section>
  );
}