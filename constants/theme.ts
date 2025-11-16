// Status colors for different states
export const STATUS_COLORS = {
  // Test Job Status
  discovering: 'text-blue-400',
  optimizing: 'text-purple-400',
  executing: 'text-yellow-400',
  completed: 'text-green-400',
  failed: 'text-red-400',
  active: 'text-green-400',
  generating: 'text-yellow-400',
  
  // Agent Status
  busy: 'text-yellow-400',
  idle: 'text-gray-400',
} as const;

// Priority colors
export const PRIORITY_COLORS = {
  critical: 'text-red-400 bg-red-500/20 border-red-500/30',
  high: 'text-orange-400 bg-orange-500/20 border-orange-500/30',
  medium: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
  low: 'text-green-400 bg-green-500/20 border-green-500/30',
} as const;

// Gradient classes
export const GRADIENTS = {
  primary: 'from-purple-600 to-blue-600',
  primaryHover: 'from-purple-700 to-blue-700',
  primaryBg: 'from-purple-500 to-blue-600',
  success: 'from-green-500 to-emerald-600',
  warning: 'from-yellow-500 to-orange-600',
  danger: 'from-red-500 to-red-600',
  info: 'from-blue-500 to-cyan-500',
  purple: 'from-purple-500 to-purple-600',
  blue: 'from-blue-500 to-blue-600',
  headerBg: 'from-purple-900/80 to-blue-900/80',
  pageBg: 'from-gray-900 via-purple-900 to-black',
} as const;

// Card background styles
export const CARD_BG = 'bg-white/10 backdrop-blur-lg rounded-xl border border-white/20';
export const CARD_BG_HOVER = 'bg-white/15';

// Button styles
export const BUTTON_PRIMARY = `bg-gradient-to-r ${GRADIENTS.primary} text-white rounded-lg hover:${GRADIENTS.primaryHover} transition-all`;
export const BUTTON_SECONDARY = 'bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors';

// Agent status backgrounds
export const AGENT_STATUS_BG = {
  busy: `bg-gradient-to-r ${GRADIENTS.warning}`,
  active: `bg-gradient-to-r ${GRADIENTS.success}`,
  idle: 'bg-gradient-to-r from-gray-500 to-gray-600',
} as const;

// Animation intervals
export const ANIMATION_INTERVALS = {
  networkStats: 5000,
  testProgress: 3000,
  quantumMetrics: 3000,
} as const;
