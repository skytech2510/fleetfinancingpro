import React from 'react';
import { motion } from 'framer-motion';
import { LogoCarousel } from './LogoCarousel';
import { IndustryTags } from './IndustryTags';
import { TrustedByFooter } from './TrustedByFooter';

export function TrustedBySection() {
  return (
    <section className="relative py-16 border-t border-primary/10">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-background/50 to-black/80" />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                -45deg,
                rgba(255, 255, 255, 0.025) 0px,
                rgba(255, 255, 255, 0.025) 1px,
                transparent 1px,
                transparent 10px
              )
            `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="trusted-by-heading-container text-center mb-8">
          <div className="w-10 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto mb-4" />
          <h2 className="text-xl font-medium text-muted-foreground mb-2">
            Trusted by Industry Leaders
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Partnering with global enterprises to transform fleet financing across industries
          </p>
        </div>

        <IndustryTags />
        <LogoCarousel />
        <TrustedByFooter />
      </div>
    </section>
  );
}