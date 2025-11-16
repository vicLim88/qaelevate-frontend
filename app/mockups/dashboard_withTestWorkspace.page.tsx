import React, { useState, useEffect } from 'react';
import { 
  Brain, Atom, Globe, Wallet, Zap, Shield, Activity, DollarSign, 
  Plus, Play, Pause, Eye, Settings, Download, Upload, Users, 
  Clock, CheckCircle, AlertTriangle, XCircle, BarChart3, TrendingUp,
  Cpu, Sparkles, Bot, Rocket, Target, Database, Network, Cloud
} from 'lucide-react';

interface TestJob {
  id: string;
  url: string;
  status: 'discovering' | 'optimizing' | 'executing' | 'completed' | 'failed';
  progress: number;
  startTime: Date;
  testCases: number;
  passed: number;
  failed: number;
  quantumOptimized: boolean;
  cost: number;
}

interface AIAgent {
  id: string;
  type: 'discovery' | 'functional' | 'visual' | 'performance' | 'security';
  status: 'active' | 'idle' | 'busy';
  currentTask?: string;
  efficiency: number;
}

interface QuantumMetrics {
  qubitsActive: number;
  optimizationJobs: number;
  advantageScore: number;
  isActive: boolean;
}

const QAEvelateDashboard = () => {
  const [user] = useState({
    wallet: 'A7KmS9VgBfxR2Qw8NpX3Yz4M',
    balance: 15.7825,
    testsRemaining: 247
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'tests' | 'agents' | 'quantum' | 'analytics'>('overview');
  
  const [testJobs, setTestJobs] = useState<TestJob[]>([
    {
      id: 'test-001',
      url: 'https://ecommerce-demo.com',
      status: 'executing',
      progress: 67,
      startTime: new Date(Date.now() - 1200000),
      testCases: 45,
      passed: 28,
      failed: 2,
      quantumOptimized: true,
      cost: 0.0225
    },
    {
      id: 'test-002', 
      url: 'https://banking-app.demo',
      status: 'optimizing',
      progress: 23,
      startTime: new Date(Date.now() - 300000),
      testCases: 67,
      passed: 0,
      failed: 0,
      quantumOptimized: true,
      cost: 0.0335
    },
    {
      id: 'test-003',
      url: 'https://portfolio-site.com',
      status: 'completed',
      progress: 100,
      startTime: new Date(Date.now() - 2400000),
      testCases: 23,
      passed: 21,
      failed: 2,
      quantumOptimized: false,
      cost: 0.0115
    }
  ]);

  const [aiAgents, setAiAgents] = useState<AIAgent[]>([
    { id: 'agent-001', type: 'discovery', status: 'busy', currentTask: 'Mapping ecommerce-demo.com', efficiency: 94 },
    { id: 'agent-002', type: 'functional', status: 'active', currentTask: 'Testing checkout flow', efficiency: 87 },
    { id: 'agent-003', type: 'visual', status: 'active', currentTask: 'Responsive design validation', efficiency: 91 },
    { id: 'agent-004', type: 'performance', status: 'idle', efficiency: 89 },
    { id: 'agent-005', type: 'security', status: 'busy', currentTask: 'OWASP Top 10 scan', efficiency: 96 }
  ]);

  const [quantumMetrics, setQuantumMetrics] = useState<QuantumMetrics>({
    qubitsActive: 42,
    optimizationJobs: 3,
    advantageScore: 87.3,
    isActive: true
  });

  const [networkStats, setNetworkStats] = useState({
    validators: 3421,
    tps: 64280,
    avgCost: 0.0005,
    uptime: 99.97
  });

  // Live updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update network stats
      setNetworkStats(prev => ({
        ...prev,
        tps: Math.floor(Math.random() * 5000) + 60000,
        validators: prev.validators + Math.floor(Math.random() * 10) - 5
      }));

      // Update quantum metrics
      setQuantumMetrics(prev => ({
        ...prev,
        qubitsActive: Math.floor(Math.random() * 20) + 30,
        advantageScore: 80 + Math.random() * 20,
        optimizationJobs: Math.floor(Math.random() * 5) + 1
      }));

      // Update test progress
      setTestJobs(prev => prev.map(job => {
        if (job.status === 'executing' || job.status === 'optimizing') {
          const newProgress = Math.min(job.progress + Math.random() * 5, 100);
          if (newProgress >= 100) {
            return { ...job, status: 'completed', progress: 100 };
          }
          return { ...job, progress: newProgress };
        }
        return job;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const startNewTest = () => {
    const newTest: TestJob = {
      id: `test-${Date.now()}`,
      url: 'https://new-application.com',
      status: 'discovering',
      progress: 0,
      startTime: new Date(),
      testCases: 0,
      passed: 0,
      failed: 0,
      quantumOptimized: true,
      cost: 0
    };
    setTestJobs(prev => [newTest, ...prev]);
  };

  const getStatusColor = (status: TestJob['status']) => {
    switch (status) {
      case 'discovering': return 'text-blue-400';
      case 'optimizing': return 'text-purple-400';
      case 'executing': return 'text-yellow-400';
      case 'completed': return 'text-green-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getAgentIcon = (type: AIAgent['type']) => {
    switch (type) {
      case 'discovery': return <Globe className="w-4 h-4" />;
      case 'functional': return <Bot className="w-4 h-4" />;
      case 'visual': return <Eye className="w-4 h-4" />;
      case 'performance': return <Rocket className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/80 to-blue-900/80 backdrop-blur-sm border-b border-purple-500/30 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">QAEvelate</h1>
                <p className="text-xs text-gray-300">Quantum-Enhanced AI Testing</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Network Stats */}
            <div className="flex items-center space-x-4 text-xs text-gray-300">
              <div className="flex items-center space-x-1">
                <Globe className="w-3 h-3 text-green-400" />
                <span>{networkStats.validators.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Activity className="w-3 h-3 text-blue-400" />
                <span>{networkStats.tps.toLocaleString()} TPS</span>
              </div>
              <div className="flex items-center space-x-1">
                <Atom className={`w-3 h-3 ${quantumMetrics.isActive ? 'text-purple-400 animate-pulse' : 'text-gray-400'}`} />
                <span>Quantum {quantumMetrics.isActive ? 'Active' : 'Standby'}</span>
              </div>
            </div>
            
            {/* User Wallet */}
            <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-3 py-2">
              <Wallet className="w-4 h-4 text-purple-400" />
              <div className="text-right">
                <div className="text-xs text-gray-300">{user.wallet.slice(0, 8)}...{user.wallet.slice(-4)}</div>
                <div className="text-sm font-medium text-white">{user.balance} SOL</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800/50 rounded-lg p-1">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'tests', label: 'Test Jobs', icon: Target },
            { id: 'agents', label: 'AI Agents', icon: Bot },
            { id: 'quantum', label: 'Quantum', icon: Atom },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{testJobs.length}</div>
                    <div className="text-sm text-gray-400">Active Tests</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{aiAgents.filter(a => a.status !== 'idle').length}</div>
                    <div className="text-sm text-gray-400">AI Agents Working</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Atom className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{quantumMetrics.advantageScore.toFixed(1)}%</div>
                    <div className="text-sm text-gray-400">Quantum Advantage</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">${testJobs.reduce((sum, job) => sum + job.cost, 0).toFixed(4)}</div>
                    <div className="text-sm text-gray-400">Total Cost Today</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Test Jobs */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Recent Test Jobs</h2>
                <button
                  onClick={startNewTest}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Test</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {testJobs.slice(0, 3).map(job => (
                  <div key={job.id} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-600/30">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(job.status)} animate-pulse`} />
                      <div>
                        <div className="text-white font-medium">{job.url}</div>
                        <div className="text-sm text-gray-400 capitalize">{job.status} • {job.testCases} test cases</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {job.quantumOptimized && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-purple-500/20 rounded text-purple-400 text-xs">
                          <Atom className="w-3 h-3" />
                          <span>Quantum</span>
                        </div>
                      )}
                      <div className="text-right">
                        <div className="text-sm text-white">{job.progress.toFixed(0)}%</div>
                        <div className="text-xs text-gray-400">${job.cost.toFixed(4)}</div>
                      </div>
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Test Jobs Tab */}
        {activeTab === 'tests' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Test Jobs</h2>
              <button
                onClick={startNewTest}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Start New Test</span>
              </button>
            </div>

            <div className="grid gap-4">
              {testJobs.map(job => (
                <div key={job.id} className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full ${getStatusColor(job.status)} animate-pulse`} />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{job.url}</h3>
                        <p className="text-sm text-gray-400">Started {job.startTime.toLocaleTimeString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {job.quantumOptimized && (
                        <div className="flex items-center space-x-2 px-3 py-1 bg-purple-500/20 rounded-lg border border-purple-500/30">
                          <Atom className="w-4 h-4 text-purple-400" />
                          <span className="text-purple-400 text-sm">Quantum Enhanced</span>
                        </div>
                      )}
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{job.progress.toFixed(0)}%</div>
                        <div className="text-sm text-gray-400">${job.cost.toFixed(4)} cost</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{job.testCases}</div>
                      <div className="text-xs text-gray-400">Total Tests</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{job.passed}</div>
                      <div className="text-xs text-gray-400">Passed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">{job.failed}</div>
                      <div className="text-xs text-gray-400">Failed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">
                        {job.testCases > 0 ? ((job.passed / job.testCases) * 100).toFixed(0) : 0}%
                      </div>
                      <div className="text-xs text-gray-400">Success Rate</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 capitalize">{job.status}</span>
                    <span className="text-gray-400">
                      {job.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Agents Tab */}
        {activeTab === 'agents' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">AI Agent Swarm</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiAgents.map(agent => (
                <div key={agent.id} className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      agent.status === 'busy' ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                      agent.status === 'active' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                      'bg-gradient-to-r from-gray-500 to-gray-600'
                    }`}>
                      {getAgentIcon(agent.type)}
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
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                      style={{ width: `${agent.efficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quantum Tab */}
        {activeTab === 'quantum' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Quantum Computing Center</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Atom className="w-8 h-8 text-purple-400 animate-spin" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Quantum Status</h3>
                    <p className="text-sm text-gray-400">Real-time quantum metrics</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Active Qubits</span>
                    <span className="text-xl font-bold text-purple-400">{quantumMetrics.qubitsActive}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Optimization Jobs</span>
                    <span className="text-xl font-bold text-blue-400">{quantumMetrics.optimizationJobs}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Advantage Score</span>
                    <span className="text-xl font-bold text-green-400">{quantumMetrics.advantageScore.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">QAOA Optimization</h3>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-white animate-pulse" />
                  </div>
                  <p className="text-sm text-gray-400">Quantum Approximate Optimization Algorithm actively optimizing test case selection</p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Performance Gain</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">
                    {Math.floor(quantumMetrics.advantageScore * 10)}x
                  </div>
                  <p className="text-sm text-gray-400">Faster test optimization vs classical algorithms</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Analytics & Insights</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Cost Savings</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">95.7%</div>
                  <p className="text-sm text-gray-400">vs Traditional Cloud Testing</p>
                  <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                    <p className="text-xs text-green-400">You've saved $12,847 this month!</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Network Performance</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Validators</span>
                    <span className="text-white font-medium">{networkStats.validators.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">TPS</span>
                    <span className="text-white font-medium">{networkStats.tps.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Uptime</span>
                    <span className="text-green-400 font-medium">{networkStats.uptime}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QAEvelateDashboard;