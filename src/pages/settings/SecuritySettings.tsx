import React, { useState } from 'react';
import { Key, Shield, Smartphone, History } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function SecuritySettings() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const securityItems = [
    {
      icon: Shield,
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      action: 'Enable'
    },
    {
      icon: Smartphone,
      title: 'Trusted Devices',
      description: 'Manage devices that have access to your account',
      action: 'Manage'
    },
    {
      icon: History,
      title: 'Login History',
      description: 'View your recent login activity',
      action: 'View'
    }
  ];

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = () => {
    // Add password validation logic here
    alert('Password updated successfully!');
    setShowChangePassword(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-background-card rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Key className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Password</h2>
              <p className="text-sm text-muted-foreground">
                Manage your password settings
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowChangePassword(!showChangePassword)}
          >
            Change Password
          </Button>
        </div>

        {showChangePassword && (
          <div className="space-y-4 mt-6">
            <Input
              type="password"
              name="currentPassword"
              label="Current Password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
            <Input
              type="password"
              name="newPassword"
              label="New Password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
            <Input
              type="password"
              name="confirmPassword"
              label="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
            <div className="flex justify-end gap-4">
              <Button
                variant="ghost"
                onClick={() => setShowChangePassword(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handlePasswordSubmit}>
                Update Password
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-background-card rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
        <div className="space-y-4">
          {securityItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-primary/10 hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
                <Button variant="ghost">{item.action}</Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}