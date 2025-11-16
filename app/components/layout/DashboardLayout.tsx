import React, { type ReactNode } from 'react';
import { Brain } from 'lucide-react';
import { NetworkStatusBar } from '@/app/components/shared/NetworkStatusBar';
import type { User, NetworkStats } from '@/types/test.types';

interface DashboardLayoutProps {
  children: ReactNode;
  user: User;
  networkStats: NetworkStats;
  showNetworkBar?: boolean;
  headerActions?: ReactNode;
  title?: string;
  subtitle?: string;
}

export function DashboardLayout({
  children,
  user,
  networkStats,
  showNetworkBar = true,
  headerActions,
  title = 'QAElevate',
  subtitle = 'Quantum-Enhanced AI Testing',
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Network Stats Bar */}
      {showNetworkBar && (
        <NetworkStatusBar stats={networkStats} className="absolute top-0 left-0 right-0 z-20" />
      )}

      {/* Header */}
      <div className={`bg-gradient-to-r from-purple-900/80 to-blue-900/80 backdrop-blur-sm border-b border-purple-500/30 p-4 ${showNetworkBar ? 'mt-12' : ''}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{title}</h1>
                <p className="text-xs text-gray-300">{subtitle}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {headerActions}
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-lg px-3 py-2 border border-white/20">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">{user.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-white">{user.name}</div>
                <div className="text-xs text-gray-400">{user.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {children}
      </div>
    </div>
  );
}
