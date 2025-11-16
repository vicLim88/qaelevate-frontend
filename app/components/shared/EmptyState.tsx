import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  features?: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
  className?: string;
}

export function EmptyState({ 
  icon, 
  title, 
  description, 
  action, 
  features,
  className = '' 
}: EmptyStateProps) {
  return (
    <div className={`text-center py-16 ${className}`}>
      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-blue-600/20 rounded-3xl flex items-center justify-center border border-purple-500/30">
        {icon}
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-400 mb-8 max-w-2xl mx-auto">{description}</p>
      
      {features && features.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white/5 rounded-xl border border-purple-500/20">
              <div className="w-8 h-8 mx-auto mb-3 text-blue-400">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
        >
          <span>{action.label}</span>
        </button>
      )}
    </div>
  );
}
