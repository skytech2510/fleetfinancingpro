import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: any;
  enabled: boolean;
}

export function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'email',
      title: 'Email Notifications',
      description: 'Receive email updates about your account activity',
      icon: Mail,
      enabled: true,
    },
    {
      id: 'app',
      title: 'In-App Notifications',
      description: 'Receive notifications within the application',
      icon: Bell,
      enabled: true,
    },
    {
      id: 'messages',
      title: 'Message Notifications',
      description: 'Get notified when you receive new messages',
      icon: MessageSquare,
      enabled: false,
    },
    {
      id: 'alerts',
      title: 'Security Alerts',
      description: 'Receive alerts about security-related activities',
      icon: AlertTriangle,
      enabled: true,
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === id
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const handleSave = () => {
    alert('Notification settings saved successfully!');
  };

  return (
    <div className="bg-background-card rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
      <div className="space-y-6">
        {settings.map(setting => {
          const Icon = setting.icon;
          return (
            <div
              key={setting.id}
              className="flex items-start justify-between p-4 rounded-lg bg-background/50 border border-primary/10 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{setting.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {setting.description}
                  </p>
                </div>
              </div>
              <Button
                variant={setting.enabled ? 'primary' : 'ghost'}
                onClick={() => toggleSetting(setting.id)}
              >
                {setting.enabled ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          );
        })}

        <div className="flex justify-end gap-4 mt-8">
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}