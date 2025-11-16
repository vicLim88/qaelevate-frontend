import React from 'react';
import { Server, Activity, Gauge } from 'lucide-react';
import { formatNumber } from '@/lib/helpers';
import type { NetworkStats } from '@/types/test.types';

interface NetworkStatusBarProps {
  stats: NetworkStats;
  className?: string;
}

export function NetworkStatusBar({ stats, className = '' }: NetworkStatusBarProps) {
  const loadPercentage = Math.round(stats.systemLoad * 100);
  const loadColor = loadPercentage < 50 ? 'text-green-400' : loadPercentage < 75 ? 'text-yellow-400' : 'text-red-400';
  
  return (
    <div className={`bg-gradient-to-r from-purple-900/80 to-blue-900/80 backdrop-blur-sm border-b border-purple-500/30 p-3 ${className}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-white">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1">
            <Server className="w-3 h-3 text-green-400" />
            <span>{formatNumber(stats.totalNodes)} Compute Nodes</span>
          </div>
          <div className="flex items-center space-x-1">
            <Activity className="w-3 h-3 text-blue-400" />
            <span>{formatNumber(stats.activeTests)} Active Tests</span>
          </div>
          <div className="flex items-center space-x-1">
            <Activity className="w-3 h-3 text-purple-400" />
            <span>{formatNumber(stats.avgResponseTime)}ms Avg Response</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Gauge className={`w-3 h-3 ${loadColor}`} />
            <span>System Load: {loadPercentage}%</span>
          </div>
          <div className="text-green-400 font-medium">AI + Quantum Powered</div>
        </div>
      </div>
    </div>
  );
}
