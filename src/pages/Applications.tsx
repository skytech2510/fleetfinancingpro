import React from 'react';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

const applicationStatuses = {
  draft: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  submitted: { icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  approved: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
  rejected: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
};

const mockApplications = [
  {
    id: 1,
    title: 'Fleet Expansion - 5 Trucks',
    status: 'submitted',
    amount: 500000,
    date: '2024-03-15',
    type: 'Semi-Truck',
  },
  {
    id: 2,
    title: 'Equipment Upgrade',
    status: 'approved',
    amount: 250000,
    date: '2024-03-10',
    type: 'Trailer',
  },
  {
    id: 3,
    title: 'New Fleet Addition',
    status: 'draft',
    amount: 750000,
    date: '2024-03-05',
    type: 'Box Truck',
  },
];

export function Applications() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Loan Applications</h1>
          <p className="text-text-secondary mt-2">Manage and track your fleet financing applications</p>
        </div>
        <Button variant="primary">New Application</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(applicationStatuses).map(([status, { icon: Icon, color, bg }]) => (
          <div key={status} className="bg-background-card p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-4">
              <div className={`p-3 ${bg} rounded-lg`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div>
                <h3 className="text-sm text-text-secondary capitalize">{status}</h3>
                <p className="text-xl font-semibold">
                  {mockApplications.filter(app => app.status === status).length}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-background-card rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-background-dark">
          <h2 className="text-xl font-semibold">Recent Applications</h2>
        </div>
        <div className="divide-y divide-background-dark">
          {mockApplications.map((application) => {
            const { icon: StatusIcon, color, bg } = applicationStatuses[application.status as keyof typeof applicationStatuses];
            return (
              <div key={application.id} className="p-6 hover:bg-background-dark/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 ${bg} rounded-lg`}>
                      <StatusIcon className={`w-6 h-6 ${color}`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{application.title}</h3>
                      <p className="text-sm text-text-secondary">
                        {application.type} • ${application.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-text-secondary">Submitted on</p>
                    <p className="font-medium">{new Date(application.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}