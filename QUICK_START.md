# 🚀 Quick Start Guide - QAEvelate Refactored Codebase

## 📥 Getting Started

### View the Pages

```bash
# Login page
http://localhost:3000/login

# Dashboard page
http://localhost:3000/dashboard
```

## 🎨 Using Shared Components

### Example: Stats Card
```tsx
import { StatsCard } from '@/app/components/shared';
import { Target } from 'lucide-react';
import { GRADIENTS } from '@/constants/theme';

<StatsCard
  icon={<Target className="w-5 h-5 text-white" />}
  value={42}
  label="Active Tests"
  gradient={GRADIENTS.success}
/>
```

### Example: Progress Bar
```tsx
import { ProgressBar } from '@/app/components/shared';

<ProgressBar 
  progress={67} 
  height="md" 
  showPercentage 
/>
```

### Example: Status Badge
```tsx
import { StatusBadge } from '@/app/components/shared';
import { getStatusColor } from '@/lib/helpers';

<StatusBadge
  status="executing"
  colorClass={getStatusColor('executing')}
  showDot
  dotAnimate
/>
```

## 🪝 Using Custom Hooks

### Network Statistics
```tsx
import { useNetworkStats } from '@/hooks';

function MyComponent() {
  const networkStats = useNetworkStats();
  
  return (
    <div>
      <p>TPS: {networkStats.tps}</p>
      <p>Validators: {networkStats.validators}</p>
    </div>
  );
}
```

### Quantum Metrics
```tsx
import { useQuantumMetrics } from '@/hooks';

function MyComponent() {
  const quantumMetrics = useQuantumMetrics();
  
  return (
    <div>
      <p>Qubits Active: {quantumMetrics.qubitsActive}</p>
      <p>Advantage: {quantumMetrics.advantageScore}%</p>
    </div>
  );
}
```

### Live Test Updates
```tsx
import { useLiveTestUpdates } from '@/hooks';
import { useState } from 'react';
import type { TestJob } from '@/types/test.types';

function MyComponent() {
  const [testJobs, setTestJobs] = useState<TestJob[]>([]);
  
  // Auto-updates test progress every 3 seconds
  useLiveTestUpdates(testJobs, setTestJobs);
  
  return <div>{/* Render test jobs */}</div>;
}
```

## 🎯 Using Helper Functions

### Formatting
```tsx
import { 
  formatCurrency, 
  formatWalletAddress, 
  formatNumber,
  calculateSuccessRate 
} from '@/lib/helpers';

const cost = formatCurrency(0.0225);           // "$0.0225"
const wallet = formatWalletAddress('A7Km...'); // "A7Km...Yz4M"
const count = formatNumber(65000);             // "65,000"
const rate = calculateSuccessRate(42, 50);     // 84
```

### Status & Priority Colors
```tsx
import { 
  getStatusColor, 
  getPriorityColor,
  getAgentStatusBg 
} from '@/lib/helpers';

const statusColor = getStatusColor('executing');      // "text-yellow-400"
const priorityColor = getPriorityColor('critical');   // "text-red-400 bg-red-500/20..."
const agentBg = getAgentStatusBg('busy');            // "bg-gradient-to-r from-yellow-500..."
```

### Icons
```tsx
import { getAgentIcon, getTypeIcon } from '@/lib/helpers';

const AgentIcon = getAgentIcon('security');  // Shield component
const TypeIcon = getTypeIcon('performance'); // Rocket component

<AgentIcon className="w-5 h-5" />
```

## 🏗️ Using Layout Components

### Dashboard Layout
```tsx
import { DashboardLayout } from '@/app/components/layout';
import { useNetworkStats } from '@/hooks';
import type { User } from '@/types/test.types';

export default function MyPage() {
  const networkStats = useNetworkStats();
  const user: User = {
    wallet: 'A7KmS9VgBfxR2Qw8NpX3Yz4M',
    balance: 15.7825,
    testsRemaining: 247,
  };
  
  return (
    <DashboardLayout 
      user={user} 
      networkStats={networkStats}
      showNetworkBar={true}
    >
      <h1>My Content</h1>
      {/* Your page content */}
    </DashboardLayout>
  );
}
```

### Tab Navigation
```tsx
import { TabNavigation } from '@/app/components/layout';
import { BarChart3, Target, Bot } from 'lucide-react';
import type { DashboardTab } from '@/types/test.types';

const tabs = [
  { id: 'overview' as DashboardTab, label: 'Overview', icon: BarChart3 },
  { id: 'tests' as DashboardTab, label: 'Tests', icon: Target },
  { id: 'agents' as DashboardTab, label: 'Agents', icon: Bot },
];

<TabNavigation 
  tabs={tabs} 
  activeTab={activeTab} 
  onTabChange={setActiveTab} 
/>
```

## 🎨 Using Theme Constants

### Gradients
```tsx
import { GRADIENTS } from '@/constants/theme';

<div className={`bg-gradient-to-r ${GRADIENTS.primary}`}>
  Primary gradient
</div>

<div className={`bg-gradient-to-r ${GRADIENTS.success}`}>
  Success gradient
</div>
```

### Status Colors
```tsx
import { STATUS_COLORS } from '@/constants/theme';

<span className={STATUS_COLORS.executing}>Executing</span>
<span className={STATUS_COLORS.completed}>Completed</span>
```

### Card Backgrounds
```tsx
import { CARD_BG } from '@/constants/theme';

<div className={CARD_BG}>
  Card content
</div>
```

## 📝 TypeScript Types

### Import Types
```tsx
import type { 
  User,
  TestJob,
  TestSpace,
  AIAgent,
  QuantumMetrics,
  NetworkStats,
  GeneratedTestCase,
  AuthType,
  WalletProvider,
  DashboardTab
} from '@/types/test.types';
```

### Use in Components
```tsx
interface MyComponentProps {
  user: User;
  testJobs: TestJob[];
  agents: AIAgent[];
}

export function MyComponent({ user, testJobs, agents }: MyComponentProps) {
  // Component implementation
}
```

## 🔐 Auth Components

### Web3 Authentication
```tsx
import { Web3AuthSection } from '@/app/components/auth';
import type { WalletProvider } from '@/types/test.types';

const handleConnect = async (provider: WalletProvider) => {
  console.log(`Connecting to ${provider}...`);
  // Connection logic
};

<Web3AuthSection
  onConnect={handleConnect}
  isLoading={isLoading}
  isConnected={walletConnected}
  walletAddress={walletAddress}
  onDisconnect={handleDisconnect}
/>
```

### Traditional Authentication
```tsx
import { TraditionalAuthSection } from '@/app/components/auth';

const handleLogin = (formData: { email: string; password: string }) => {
  console.log('Logging in...', formData);
  // Login logic
};

<TraditionalAuthSection
  onLogin={handleLogin}
  isLoading={isLoading}
/>
```

## 📊 Dashboard Components

### Overview Tab
```tsx
import { OverviewTab } from '@/app/components/dashboard';
import type { TestJob, AIAgent, QuantumMetrics } from '@/types/test.types';

<OverviewTab
  testJobs={testJobs}
  aiAgents={aiAgents}
  quantumMetrics={quantumMetrics}
  onNewTest={handleNewTest}
/>
```

### Test Jobs Tab
```tsx
import { TestJobsTab } from '@/app/components/dashboard';

<TestJobsTab
  testJobs={testJobs}
  onNewTest={handleNewTest}
/>
```

### AI Agents Tab
```tsx
import { AIAgentsTab } from '@/app/components/dashboard';

<AIAgentsTab agents={aiAgents} />
```

## 🎭 Empty State
```tsx
import { EmptyState } from '@/app/components/shared';
import { Folder, Bot, Atom, Zap } from 'lucide-react';

<EmptyState
  icon={<Folder className="w-12 h-12 text-purple-400" />}
  title="Welcome to QAEvelate!"
  description="Create your first test space to get started"
  action={{
    label: "Create Test Space",
    onClick: handleCreate
  }}
  features={[
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Discovery",
      description: "Autonomous agents explore your app"
    },
    {
      icon: <Atom className="w-8 h-8" />,
      title: "Quantum Optimization",
      description: "QAOA algorithms optimize test selection"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Results",
      description: "Get comprehensive test suites in minutes"
    }
  ]}
/>
```

## 🔄 Common Patterns

### Page with Live Updates
```tsx
'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/app/components/layout';
import { useNetworkStats, useLiveTestUpdates } from '@/hooks';
import type { User, TestJob } from '@/types/test.types';

export default function MyPage() {
  const [testJobs, setTestJobs] = useState<TestJob[]>([]);
  const networkStats = useNetworkStats();
  const user: User = { /* ... */ };
  
  // Enable live updates
  useLiveTestUpdates(testJobs, setTestJobs);
  
  return (
    <DashboardLayout user={user} networkStats={networkStats}>
      {/* Content */}
    </DashboardLayout>
  );
}
```

### Tab-based Page
```tsx
'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/app/components/layout';
import { TabNavigation } from '@/app/components/layout';
import type { DashboardTab } from '@/types/test.types';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  
  return (
    <DashboardLayout user={user} networkStats={networkStats}>
      <TabNavigation 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      {activeTab === 'overview' && <OverviewContent />}
      {activeTab === 'tests' && <TestsContent />}
      {/* etc */}
    </DashboardLayout>
  );
}
```

## 📁 File Organization

### Creating a New Component
```tsx
// 1. Create file: /app/components/shared/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
  value: number;
}

export function MyComponent({ title, value }: MyComponentProps) {
  return (
    <div className="bg-white/10 p-4 rounded-lg">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

// 2. Export from index: /app/components/shared/index.ts
export { MyComponent } from './MyComponent';

// 3. Use anywhere:
import { MyComponent } from '@/app/components/shared';
```

## 🎯 Best Practices

1. **Always use TypeScript types**
```tsx
import type { TestJob } from '@/types/test.types';
// Not: any or unknown
```

2. **Use theme constants**
```tsx
import { GRADIENTS } from '@/constants/theme';
// Not: hardcoded colors
```

3. **Use helper functions**
```tsx
import { formatCurrency } from '@/lib/helpers';
const cost = formatCurrency(0.0225);
// Not: `$${amount.toFixed(4)}`
```

4. **Extract logic into hooks**
```tsx
// Good
const networkStats = useNetworkStats();

// Not good
const [stats, setStats] = useState({});
useEffect(() => { /* complex logic */ }, []);
```

5. **Keep components small**
```tsx
// Prefer multiple small components
<OverviewTab />  // 80 lines

// Over one large component
<Dashboard />    // 600 lines
```

## 📚 Resources

- **Full Documentation**: `/workspace/REFACTORING_GUIDE.md`
- **Project Structure**: `/workspace/PROJECT_STRUCTURE.md`
- **Summary**: `/workspace/REFACTORING_SUMMARY.md`
- **Original Mockups**: `/workspace/app/mockups/`

## 🆘 Common Issues

### Type errors?
- Check imports: `import type { ... } from '@/types/test.types'`
- Ensure all props are typed

### Component not found?
- Check it's exported from index.ts
- Verify import path

### Styles not working?
- Use theme constants from `/constants/theme.ts`
- Check Tailwind classes are correct

### Hooks not updating?
- Ensure component has `'use client'` directive
- Check dependencies array in useEffect

---

**Happy coding! 🚀**
