import React from 'react';

interface StatusBadgeProps {
  status: string;
  colorClass?: string;
  showDot?: boolean;
  dotAnimate?: boolean;
  className?: string;
}

export function StatusBadge({ 
  status, 
  colorClass = 'text-gray-400', 
  showDot = false,
  dotAnimate = false,
  className = '' 
}: StatusBadgeProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showDot && (
        <div className={`w-3 h-3 rounded-full ${colorClass} ${dotAnimate ? 'animate-pulse' : ''}`} />
      )}
      <span className={`${colorClass} capitalize`}>{status}</span>
    </div>
  );
}
