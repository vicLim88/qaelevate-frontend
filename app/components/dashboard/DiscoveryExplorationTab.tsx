import React, { useState } from 'react';
import { Globe, Activity, Eye, Layers, Zap, Search } from 'lucide-react';
import type { DiscoveredPage } from '@/types/test.types';
import ReactFlow, { 
  Node, 
  Edge, 
  Controls, 
  Background,
  MiniMap,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';

interface DiscoveryExplorationTabProps {
  discoveredPages: DiscoveredPage[];
  isExploring: boolean;
  explorationMetrics: {
    totalPages: number;
    explorationDepth: number;
    pagesPerMinute: number;
    coverage: number;
  };
}

export function DiscoveryExplorationTab({
  discoveredPages,
  isExploring,
  explorationMetrics,
}: DiscoveryExplorationTabProps) {
  const [viewMode, setViewMode] = useState<'graph' | 'grid'>('graph');

  // Convert discovered pages to React Flow nodes
  const nodes: Node[] = discoveredPages.map((page, index) => ({
    id: page.id,
    type: 'default',
    data: { 
      label: (
        <div className="text-xs">
          <div className="font-semibold truncate max-w-[120px]">{page.title}</div>
          <div className="text-gray-400 text-[10px]">{page.interactions} interactions</div>
        </div>
      )
    },
    position: { 
      x: (index % 5) * 180 + Math.random() * 40, 
      y: Math.floor(index / 5) * 120 + page.depth * 80 
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    style: {
      background: page.type === 'landing' ? '#9333ea' : 
                  page.type === 'form' ? '#3b82f6' :
                  page.type === 'checkout' ? '#10b981' : '#6b7280',
      color: 'white',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: '8px',
      padding: '8px',
      fontSize: '10px',
      width: 160,
    },
  }));

  // Convert connections to React Flow edges
  const edges: Edge[] = discoveredPages.flatMap(page =>
    page.connections.map(targetId => ({
      id: `${page.id}-${targetId}`,
      source: page.id,
      target: targetId,
      animated: isExploring,
      style: { stroke: 'rgba(147, 51, 234, 0.5)' },
    }))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Globe className="w-6 h-6 mr-2 text-purple-400" />
            Discovery & Exploration
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Autonomous web crawling and page discovery
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('graph')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'graph'
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Layers className="w-4 h-4 inline mr-2" />
            Graph View
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'grid'
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Eye className="w-4 h-4 inline mr-2" />
            Grid View
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <Globe className="w-5 h-5 text-purple-400" />
            {isExploring && (
              <div className="flex items-center text-xs text-green-400">
                <Activity className="w-3 h-3 mr-1 animate-pulse" />
                Live
              </div>
            )}
          </div>
          <div className="text-2xl font-bold text-white">{explorationMetrics.totalPages}</div>
          <div className="text-sm text-gray-400">Pages Discovered</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-white/10">
          <Layers className="w-5 h-5 text-blue-400 mb-2" />
          <div className="text-2xl font-bold text-white">{explorationMetrics.explorationDepth}</div>
          <div className="text-sm text-gray-400">Depth Reached</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-white/10">
          <Zap className="w-5 h-5 text-green-400 mb-2" />
          <div className="text-2xl font-bold text-white">{explorationMetrics.pagesPerMinute}</div>
          <div className="text-sm text-gray-400">Pages/Minute</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-white/10">
          <Search className="w-5 h-5 text-orange-400 mb-2" />
          <div className="text-2xl font-bold text-white">{explorationMetrics.coverage}%</div>
          <div className="text-sm text-gray-400">Coverage</div>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'graph' ? (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4" style={{ height: '600px' }}>
          {discoveredPages.length > 0 ? (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              fitView
              className="bg-gray-900/50 rounded-lg"
            >
              <Background color="#6b7280" gap={16} />
              <Controls className="bg-white/10 border-white/20" />
              <MiniMap 
                nodeColor={(node) => {
                  const page = discoveredPages.find(p => p.id === node.id);
                  return page?.type === 'landing' ? '#9333ea' : 
                         page?.type === 'form' ? '#3b82f6' :
                         page?.type === 'checkout' ? '#10b981' : '#6b7280';
                }}
                className="bg-white/10 border-white/20"
              />
            </ReactFlow>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-16 h-16 text-gray-500 mx-auto mb-4 animate-pulse" />
                <p className="text-gray-400">No pages discovered yet</p>
                <p className="text-sm text-gray-500 mt-2">Start a new test to begin exploration</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
          <div className="grid grid-cols-3 gap-4">
            {discoveredPages.map(page => (
              <div
                key={page.id}
                className="bg-gray-800/50 rounded-lg p-4 border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm truncate">{page.title}</h4>
                    <p className="text-gray-400 text-xs truncate mt-1">{page.url}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    page.type === 'landing' ? 'bg-purple-500/20 text-purple-300' :
                    page.type === 'form' ? 'bg-blue-500/20 text-blue-300' :
                    page.type === 'checkout' ? 'bg-green-500/20 text-green-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {page.type}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 mt-3">
                  <span>Depth: {page.depth}</span>
                  <span>{page.interactions} elements</span>
                  <span>{page.connections.length} links</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <h4 className="text-sm font-medium text-white mb-3">Page Types</h4>
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded bg-purple-600 mr-2"></div>
            <span className="text-gray-300">Landing Page</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded bg-blue-600 mr-2"></div>
            <span className="text-gray-300">Form</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded bg-green-600 mr-2"></div>
            <span className="text-gray-300">Checkout</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded bg-gray-600 mr-2"></div>
            <span className="text-gray-300">Other</span>
          </div>
        </div>
      </div>
    </div>
  );
}
