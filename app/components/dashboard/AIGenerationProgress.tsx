'use client';

import React from 'react';
import { Brain, Atom } from 'lucide-react';
import type { DiscoveryProgress } from '@/types/test.types';

interface AIGenerationProgressProps {
  progress: DiscoveryProgress;
}

export function AIGenerationProgress({ progress }: AIGenerationProgressProps) {
  return (
    <div className="max-w-4xl mx-auto text-center py-16">
      <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-500/20 to-blue-600/20 rounded-full flex items-center justify-center border border-purple-500/30">
        <div className="relative">
          <Brain className="w-16 h-16 text-purple-400 animate-pulse" />
          <Atom className="w-8 h-8 text-blue-400 absolute -top-2 -right-2 animate-spin" />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-4">AI Agents Analyzing Your Application</h2>
      <p className="text-gray-400 mb-2">
        {progress.currentAction || 'Discovery agents are mapping your application structure...'}
      </p>
      <p className="text-sm text-gray-500 mb-8">
        Phase: {progress.phase.charAt(0).toUpperCase() + progress.phase.slice(1)}
      </p>
      
      {/* Progress Bar */}
      <div className="w-full max-w-2xl mx-auto mb-8">
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-purple-600 to-blue-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress.progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>{progress.progress.toFixed(0)}% Complete</span>
          <span>{Math.floor(progress.timeElapsed / 1000)}s elapsed</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="text-2xl font-bold text-blue-400">{progress.pagesFound}</div>
          <div className="text-sm text-gray-400">Pages Found</div>
        </div>
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="text-2xl font-bold text-purple-400">{progress.flowsDiscovered}</div>
          <div className="text-sm text-gray-400">Flows Discovered</div>
        </div>
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="text-2xl font-bold text-green-400">{progress.testCasesGenerated}</div>
          <div className="text-sm text-gray-400">Tests Generated</div>
        </div>
      </div>
    </div>
  );
}
