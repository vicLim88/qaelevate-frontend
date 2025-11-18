'use client';

import React, { useState } from 'react';
import { Globe, Smartphone, Monitor, X, Sparkles } from 'lucide-react';

type ApplicationType = 'web' | 'android' | 'ios';

interface CreateTestFormProps {
  onCancel: () => void;
  onCreate: (data: { url: string; testSpace: string; applicationType: ApplicationType }) => void;
  testSpaces: Array<{ id: string; name: string }>;
}

export function CreateTestForm({ onCancel, onCreate, testSpaces }: CreateTestFormProps) {
  const [url, setUrl] = useState('');
  const [selectedSpace, setSelectedSpace] = useState(testSpaces[0]?.id || '');
  const [applicationType, setApplicationType] = useState<ApplicationType>('web');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && selectedSpace) {
      onCreate({ url: url.trim(), testSpace: selectedSpace, applicationType });
    }
  };

  const appTypes: Array<{ value: ApplicationType; label: string; icon: React.ReactNode }> = [
    { value: 'web', label: 'Web Application', icon: <Globe className="w-5 h-5" /> },
    { value: 'android', label: 'Android App', icon: <Smartphone className="w-5 h-5" /> },
    { value: 'ios', label: 'iOS App', icon: <Monitor className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Create New Test</h2>
            <p className="text-gray-300">
              Configure your test parameters and let AI agents discover and test your application
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Test Space Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Test Space
            </label>
            <select
              value={selectedSpace}
              onChange={(e) => setSelectedSpace(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              {testSpaces.map((space) => (
                <option key={space.id} value={space.id}>
                  {space.name}
                </option>
              ))}
            </select>
          </div>

          {/* Application Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Application Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {appTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setApplicationType(type.value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    applicationType === type.value
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-gray-600/50 bg-gray-800/30 hover:border-gray-500'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className={applicationType === type.value ? 'text-purple-400' : 'text-gray-400'}>
                      {type.icon}
                    </div>
                    <span className={`text-sm font-medium ${applicationType === type.value ? 'text-white' : 'text-gray-400'}`}>
                      {type.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* URL/Package Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {applicationType === 'web' ? 'Application URL' : 'Package Name'}
            </label>
            <input
              type={applicationType === 'web' ? 'url' : 'text'}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={
                applicationType === 'web'
                  ? 'https://your-app.com'
                  : applicationType === 'android'
                  ? 'com.example.app'
                  : 'com.example.iosapp'
              }
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* AI Features Info */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-blue-400 mb-1">
                  AI-Powered Testing
                </h4>
                <p className="text-xs text-gray-300">
                  Our AI agents will automatically discover pages, map user flows, detect visual elements with YOLO, 
                  and generate comprehensive test cases using quantum-optimized algorithms.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!url.trim() || !selectedSpace}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start AI Discovery</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
