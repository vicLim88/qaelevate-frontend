import React, { useState, useEffect } from 'react';
import { 
  Brain, Atom, Globe, Wallet, Plus, Bot, Rocket, Shield, Users, 
  Folder, Monitor, Smartphone, ArrowLeft, Eye, Play, FileCode
} from 'lucide-react';

const QAEvelateTestSpaces = () => {
  const [view, setView] = useState('dashboard');
  const [testSpaces, setTestSpaces] = useState([]);
  const [newSpace, setNewSpace] = useState({
    name: '',
    type: 'web',
    url: ''
  });
  const [progress, setProgress] = useState(0);
  const [generatedTests, setGeneratedTests] = useState([]);

  // Simulate progress when generating
  useEffect(() => {
    if (view === 'generating') {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 5;
          if (newProgress >= 100) {
            setTimeout(() => {
              setGeneratedTests([
                {
                  id: '1',
                  title: 'User Registration Flow',
                  type: 'functional',
                  priority: 'critical',
                  confidence: 95
                },
                {
                  id: '2',
                  title: 'Login Authentication',
                  type: 'security', 
                  priority: 'critical',
                  confidence: 98
                },
                {
                  id: '3',
                  title: 'Responsive Design Test',
                  type: 'visual',
                  priority: 'high',
                  confidence: 87
                },
                {
                  id: '4',
                  title: 'Performance Optimization',
                  type: 'performance',
                  priority: 'high',
                  confidence: 92
                }
              ]);
              setView('results');
            }, 2000);
            return 100;
          }
          return newProgress;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [view]);

  const createTestSpace = () => {
    if (!newSpace.name || !newSpace.url) return;
    
    setTestSpaces(prev => [...prev, {
      id: Date.now(),
      name: newSpace.name,
      url: newSpace.url,
      type: newSpace.type,
      testCases: 0,
      status: 'generating'
    }]);
    
    setProgress(0);
    setView('generating');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'functional': return <Bot className="w-4 h-4" />;
      case 'visual': return <Eye className="w-4 h-4" />;
      case 'performance': return <Rocket className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      default: return <FileCode className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/80 to-blue-900/80 backdrop-blur-sm border-b border-purple-500/30 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {view !== 'dashboard' && (
              <button
                onClick={() => setView('dashboard')}
                className="flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">QAEvelate</h1>
                <p className="text-xs text-gray-300">Test Space Management</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-3 py-2">
            <Wallet className="w-4 h-4 text-purple-400" />
            <div className="text-right">
              <div className="text-xs text-gray-300">A7KmS9Vg...Yz4M</div>
              <div className="text-sm font-medium text-white">15.78 SOL</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Dashboard View - Empty State */}
        {view === 'dashboard' && testSpaces.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-blue-600/20 rounded-3xl flex items-center justify-center border border-purple-500/30">
              <Folder className="w-12 h-12 text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Welcome to QAEvelate!</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Create your first test space to experience autonomous AI testing. Our quantum-enhanced agents will 
              discover, map, and generate comprehensive test cases for your application automatically.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
              <div className="p-6 bg-white/5 rounded-xl border border-purple-500/20">
                <Bot className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">AI Discovery</h3>
                <p className="text-sm text-gray-400">Autonomous agents explore your application and map all user flows</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-purple-500/20">
                <Atom className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Quantum Optimization</h3>
                <p className="text-sm text-gray-400">QAOA algorithms optimize test case selection for maximum coverage</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-purple-500/20">
                <Rocket className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Instant Results</h3>
                <p className="text-sm text-gray-400">Get comprehensive test suites generated in minutes, not weeks</p>
              </div>
            </div>

            <button
              onClick={() => setView('create')}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
            >
              <Plus className="w-6 h-6" />
              <span>Create Your First Test Space</span>
            </button>
          </div>
        )}

        {/* Test Spaces List */}
        {view === 'dashboard' && testSpaces.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Test Spaces</h2>
              <button
                onClick={() => setView('create')}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>New Test Space</span>
              </button>
            </div>

            <div className="grid gap-4">
              {testSpaces.map(space => (
                <div key={space.id} className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Monitor className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{space.name}</h3>
                        <p className="text-sm text-gray-400">{space.url}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{space.testCases}</div>
                      <div className="text-sm text-gray-400">test cases</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Test Space View */}
        {view === 'create' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Create New Test Space</h2>
              <p className="text-gray-400">Configure your application for AI-powered test generation</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Test Space Name
                  </label>
                  <input
                    type="text"
                    value={newSpace.name}
                    onChange={(e) => setNewSpace(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="e.g., E-commerce Platform, Banking App"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-3">
                    Application Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setNewSpace(prev => ({ ...prev, type: 'web' }))}
                      className={`p-4 rounded-lg border transition-all ${
                        newSpace.type === 'web'
                          ? 'bg-purple-600/20 border-purple-500 text-white'
                          : 'bg-gray-800/30 border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <Monitor className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-medium">Web Application</div>
                      <div className="text-xs text-gray-400 mt-1">Websites, web apps, SPAs</div>
                    </button>
                    <button
                      onClick={() => setNewSpace(prev => ({ ...prev, type: 'android' }))}
                      className={`p-4 rounded-lg border transition-all ${
                        newSpace.type === 'android'
                          ? 'bg-purple-600/20 border-purple-500 text-white'
                          : 'bg-gray-800/30 border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <Smartphone className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-medium">Android App</div>
                      <div className="text-xs text-gray-400 mt-1">APK files, Android apps</div>
                    </button>
                    <button
                      onClick={() => setNewSpace(prev => ({ ...prev, type: 'ios' }))}
                      className={`p-4 rounded-lg border transition-all ${
                        newSpace.type === 'ios'
                          ? 'bg-purple-600/20 border-purple-500 text-white'
                          : 'bg-gray-800/30 border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <Smartphone className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-medium">iOS App</div>
                      <div className="text-xs text-gray-400 mt-1">IPA files, iOS apps</div>
                    </button>
                  </div>
                </div>

                {newSpace.type === 'web' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Application URL
                    </label>
                    <input
                      type="url"
                      value={newSpace.url}
                      onChange={(e) => setNewSpace(prev => ({ ...prev, url: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="https://your-application.com"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-4 pt-4">
                  <button
                    onClick={() => setView('dashboard')}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createTestSpace}
                    disabled={!newSpace.name || !newSpace.url}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50"
                  >
                    <Bot className="w-5 h-5" />
                    <span>Start AI Test Generation</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Generation Progress */}
        {view === 'generating' && (
          <div className="max-w-4xl mx-auto text-center py-16">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-500/20 to-blue-600/20 rounded-full flex items-center justify-center border border-purple-500/30">
              <div className="relative">
                <Brain className="w-16 h-16 text-purple-400 animate-pulse" />
                <Atom className="w-8 h-8 text-blue-400 absolute -top-2 -right-2 animate-spin" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">AI Agents Analyzing Your Application</h2>
            <p className="text-gray-400 mb-8">Discovery agents are mapping your application structure...</p>
            
            <div className="w-full max-w-2xl mx-auto mb-8">
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>{progress.toFixed(0)}% Complete</span>
                <span>Analyzing...</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{Math.floor(progress * 0.3)}</div>
                <div className="text-sm text-gray-400">Pages Found</div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">{Math.floor(progress * 0.2)}</div>
                <div className="text-sm text-gray-400">Flows Discovered</div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{Math.floor(progress * 0.4)}</div>
                <div className="text-sm text-gray-400">Tests Generated</div>
              </div>
            </div>
          </div>
        )}

        {/* Generated Test Results */}
        {view === 'results' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">AI Generated Test Cases</h2>
              <p className="text-gray-400">Review and select test cases for execution</p>
            </div>

            <div className="grid gap-4">
              {generatedTests.map(test => (
                <div key={test.id} className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                      />
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(test.type)}
                        <div>
                          <h3 className="text-lg font-semibold text-white">{test.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded text-xs border ${getPriorityColor(test.priority)}`}>
                              {test.priority}
                            </span>
                            <span className="text-xs text-gray-400 capitalize">{test.type} test</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">AI Confidence</div>
                      <div className="text-lg font-bold text-green-400">{test.confidence}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between p-6 bg-white/10 rounded-xl border border-white/20">
              <div>
                <div className="text-lg font-semibold text-white">{generatedTests.length} tests generated</div>
                <div className="text-sm text-gray-400">Ready for execution</div>
              </div>
              <button 
                onClick={() => setView('dashboard')}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
              >
                <Play className="w-5 h-5" />
                <span>Execute Tests</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QAEvelateTestSpaces;