import React, { useState } from 'react';
import { User, Building, Bell, Lock, CreditCard, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

// Component imports
import { ProfileSettings } from './settings/ProfileSettings';
import { CompanySettings } from './settings/CompanySettings';
import { NotificationSettings } from './settings/NotificationSettings';
import { SecuritySettings } from './settings/SecuritySettings';
import { BillingSettings } from './settings/BillingSettings';
import { SupportSettings } from './settings/SupportSettings';

type SettingsTab = 'profile' | 'company' | 'notifications' | 'security' | 'billing' | 'support';

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'company':
        return <CompanySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'billing':
        return <BillingSettings />;
      case 'support':
        return <SupportSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-text-secondary mt-2">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sticky Navigation Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-background-card rounded-xl shadow-lg p-4">
              <nav className="space-y-2">
                {[
                  { icon: User, label: 'Profile', value: 'profile' },
                  { icon: Building, label: 'Company', value: 'company' },
                  { icon: Bell, label: 'Notifications', value: 'notifications' },
                  { icon: Lock, label: 'Security', value: 'security' },
                  { icon: CreditCard, label: 'Billing', value: 'billing' },
                  { icon: HelpCircle, label: 'Support', value: 'support' },
                ].map(({ icon: Icon, label, value }) => (
                  <Button
                    key={value}
                    variant={activeTab === value ? 'primary' : 'ghost'}
                    className={`w-full justify-end items-center ${
                      activeTab === value 
                        ? 'bg-primary/20 text-primary border border-primary/20' 
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                    onClick={() => setActiveTab(value as SettingsTab)}
                  >
                    <div className="flex items-center gap-3 justify-end w-full">
                      <span className="text-right">{label}</span>
                      <Icon className="w-5 h-5 flex-shrink-0" />
                    </div>
                  </Button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}