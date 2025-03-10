import React from 'react';
import { IconSystem, IconSystemProps } from './IconSystem';
import { DollarSign, CreditCard, Percent, Calculator, Calendar, TrendingUp, FileText } from 'lucide-react';

export function LoanIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="financial">
      <DollarSign />
    </IconSystem>
  );
}

export function PaymentIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="financial">
      <CreditCard />
    </IconSystem>
  );
}

export function InterestRateIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="financial">
      <Percent />
    </IconSystem>
  );
}

export function CalculatorIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="financial">
      <Calculator />
    </IconSystem>
  );
}

export function LoanTermIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="financial">
      <Calendar />
    </IconSystem>
  );
}

export function CreditScoreIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="financial">
      <TrendingUp />
    </IconSystem>
  );
}

export function ApplicationIcon(props: Omit<IconSystemProps, 'children' | 'category'>) {
  return (
    <IconSystem {...props} category="financial">
      <FileText />
    </IconSystem>
  );
}