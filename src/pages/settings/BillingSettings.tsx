import React from 'react';
import { CreditCard, DollarSign, Clock, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const transactions = [
  {
    id: 1,
    date: '2024-03-15',
    description: 'Monthly Subscription',
    amount: 49.99,
    status: 'completed'
  },
  {
    id: 2,
    date: '2024-02-15',
    description: 'Monthly Subscription',
    amount: 49.99,
    status: 'completed'
  },
  {
    id: 3,
    date: '2024-01-15',
    description: 'Monthly Subscription',
    amount: 49.99,
    status: 'completed'
  }
];

export function BillingSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-background-card rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Payment Method</h2>
              <p className="text-sm text-muted-foreground">
                Manage your payment methods
              </p>
            </div>
          </div>
          <Button variant="primary">Add Payment Method</Button>
        </div>

        <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CreditCard className="w-6 h-6 text-primary" />
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
            </div>
            <Button variant="ghost">Edit</Button>
          </div>
        </div>
      </div>

      <div className="bg-background-card rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Subscription Plan</h2>
              <p className="text-sm text-muted-foreground">
                Your current plan and usage
              </p>
            </div>
          </div>
          <Button variant="primary">Upgrade Plan</Button>
        </div>

        <div className="p-4 rounded-lg bg-background/50 border border-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Professional Plan</h3>
              <p className="text-sm text-muted-foreground">
                $49.99/month • Next billing date: April 15, 2024
              </p>
            </div>
            <Button variant="ghost">Change Plan</Button>
          </div>
        </div>
      </div>

      <div className="bg-background-card rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Billing History</h2>
          </div>
          <Button variant="ghost" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download All
          </Button>
        </div>

        <div className="space-y-4">
          {transactions.map(transaction => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-primary/10"
            >
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium">
                  ${transaction.amount.toFixed(2)}
                </span>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}