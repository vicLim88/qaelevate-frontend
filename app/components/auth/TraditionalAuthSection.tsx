import React, { useState } from 'react';
import { Eye, EyeOff, Brain } from 'lucide-react';
import { PaymentComparison } from '@/app/components/auth/PaymentComparison';
import { usePaymentMetrics } from '@/hooks/usePaymentMetrics';

interface LoginFormData {
  email: string;
  password: string;
}

interface TraditionalAuthSectionProps {
  onLogin: (formData: LoginFormData) => void;
  isLoading: boolean;
}

export function TraditionalAuthSection({ onLogin, isLoading }: TraditionalAuthSectionProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const paymentMetrics = usePaymentMetrics();

  const handleSubmit = () => {
    onLogin(formData);
  };

  return (
    <div>
      <div className="text-center mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <p className="text-yellow-400 text-xs">
          ⚠️ Legacy Mode: Limited features, cloud dependencies, higher costs
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="user@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-3 pr-12 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="••••••••"
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

        <PaymentComparison metrics={paymentMetrics} type="legacy" />

        <button
          onClick={handleSubmit}
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
              Continue with Legacy Payment
            </div>
          )}
        </button>

        <div className="text-center p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-blue-400 text-xs">
            💡 Switch to Web3 Native to save 95% on payment fees!
          </p>
        </div>
      </div>
    </div>
  );
}
