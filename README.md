# QA Elevate Frontend - TypeScript Native

## Overview

This frontend is built with **Next.js 14 + TypeScript** using a **native TypeScript workflow** - no JavaScript compilation step needed during development!

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript 5.3** - Full type safety, no compilation to JS
- **Tailwind CSS** - Utility-first styling
- **React Query** - Server state management
- **ReactFlow** - Graph visualization
- **Framer Motion** - Animations
- **Lucide React** - Icon library

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── api/               # API routes
│   └── components/        # React components
├── types/                 # TypeScript type definitions
│   └── index.ts          # Shared types
├── lib/                   # Utility libraries
│   ├── api.ts            # API client
│   └── utils.ts          # Helper functions
├── hooks/                 # Custom React hooks
├── tsconfig.json         # TypeScript configuration
├── next.config.js        # Next.js configuration
└── package.json          # Dependencies

```

## TypeScript Configuration

### Key Features

- ✅ **Strict Mode**: Full type checking
- ✅ **No Emit**: TypeScript runs natively without compilation
- ✅ **Path Aliases**: Clean imports with `@/*`
- ✅ **Verbatim Module Syntax**: Modern import/export
- ✅ **Bundler Resolution**: Optimized for Next.js

### Path Aliases

```typescript
import { cn } from '@/lib/utils';
import { DetectedElement } from '@/types';
import Button from '@/components/Button';
```

## Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

With Turbopack (faster):
```bash
npm run dev --turbo
```

### Type Checking

```bash
npm run type-check
```

### Build for Production

```bash
npm run build
npm start
```

## TypeScript Best Practices

### 1. Use Strict Types

```typescript
// ❌ Bad
const data: any = await fetch('/api/data');

// ✅ Good
import type { DetectionResponse } from '@/types';
const data: DetectionResponse = await fetch('/api/data');
```

### 2. Use Type Inference

```typescript
// ❌ Unnecessary
const count: number = 5;

// ✅ Better
const count = 5; // TypeScript infers 'number'
```

### 3. Use Const Assertions

```typescript
// ❌ Type is string[]
const actions = ['click', 'type', 'verify'];

// ✅ Type is readonly ['click', 'type', 'verify']
const actions = ['click', 'type', 'verify'] as const;
```

### 4. Use Discriminated Unions

```typescript
type Action = 
  | { type: 'click'; element: string }
  | { type: 'type'; text: string }
  | { type: 'wait'; duration: number };

function execute(action: Action) {
  switch (action.type) {
    case 'click':
      return click(action.element); // ✅ TypeScript knows 'element' exists
    case 'type':
      return type(action.text); // ✅ TypeScript knows 'text' exists
  }
}
```

## API Integration

### Using the API Client

```typescript
import { detectElements, executeClick } from '@/lib/api';
import type { DetectionResponse } from '@/types';

// Detect elements
const result: DetectionResponse = await detectElements({
  image_path: 'screenshot.png',
  confidence_threshold: 0.25
});

// Execute action
await executeClick('button', 'Login');
```

### Error Handling

```typescript
import { APIError } from '@/lib/api';

try {
  const data = await detectElements({ image_path: 'test.png' });
} catch (error) {
  if (error instanceof APIError) {
    console.error(`API Error ${error.status}:`, error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Component Examples

### Type-Safe Component

```typescript
import type { DetectedElement } from '@/types';

interface ElementCardProps {
  element: DetectedElement;
  onClick?: (element: DetectedElement) => void;
}

export default function ElementCard({ element, onClick }: ElementCardProps) {
  return (
    <div onClick={() => onClick?.(element)}>
      <h3>{element.class_name}</h3>
      <p>Confidence: {element.confidence.toFixed(2)}</p>
    </div>
  );
}
```

### Using React Query

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';
import { healthCheck } from '@/lib/api';
import type { HealthCheck } from '@/types';

export default function StatusWidget() {
  const { data, isLoading } = useQuery<HealthCheck>({
    queryKey: ['health'],
    queryFn: healthCheck,
    refetchInterval: 30000, // Refresh every 30s
  });

  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      Status: {data?.status}
    </div>
  );
}
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Access in code:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL;
```

## VSCode Configuration

Recommended `.vscode/settings.json`:

```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

## Troubleshooting

### TypeScript Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Run type check
npm run type-check
```

### Module Not Found

Check `tsconfig.json` paths and ensure imports use the correct aliases.

### Build Errors

Ensure all type errors are resolved:
```bash
npm run type-check
```

## Benefits of This Setup

✅ **No Compilation**: TypeScript runs directly  
✅ **Fast Feedback**: Instant type errors in IDE  
✅ **Better DX**: Full autocomplete and IntelliSense  
✅ **Type Safety**: Catch errors before runtime  
✅ **Clean Code**: No `.js` files cluttering the project  
✅ **Modern**: Latest TypeScript features  

## Next Steps

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev --turbo`
3. Build components with full type safety
4. Integrate with vision-based backend API

---

**All TypeScript, all the time. No JavaScript compilation needed!** 🚀
