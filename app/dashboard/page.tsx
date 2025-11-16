'use client';

import React, { useState } from 'react';
import { BarChart3, Target, Bot, Atom, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { TabNavigation } from '@/app/components/layout/TabNavigation';
import { OverviewTab } from '@/app/components/dashboard/OverviewTab';
import { TestJobsTab } from '@/app/components/dashboard/TestJobsTab';
import { AIAgentsTab } from '@/app/components/dashboard/AIAgentsTab';
import { useNetworkStats } from '@/hooks/useNetworkStats';
import { useQuantumMetrics } from '@/hooks/useQuantumMetrics';
import { useLiveTestUpdates } from '@/hooks/useLiveTestUpdates';
import type { DashboardTab, TestJob, AIAgent, User } from '@/types/test.types';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const networkStats = useNetworkStats();
  const quantumMetrics = useQuantumMetrics();

  const [user] = useState<User>({
    id: 'user-001',
    name: 'Alex Chen',
    email: 'alex@qaelevate.com',
    role: 'developer',
  });

  const [testJobs, setTestJobs] = useState<TestJob[]>([
    {
      id: 'test-001',
      url: 'https://ecommerce-demo.com',
      status: 'executing',
      progress: 67,
      startTime: new Date(Date.now() - 1200000),
      testCases: 45,
      passed: 28,
      failed: 2,
      quantumOptimized: true,
      cost: 0.0225,
    },
    {
      id: 'test-002',
      url: 'https://banking-app.demo',
      status: 'optimizing',
      progress: 23,
      startTime: new Date(Date.now() - 300000),
      testCases: 67,
      passed: 0,
      failed: 0,
      quantumOptimized: true,
      cost: 0.0335,
    },
    {
      id: 'test-003',
      url: 'https://portfolio-site.com',
      status: 'completed',
      progress: 100,
      startTime: new Date(Date.now() - 2400000),
      testCases: 23,
      passed: 21,
      failed: 2,
      quantumOptimized: false,
      cost: 0.0115,
    },
  ]);

  const [aiAgents] = useState<AIAgent[]>([
    {
      id: 'agent-001',
      type: 'discovery',
      status: 'busy',
      currentTask: 'Mapping ecommerce-demo.com',
      efficiency: 94,
    },
    {
      id: 'agent-002',
      type: 'functional',
      status: 'active',
      currentTask: 'Testing checkout flow',
      efficiency: 87,
    },
    {
      id: 'agent-003',
      type: 'visual',
      status: 'active',
      currentTask: 'Responsive design validation',
      efficiency: 91,
    },
    { id: 'agent-004', type: 'performance', status: 'idle', efficiency: 89 },
    {
      id: 'agent-005',
      type: 'security',
      status: 'busy',
      currentTask: 'OWASP Top 10 scan',
      efficiency: 96,
    },
  ]);

  // Enable live updates
  useLiveTestUpdates(testJobs, setTestJobs);

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: BarChart3 },
    { id: 'tests' as const, label: 'Test Jobs', icon: Target },
    { id: 'agents' as const, label: 'AI Agents', icon: Bot },
    { id: 'quantum' as const, label: 'Quantum', icon: Atom },
    { id: 'analytics' as const, label: 'Analytics', icon: TrendingUp },
  ];

  const startNewTest = () => {
    const newTest: TestJob = {
      id: `test-${Date.now()}`,
      url: 'https://new-application.com',
      status: 'discovering',
      progress: 0,
      startTime: new Date(),
      testCases: 0,
      passed: 0,
      failed: 0,
      quantumOptimized: true,
      cost: 0,
    };
    setTestJobs((prev) => [newTest, ...prev]);
  };

  return (
    <DashboardLayout user={user} networkStats={networkStats} showNetworkBar={false}>
      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'overview' && (
        <OverviewTab
          testJobs={testJobs}
          aiAgents={aiAgents}
          quantumMetrics={quantumMetrics}
          onNewTest={startNewTest}
        />
      )}

      {activeTab === 'tests' && <TestJobsTab testJobs={testJobs} onNewTest={startNewTest} />}

      {activeTab === 'agents' && <AIAgentsTab agents={aiAgents} />}

      {activeTab === 'quantum' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Quantum Computing Center</h2>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <p className="text-gray-300">Quantum metrics visualization coming soon...</p>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Analytics & Insights</h2>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <p className="text-gray-300">Analytics dashboard coming soon...</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
