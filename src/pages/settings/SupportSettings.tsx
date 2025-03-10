import React from 'react';
import { MessageSquare, Phone, Mail, FileText } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function SupportSettings() {
  const supportChannels = [
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our support team',
      action: 'Start Chat',
      availability: 'Available 24/7'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us for immediate help',
      action: 'Call Now',
      availability: 'Mon-Fri, 9AM-6PM EST'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email',
      action: 'Send Email',
      availability: 'Response within 24 hours'
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Browse our help articles',
      action: 'View Docs',
      availability: 'Self-service'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-background-card rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Contact Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-lg bg-background/50 border border-primary/10 hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{channel.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {channel.description}
                    </p>
                    <p className="text-xs text-primary mt-2">
                      {channel.availability}
                    </p>
                    <Button
                      variant="ghost"
                      className="mt-4 w-full justify-center"
                    >
                      {channel.action}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-background-card rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Submit a Request</h2>
        <div className="space-y-4">
          <Input
            label="Subject"
            placeholder="Enter the subject of your request"
          />
          <Input
            label="Message"
            placeholder="Describe your issue or question"
            multiline
            rows={4}
          />
          <div className="flex justify-end gap-4">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Submit Request</Button>
          </div>
        </div>
      </div>

      <div className="bg-background-card rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">FAQs</h2>
        <div className="space-y-4">
          {[
            {
              question: 'How do I reset my password?',
              answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page.'
            },
            {
              question: 'How do I update my billing information?',
              answer: 'Go to Settings > Billing to update your payment method and billing details.'
            },
            {
              question: 'Can I change my subscription plan?',
              answer: 'Yes, you can change your plan anytime from the Billing section in your settings.'
            }
          ].map((faq, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-background/50 border border-primary/10"
            >
              <h3 className="font-medium">{faq.question}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}