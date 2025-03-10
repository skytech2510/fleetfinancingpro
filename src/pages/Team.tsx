import React from 'react';
import { Users, UserPlus, Settings, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';

const teamMembers = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Fleet Manager',
    email: 'john.smith@example.com',
    status: 'active',
    permissions: ['view', 'edit', 'approve'],
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Financial Analyst',
    email: 'sarah.johnson@example.com',
    status: 'active',
    permissions: ['view', 'edit'],
  },
  {
    id: 3,
    name: 'Michael Brown',
    role: 'Account Manager',
    email: 'michael.brown@example.com',
    status: 'inactive',
    permissions: ['view'],
  },
];

export function Team() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-text-secondary mt-2">Manage your team members and their permissions</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Add Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background-card p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm text-text-secondary">Total Members</h3>
              <p className="text-xl font-semibold">3</p>
            </div>
          </div>
        </div>

        <div className="bg-background-card p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm text-text-secondary">Active Members</h3>
              <p className="text-xl font-semibold">2</p>
            </div>
          </div>
        </div>

        <div className="bg-background-card p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm text-text-secondary">Pending Invites</h3>
              <p className="text-xl font-semibold">1</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background-card rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-background-dark">
          <h2 className="text-xl font-semibold">Team Members</h2>
        </div>
        <div className="divide-y divide-background-dark">
          {teamMembers.map((member) => (
            <div key={member.id} className="p-6 hover:bg-background-dark/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-lg font-medium text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-text-secondary">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    member.status === 'active'
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {member.status}
                  </span>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Settings className="w-5 h-5 text-text-secondary" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                {member.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}