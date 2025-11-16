import React from 'react';
import { Plus, Atom } from 'lucide-react';
import { ProgressBar } from '@/app/components/shared/ProgressBar';
import { getStatusColor, formatCurrency, calculateSuccessRate } from '@/lib/helpers';
import type { TestJob } from '@/types/test.types';

interface TestJobsTabProps {
  testJobs: TestJob[];
  onNewTest: () => void;
}

export function TestJobsTab({ testJobs, onNewTest }: TestJobsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Test Jobs</h2>
        <button
          onClick={onNewTest}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white hover:from-purple-700 hover:to-blue-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Start New Test</span>
        </button>
      </div>

      <div className="grid gap-4">
        {testJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full ${getStatusColor(job.status)} animate-pulse`} />
                <div>
                  <h3 className="text-lg font-semibold text-white">{job.url}</h3>
                  <p className="text-sm text-gray-400">
                    Started {job.startTime.toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {job.quantumOptimized && (
                  <div className="flex items-center space-x-2 px-3 py-1 bg-purple-500/20 rounded-lg border border-purple-500/30">
                    <Atom className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-400 text-sm">Quantum Enhanced</span>
                  </div>
                )}
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{job.progress.toFixed(0)}%</div>
                  <div className="text-sm text-gray-400">{formatCurrency(job.cost)} cost</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{job.testCases}</div>
                <div className="text-xs text-gray-400">Total Tests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{job.passed}</div>
                <div className="text-xs text-gray-400">Passed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{job.failed}</div>
                <div className="text-xs text-gray-400">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {calculateSuccessRate(job.passed, job.testCases)}%
                </div>
                <div className="text-xs text-gray-400">Success Rate</div>
              </div>
            </div>

            <ProgressBar progress={job.progress} height="md" showPercentage={false} className="mb-2" />

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 capitalize">{job.status}</span>
              <span className="text-gray-400">
                {job.status === 'completed' ? 'Completed' : 'In Progress'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
