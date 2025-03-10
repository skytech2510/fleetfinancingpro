import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { IconSystem } from '../icons/IconSystem';

export function TrustedByFooter() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
        <IconSystem category="status" size="sm">
          <CheckCircle />
        </IconSystem>
        <span className="text-sm text-muted-foreground">
          Trusted by 200+ industry leaders across 30 countries
        </span>
      </div>
      
      <button className="group flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
        See all partners
        <IconSystem category="action" size="sm" className="group-hover:translate-x-1 transition-transform">
          <ArrowRight />
        </IconSystem>
      </button>
    </div>
  );
}