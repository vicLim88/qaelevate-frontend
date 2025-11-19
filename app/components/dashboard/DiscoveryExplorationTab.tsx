import React, { useState } from 'react';
import { Globe, Activity, Eye, Layers, Zap, Search, X, MousePointer, FormInput, Link as LinkIcon, Image, HelpCircle } from 'lucide-react';
import type { DiscoveredPage } from '@/types/test.types';
import ReactFlow, { 
  Node, 
  Edge, 
  Controls, 
  Background,
  MiniMap,
  Position,
  useNodesState,
  useEdgesState,
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
  const [selectedPage, setSelectedPage] = useState<DiscoveredPage | null>(null);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [expandedScreenshot, setExpandedScreenshot] = useState<boolean>(false);
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  // Metric explanations in simple English
  const metricExplanations = {
    pagesDiscovered: "Total number of unique pages our AI has found in your application so far.",
    depthReached: "How many clicks deep we've explored. Higher depth means we've tested more complex user journeys.",
    pagesPerMinute: "Speed of discovery - how many new pages our AI is finding every minute.",
    coverage: "Estimated percentage of your entire application that we've discovered and mapped."
  };

  // Handle ESC key to close modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedScreenshot) {
        setExpandedScreenshot(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedScreenshot]);

  // Create hierarchical layout - top to bottom with generous horizontal spacing
  const getNodePosition = (page: DiscoveredPage, allPages: DiscoveredPage[]) => {
    const depth = page.depth;
    const pagesAtDepth = allPages.filter(p => p.depth === depth);
    const indexAtDepth = pagesAtDepth.findIndex(p => p.id === page.id);
    
    // Much more horizontal space - don't worry about saving space
    return {
      x: indexAtDepth * 500, // Generous horizontal spacing between siblings
      y: depth * 180, // Vertical spacing between levels
    };
  };

  // Convert discovered pages to React Flow nodes with hierarchical positioning
  const initialNodes: Node[] = discoveredPages.map((page) => ({
    id: page.id,
    type: 'default',
    data: { 
      label: (
        <div className="text-xs cursor-pointer" onClick={() => setSelectedPage(page)}>
          <div className="font-semibold truncate max-w-[160px]">{page.title}</div>
          <div className="text-gray-400 text-[10px]">
            {page.interactionDetails 
              ? Object.values(page.interactionDetails).flat().length 
              : page.interactions} interactions
          </div>
        </div>
      )
    },
    position: getNodePosition(page, discoveredPages),
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    style: {
      background: page.type === 'landing' ? '#9333ea' : 
                  page.type === 'form' ? '#3b82f6' :
                  page.type === 'checkout' ? '#10b981' : 
                  page.type === 'auth' ? '#f59e0b' : '#6b7280',
      color: 'white',
      border: '2px solid rgba(255,255,255,0.3)',
      borderRadius: '12px',
      padding: '12px',
      fontSize: '11px',
      width: 180,
      cursor: 'pointer',
    },
  }));

  const [nodes] = useNodesState(initialNodes);

  // Convert connections to React Flow edges
  const initialEdges: Edge[] = discoveredPages.flatMap(page =>
    page.connections.map(targetId => ({
      id: `${page.id}-${targetId}`,
      source: page.id,
      target: targetId,
      animated: isExploring,
      type: 'smoothstep',
      style: { stroke: 'rgba(147, 51, 234, 0.6)', strokeWidth: 2 },
    }))
  );

  const [edges] = useEdgesState(initialEdges);

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
        {/* Pages Discovered */}
        <div 
          className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl p-4 border border-white/10 relative"
          onMouseEnter={() => setHoveredMetric('pagesDiscovered')}
          onMouseLeave={() => setHoveredMetric(null)}
        >
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
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">Pages Discovered</div>
            <HelpCircle className="w-4 h-4 text-gray-500" />
          </div>
          {hoveredMetric === 'pagesDiscovered' && (
            <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-gray-900 border border-purple-500/50 rounded-lg p-3 shadow-xl">
              <p className="text-xs text-gray-200">{metricExplanations.pagesDiscovered}</p>
            </div>
          )}
        </div>

        {/* Depth Reached */}
        <div 
          className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-white/10 relative"
          onMouseEnter={() => setHoveredMetric('depthReached')}
          onMouseLeave={() => setHoveredMetric(null)}
        >
          <Layers className="w-5 h-5 text-blue-400 mb-2" />
          <div className="text-2xl font-bold text-white">{explorationMetrics.explorationDepth}</div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">Depth Reached</div>
            <HelpCircle className="w-4 h-4 text-gray-500" />
          </div>
          {hoveredMetric === 'depthReached' && (
            <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-gray-900 border border-blue-500/50 rounded-lg p-3 shadow-xl">
              <p className="text-xs text-gray-200">{metricExplanations.depthReached}</p>
            </div>
          )}
        </div>

        {/* Pages Per Minute */}
        <div 
          className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-white/10 relative"
          onMouseEnter={() => setHoveredMetric('pagesPerMinute')}
          onMouseLeave={() => setHoveredMetric(null)}
        >
          <Zap className="w-5 h-5 text-green-400 mb-2" />
          <div className="text-2xl font-bold text-white">{explorationMetrics.pagesPerMinute}</div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">Pages/Minute</div>
            <HelpCircle className="w-4 h-4 text-gray-500" />
          </div>
          {hoveredMetric === 'pagesPerMinute' && (
            <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-gray-900 border border-green-500/50 rounded-lg p-3 shadow-xl">
              <p className="text-xs text-gray-200">{metricExplanations.pagesPerMinute}</p>
            </div>
          )}
        </div>

        {/* Coverage */}
        <div 
          className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-white/10 relative"
          onMouseEnter={() => setHoveredMetric('coverage')}
          onMouseLeave={() => setHoveredMetric(null)}
        >
          <Search className="w-5 h-5 text-orange-400 mb-2" />
          <div className="text-2xl font-bold text-white">{explorationMetrics.coverage}%</div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">Coverage</div>
            <HelpCircle className="w-4 h-4 text-gray-500" />
          </div>
          {hoveredMetric === 'coverage' && (
            <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-gray-900 border border-orange-500/50 rounded-lg p-3 shadow-xl">
              <p className="text-xs text-gray-200">{metricExplanations.coverage}</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-4">
        {viewMode === 'graph' ? (
          <div className={`bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4 transition-all ${selectedPage ? 'w-2/3' : 'w-full'}`} style={{ height: '600px' }}>
            {discoveredPages.length > 0 ? (
              <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                className="bg-gray-900/50 rounded-lg"
                minZoom={0.5}
                maxZoom={1.5}
                defaultViewport={{ x: 0, y: 50, zoom: 0.8 }}
              >
                <Background color="#6b7280" gap={16} />
                <Controls className="bg-white/10 border-white/20" />
                <MiniMap 
                  nodeColor={(node) => {
                    const page = discoveredPages.find(p => p.id === node.id);
                    return page?.type === 'landing' ? '#9333ea' : 
                           page?.type === 'form' ? '#3b82f6' :
                           page?.type === 'checkout' ? '#10b981' : 
                           page?.type === 'auth' ? '#f59e0b' : '#6b7280';
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
          <div className={`bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 transition-all ${selectedPage ? 'w-2/3' : 'w-full'}`}>
            <div className="grid grid-cols-3 gap-4">
              {discoveredPages.map(page => (
                <div
                  key={page.id}
                  onClick={() => setSelectedPage(page)}
                  className={`bg-gray-800/50 rounded-lg p-4 border transition-all cursor-pointer ${
                    selectedPage?.id === page.id 
                      ? 'border-purple-500 ring-2 ring-purple-500/50' 
                      : 'border-white/10 hover:border-purple-500/50'
                  }`}
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
                      page.type === 'auth' ? 'bg-orange-500/20 text-orange-300' :
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

        {/* Details Panel */}
        {selectedPage && (
          <div className="w-1/3 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 animate-in slide-in-from-right" style={{ height: '600px', overflowY: 'auto' }}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Page Details</h3>
              <button 
                onClick={() => setSelectedPage(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Page Info */}
              <div>
                <h4 className="text-sm font-medium text-purple-400 mb-2">{selectedPage.title}</h4>
                <p className="text-xs text-gray-400 break-all">{selectedPage.url}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    selectedPage.type === 'landing' ? 'bg-purple-500/20 text-purple-300' :
                    selectedPage.type === 'form' ? 'bg-blue-500/20 text-blue-300' :
                    selectedPage.type === 'checkout' ? 'bg-green-500/20 text-green-300' :
                    selectedPage.type === 'auth' ? 'bg-orange-500/20 text-orange-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {selectedPage.type}
                  </span>
                  <span className="text-xs text-gray-400">Depth: {selectedPage.depth}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-800/50 rounded-lg p-3 border border-white/5">
                  <div className="text-xs text-gray-400">Total Elements</div>
                  <div className="text-xl font-bold text-white">{selectedPage.interactions}</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 border border-white/5">
                  <div className="text-xs text-gray-400">Outgoing Links</div>
                  <div className="text-xl font-bold text-white">{selectedPage.connections.length}</div>
                </div>
              </div>

              {/* Screenshot with YOLO Detection */}
              {selectedPage.screenshot && (
                <div>
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center justify-between">
                    <span className="flex items-center">
                      <Image className="w-4 h-4 mr-2 text-cyan-400" />
                      YOLO Object Detection
                    </span>
                    <button 
                      onClick={() => setExpandedScreenshot(true)}
                      className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Expand ↗
                    </button>
                  </h4>
                  <div 
                    className="relative bg-gray-900 rounded-lg border border-white/10 overflow-hidden cursor-pointer hover:border-purple-500/50 transition-all"
                    onClick={() => setExpandedScreenshot(true)}
                  >
                    {/* Screenshot */}
                    <img 
                      src={selectedPage.screenshot} 
                      alt={selectedPage.title}
                      className="w-full h-auto"
                    />
                    
                    {/* Bounding Boxes Overlay */}
                    <svg 
                      className="absolute top-0 left-0 w-full h-full pointer-events-none"
                      style={{ aspectRatio: '16/9' }}
                    >
                      {/* Draw bounding boxes for buttons */}
                      {selectedPage.interactionDetails?.buttons.map((btn, idx) => 
                        btn.boundingBox && (
                          <g key={`btn-${idx}`}>
                            <rect
                              x={`${btn.boundingBox.x}%`}
                              y={`${btn.boundingBox.y}%`}
                              width={`${btn.boundingBox.width}%`}
                              height={`${btn.boundingBox.height}%`}
                              fill="none"
                              stroke={hoveredElement === `button-${idx}` ? '#60a5fa' : '#3b82f6'}
                              strokeWidth="2"
                              className="transition-all"
                              opacity={hoveredElement === `button-${idx}` ? 1 : 0.7}
                            />
                            <text
                              x={`${btn.boundingBox.x}%`}
                              y={`${btn.boundingBox.y - 1}%`}
                              fill="#3b82f6"
                              fontSize="10"
                              fontWeight="bold"
                            >
                              Button
                            </text>
                          </g>
                        )
                      )}
                      
                      {/* Draw bounding boxes for links */}
                      {selectedPage.interactionDetails?.links.map((link, idx) => 
                        link.boundingBox && (
                          <g key={`link-${idx}`}>
                            <rect
                              x={`${link.boundingBox.x}%`}
                              y={`${link.boundingBox.y}%`}
                              width={`${link.boundingBox.width}%`}
                              height={`${link.boundingBox.height}%`}
                              fill="none"
                              stroke={hoveredElement === `link-${idx}` ? '#c084fc' : '#a855f7'}
                              strokeWidth="2"
                              className="transition-all"
                              opacity={hoveredElement === `link-${idx}` ? 1 : 0.7}
                            />
                            <text
                              x={`${link.boundingBox.x}%`}
                              y={`${link.boundingBox.y - 1}%`}
                              fill="#a855f7"
                              fontSize="10"
                              fontWeight="bold"
                            >
                              Link
                            </text>
                          </g>
                        )
                      )}
                      
                      {/* Draw bounding boxes for forms */}
                      {selectedPage.interactionDetails?.forms.map((form, idx) => 
                        form.boundingBox && (
                          <g key={`form-${idx}`}>
                            <rect
                              x={`${form.boundingBox.x}%`}
                              y={`${form.boundingBox.y}%`}
                              width={`${form.boundingBox.width}%`}
                              height={`${form.boundingBox.height}%`}
                              fill="none"
                              stroke={hoveredElement === `form-${idx}` ? '#34d399' : '#10b981'}
                              strokeWidth="2"
                              className="transition-all"
                              opacity={hoveredElement === `form-${idx}` ? 1 : 0.7}
                            />
                            <text
                              x={`${form.boundingBox.x}%`}
                              y={`${form.boundingBox.y - 1}%`}
                              fill="#10b981"
                              fontSize="10"
                              fontWeight="bold"
                            >
                              Form
                            </text>
                          </g>
                        )
                      )}
                      
                      {/* Draw bounding boxes for inputs */}
                      {selectedPage.interactionDetails?.inputs.map((input, idx) => 
                        input.boundingBox && (
                          <g key={`input-${idx}`}>
                            <rect
                              x={`${input.boundingBox.x}%`}
                              y={`${input.boundingBox.y}%`}
                              width={`${input.boundingBox.width}%`}
                              height={`${input.boundingBox.height}%`}
                              fill="none"
                              stroke={hoveredElement === `input-${idx}` ? '#fb923c' : '#f97316'}
                              strokeWidth="2"
                              className="transition-all"
                              opacity={hoveredElement === `input-${idx}` ? 1 : 0.7}
                            />
                            <text
                              x={`${input.boundingBox.x}%`}
                              y={`${input.boundingBox.y - 1}%`}
                              fill="#f97316"
                              fontSize="10"
                              fontWeight="bold"
                            >
                              Input
                            </text>
                          </g>
                        )
                      )}
                    </svg>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <div className="flex items-center">
                      <div className="w-3 h-3 border-2 border-blue-500 mr-1"></div>
                      <span className="text-gray-400">Buttons</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 border-2 border-purple-500 mr-1"></div>
                      <span className="text-gray-400">Links</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 border-2 border-green-500 mr-1"></div>
                      <span className="text-gray-400">Forms</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 border-2 border-orange-500 mr-1"></div>
                      <span className="text-gray-400">Inputs</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Interactions Breakdown */}
              {selectedPage.interactionDetails && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-white flex items-center">
                    <MousePointer className="w-4 h-4 mr-2 text-blue-400" />
                    Interactions Breakdown
                  </h4>

                  {/* Buttons */}
                  {selectedPage.interactionDetails.buttons.length > 0 && (
                    <div className="bg-gray-800/30 rounded-lg p-3 border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-blue-300">Buttons</span>
                        <span className="text-xs text-gray-400">{selectedPage.interactionDetails.buttons.length}</span>
                      </div>
                      <div className="space-y-2">
                        {selectedPage.interactionDetails.buttons.map((btn, idx) => (
                          <div 
                            key={idx} 
                            className="pl-2 border-l-2 border-blue-500/30 hover:border-blue-500 transition-all cursor-pointer"
                            onMouseEnter={() => setHoveredElement(`button-${idx}`)}
                            onMouseLeave={() => setHoveredElement(null)}
                          >
                            <div className="text-xs text-white font-medium">{btn.label}</div>
                            {btn.boundingBox && (
                              <div className="text-[9px] text-blue-400 mt-1">
                                📍 Detected at: ({btn.boundingBox.x.toFixed(1)}%, {btn.boundingBox.y.toFixed(1)}%)
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  {selectedPage.interactionDetails.links.length > 0 && (
                    <div className="bg-gray-800/30 rounded-lg p-3 border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-purple-300 flex items-center">
                          <LinkIcon className="w-3 h-3 mr-1" />
                          Links
                        </span>
                        <span className="text-xs text-gray-400">{selectedPage.interactionDetails.links.length}</span>
                      </div>
                      <div className="space-y-2">
                        {selectedPage.interactionDetails.links.map((link, idx) => (
                          <div 
                            key={idx} 
                            className="pl-2 border-l-2 border-purple-500/30 hover:border-purple-500 transition-all cursor-pointer"
                            onMouseEnter={() => setHoveredElement(`link-${idx}`)}
                            onMouseLeave={() => setHoveredElement(null)}
                          >
                            <div className="text-xs text-white font-medium">{link.text}</div>
                            <div className="text-[10px] text-blue-400 truncate mt-0.5">→ {link.href}</div>
                            {link.boundingBox && (
                              <div className="text-[9px] text-purple-400 mt-1">
                                📍 Detected at: ({link.boundingBox.x.toFixed(1)}%, {link.boundingBox.y.toFixed(1)}%)
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Forms */}
                  {selectedPage.interactionDetails.forms.length > 0 && (
                    <div className="bg-gray-800/30 rounded-lg p-3 border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-green-300">Forms</span>
                        <span className="text-xs text-gray-400">{selectedPage.interactionDetails.forms.length}</span>
                      </div>
                      <div className="space-y-2">
                        {selectedPage.interactionDetails.forms.map((form, idx) => (
                          <div 
                            key={idx} 
                            className="pl-2 border-l-2 border-green-500/30 hover:border-green-500 transition-all cursor-pointer"
                            onMouseEnter={() => setHoveredElement(`form-${idx}`)}
                            onMouseLeave={() => setHoveredElement(null)}
                          >
                            <div className="text-xs text-white font-medium">{form.id}</div>
                            <div className="text-[10px] text-green-400 mt-0.5">{form.fields} fields</div>
                            {form.boundingBox && (
                              <div className="text-[9px] text-green-400 mt-1">
                                📍 Detected at: ({form.boundingBox.x.toFixed(1)}%, {form.boundingBox.y.toFixed(1)}%)
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Inputs */}
                  {selectedPage.interactionDetails.inputs.length > 0 && (
                    <div className="bg-gray-800/30 rounded-lg p-3 border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-orange-300 flex items-center">
                          <FormInput className="w-3 h-3 mr-1" />
                          Input Fields
                        </span>
                        <span className="text-xs text-gray-400">{selectedPage.interactionDetails.inputs.length}</span>
                      </div>
                      <div className="space-y-2">
                        {selectedPage.interactionDetails.inputs.map((input, idx) => (
                          <div 
                            key={idx} 
                            className="pl-2 border-l-2 border-orange-500/30 hover:border-orange-500 transition-all cursor-pointer"
                            onMouseEnter={() => setHoveredElement(`input-${idx}`)}
                            onMouseLeave={() => setHoveredElement(null)}
                          >
                            <div className="text-xs text-white font-medium">{input.name || 'Unnamed field'}</div>
                            <div className="text-[10px] text-orange-400 mt-0.5">{input.type}</div>
                            {input.boundingBox && (
                              <div className="text-[9px] text-orange-400 mt-1">
                                📍 Detected at: ({input.boundingBox.x.toFixed(1)}%, {input.boundingBox.y.toFixed(1)}%)
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Connected Pages */}
              {selectedPage.connections.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Connected Pages ({selectedPage.connections.length})</h4>
                  <div className="space-y-2">
                    {selectedPage.connections.map(connId => {
                      const connectedPage = discoveredPages.find(p => p.id === connId);
                      return connectedPage ? (
                        <div
                          key={connId}
                          onClick={() => setSelectedPage(connectedPage)}
                          className="bg-gray-800/30 rounded-lg p-2 border border-white/5 hover:border-purple-500/50 cursor-pointer transition-all"
                        >
                          <div className="text-xs text-white font-medium">{connectedPage.title}</div>
                          <div className="text-xs text-gray-400 truncate">{connectedPage.url}</div>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

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
            <div className="w-3 h-3 rounded bg-orange-600 mr-2"></div>
            <span className="text-gray-300">Authentication</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded bg-gray-600 mr-2"></div>
            <span className="text-gray-300">Other</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-white/10 text-xs text-gray-400">
          💡 Click on any page in the graph or grid to view detailed interactions
        </div>
      </div>

      {/* Expanded Screenshot Modal */}
      {expandedScreenshot && selectedPage?.screenshot && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
          onClick={() => setExpandedScreenshot(false)}
        >
          <div className="relative max-w-7xl w-full max-h-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setExpandedScreenshot(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative bg-gray-900 rounded-lg border border-white/20 overflow-auto max-h-[90vh]">
              <img 
                src={selectedPage.screenshot} 
                alt={selectedPage.title}
                className="w-full h-auto"
              />
              
              {/* Bounding Boxes Overlay - Same as detail panel */}
              <svg 
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{ aspectRatio: '16/9' }}
              >
                {selectedPage.interactionDetails?.buttons.map((btn, idx) => 
                  btn.boundingBox && (
                    <g key={`btn-${idx}`}>
                      <rect
                        x={`${btn.boundingBox.x}%`}
                        y={`${btn.boundingBox.y}%`}
                        width={`${btn.boundingBox.width}%`}
                        height={`${btn.boundingBox.height}%`}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        opacity="0.8"
                      />
                      <text
                        x={`${btn.boundingBox.x}%`}
                        y={`${btn.boundingBox.y - 0.5}%`}
                        fill="#3b82f6"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        {btn.label}
                      </text>
                    </g>
                  )
                )}
                
                {selectedPage.interactionDetails?.links.map((link, idx) => 
                  link.boundingBox && (
                    <g key={`link-${idx}`}>
                      <rect
                        x={`${link.boundingBox.x}%`}
                        y={`${link.boundingBox.y}%`}
                        width={`${link.boundingBox.width}%`}
                        height={`${link.boundingBox.height}%`}
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="3"
                        opacity="0.8"
                      />
                      <text
                        x={`${link.boundingBox.x}%`}
                        y={`${link.boundingBox.y - 0.5}%`}
                        fill="#a855f7"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        {link.text}
                      </text>
                    </g>
                  )
                )}
                
                {selectedPage.interactionDetails?.forms.map((form, idx) => 
                  form.boundingBox && (
                    <g key={`form-${idx}`}>
                      <rect
                        x={`${form.boundingBox.x}%`}
                        y={`${form.boundingBox.y}%`}
                        width={`${form.boundingBox.width}%`}
                        height={`${form.boundingBox.height}%`}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        opacity="0.8"
                      />
                      <text
                        x={`${form.boundingBox.x}%`}
                        y={`${form.boundingBox.y - 0.5}%`}
                        fill="#10b981"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        {form.id}
                      </text>
                    </g>
                  )
                )}
                
                {selectedPage.interactionDetails?.inputs.map((input, idx) => 
                  input.boundingBox && (
                    <g key={`input-${idx}`}>
                      <rect
                        x={`${input.boundingBox.x}%`}
                        y={`${input.boundingBox.y}%`}
                        width={`${input.boundingBox.width}%`}
                        height={`${input.boundingBox.height}%`}
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="3"
                        opacity="0.8"
                      />
                      <text
                        x={`${input.boundingBox.x}%`}
                        y={`${input.boundingBox.y - 0.5}%`}
                        fill="#f97316"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        {input.name}
                      </text>
                    </g>
                  )
                )}
              </svg>
            </div>
            <div className="mt-4 text-center text-sm text-gray-300">
              Click outside or press ESC to close • Hover over elements in detail panel to highlight
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
