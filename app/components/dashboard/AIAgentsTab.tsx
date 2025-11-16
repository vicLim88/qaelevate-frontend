import React from 'react';
import { ProgressBar } from '@/app/components/shared/ProgressBar';
import { getAgentIcon, getAgentStatusBg } from '@/lib/helpers';
import type { AIAgent } from '@/types/test.types';

interface AIAgentsTabProps {
  agents: AIAgent[];
}

export function AIAgentsTab({ agents }: AIAgentsTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">AI Agent Swarm</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => {
          const IconComponent = getAgentIcon(agent.type);
          
          return (
            <div
              key={agent.id}
              className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getAgentStatusBg(agent.status)}`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white capitalize">{agent.type} Agent</h3>
                  <p className="text-sm text-gray-400 capitalize">{agent.status}</p>
                </div>
              </div>

              {agent.currentTask && (
                <div className="mb-4 p-3 bg-gray-800/30 rounded-lg">
                  <p className="text-sm text-gray-300">{agent.currentTask}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Efficiency</span>
                <span className="text-lg font-bold text-white">{agent.efficiency}%</span>
              </div>
              <ProgressBar progress={agent.efficiency} height="sm" className="mt-2" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
