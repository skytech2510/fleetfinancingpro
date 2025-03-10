import React, { useState } from 'react';
import { DollarSign, Calendar, Percent, Calculator } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card3D } from '../components/ui/Card3D';
import { GradientBorder } from '../components/ui/GradientBorder';
import { IconSystem } from '../components/icons/IconSystem';
import { LoanOptionCard } from '../components/cards/LoanOptionCard';

export function Financing() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(4.5);
  const [monthlyPayment, setMonthlyPayment] = useState(9324.53);

  const handleCalculate = () => {
    // Simple loan calculation formula: P = L[c(1 + c)^n]/[(1 + c)^n - 1]
    // where P = payment, L = loan amount, c = interest rate / 12 / 100, n = loan term in months
    const c = interestRate / 12 / 100;
    const n = loanTerm;
    const payment = loanAmount * (c * Math.pow(1 + c, n)) / (Math.pow(1 + c, n) - 1);
    setMonthlyPayment(parseFloat(payment.toFixed(2)));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Financing Options</h1>
        <p className="text-text-secondary mt-2">Compare and choose the best financing options for your fleet</p>
      </div>

      <Card3D depth="medium" interactive={false} className="p-6">
        <h2 className="text-xl font-semibold mb-6">Loan Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Input
              label="Loan Amount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              placeholder="Enter loan amount"
            />
            <Input
              label="Loan Term (months)"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              placeholder="Enter loan term"
            />
            <Input
              label="Interest Rate (%)"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              placeholder="Enter interest rate"
            />
            <Button variant="primary" className="w-full" onClick={handleCalculate} align="center">Calculate</Button>
          </div>

          <Card3D depth="low" interactive={false} className="p-6 bg-card/30">
            <h3 className="text-lg font-medium mb-4">Payment Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-card/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <IconSystem category="financial">
                    <Calculator />
                  </IconSystem>
                  <span>Monthly Payment</span>
                </div>
                <span className="font-semibold">${monthlyPayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-card/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <IconSystem category="financial">
                    <DollarSign />
                  </IconSystem>
                  <span>Total Interest</span>
                </div>
                <span className="font-semibold">
                  ${((monthlyPayment * loanTerm) - loanAmount).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-card/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <IconSystem category="financial">
                    <Percent />
                  </IconSystem>
                  <span>APR</span>
                </div>
                <span className="font-semibold">{interestRate}%</span>
              </div>
            </div>
          </Card3D>
        </div>
      </Card3D>

      <div>
        <h2 className="text-xl font-semibold mb-6">Available Lenders</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LoanOptionCard
            title="Standard Loan"
            amount="$500,000"
            term="60 months"
            interestRate="4.5%"
            monthlyPayment="$9,324.53"
          />
          
          <GradientBorder type="primary" level="prominent">
            <LoanOptionCard
              title="Premium Fleet Package"
              amount="$750,000"
              term="72 months"
              interestRate="3.9%"
              monthlyPayment="$11,875.24"
              featured={true}
            />
          </GradientBorder>
          
          <LoanOptionCard
            title="Budget Option"
            amount="$250,000"
            term="48 months"
            interestRate="5.2%"
            monthlyPayment="$5,782.16"
          />
        </div>
      </div>
    </div>
  );
}