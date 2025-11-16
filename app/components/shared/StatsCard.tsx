import React from 'react';

interface StatsCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  gradient?: string;
  className?: string;
}

export function StatsCard({ icon, value, label, gradient = 'from-purple-500 to-blue-600', className = '' }: StatsCardProps) {
  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4 ${className}`}>
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-sm text-gray-400">{label}</div>
        </div>
      </div>
    </div>
  );
}
