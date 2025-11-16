import { STATUS_COLORS, PRIORITY_COLORS, AGENT_STATUS_BG } from '@/constants/theme';
import type { TestJob, AIAgent, GeneratedTestCase } from '@/types/test.types';
import {
  Globe, Bot, Eye, Rocket, Shield
} from 'lucide-react';

/**
 * Get status color class based on test job status
 */
export function getStatusColor(status: TestJob['status']): string {
  return STATUS_COLORS[status] || STATUS_COLORS.active;
}

/**
 * Get priority color classes
 */
export function getPriorityColor(priority: GeneratedTestCase['priority']): string {
  return PRIORITY_COLORS[priority] || PRIORITY_COLORS.medium;
}

/**
 * Get agent status background gradient
 */
export function getAgentStatusBg(status: AIAgent['status']): string {
  return AGENT_STATUS_BG[status] || AGENT_STATUS_BG.idle;
}

/**
 * Get icon for agent type
 */
export function getAgentIcon(type: AIAgent['type']) {
  const icons = {
    discovery: Globe,
    functional: Bot,
    visual: Eye,
    performance: Rocket,
    security: Shield,
  };
  return icons[type] || Bot;
}

/**
 * Get icon for test case type
 */
export function getTypeIcon(type: GeneratedTestCase['type']) {
  const icons = {
    functional: Bot,
    visual: Eye,
    performance: Rocket,
    security: Shield,
    accessibility: Eye, // Could use a different icon
  };
  return icons[type] || Bot;
}

/**
 * Format wallet address
 */
export function formatWalletAddress(address: string, startChars = 8, endChars = 4): string {
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Format number with locale
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, decimals = 4): string {
  return `$${amount.toFixed(decimals)}`;
}

/**
 * Calculate success rate percentage
 */
export function calculateSuccessRate(passed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((passed / total) * 100);
}

/**
 * Format time duration
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

/**
 * Format elapsed time
 */
export function formatElapsedTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
