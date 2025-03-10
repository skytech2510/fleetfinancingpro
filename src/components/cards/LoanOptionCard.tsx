import React from 'react';
import { Card3D } from '../ui/Card3D';
import { Button } from '../ui/Button';
import { IconSystem } from '../icons/IconSystem';
import { DollarSign, CalendarDays, Percent, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoanOptionCardProps {
  title: string;
  amount: string;
  term: string;
  interestRate: string;
  monthlyPayment: string;
  featured?: boolean;
  onClick?: () => void;
}

export function LoanOptionCard({
  title,
  amount,
  term,
  interestRate,
  monthlyPayment,
  featured = false,
  onClick
}: LoanOptionCardProps) {
  return (
    <Card3D
      depth={featured ? "high" : "medium"}
      isPremium={featured}
      className="overflow-hidden"
    >
      {featured && (
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary to-secondary" />
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {featured && (
                <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                  Recommended
                </span>
              )}
              <h3 className={`font-semibold ${featured ? 'text-xl' : 'text-lg'}`}>
                {title}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Tailored for growing fleets
            </p>
          </div>
          
          <div className="flex h-12 w-12 rounded-full bg-primary/5 items-center justify-center">
            <IconSystem 
              category="financial" 
              variant={featured ? "premium" : "default"}
              filled={featured}
            >
              <DollarSign />
            </IconSystem>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
            <div className="flex items-center gap-2.5">
              <IconSystem size="sm" category="financial">
                <DollarSign />
              </IconSystem>
              <span className="text-sm">Loan Amount</span>
            </div>
            <span className="font-medium">{amount}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
            <div className="flex items-center gap-2.5">
              <IconSystem size="sm" category="financial">
                <CalendarDays />
              </IconSystem>
              <span className="text-sm">Term</span>
            </div>
            <span className="font-medium">{term}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
            <div className="flex items-center gap-2.5">
              <IconSystem size="sm" category="financial">
                <Percent />
              </IconSystem>
              <span className="text-sm">Interest Rate</span>
            </div>
            <span className="font-medium">{interestRate}</span>
          </div>
        </div>
        
        <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
          <div className="flex justify-between items-center">
            <span className="text-sm">Monthly Payment:</span>
            <span className="text-xl font-bold text-primary">{monthlyPayment}</span>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            variant={featured ? "primary" : "secondary"} 
            onClick={onClick}
            className="w-full"
            align="center"
          >
            <span className="flex items-center gap-2">
              {featured ? "Apply Now" : "View Details"}
              <ArrowRight className="w-4 h-4" />
            </span>
          </Button>
        </div>
        
        {featured && (
          <div className="mt-4 pt-4 border-t border-primary/10">
            <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Approval in as little as 24 hours</span>
            </div>
          </div>
        )}
      </div>
    </Card3D>
  );
}