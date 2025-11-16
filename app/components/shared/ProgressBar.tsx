import React from 'react';
import { GRADIENTS } from '@/constants/theme';

interface ProgressBarProps {
  progress: number;
  height?: 'sm' | 'md' | 'lg';
  gradient?: string;
  showPercentage?: boolean;
  className?: string;
}

const heights = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

export function ProgressBar({ 
  progress, 
  height = 'md', 
  gradient = GRADIENTS.primary,
  showPercentage = false,
  className = '' 
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={className}>
      <div className={`w-full bg-gray-700 rounded-full ${heights[height]}`}>
        <div 
          className={`bg-gradient-to-r ${gradient} ${heights[height]} rounded-full transition-all duration-500`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showPercentage && (
        <div className="flex justify-between text-sm text-gray-400 mt-1">
          <span>{clampedProgress.toFixed(0)}%</span>
        </div>
      )}
    </div>
  );
}
