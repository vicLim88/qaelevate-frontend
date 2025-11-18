'use client';

import React from 'react';
import { Folder, Bot, Atom, Rocket, Plus } from 'lucide-react';

interface EmptyTestSpaceStateProps {
  onCreateSpace: () => void;
}

export function EmptyTestSpaceState({ onCreateSpace }: EmptyTestSpaceStateProps) {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-blue-600/20 rounded-3xl flex items-center justify-center border border-purple-500/30">
        <Folder className="w-12 h-12 text-purple-400" />
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-4">Welcome to QA Elevate!</h2>
      
      <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
        Create your first test space to experience autonomous AI testing. Our quantum-enhanced agents will 
        discover, map, and generate comprehensive test cases for your application automatically.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
        <div className="p-6 bg-white/5 rounded-xl border border-purple-500/20">
          <Bot className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">AI Discovery</h3>
          <p className="text-sm text-gray-400">
            Autonomous agents explore your application and map all user flows
          </p>
        </div>
        
        <div className="p-6 bg-white/5 rounded-xl border border-purple-500/20">
          <Atom className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Quantum Optimization</h3>
          <p className="text-sm text-gray-400">
            QAOA algorithms optimize test case selection for maximum coverage
          </p>
        </div>
        
        <div className="p-6 bg-white/5 rounded-xl border border-purple-500/20">
          <Rocket className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Instant Results</h3>
          <p className="text-sm text-gray-400">
            Get comprehensive test suites generated in minutes, not weeks
          </p>
        </div>
      </div>

      <button
        onClick={onCreateSpace}
        className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-purple-500/50"
      >
        <Plus className="w-6 h-6" />
        <span>Create Your First Test Space</span>
      </button>
    </div>
  );
}
