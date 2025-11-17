'use client';

import React, { useState } from 'react';
import { BarChart3, Target, Bot, Globe, Brain } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { TabNavigation } from '@/app/components/layout/TabNavigation';
import { OverviewTab } from '@/app/components/dashboard/OverviewTab';
import { TestJobsTab } from '@/app/components/dashboard/TestJobsTab';
import { AIAgentsTab } from '@/app/components/dashboard/AIAgentsTab';
import { DiscoveryExplorationTab } from '@/app/components/dashboard/DiscoveryExplorationTab';
import { AITestGenerationTab } from '@/app/components/dashboard/AITestGenerationTab';
import { useNetworkStats } from '@/hooks/useNetworkStats';
import { useQuantumMetrics } from '@/hooks/useQuantumMetrics';
import { useLiveTestUpdates } from '@/hooks/useLiveTestUpdates';
import type { DashboardTab, TestJob, AIAgent, User, DiscoveredPage, UserStory } from '@/types/test.types';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const networkStats = useNetworkStats();
  const quantumMetrics = useQuantumMetrics();

  const [user] = useState<User>({
    id: 'user-001',
    name: 'Alex Chen',
    email: 'alex@qaelevate.com',
    role: 'developer',
  });

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
      cost: 0.0225,
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
      cost: 0.0335,
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
      cost: 0.0115,
    },
  ]);

  const [aiAgents] = useState<AIAgent[]>([
    {
      id: 'agent-001',
      type: 'discovery',
      status: 'busy',
      currentTask: 'Mapping ecommerce-demo.com',
      efficiency: 94,
    },
    {
      id: 'agent-002',
      type: 'functional',
      status: 'active',
      currentTask: 'Testing checkout flow',
      efficiency: 87,
    },
    {
      id: 'agent-003',
      type: 'visual',
      status: 'active',
      currentTask: 'Responsive design validation',
      efficiency: 91,
    },
    { id: 'agent-004', type: 'performance', status: 'idle', efficiency: 89 },
    {
      id: 'agent-005',
      type: 'security',
      status: 'busy',
      currentTask: 'OWASP Top 10 scan',
      efficiency: 96,
    },
  ]);

  // Enable live updates
  useLiveTestUpdates(testJobs, setTestJobs);

  // Mock discovered pages
  const [discoveredPages] = useState<DiscoveredPage[]>([
    {
      id: 'page-001',
      url: 'https://ecommerce-demo.com',
      title: 'Home Page',
      depth: 0,
      connections: ['page-002', 'page-003', 'page-004'],
      interactions: 12,
      interactionDetails: {
        buttons: ['Shop Now', 'View Cart', 'Sign In', 'Search'],
        links: ['Products', 'Cart', 'Login', 'About', 'Contact'],
        forms: ['Newsletter Signup'],
        inputs: ['Search Bar', 'Email Input'],
      },
      discoveredAt: new Date(),
      type: 'landing',
    },
    {
      id: 'page-002',
      url: 'https://ecommerce-demo.com/products',
      title: 'Products',
      depth: 1,
      connections: ['page-005', 'page-006'],
      interactions: 24,
      interactionDetails: {
        buttons: ['Filter', 'Sort', 'Add to Cart (x8)', 'Load More'],
        links: ['Electronics', 'Clothing', 'Home', 'Product Detail (x8)'],
        forms: ['Filter Form'],
        inputs: ['Price Range Min', 'Price Range Max', 'Search Products'],
      },
      discoveredAt: new Date(),
      type: 'content',
    },
    {
      id: 'page-003',
      url: 'https://ecommerce-demo.com/cart',
      title: 'Shopping Cart',
      depth: 1,
      connections: ['page-007'],
      interactions: 8,
      interactionDetails: {
        buttons: ['Update Quantity', 'Remove Item', 'Continue Shopping', 'Proceed to Checkout'],
        links: ['Continue Shopping', 'Checkout'],
        forms: [],
        inputs: ['Quantity Input', 'Coupon Code'],
      },
      discoveredAt: new Date(),
      type: 'form',
    },
    {
      id: 'page-004',
      url: 'https://ecommerce-demo.com/login',
      title: 'Login',
      depth: 1,
      connections: [],
      interactions: 6,
      interactionDetails: {
        buttons: ['Sign In', 'Sign Up', 'Forgot Password'],
        links: ['Sign Up', 'Forgot Password', 'Home'],
        forms: ['Login Form'],
        inputs: ['Email', 'Password'],
      },
      discoveredAt: new Date(),
      type: 'auth',
    },
    {
      id: 'page-005',
      url: 'https://ecommerce-demo.com/products/electronics',
      title: 'Electronics',
      depth: 2,
      connections: ['page-008'],
      interactions: 18,
      interactionDetails: {
        buttons: ['Add to Cart (x6)', 'Filter', 'Sort'],
        links: ['Laptops', 'Phones', 'Accessories', 'Product Details (x6)'],
        forms: ['Filter Form'],
        inputs: ['Price Range', 'Brand Filter'],
      },
      discoveredAt: new Date(),
      type: 'content',
    },
    {
      id: 'page-006',
      url: 'https://ecommerce-demo.com/products/clothing',
      title: 'Clothing',
      depth: 2,
      connections: [],
      interactions: 15,
      interactionDetails: {
        buttons: ['Add to Cart (x5)', 'Filter', 'Sort'],
        links: ['Men', 'Women', 'Kids', 'Product Details (x5)'],
        forms: ['Filter Form'],
        inputs: ['Size Filter', 'Color Filter'],
      },
      discoveredAt: new Date(),
      type: 'content',
    },
    {
      id: 'page-007',
      url: 'https://ecommerce-demo.com/checkout',
      title: 'Checkout',
      depth: 2,
      connections: [],
      interactions: 14,
      interactionDetails: {
        buttons: ['Place Order', 'Apply Coupon', 'Edit Cart'],
        links: ['Back to Cart', 'Terms & Conditions'],
        forms: ['Shipping Form', 'Payment Form'],
        inputs: ['Full Name', 'Address', 'City', 'Zip Code', 'Card Number', 'CVV', 'Expiry Date'],
      },
      discoveredAt: new Date(),
      type: 'checkout',
    },
    {
      id: 'page-008',
      url: 'https://ecommerce-demo.com/products/electronics/laptops',
      title: 'Laptops',
      depth: 3,
      connections: [],
      interactions: 20,
      interactionDetails: {
        buttons: ['Add to Cart (x4)', 'Compare', 'Quick View', 'Filter'],
        links: ['Gaming Laptops', 'Business Laptops', 'Product Details (x4)'],
        forms: ['Filter Form', 'Compare Form'],
        inputs: ['RAM Filter', 'Storage Filter', 'Price Range'],
      },
      discoveredAt: new Date(),
      type: 'content',
    },
  ]);

  // Mock user stories
  const [userStories] = useState<UserStory[]>([
    {
      id: 'story-001',
      title: 'Complete Purchase Flow',
      description: 'User browses products, adds to cart, and completes checkout',
      priority: 'critical',
      pages: ['page-001', 'page-002', 'page-005', 'page-003', 'page-007'],
      testCases: [
        {
          id: 'tc-001',
          title: 'Add product to cart',
          type: 'functional',
          priority: 'critical',
          steps: ['Navigate to products', 'Select item', 'Click add to cart'],
          expectedResult: 'Product added successfully',
          estimatedTime: 120,
          aiConfidence: 94,
        },
        {
          id: 'tc-002',
          title: 'Complete checkout',
          type: 'functional',
          priority: 'critical',
          steps: ['Go to cart', 'Proceed to checkout', 'Fill payment details'],
          expectedResult: 'Order placed successfully',
          estimatedTime: 180,
          aiConfidence: 91,
        },
      ],
      quantumScore: 96,
      coverage: 88,
      estimatedTime: 420,
      aiConfidence: 93,
      status: 'ready',
    },
    {
      id: 'story-002',
      title: 'User Authentication',
      description: 'User logs in and accesses account features',
      priority: 'high',
      pages: ['page-001', 'page-004'],
      testCases: [
        {
          id: 'tc-003',
          title: 'Login with valid credentials',
          type: 'functional',
          priority: 'high',
          steps: ['Click login', 'Enter email', 'Enter password', 'Submit'],
          expectedResult: 'User logged in successfully',
          estimatedTime: 90,
          aiConfidence: 96,
        },
      ],
      quantumScore: 92,
      coverage: 75,
      estimatedTime: 150,
      aiConfidence: 95,
      status: 'executing',
    },
    {
      id: 'story-003',
      title: 'Product Browse and Filter',
      description: 'User explores product categories and applies filters',
      priority: 'medium',
      pages: ['page-001', 'page-002', 'page-005', 'page-006'],
      testCases: [
        {
          id: 'tc-004',
          title: 'Navigate categories',
          type: 'functional',
          priority: 'medium',
          steps: ['Click products', 'Browse categories', 'View items'],
          expectedResult: 'Categories display correctly',
          estimatedTime: 100,
          aiConfidence: 89,
        },
        {
          id: 'tc-005',
          title: 'Apply product filters',
          type: 'functional',
          priority: 'medium',
          steps: ['Select category', 'Apply filters', 'View results'],
          expectedResult: 'Filtered results display',
          estimatedTime: 120,
          aiConfidence: 87,
        },
      ],
      quantumScore: 85,
      coverage: 92,
      estimatedTime: 280,
      aiConfidence: 88,
      status: 'optimizing',
    },
  ]);

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: BarChart3 },
    { id: 'discovery' as const, label: 'Discovery', icon: Globe },
    { id: 'ai-generation' as const, label: 'AI Generation', icon: Brain },
    { id: 'tests' as const, label: 'Test Jobs', icon: Target },
    { id: 'agents' as const, label: 'AI Agents', icon: Bot },
  ];

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
      cost: 0,
    };
    setTestJobs((prev) => [newTest, ...prev]);
  };

  return (
    <DashboardLayout user={user} networkStats={networkStats} showNetworkBar={false}>
      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'overview' && (
        <OverviewTab
          testJobs={testJobs}
          aiAgents={aiAgents}
          quantumMetrics={quantumMetrics}
          onNewTest={startNewTest}
        />
      )}

      {activeTab === 'discovery' && (
        <DiscoveryExplorationTab
          discoveredPages={discoveredPages}
          isExploring={testJobs.some(job => job.status === 'discovering')}
          explorationMetrics={{
            totalPages: discoveredPages.length,
            explorationDepth: Math.max(...discoveredPages.map(p => p.depth)),
            pagesPerMinute: 12,
            coverage: 87,
          }}
        />
      )}

      {activeTab === 'ai-generation' && (
        <AITestGenerationTab
          userStories={userStories}
          isGenerating={testJobs.some(job => job.status === 'optimizing')}
        />
      )}

      {activeTab === 'tests' && <TestJobsTab testJobs={testJobs} onNewTest={startNewTest} />}

      {activeTab === 'agents' && <AIAgentsTab agents={aiAgents} />}
    </DashboardLayout>
  );
}
