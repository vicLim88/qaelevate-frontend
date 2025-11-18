'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, Target, Bot, Globe, Brain } from 'lucide-react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { TabNavigation } from '@/app/components/layout/TabNavigation';
import { OverviewTab } from '@/app/components/dashboard/OverviewTab';
import { TestJobsTab } from '@/app/components/dashboard/TestJobsTab';
import { AIAgentsTab } from '@/app/components/dashboard/AIAgentsTab';
import { DiscoveryExplorationTab } from '@/app/components/dashboard/DiscoveryExplorationTab';
import { AITestGenerationTab } from '@/app/components/dashboard/AITestGenerationTab';
import { EmptyTestSpaceState } from '@/app/components/dashboard/EmptyTestSpaceState';
import { CreateTestSpaceForm } from '@/app/components/dashboard/CreateTestSpaceForm';
import { AIGenerationProgress } from '@/app/components/dashboard/AIGenerationProgress';
import { CreateTestForm } from '@/app/components/dashboard/CreateTestForm';
import { TestDiscoveryProgress } from '@/app/components/dashboard/TestDiscoveryProgress';
import { useNetworkStats } from '@/hooks/useNetworkStats';
import { useQuantumMetrics } from '@/hooks/useQuantumMetrics';
import { useLiveTestUpdates } from '@/hooks/useLiveTestUpdates';
import type { DashboardTab, TestJob, AIAgent, User, DiscoveredPage, UserStory, TestSpace, DiscoveryProgress } from '@/types/test.types';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [view, setView] = useState<'dashboard' | 'create' | 'generating' | 'createTest' | 'testDiscovering'>('dashboard');
  const [testSpaces, setTestSpaces] = useState<TestSpace[]>([
    { id: 'space-001', name: 'E-Commerce App', type: 'web', url: 'https://ecommerce-demo.com', status: 'active', testCases: 45, createdAt: new Date(), aiGenerated: true, quantumOptimized: true },
    { id: 'space-002', name: 'Banking Portal', type: 'web', url: 'https://banking-app.demo', status: 'active', testCases: 67, createdAt: new Date(), aiGenerated: true, quantumOptimized: true },
  ]);
  const [currentProgress, setCurrentProgress] = useState<DiscoveryProgress | null>(null);
  const [testDiscoveryProgress, setTestDiscoveryProgress] = useState<{
    progress: number;
    phase: 'discovering' | 'mapping' | 'detecting' | 'generating' | 'optimizing' | 'completed';
    metrics: { pagesDiscovered: number; flowsMapped: number; testsGenerated: number; elementsDetected: number };
    url: string;
  } | null>(null);
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

  // Simulate AI generation progress
  useEffect(() => {
    if (view === 'generating' && currentProgress) {
      const interval = setInterval(() => {
        setCurrentProgress(prev => {
          if (!prev) return null;
          
          const newProgress = Math.min(100, prev.progress + Math.random() * 5);
          const timeElapsed = prev.timeElapsed + 1000;
          
          // Update metrics based on progress
          const pagesFound = Math.floor((newProgress / 100) * 30);
          const flowsDiscovered = Math.floor((newProgress / 100) * 20);
          const testCasesGenerated = Math.floor((newProgress / 100) * 40);
          
          // Update phase based on progress
          let phase: DiscoveryProgress['phase'] = 'analyzing';
          let currentAction = 'Analyzing application structure...';
          
          if (newProgress > 25) {
            phase = 'mapping';
            currentAction = 'Mapping user flows and interactions...';
          }
          if (newProgress > 50) {
            phase = 'generating';
            currentAction = 'Generating test cases with AI...';
          }
          if (newProgress > 75) {
            phase = 'optimizing';
            currentAction = 'Optimizing test suite with quantum algorithms...';
          }
          if (newProgress >= 100) {
            phase = 'completed';
            currentAction = 'Test generation completed!';
            
            // Complete the generation
            setTimeout(() => {
              setView('dashboard');
              setCurrentProgress(null);
            }, 2000);
          }
          
          return {
            phase,
            progress: newProgress,
            currentAction,
            pagesFound,
            flowsDiscovered,
            testCasesGenerated,
            timeElapsed,
          };
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [view, currentProgress]);

  // Handle test space creation
  const handleCreateTestSpace = (spaceData: Omit<TestSpace, 'id' | 'createdAt' | 'lastRun'>) => {
    const newSpace: TestSpace = {
      ...spaceData,
      id: `space-${Date.now()}`,
      createdAt: new Date(),
      testCases: 0,
    };
    
    setTestSpaces(prev => [...prev, newSpace]);
    
    // Start AI generation
    setCurrentProgress({
      phase: 'analyzing',
      progress: 0,
      currentAction: 'Initializing AI agents...',
      pagesFound: 0,
      flowsDiscovered: 0,
      testCasesGenerated: 0,
      timeElapsed: 0,
    });
    
    setView('generating');
  };

  // Mock discovered pages
  const [discoveredPages] = useState<DiscoveredPage[]>([
    {
      id: 'page-001',
      url: 'https://ecommerce-demo.com',
      title: 'Home Page',
      depth: 0,
      connections: ['page-002', 'page-003', 'page-004'],
      interactions: 12,
      screenshot: 'https://placehold.co/1200x800/1e293b/ffffff?text=Homepage+Screenshot',
      interactionDetails: {
        buttons: [
          { label: 'Shop Now', boundingBox: { x: 42, y: 35, width: 12, height: 5 } },
          { label: 'View Cart', boundingBox: { x: 85, y: 3, width: 8, height: 4 } },
          { label: 'Sign In', boundingBox: { x: 75, y: 3, width: 7, height: 4 } },
          { label: 'Search', boundingBox: { x: 68, y: 8, width: 6, height: 4 } },
        ],
        links: [
          { text: 'Products', href: '/products', boundingBox: { x: 15, y: 3, width: 8, height: 3 } },
          { text: 'Cart', href: '/cart', boundingBox: { x: 85, y: 3, width: 5, height: 3 } },
          { text: 'Login', href: '/login', boundingBox: { x: 75, y: 3, width: 6, height: 3 } },
          { text: 'About', href: '/about', boundingBox: { x: 10, y: 90, width: 6, height: 3 } },
          { text: 'Contact', href: '/contact', boundingBox: { x: 18, y: 90, width: 7, height: 3 } },
        ],
        forms: [
          { id: 'newsletter-form', fields: 1, boundingBox: { x: 30, y: 85, width: 40, height: 8 } },
        ],
        inputs: [
          { type: 'search', name: 'q', boundingBox: { x: 45, y: 8, width: 20, height: 4 } },
          { type: 'email', name: 'email', boundingBox: { x: 32, y: 86, width: 25, height: 3 } },
        ],
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
      screenshot: 'https://placehold.co/1200x800/1e293b/ffffff?text=Products+Page',
      interactionDetails: {
        buttons: [
          { label: 'Filter', boundingBox: { x: 5, y: 15, width: 10, height: 5 } },
          { label: 'Sort', boundingBox: { x: 85, y: 15, width: 8, height: 5 } },
          { label: 'Add to Cart', boundingBox: { x: 15, y: 55, width: 12, height: 6 } },
          { label: 'Load More', boundingBox: { x: 42, y: 88, width: 16, height: 6 } },
        ],
        links: [
          { text: 'Electronics', href: '/products/electronics', boundingBox: { x: 8, y: 3, width: 10, height: 3 } },
          { text: 'Clothing', href: '/products/clothing', boundingBox: { x: 20, y: 3, width: 9, height: 3 } },
          { text: 'Home', href: '/', boundingBox: { x: 2, y: 10, width: 6, height: 3 } },
          { text: 'Product Detail', href: '/products/1', boundingBox: { x: 15, y: 40, width: 20, height: 10 } },
        ],
        forms: [
          { id: 'filter-form', fields: 3, boundingBox: { x: 5, y: 22, width: 20, height: 25 } },
        ],
        inputs: [
          { type: 'number', name: 'price_min', boundingBox: { x: 7, y: 25, width: 15, height: 4 } },
          { type: 'number', name: 'price_max', boundingBox: { x: 7, y: 32, width: 15, height: 4 } },
          { type: 'search', name: 'product_search', boundingBox: { x: 35, y: 15, width: 40, height: 5 } },
        ],
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
      screenshot: 'https://placehold.co/1200x800/1e293b/ffffff?text=Shopping+Cart',
      interactionDetails: {
        buttons: [
          { label: 'Update Quantity', boundingBox: { x: 58, y: 35, width: 12, height: 5 } },
          { label: 'Remove Item', boundingBox: { x: 72, y: 35, width: 10, height: 5 } },
          { label: 'Continue Shopping', boundingBox: { x: 10, y: 80, width: 18, height: 6 } },
          { label: 'Proceed to Checkout', boundingBox: { x: 72, y: 80, width: 20, height: 6 } },
        ],
        links: [
          { text: 'Continue Shopping', href: '/products', boundingBox: { x: 10, y: 10, width: 16, height: 3 } },
          { text: 'Checkout', href: '/checkout', boundingBox: { x: 74, y: 80, width: 16, height: 5 } },
        ],
        forms: [],
        inputs: [
          { type: 'number', name: 'quantity', boundingBox: { x: 45, y: 35, width: 10, height: 5 } },
          { type: 'text', name: 'coupon_code', boundingBox: { x: 10, y: 65, width: 30, height: 5 } },
        ],
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
      screenshot: 'https://placehold.co/1200x800/1e293b/ffffff?text=Login+Page',
      interactionDetails: {
        buttons: [
          { label: 'Sign In', boundingBox: { x: 35, y: 55, width: 30, height: 7 } },
          { label: 'Sign Up', boundingBox: { x: 35, y: 68, width: 30, height: 7 } },
          { label: 'Forgot Password', boundingBox: { x: 35, y: 80, width: 30, height: 6 } },
        ],
        links: [
          { text: 'Sign Up', href: '/signup', boundingBox: { x: 37, y: 70, width: 10, height: 3 } },
          { text: 'Forgot Password', href: '/forgot-password', boundingBox: { x: 35, y: 82, width: 16, height: 3 } },
          { text: 'Home', href: '/', boundingBox: { x: 5, y: 3, width: 8, height: 3 } },
        ],
        forms: [
          { id: 'login-form', fields: 2, boundingBox: { x: 30, y: 30, width: 40, height: 35 } },
        ],
        inputs: [
          { type: 'email', name: 'email', boundingBox: { x: 35, y: 35, width: 30, height: 5 } },
          { type: 'password', name: 'password', boundingBox: { x: 35, y: 45, width: 30, height: 5 } },
        ],
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
      screenshot: 'https://placehold.co/1200x800/1e293b/ffffff?text=Electronics+Category',
      interactionDetails: {
        buttons: [
          { label: 'Add to Cart', boundingBox: { x: 30, y: 45, width: 15, height: 6 } },
          { label: 'Filter', boundingBox: { x: 5, y: 15, width: 10, height: 5 } },
          { label: 'Sort', boundingBox: { x: 85, y: 15, width: 8, height: 5 } },
        ],
        links: [
          { text: 'Laptops', href: '/products/electronics/laptops', boundingBox: { x: 8, y: 25, width: 12, height: 4 } },
          { text: 'Phones', href: '/products/electronics/phones', boundingBox: { x: 8, y: 32, width: 11, height: 4 } },
          { text: 'Accessories', href: '/products/electronics/accessories', boundingBox: { x: 8, y: 39, width: 14, height: 4 } },
          { text: 'Product Details', href: '/products/electronics/1', boundingBox: { x: 30, y: 35, width: 20, height: 12 } },
        ],
        forms: [
          { id: 'electronics-filter', fields: 2, boundingBox: { x: 5, y: 20, width: 18, height: 30 } },
        ],
        inputs: [
          { type: 'range', name: 'price', boundingBox: { x: 7, y: 28, width: 14, height: 3 } },
          { type: 'checkbox', name: 'brand', boundingBox: { x: 7, y: 35, width: 12, height: 8 } },
        ],
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
      screenshot: 'https://placehold.co/1200x800/1e293b/ffffff?text=Clothing+Category',
      interactionDetails: {
        buttons: [
          { label: 'Add to Cart', boundingBox: { x: 55, y: 50, width: 15, height: 6 } },
          { label: 'Filter', boundingBox: { x: 5, y: 15, width: 10, height: 5 } },
          { label: 'Sort', boundingBox: { x: 85, y: 15, width: 8, height: 5 } },
        ],
        links: [
          { text: 'Men', href: '/products/clothing/men', boundingBox: { x: 8, y: 25, width: 8, height: 4 } },
          { text: 'Women', href: '/products/clothing/women', boundingBox: { x: 8, y: 32, width: 10, height: 4 } },
          { text: 'Kids', href: '/products/clothing/kids', boundingBox: { x: 8, y: 39, width: 8, height: 4 } },
          { text: 'Product Details', href: '/products/clothing/1', boundingBox: { x: 55, y: 40, width: 20, height: 12 } },
        ],
        forms: [
          { id: 'clothing-filter-form', fields: 2, boundingBox: { x: 5, y: 20, width: 18, height: 25 } },
        ],
        inputs: [
          { type: 'checkbox', name: 'size', boundingBox: { x: 7, y: 28, width: 12, height: 6 } },
          { type: 'checkbox', name: 'color', boundingBox: { x: 7, y: 37, width: 12, height: 6 } },
        ],
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
      screenshot: 'https://placehold.co/1200x800/1e293b/ffffff?text=Checkout+Page',
      interactionDetails: {
        buttons: [
          { label: 'Place Order', boundingBox: { x: 35, y: 82, width: 30, height: 8 } },
          { label: 'Apply Coupon', boundingBox: { x: 72, y: 25, width: 16, height: 5 } },
          { label: 'Edit Cart', boundingBox: { x: 5, y: 10, width: 12, height: 5 } },
        ],
        links: [
          { text: 'Back to Cart', href: '/cart', boundingBox: { x: 5, y: 3, width: 12, height: 3 } },
          { text: 'Terms & Conditions', href: '/terms', boundingBox: { x: 35, y: 75, width: 18, height: 3 } },
        ],
        forms: [
          { id: 'shipping-form', fields: 4, boundingBox: { x: 10, y: 15, width: 45, height: 30 } },
          { id: 'payment-form', fields: 3, boundingBox: { x: 10, y: 50, width: 45, height: 25 } },
        ],
        inputs: [
          { type: 'text', name: 'full_name', boundingBox: { x: 12, y: 18, width: 40, height: 4 } },
          { type: 'text', name: 'address', boundingBox: { x: 12, y: 25, width: 40, height: 4 } },
          { type: 'text', name: 'city', boundingBox: { x: 12, y: 32, width: 25, height: 4 } },
          { type: 'text', name: 'zip_code', boundingBox: { x: 40, y: 32, width: 12, height: 4 } },
          { type: 'text', name: 'card_number', boundingBox: { x: 12, y: 53, width: 40, height: 4 } },
          { type: 'text', name: 'cvv', boundingBox: { x: 12, y: 60, width: 15, height: 4 } },
          { type: 'text', name: 'expiry_date', boundingBox: { x: 30, y: 60, width: 20, height: 4 } },
        ],
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
      screenshot: 'https://placehold.co/1200x800/1e293b/ffffff?text=Laptops+Category',
      interactionDetails: {
        buttons: [
          { label: 'Add to Cart', boundingBox: { x: 60, y: 45, width: 15, height: 6 } },
          { label: 'Compare', boundingBox: { x: 78, y: 45, width: 12, height: 6 } },
          { label: 'Quick View', boundingBox: { x: 60, y: 38, width: 14, height: 5 } },
          { label: 'Filter', boundingBox: { x: 5, y: 15, width: 10, height: 5 } },
        ],
        links: [
          { text: 'Gaming Laptops', href: '/products/electronics/laptops/gaming', boundingBox: { x: 8, y: 28, width: 14, height: 4 } },
          { text: 'Business Laptops', href: '/products/electronics/laptops/business', boundingBox: { x: 8, y: 35, width: 16, height: 4 } },
          { text: 'Product Details', href: '/products/electronics/laptops/1', boundingBox: { x: 60, y: 30, width: 25, height: 15 } },
        ],
        forms: [
          { id: 'laptop-filter', fields: 3, boundingBox: { x: 5, y: 20, width: 18, height: 35 } },
          { id: 'compare-form', fields: 0, boundingBox: { x: 78, y: 10, width: 18, height: 8 } },
        ],
        inputs: [
          { type: 'select', name: 'ram', boundingBox: { x: 7, y: 28, width: 14, height: 5 } },
          { type: 'select', name: 'storage', boundingBox: { x: 7, y: 36, width: 14, height: 5 } },
          { type: 'range', name: 'price_range', boundingBox: { x: 7, y: 45, width: 14, height: 3 } },
        ],
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
    setView('createTest');
  };

  const handleCreateTest = (data: { url: string; testSpace: string; applicationType: 'web' | 'android' | 'ios' }) => {
    // Initialize test discovery progress
    setTestDiscoveryProgress({
      progress: 0,
      phase: 'discovering',
      metrics: { pagesDiscovered: 0, flowsMapped: 0, testsGenerated: 0, elementsDetected: 0 },
      url: data.url,
    });
    setView('testDiscovering');
  };

  // Simulate test discovery progress
  useEffect(() => {
    if (view === 'testDiscovering' && testDiscoveryProgress) {
      const interval = setInterval(() => {
        setTestDiscoveryProgress((prev) => {
          if (!prev) return prev;
          
          const newProgress = Math.min(prev.progress + Math.random() * 3 + 1, 100);
          let phase = prev.phase;
          let pagesDiscovered = prev.metrics.pagesDiscovered;
          let flowsMapped = prev.metrics.flowsMapped;
          let testsGenerated = prev.metrics.testsGenerated;
          let elementsDetected = prev.metrics.elementsDetected;
          
          if (newProgress < 20) {
            phase = 'discovering';
            pagesDiscovered = Math.floor(newProgress * 0.5);
          } else if (newProgress < 40) {
            phase = 'mapping';
            pagesDiscovered = Math.floor(newProgress * 0.5);
            flowsMapped = Math.floor((newProgress - 20) * 0.3);
          } else if (newProgress < 60) {
            phase = 'detecting';
            pagesDiscovered = Math.floor(newProgress * 0.5);
            flowsMapped = Math.floor((newProgress - 20) * 0.3);
            elementsDetected = Math.floor((newProgress - 40) * 2);
          } else if (newProgress < 80) {
            phase = 'generating';
            pagesDiscovered = Math.floor(newProgress * 0.5);
            flowsMapped = Math.floor((newProgress - 20) * 0.3);
            elementsDetected = Math.floor((newProgress - 40) * 2);
            testsGenerated = Math.floor((newProgress - 60) * 0.4);
          } else if (newProgress < 100) {
            phase = 'optimizing';
            pagesDiscovered = Math.floor(newProgress * 0.5);
            flowsMapped = Math.floor((newProgress - 20) * 0.3);
            elementsDetected = Math.floor((newProgress - 40) * 2);
            testsGenerated = Math.floor((newProgress - 60) * 0.4);
          } else {
            phase = 'completed';
            pagesDiscovered = 15;
            flowsMapped = 8;
            elementsDetected = 42;
            testsGenerated = 23;
            
            // Add the new test job
            setTimeout(() => {
              const newTest: TestJob = {
                id: `test-${Date.now()}`,
                url: prev.url,
                status: 'completed',
                progress: 100,
                startTime: new Date(),
                testCases: testsGenerated,
                passed: testsGenerated - 2,
                failed: 2,
                quantumOptimized: true,
                cost: 0.0125,
              };
              setTestJobs((prevJobs) => [newTest, ...prevJobs]);
              setView('dashboard');
              setTestDiscoveryProgress(null);
            }, 2000);
          }
          
          return {
            ...prev,
            progress: newProgress,
            phase,
            metrics: { pagesDiscovered, flowsMapped, testsGenerated, elementsDetected },
          };
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [view, testDiscoveryProgress]);

  return (
    <DashboardLayout user={user} networkStats={networkStats} showNetworkBar={false}>
      {/* Show empty state if no test spaces */}
      {testSpaces.length === 0 && view === 'dashboard' && (
        <EmptyTestSpaceState onCreateSpace={() => setView('create')} />
      )}

      {/* Show create form */}
      {view === 'create' && (
        <CreateTestSpaceForm
          onCancel={() => setView('dashboard')}
          onCreate={handleCreateTestSpace}
        />
      )}

      {/* Show AI generation progress */}
      {view === 'generating' && currentProgress && (
        <AIGenerationProgress progress={currentProgress} />
      )}

      {/* Show create test form */}
      {view === 'createTest' && (
        <CreateTestForm
          onCancel={() => setView('dashboard')}
          onCreate={handleCreateTest}
          testSpaces={testSpaces.map(space => ({ id: space.id, name: space.name }))}
        />
      )}

      {/* Show test discovery progress */}
      {view === 'testDiscovering' && testDiscoveryProgress && (
        <TestDiscoveryProgress
          progress={testDiscoveryProgress.progress}
          phase={testDiscoveryProgress.phase}
          metrics={testDiscoveryProgress.metrics}
          url={testDiscoveryProgress.url}
        />
      )}

      {/* Show normal dashboard tabs when test spaces exist */}
      {testSpaces.length > 0 && view === 'dashboard' && (
        <>
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
        </>
      )}
    </DashboardLayout>
  );
}
