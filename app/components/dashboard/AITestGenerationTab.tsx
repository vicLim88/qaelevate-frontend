import React from 'react';
import { Brain, Sparkles, Target, Zap, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import type { UserStory } from '@/types/test.types';

interface AITestGenerationTabProps {
  userStories: UserStory[];
  isGenerating: boolean;
}

export function AITestGenerationTab({ userStories, isGenerating }: AITestGenerationTabProps) {
  const metrics = {
    totalStories: userStories.length,
    totalTestCases: userStories.reduce((sum, story) => sum + story.testCases.length, 0),
    avgQuantumScore: userStories.length > 0
      ? Math.round(userStories.reduce((sum, story) => sum + story.quantumScore, 0) / userStories.length)
      : 0,
    avgCoverage: userStories.length > 0
      ? Math.round(userStories.reduce((sum, story) => sum + story.coverage, 0) / userStories.length)
      : 0,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'executing': return 'text-blue-400';
      case 'optimizing': return 'text-purple-400';
      case 'ready': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Brain className="w-6 h-6 mr-2 text-purple-400" />
            AI Test Generation
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Quantum-optimized user stories and test cases
          </p>
        </div>
        {isGenerating && (
          <div className="flex items-center bg-purple-500/20 px-4 py-2 rounded-lg border border-purple-500/30">
            <Sparkles className="w-4 h-4 text-purple-400 mr-2 animate-pulse" />
            <span className="text-sm text-purple-300">AI Generating...</span>
          </div>
        )}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-white/10">
          <Target className="w-5 h-5 text-purple-400 mb-2" />
          <div className="text-2xl font-bold text-white">{metrics.totalStories}</div>
          <div className="text-sm text-gray-400">User Stories</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-white/10">
          <CheckCircle className="w-5 h-5 text-blue-400 mb-2" />
          <div className="text-2xl font-bold text-white">{metrics.totalTestCases}</div>
          <div className="text-sm text-gray-400">Test Cases</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-white/10">
          <Zap className="w-5 h-5 text-green-400 mb-2" />
          <div className="text-2xl font-bold text-white">{metrics.avgQuantumScore}%</div>
          <div className="text-sm text-gray-400">Quantum Score</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-white/10">
          <TrendingUp className="w-5 h-5 text-orange-400 mb-2" />
          <div className="text-2xl font-bold text-white">{metrics.avgCoverage}%</div>
          <div className="text-sm text-gray-400">Avg Coverage</div>
        </div>
      </div>

      {/* User Stories */}
      <div className="space-y-4">
        {userStories.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-12 text-center">
            <Brain className="w-16 h-16 text-gray-500 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-400">No user stories generated yet</p>
            <p className="text-sm text-gray-500 mt-2">AI will generate stories after page discovery</p>
          </div>
        ) : (
          userStories.map((story) => (
            <div
              key={story.id}
              className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 hover:border-purple-500/50 transition-all"
            >
              {/* Story Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{story.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(story.priority)}`}>
                      {story.priority}
                    </span>
                    <span className={`text-xs ${getStatusColor(story.status)}`}>
                      {story.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{story.description}</p>
                </div>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-5 gap-4 mb-4">
                <div className="bg-gray-800/50 rounded-lg p-3 border border-white/5">
                  <div className="flex items-center text-xs text-gray-400 mb-1">
                    <Zap className="w-3 h-3 mr-1 text-purple-400" />
                    Quantum Score
                  </div>
                  <div className="text-lg font-bold text-white">{story.quantumScore}%</div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-3 border border-white/5">
                  <div className="flex items-center text-xs text-gray-400 mb-1">
                    <Target className="w-3 h-3 mr-1 text-blue-400" />
                    Coverage
                  </div>
                  <div className="text-lg font-bold text-white">{story.coverage}%</div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-3 border border-white/5">
                  <div className="flex items-center text-xs text-gray-400 mb-1">
                    <CheckCircle className="w-3 h-3 mr-1 text-green-400" />
                    Test Cases
                  </div>
                  <div className="text-lg font-bold text-white">{story.testCases.length}</div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-3 border border-white/5">
                  <div className="flex items-center text-xs text-gray-400 mb-1">
                    <Clock className="w-3 h-3 mr-1 text-orange-400" />
                    Est. Time
                  </div>
                  <div className="text-lg font-bold text-white">{Math.round(story.estimatedTime / 60)}m</div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-3 border border-white/5">
                  <div className="flex items-center text-xs text-gray-400 mb-1">
                    <Brain className="w-3 h-3 mr-1 text-cyan-400" />
                    AI Confidence
                  </div>
                  <div className="text-lg font-bold text-white">{story.aiConfidence}%</div>
                </div>
              </div>

              {/* Test Cases */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Generated Test Cases ({story.testCases.length})
                </h4>
                <div className="space-y-2">
                  {story.testCases.slice(0, 3).map((testCase, idx) => (
                    <div
                      key={testCase.id}
                      className="bg-gray-800/30 rounded-lg p-3 border border-white/5 hover:border-purple-500/30 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs text-gray-500">TC-{idx + 1}</span>
                            <span className="text-sm text-white font-medium">{testCase.title}</span>
                            <span className={`text-xs px-2 py-0.5 rounded border ${getPriorityColor(testCase.priority)}`}>
                              {testCase.priority}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400">
                            {testCase.steps.length} steps • {testCase.type} test
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">
                          {Math.round(testCase.aiConfidence)}% confidence
                        </div>
                      </div>
                    </div>
                  ))}
                  {story.testCases.length > 3 && (
                    <div className="text-center">
                      <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                        Show {story.testCases.length - 3} more test cases
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Pages Involved */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{story.pages.length} pages involved in this user story</span>
                  <button className="text-purple-400 hover:text-purple-300 transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
