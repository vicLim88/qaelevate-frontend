'use client';

import React from 'react';
import { Brain, Atom, Sparkles, Globe, CheckCircle2, Zap } from 'lucide-react';

interface ProgressMetrics {
  pagesDiscovered: number;
  flowsMapped: number;
  testsGenerated: number;
  elementsDetected: number;
}

interface TestDiscoveryProgressProps {
  progress: number;
  phase: 'discovering' | 'mapping' | 'detecting' | 'generating' | 'optimizing' | 'completed';
  metrics: ProgressMetrics;
  url: string;
}

export function TestDiscoveryProgress({ progress, phase, metrics, url }: TestDiscoveryProgressProps) {
  const phaseInfo = {
    discovering: { 
      label: 'Discovering Pages', 
      icon: Globe, 
      color: 'text-blue-400',
      description: 'AI agents are crawling and discovering all pages in your application'
    },
    mapping: { 
      label: 'Mapping User Flows', 
      icon: Brain, 
      color: 'text-purple-400',
      description: 'Analyzing navigation patterns and identifying user journeys'
    },
    detecting: { 
      label: 'Detecting Elements', 
      icon: Sparkles, 
      color: 'text-cyan-400',
      description: 'YOLO computer vision is detecting all interactive elements'
    },
    generating: { 
      label: 'Generating Tests', 
      icon: Zap, 
      color: 'text-yellow-400',
      description: 'Creating comprehensive test cases from discovered flows'
    },
    optimizing: { 
      label: 'Quantum Optimization', 
      icon: Atom, 
      color: 'text-pink-400',
      description: 'Prioritizing test cases using quantum-inspired algorithms'
    },
    completed: { 
      label: 'Test Ready', 
      icon: CheckCircle2, 
      color: 'text-green-400',
      description: 'Your test suite is ready to execute'
    },
  };

  const currentPhase = phaseInfo[phase];
  const PhaseIcon = currentPhase.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        {/* Main Progress Card */}
        <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 mb-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full mb-4 relative">
              <PhaseIcon className={`w-10 h-10 ${currentPhase.color}`} />
              {phase !== 'completed' && (
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{currentPhase.label}</h2>
            <p className="text-gray-300 text-sm">{currentPhase.description}</p>
            <div className="mt-3 text-xs text-gray-400 font-mono">{url}</div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Overall Progress</span>
              <span className="text-sm font-semibold text-white">{progress}%</span>
            </div>
            <div className="h-3 bg-gray-800/50 rounded-full overflow-hidden border border-gray-700/50">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500 relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-400">Pages</span>
              </div>
              <div className="text-2xl font-bold text-white">{metrics.pagesDiscovered}</div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-gray-400">Flows</span>
              </div>
              <div className="text-2xl font-bold text-white">{metrics.flowsMapped}</div>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-gray-400">Elements</span>
              </div>
              <div className="text-2xl font-bold text-white">{metrics.elementsDetected}</div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-4 h-4 text-green-400" />
                <span className="text-xs text-gray-400">Tests</span>
              </div>
              <div className="text-2xl font-bold text-white">{metrics.testsGenerated}</div>
            </div>
          </div>
        </div>

        {/* Phase Timeline */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-white/10 p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Discovery Pipeline</h3>
          <div className="flex items-center justify-between">
            {Object.entries(phaseInfo).map(([key, info], index) => {
              const Icon = info.icon;
              const isActive = key === phase;
              const isPast = Object.keys(phaseInfo).indexOf(key) < Object.keys(phaseInfo).indexOf(phase);
              const isCompleted = phase === 'completed';
              
              return (
                <React.Fragment key={key}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                        isActive
                          ? 'border-purple-500 bg-purple-500/20'
                          : isPast || isCompleted
                          ? 'border-green-500 bg-green-500/20'
                          : 'border-gray-700 bg-gray-800/50'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive
                            ? info.color
                            : isPast || isCompleted
                            ? 'text-green-400'
                            : 'text-gray-600'
                        }`}
                      />
                    </div>
                    <span className={`text-xs mt-2 text-center ${isActive ? 'text-white font-medium' : 'text-gray-500'}`}>
                      {info.label.split(' ')[0]}
                    </span>
                  </div>
                  {index < Object.keys(phaseInfo).length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        isPast || isCompleted ? 'bg-green-500' : 'bg-gray-700'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
