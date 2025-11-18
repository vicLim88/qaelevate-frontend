'use client';

import React, { useState } from 'react';
import { Monitor, Smartphone, Bot } from 'lucide-react';
import type { TestSpace } from '@/types/test.types';

interface CreateTestSpaceFormProps {
  onCancel: () => void;
  onCreate: (space: Omit<TestSpace, 'id' | 'createdAt' | 'lastRun'>) => void;
}

export function CreateTestSpaceForm({ onCancel, onCreate }: CreateTestSpaceFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'web' as 'web' | 'android' | 'ios',
    url: '',
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.url) return;
    
    onCreate({
      name: formData.name,
      type: formData.type,
      url: formData.url,
      status: 'generating',
      testCases: 0,
      aiGenerated: true,
      quantumOptimized: true,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Create New Test Space</h2>
        <p className="text-gray-400">Configure your application for AI-powered test generation</p>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-8">
        <div className="space-y-6">
          {/* Test Space Name */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Test Space Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="e.g., E-commerce Platform, Banking App"
            />
          </div>

          {/* Application Type */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-3">
              Application Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setFormData(prev => ({ ...prev, type: 'web' }))}
                className={`p-4 rounded-lg border transition-all ${
                  formData.type === 'web'
                    ? 'bg-purple-600/20 border-purple-500 text-white'
                    : 'bg-gray-800/30 border-gray-600 text-gray-300 hover:border-gray-500'
                }`}
              >
                <Monitor className="w-8 h-8 mx-auto mb-2" />
                <div className="font-medium">Web Application</div>
                <div className="text-xs text-gray-400 mt-1">Websites, web apps, SPAs</div>
              </button>
              
              <button
                onClick={() => setFormData(prev => ({ ...prev, type: 'android' }))}
                className={`p-4 rounded-lg border transition-all ${
                  formData.type === 'android'
                    ? 'bg-purple-600/20 border-purple-500 text-white'
                    : 'bg-gray-800/30 border-gray-600 text-gray-300 hover:border-gray-500'
                }`}
              >
                <Smartphone className="w-8 h-8 mx-auto mb-2" />
                <div className="font-medium">Android App</div>
                <div className="text-xs text-gray-400 mt-1">APK files, Android apps</div>
              </button>
              
              <button
                onClick={() => setFormData(prev => ({ ...prev, type: 'ios' }))}
                className={`p-4 rounded-lg border transition-all ${
                  formData.type === 'ios'
                    ? 'bg-purple-600/20 border-purple-500 text-white'
                    : 'bg-gray-800/30 border-gray-600 text-gray-300 hover:border-gray-500'
                }`}
              >
                <Smartphone className="w-8 h-8 mx-auto mb-2" />
                <div className="font-medium">iOS App</div>
                <div className="text-xs text-gray-400 mt-1">IPA files, iOS apps</div>
              </button>
            </div>
          </div>

          {/* Application URL (Web only) */}
          {formData.type === 'web' && (
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Application URL
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="https://your-application.com"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 pt-4">
            <button
              onClick={onCancel}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.name || !formData.url}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Bot className="w-5 h-5" />
              <span>Start AI Test Generation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
