import React from 'react';
import { CreditCard, TrendingUp, AlertCircle, Shield } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const creditScoreData = [
  { month: 'Jan', score: 680 },
  { month: 'Feb', score: 695 },
  { month: 'Mar', score: 705 },
  { month: 'Apr', score: 715 },
  { month: 'May', score: 725 },
  { month: 'Jun', score: 735 },
];

export function Credit() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Credit Overview</h1>
        <p className="text-text-secondary mt-2">Monitor and improve your credit profile</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-background-card p-6 rounded-xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm text-text-secondary">Credit Score</h3>
              <p className="text-xl font-semibold">735</p>
              <p className="text-xs text-green-400">+10 points this month</p>
            </div>
          </div>
        </div>

        <div className="bg-background-card p-6 rounded-xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm text-text-secondary">Credit Utilization</h3>
              <p className="text-xl font-semibold">15%</p>
              <p className="text-xs text-green-400">Excellent</p>
            </div>
          </div>
        </div>

        <div className="bg-background-card p-6 rounded-xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <AlertCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm text-text-secondary">Payment History</h3>
              <p className="text-xl font-semibold">100%</p>
              <p className="text-xs text-green-400">All payments on time</p>
            </div>
          </div>
        </div>

        <div className="bg-background-card p-6 rounded-xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm text-text-secondary">Account Age</h3>
              <p className="text-xl font-semibold">5.2 years</p>
              <p className="text-xs text-yellow-400">Good</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background-card rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-6">Credit Score History</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={creditScoreData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" domain={[600, 850]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorScore)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-background-card rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Credit Factors</h2>
          <div className="space-y-4">
            {[
              { name: 'Payment History', value: 35, score: 'Excellent' },
              { name: 'Credit Utilization', value: 30, score: 'Good' },
              { name: 'Length of Credit', value: 15, score: 'Fair' },
              { name: 'Credit Mix', value: 10, score: 'Good' },
              { name: 'New Credit', value: 10, score: 'Excellent' },
            ].map((factor) => (
              <div key={factor.name} className="p-4 bg-background-dark rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{factor.name}</span>
                  <span className="text-sm text-green-400">{factor.score}</span>
                </div>
                <div className="w-full bg-background-card rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2"
                    style={{ width: `${factor.value}%` }}
                  />
                </div>
                <p className="text-sm text-text-secondary mt-1">{factor.value}% of score</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background-card rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Keep Credit Utilization Low',
                description: 'Try to keep your credit utilization below 30% to maintain a good credit score.',
                impact: 'High Impact',
              },
              {
                title: 'Make Payments on Time',
                description: 'Continue making all payments on time to maintain your excellent payment history.',
                impact: 'High Impact',
              },
              {
                title: 'Limit New Credit Applications',
                description: 'Avoid applying for new credit unless necessary to minimize hard inquiries.',
                impact: 'Medium Impact',
              },
            ].map((rec) => (
              <div key={rec.title} className="p-4 bg-background-dark rounded-lg">
                <h3 className="font-medium mb-2">{rec.title}</h3>
                <p className="text-sm text-text-secondary mb-2">{rec.description}</p>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {rec.impact}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}