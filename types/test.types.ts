export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'developer' | 'viewer';
}

export interface TestSpace {
  id: string;
  name: string;
  type: 'web' | 'android' | 'ios';
  url?: string;
  appFile?: string;
  createdAt: Date;
  status: 'active' | 'generating' | 'completed';
  testCases: number;
  lastRun?: Date;
  aiGenerated: boolean;
  quantumOptimized: boolean;
}

export interface TestJob {
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

export interface GeneratedTestCase {
  id: string;
  title: string;
  type: 'functional' | 'visual' | 'performance' | 'security' | 'accessibility';
  priority: 'critical' | 'high' | 'medium' | 'low';
  steps: string[];
  expectedResult: string;
  estimatedTime: number;
  aiConfidence: number;
}

export interface AIAgent {
  id: string;
  type: 'discovery' | 'functional' | 'visual' | 'performance' | 'security';
  status: 'active' | 'idle' | 'busy';
  currentTask?: string;
  efficiency: number;
}

export interface QuantumMetrics {
  qubitsActive: number;
  optimizationJobs: number;
  advantageScore: number;
  isActive: boolean;
}

export interface NetworkStats {
  totalNodes: number;
  activeTests: number;
  avgResponseTime: number;
  systemLoad: number;
}

export interface DiscoveryProgress {
  phase: 'analyzing' | 'mapping' | 'generating' | 'optimizing' | 'completed';
  progress: number;
  currentAction: string;
  pagesFound: number;
  flowsDiscovered: number;
  testCasesGenerated: number;
  timeElapsed: number;
}

export interface DiscoveredPage {
  id: string;
  url: string;
  title: string;
  depth: number;
  connections: string[]; // IDs of connected pages
  interactions: number; // Number of interactive elements
  screenshot?: string;
  discoveredAt: Date;
  type: 'landing' | 'form' | 'content' | 'checkout' | 'auth' | 'other';
}

export interface UserStory {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  pages: string[]; // IDs of pages involved
  testCases: GeneratedTestCase[];
  quantumScore: number; // Quantum optimization efficiency score
  coverage: number; // Percentage of relevant pages covered
  estimatedTime: number; // In seconds
  aiConfidence: number;
  status: 'generated' | 'optimizing' | 'ready' | 'executing' | 'completed';
}

export interface PaymentMetrics {
  web3: {
    transactionFee: number;
    platformFee: number;
    processingTime: number;
    totalCost: number;
    networkLoad: number;
  };
  legacy: {
    transactionFee: number;
    platformFee: number;
    processingTime: number;
    totalCost: number;
    processingDelay: number;
  };
}

export type AuthType = 'web3' | 'traditional';
export type WalletProvider = 'phantom' | 'solflare' | 'backpack';
export type DashboardTab = 'overview' | 'discovery' | 'ai-generation' | 'tests' | 'agents';
