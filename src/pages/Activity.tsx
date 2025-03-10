import React, { useState } from 'react';
import { Activity as ActivityIcon, ArrowUpRight, ArrowDownRight, RefreshCw, Filter, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';

type ActivityType = 'all' | 'application' | 'payment' | 'credit';
type ActivityStatus = 'all' | 'pending' | 'completed';

interface Activity {
  id: number;
  type: 'application' | 'payment' | 'credit';
  title: string;
  description: string;
  amount?: string;
  date: string;
  status: 'pending' | 'completed';
}

const activities: Activity[] = [
  {
    id: 1,
    type: 'application',
    title: 'Loan Application Submitted',
    description: 'Fleet Expansion - 5 Trucks',
    amount: '$500,000',
    date: '2024-03-15 14:30',
    status: 'pending',
  },
  {
    id: 2,
    type: 'payment',
    title: 'Payment Processed',
    description: 'Monthly Payment for Loan #1234',
    amount: '$2,500',
    date: '2024-03-14 09:15',
    status: 'completed',
  },
  {
    id: 3,
    type: 'credit',
    title: 'Credit Score Updated',
    description: 'Score increased by 10 points',
    date: '2024-03-13 16:45',
    status: 'completed',
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'application':
      return ActivityIcon;
    case 'payment':
      return type === 'incoming' ? ArrowDownRight : ArrowUpRight;
    case 'credit':
      return RefreshCw;
    default:
      return ActivityIcon;
  }
};

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'application', label: 'Applications' },
  { value: 'payment', label: 'Payments' },
  { value: 'credit', label: 'Credit Updates' },
];

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

const dateRangeOptions = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
];

export function Activity() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all' as ActivityType,
    status: 'all' as ActivityStatus,
    dateRange: 'all' as string,
  });

  const filteredActivities = activities.filter(activity => {
    if (filters.type !== 'all' && activity.type !== filters.type) return false;
    if (filters.status !== 'all' && activity.status !== filters.status) return false;
    // Add date range filtering logic here if needed
    return true;
  });

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: 'all',
      status: 'all',
      dateRange: 'all',
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Activity Log</h1>
        <p className="text-text-secondary mt-2">Track all your financing activities</p>
      </div>

      <div className="bg-background-card rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-background-dark">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <div className="flex gap-2">
              <Button 
                variant={showFilters ? "primary" : "secondary"}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="primary">Export</Button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-background/50 rounded-lg border border-primary/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-sm flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  label="Activity Type"
                  options={typeOptions}
                  value={filters.type}
                  onChange={(value) => handleFilterChange('type', value)}
                />
                <Select
                  label="Status"
                  options={statusOptions}
                  value={filters.status}
                  onChange={(value) => handleFilterChange('status', value)}
                />
                <Select
                  label="Date Range"
                  options={dateRangeOptions}
                  value={filters.dateRange}
                  onChange={(value) => handleFilterChange('dateRange', value)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="divide-y divide-background-dark">
          {filteredActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="p-6 hover:bg-background-dark/50 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{activity.title}</h3>
                        <p className="text-sm text-text-secondary">{activity.description}</p>
                      </div>
                      {activity.amount && (
                        <span className="font-medium">{activity.amount}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-text-secondary">
                        {new Date(activity.date).toLocaleString()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        activity.status === 'completed' 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
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