'use client';

import React, { useState } from 'react';
import { Brain, Atom, Eye, EyeOff, Globe, Shield } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login:', formData);
      // Redirect to dashboard
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-purple-300/20 animate-bounce">
          <Brain size={60} />
        </div>
        <div className="absolute top-40 right-20 text-blue-300/20 animate-pulse">
          <Atom size={40} />
        </div>
        <div className="absolute bottom-32 left-20 text-purple-300/20 animate-bounce">
          <Globe size={50} />
        </div>

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(180deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo & Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl mb-4 shadow-2xl">
              <div className="relative">
                <Brain className="w-12 h-12 text-white animate-pulse" />
                <Atom className="w-6 h-6 text-yellow-300 absolute -top-1 -right-1 animate-spin" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              QAElevate
            </h1>
            <p className="text-gray-300 text-sm mb-1">
              Quantum-Enhanced Autonomous AI Testing 🤖⚡
            </p>
            <p className="text-gray-400 text-xs mb-3">Next-Generation Intelligent Test Automation</p>

            {/* Value Props */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-2 border border-green-500/30">
                <div className="text-green-400 font-medium">AI-Powered</div>
                <div className="text-gray-300">Autonomous Discovery</div>
              </div>
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-2 border border-blue-500/30">
                <div className="text-blue-400 font-medium">Quantum Optimized</div>
                <div className="text-gray-300">Maximum Coverage</div>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="user@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 pr-12 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Sign In
                  </div>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <div className="mt-4 text-center text-sm text-gray-400">
              <p className="text-xs">
                Don&apos;t have an account?{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Sign up for free
                </a>
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-6 text-gray-400 text-xs">
              <div className="flex items-center">
                <Atom className="w-4 h-4 mr-1" />
                Quantum Enhanced
              </div>
              <div className="flex items-center">
                <Brain className="w-4 h-4 mr-1" />
                Autonomous AI
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                Enterprise Security
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
