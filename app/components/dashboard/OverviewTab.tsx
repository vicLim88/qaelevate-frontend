import React from 'react';
import { Plus, Target, Bot, Atom, DollarSign } from 'lucide-react';
import { StatsCard } from '@/app/components/shared/StatsCard';
import { ProgressBar } from '@/app/components/shared/ProgressBar';
import { StatusBadge } from '@/app/components/shared/StatusBadge';
import { getStatusColor, formatCurrency } from '@/lib/helpers';
import { GRADIENTS } from '@/constants/theme';
import type { TestJob, AIAgent, QuantumMetrics } from '@/types/test.types';

interface OverviewTabProps {
  testJobs: TestJob[];
  aiAgents: AIAgent[];
  quantumMetrics: QuantumMetrics;
  onNewTest: () => void;
}

export function OverviewTab({ testJobs, aiAgents, quantumMetrics, onNewTest }: OverviewTabProps) {
  const activeAgents = aiAgents.filter(a => a.status !== 'idle').length;
  const totalCostToday = testJobs.reduce((sum, job) => sum + job.cost, 0);

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          icon={<Target className="w-5 h-5 text-white" />}
          value={testJobs.length}
          label="Active Tests"
          gradient={GRADIENTS.success}
        />
        <StatsCard
          icon={<Bot className="w-5 h-5 text-white" />}
          value={activeAgents}
          label="AI Agents Working"
          gradient={GRADIENTS.blue}
        />
        <StatsCard
          icon={<Atom className="w-5 h-5 text-white" />}
          value={`${quantumMetrics.advantageScore.toFixed(1)}%`}
          label="Quantum Advantage"
          gradient={GRADIENTS.purple}
        />
        <StatsCard
          icon={<DollarSign className="w-5 h-5 text-white" />}
          value={`$${totalCostToday.toFixed(2)}`}
          label="Cost Today"
          gradient={GRADIENTS.warning}
        />
      </div>

      {/* Recent Test Jobs */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Test Jobs</h2>
          <button
            onClick={onNewTest}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Test</span>
          </button>
        </div>

        <div className="space-y-3">
          {testJobs.slice(0, 3).map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-600/30"
            >
              <div className="flex items-center space-x-4">
                <StatusBadge
                  status={job.status}
                  colorClass={getStatusColor(job.status)}
                  showDot
                  dotAnimate
                />
                <div>
                  <div className="text-white font-medium">{job.url}</div>
                  <div className="text-sm text-gray-400 capitalize">
                    {job.status} • {job.testCases} test cases
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {job.quantumOptimized && (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-purple-500/20 rounded text-purple-400 text-xs">
                    <Atom className="w-3 h-3" />
                    <span>Quantum</span>
                  </div>
                )}
                <div className="text-right">
                  <div className="text-sm text-white">{job.progress.toFixed(0)}%</div>
                  <div className="text-xs text-gray-400">{formatCurrency(job.cost)}</div>
                </div>
                <ProgressBar progress={job.progress} className="w-20" height="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
