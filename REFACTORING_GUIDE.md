# QAEvelate - Refactored Architecture

This document explains the refactored codebase structure, moving from monolithic mockup files to a modular, maintainable architecture.

## 📁 Project Structure

```
/workspace
├── app/
│   ├── components/
│   │   ├── shared/          # Reusable UI components
│   │   │   ├── StatsCard.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── WalletInfo.tsx
│   │   │   ├── NetworkStatusBar.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── index.ts
│   │   ├── auth/            # Authentication components
│   │   │   ├── WalletConnector.tsx
│   │   │   ├── PaymentComparison.tsx
│   │   │   ├── Web3AuthSection.tsx
│   │   │   ├── TraditionalAuthSection.tsx
│   │   │   └── index.ts
│   │   ├── layout/          # Layout components
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── TabNavigation.tsx
│   │   │   └── index.ts
│   │   └── dashboard/       # Dashboard-specific components
│   │       ├── OverviewTab.tsx
│   │       ├── TestJobsTab.tsx
│   │       ├── AIAgentsTab.tsx
│   │       └── index.ts
│   ├── login/
│   │   └── page.tsx         # Login page (refactored)
│   ├── dashboard/
│   │   └── page.tsx         # Dashboard page (refactored)
│   └── mockups/             # Original mockups (reference only)
│       ├── login.page.tsx
│       ├── dashboard_firstTimeSignedIn.page.tsx
│       └── dashboard_withTestWorkspace.page.tsx
├── hooks/
│   ├── useNetworkStats.ts
│   ├── useQuantumMetrics.ts
│   ├── useLiveTestUpdates.ts
│   ├── usePaymentMetrics.ts
│   └── index.ts
├── types/
│   ├── index.ts            # Original types
│   └── test.types.ts       # Comprehensive test-related types
├── constants/
│   └── theme.ts            # Design tokens and constants
└── lib/
    ├── api.ts              # Original API utilities
    ├── utils.ts            # Original utilities
    └── helpers.ts          # New helper functions
```

## 🎯 Key Improvements

### 1. **Component Extraction**
- **Before**: Single 600+ line files with multiple responsibilities
- **After**: Small, focused components (50-150 lines each)
- **Benefits**: Easier to test, maintain, and reuse

### 2. **Type Safety**
- All types centralized in `/types/test.types.ts`
- Consistent interfaces across the application
- Better IDE autocomplete and error catching

### 3. **Custom Hooks**
- `useNetworkStats`: Manages real-time network statistics
- `useQuantumMetrics`: Handles quantum computing metrics
- `useLiveTestUpdates`: Updates test progress in real-time
- `usePaymentMetrics`: Manages payment comparison data

### 4. **Design System**
- Centralized theme constants in `/constants/theme.ts`
- Reusable gradient classes
- Consistent color palette
- Standardized animations

### 5. **Helper Functions**
- Status color mapping
- Number formatting
- Currency formatting
- Success rate calculations
- Wallet address truncation

## 🧩 Component Breakdown

### Shared Components

#### `<StatsCard>`
Display metric cards with icon, value, and label.
```tsx
<StatsCard
  icon={<Target />}
  value={42}
  label="Active Tests"
  gradient="from-green-500 to-emerald-600"
/>
```

#### `<ProgressBar>`
Animated progress indicator with customizable height and gradient.
```tsx
<ProgressBar progress={67} height="md" showPercentage />
```

#### `<StatusBadge>`
Colored status indicator with optional animated dot.
```tsx
<StatusBadge status="executing" colorClass="text-yellow-400" showDot dotAnimate />
```

#### `<WalletInfo>`
Display wallet address and balance.
```tsx
<WalletInfo address={user.wallet} balance={user.balance} currency="SOL" />
```

#### `<NetworkStatusBar>`
Top banner showing network statistics.
```tsx
<NetworkStatusBar stats={networkStats} />
```

#### `<EmptyState>`
Empty state with icon, title, description, and optional action.
```tsx
<EmptyState
  icon={<Folder />}
  title="No Test Spaces"
  description="Create your first test space to get started"
  action={{ label: "Create", onClick: handleCreate }}
  features={[...]}
/>
```

### Layout Components

#### `<DashboardLayout>`
Main layout wrapper with header, wallet info, and navigation.
```tsx
<DashboardLayout user={user} networkStats={networkStats}>
  {children}
</DashboardLayout>
```

#### `<TabNavigation>`
Tab navigation component.
```tsx
<TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
```

### Auth Components

#### `<Web3AuthSection>`
Web3 wallet connection interface.

#### `<TraditionalAuthSection>`
Email/password login form.

#### `<WalletConnector>`
Wallet connection buttons and status.

#### `<PaymentComparison>`
Side-by-side payment method comparison.

## 📊 Data Flow

### Real-time Updates
```
Page Component
  └─> Custom Hook (useNetworkStats, etc.)
      └─> setInterval updates
          └─> State updates
              └─> Component re-renders
```

### Type Safety Flow
```
/types/test.types.ts
  └─> Imported in components
      └─> Props validation
          └─> TypeScript errors at compile time
```

## 🎨 Theme System

### Gradients
```typescript
import { GRADIENTS } from '@/constants/theme';

<div className={`bg-gradient-to-r ${GRADIENTS.primary}`} />
```

### Status Colors
```typescript
import { getStatusColor } from '@/lib/helpers';

const color = getStatusColor(job.status); // Returns 'text-yellow-400'
```

## 🔄 Migration Guide

### From Mockups to Refactored Code

**Old Way (Mockup):**
```tsx
// 600+ lines in one file
const LoginPage = () => {
  const [authType, setAuthType] = useState('web3');
  const [walletConnected, setWalletConnected] = useState(false);
  // ... 20+ more useState hooks
  // ... all logic inline
  // ... all UI inline
  return (/* 500 lines of JSX */);
};
```

**New Way (Refactored):**
```tsx
// Clean, composable
export default function LoginPage() {
  const [authType, setAuthType] = useState<AuthType>('web3');
  const networkStats = useNetworkStats();
  
  return (
    <div>
      <NetworkStatusBar stats={networkStats} />
      {authType === 'web3' ? (
        <Web3AuthSection {...props} />
      ) : (
        <TraditionalAuthSection {...props} />
      )}
    </div>
  );
}
```

## 🚀 Usage Examples

### Creating a New Page

```tsx
'use client';

import { DashboardLayout } from '@/app/components/layout';
import { useNetworkStats } from '@/hooks';
import type { User } from '@/types/test.types';

export default function MyPage() {
  const networkStats = useNetworkStats();
  const user: User = { /* ... */ };
  
  return (
    <DashboardLayout user={user} networkStats={networkStats}>
      <h1>My Content</h1>
    </DashboardLayout>
  );
}
```

### Using Shared Components

```tsx
import { StatsCard, ProgressBar } from '@/app/components/shared';
import { GRADIENTS } from '@/constants/theme';

function MyComponent() {
  return (
    <>
      <StatsCard
        icon={<Icon />}
        value={count}
        label="Items"
        gradient={GRADIENTS.success}
      />
      <ProgressBar progress={75} height="lg" />
    </>
  );
}
```

## 📝 Best Practices

1. **Keep components small**: Aim for 50-150 lines
2. **Use TypeScript**: Import types from `/types/test.types.ts`
3. **Leverage hooks**: Extract stateful logic into custom hooks
4. **Use theme constants**: Don't hardcode colors or gradients
5. **Export from index**: Add new components to index files
6. **Follow naming**: PascalCase for components, camelCase for functions

## 🧪 Testing Considerations

Each component is now independently testable:

```tsx
import { render } from '@testing-library/react';
import { StatsCard } from '@/app/components/shared';

test('renders stats card', () => {
  const { getByText } = render(
    <StatsCard icon={<div />} value={42} label="Tests" />
  );
  expect(getByText('42')).toBeInTheDocument();
});
```

## 🔮 Future Enhancements

- [ ] Add proper routing with Next.js App Router
- [ ] Implement error boundaries
- [ ] Add loading states and skeletons
- [ ] Create Storybook documentation
- [ ] Add unit tests for all components
- [ ] Implement accessibility improvements
- [ ] Add responsive design optimizations
- [ ] Create animation library
- [ ] Build form validation system
- [ ] Add internationalization (i18n)

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hooks](https://react.dev/reference/react)

---

**Note**: The original mockup files are preserved in `/app/mockups/` for reference and should not be modified. All new development should use the refactored structure.
