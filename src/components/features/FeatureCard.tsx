import React from 'react';
import { motion } from 'framer-motion';
import { IconSystem } from '../icons/IconSystem';
import { GradientBorder } from '../ui/GradientBorder';
import { Icon3D } from '../ui/Icon3D';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  isPremium?: boolean;
  delay?: number;
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  isPremium = false,
  delay = 0 
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
      <GradientBorder 
        type={isPremium ? 'primary' : 'neutral'} 
        level={isPremium ? 'prominent' : 'standard'}
        animated={isPremium}
      >
        <Icon3D depth="low" interactive>
          <div className="p-8 group relative">
            <div className="relative">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 
                transition-all duration-300 group-hover:bg-primary/20">
                <IconSystem size="lg" variant={isPremium ? 'premium' : 'default'} filled={isPremium}>
                  <Icon />
                </IconSystem>
              </div>
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </div>
        </Icon3D>
      </GradientBorder>
    </motion.div>
  );
}