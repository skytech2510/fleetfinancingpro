import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, CreditCard, ChevronDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Card3D } from '../components/ui/Card3D';
import { GradientBorder } from '../components/ui/GradientBorder';
import { IconSystem } from '../components/icons/IconSystem';
import { ToggleChevronIcon } from '../components/icons/AnimatedIcons';
import * as XLSX from 'xlsx';

const dailyData = [
  { name: 'Mon', value: 300 },
  { name: 'Tue', value: 450 },
  { name: 'Wed', value: 400 },
  { name: 'Thu', value: 550 },
  { name: 'Fri', value: 500 },
  { name: 'Sat', value: 400 },
  { name: 'Sun', value: 600 },
];

const weeklyData = [
  { name: 'Week 1', value: 2000 },
  { name: 'Week 2', value: 2400 },
  { name: 'Week 3', value: 1800 },
  { name: 'Week 4', value: 2600 },
];

const monthlyData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

const StatCard = ({ icon: Icon, title, value, trend, isPremium = false }: { 
  icon: React.ElementType, 
  title: string, 
  value: string, 
  trend?: string,
  isPremium?: boolean 
}) => (
  <Card3D 
    depth="medium" 
    isPremium={isPremium} 
    hoverEffect="lift"
    className="group p-6"
  >
    <div className="relative flex items-start gap-4">
      <div className="p-3 backdrop-blur-md rounded-lg transition-all duration-300 ring-1 ring-white/10 group-hover:ring-white/20">
        <IconSystem 
          size="md" 
          category="financial" 
          variant={isPremium ? "premium" : "default"}
        >
          <Icon />
        </IconSystem>
      </div>
      <div>
        <h3 className="text-sm text-text-secondary">{title}</h3>
        <p className="text-xl font-semibold">{value}</p>
        {trend && <p className="text-xs text-green-400">{trend}</p>}
      </div>
    </div>
  </Card3D>
);

export function Dashboard() {
  const { user } = useAuth();
  const [timePeriod, setTimePeriod] = useState('monthly');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getDataByTimePeriod = () => {
    switch (timePeriod) {
      case 'daily':
        return dailyData;
      case 'weekly':
        return weeklyData;
      default:
        return monthlyData;
    }
  };

  const handleExport = () => {
    const data = getDataByTimePeriod();
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Financing Data');
    
    // Add some styling to the header
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1:B1');
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_col(C) + '1';
      if (!ws[address]) continue;
      ws[address].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: "4F46E5" } },
        alignment: { horizontal: "center" }
      };
    }

    // Auto-size columns
    const colWidths = data.reduce((acc, row) => {
      Object.keys(row).forEach((key, i) => {
        const length = row[key].toString().length;
        acc[i] = Math.max(acc[i] || 0, length);
      });
      return acc;
    }, []);
    ws['!cols'] = colWidths.map(w => ({ wch: w + 2 }));

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `financing_data_${timePeriod}_${timestamp}.xlsx`;

    // Save the file
    XLSX.writeFile(wb, filename);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Welcome back, {user?.full_name || 'Fleet Manager'}</h1>
        <p className="text-text-secondary mt-2">Here's an overview of your fleet financing</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={DollarSign}
          title="Total Financing"
          value="$1.2M"
          trend="+12.5% from last month"
          isPremium={true}
        />
        <StatCard 
          icon={CreditCard}
          title="Active Loans"
          value="24"
        />
        <StatCard 
          icon={Users}
          title="New Applications"
          value="8"
          trend="+3 this week"
        />
        <StatCard 
          icon={TrendingUp}
          title="Approval Rate"
          value="92%"
          isPremium={true}
        />
      </div>

      <GradientBorder type="primary" level="prominent" animated={true}>
        <Card3D 
          depth="high" 
          interactive={false} 
          className="p-6"
          isPremium={true}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Financing Overview</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Button
                  variant="secondary"
                  className="flex items-center gap-2"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="capitalize">{timePeriod}</span>
                  <ToggleChevronIcon isOpen={isDropdownOpen} size="sm" />
                </Button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-card/95 backdrop-blur-xl rounded-lg border border-primary/10 shadow-lg z-50">
                    <div className="py-1">
                      {['daily', 'weekly', 'monthly'].map((period) => (
                        <button
                          key={period}
                          className={`w-full px-4 py-2 text-left hover:bg-primary/10 transition-colors duration-200 capitalize
                            ${timePeriod === period ? 'text-primary' : 'text-foreground'}`}
                          onClick={() => {
                            setTimePeriod(period);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Button variant="primary" onClick={handleExport}>Export</Button>
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getDataByTimePeriod()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(0, 86, 179)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="rgb(0, 212, 255)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255, 255, 255, 0.1)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(21, 28, 40, 0.95)',
                    border: '1px solid rgba(0, 86, 179, 0.2)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0, 86, 179, 0.1)',
                    backdropFilter: 'blur(8px)',
                  }}
                  itemStyle={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  cursor={{ stroke: 'rgba(0, 86, 179, 0.2)', strokeWidth: 1 }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="rgb(0, 86, 179)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  dot={false}
                  activeDot={{
                    r: 6,
                    stroke: 'rgb(0, 86, 179)',
                    strokeWidth: 2,
                    fill: '#151C28'
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card3D>
      </GradientBorder>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card3D 
                key={i} 
                depth="low" 
                hoverEffect="tilt"
                className="p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Fleet Expansion Loan #{i}</h3>
                    <p className="text-sm text-text-secondary">Submitted 2 days ago</p>
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    In Review
                  </span>
                </div>
              </Card3D>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Recommended Lenders</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card3D 
                key={i} 
                depth="low" 
                className="p-4"
                isPremium={i === 1}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconSystem size="md" category="financial" variant={i === 1 ? "premium" : "default"}>
                        <BarChart3 />
                      </IconSystem>
                    </div>
                    <div>
                      <h3 className="font-medium">Premium Lender {i}</h3>
                      <p className="text-sm text-text-secondary">4.5% APR</p>
                    </div>
                  </div>
                  <Button variant="primary">Apply</Button>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}