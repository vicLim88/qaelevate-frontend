import React from 'react';
import { formatCurrency } from '@/lib/helpers';
import type { PaymentMetrics } from '@/types/test.types';

interface PaymentComparisonProps {
  metrics: PaymentMetrics;
  type: 'web3' | 'legacy';
}

export function PaymentComparison({ metrics, type }: PaymentComparisonProps) {
  const data = type === 'web3' ? metrics.web3 : metrics.legacy;
  const isWeb3 = type === 'web3';

  const cryptoOptions = [
    { symbol: 'SOL', name: 'Solana', gradient: 'from-purple-500 to-purple-600' },
    { symbol: 'USDC', name: 'USD Coin', gradient: 'from-blue-500 to-blue-600' },
    { symbol: 'USDT', name: 'Tether USD', gradient: 'from-green-500 to-green-600' },
    { symbol: 'BTC', name: 'Bitcoin', gradient: 'from-orange-500 to-orange-600' },
  ];

  const legacyOptions = [
    { symbol: 'VISA', name: 'Visa Cards', gradient: 'from-blue-600 to-blue-700' },
    { symbol: 'MC', name: 'Mastercard', gradient: 'from-red-600 to-orange-600' },
    { symbol: 'AMEX', name: 'American Express', gradient: 'from-blue-500 to-blue-600' },
    { symbol: 'PP', name: 'PayPal', gradient: 'from-blue-400 to-blue-500' },
  ];

  return (
    <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
      <h4 className="text-sm font-medium text-white mb-2">
        {isWeb3 ? '🚀 Web3-Native Payment Methods' : '💳 Legacy Payment Methods'}
        {!isWeb3 && (
          <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
            Higher Fees
          </span>
        )}
      </h4>

      {/* Payment Options Grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {(isWeb3 ? cryptoOptions : legacyOptions).map(option => (
          <div
            key={option.symbol}
            className={`flex items-center space-x-2 p-2 ${
              isWeb3
                ? `bg-gradient-to-r ${option.gradient}/20 rounded border border-purple-500/30`
                : 'bg-gray-700/30 rounded border border-gray-600/50'
            }`}
          >
            <div className={`w-8 h-5 bg-gradient-to-r ${option.gradient} rounded text-white text-xs flex items-center justify-center font-bold`}>
              {option.symbol}
            </div>
            <span className="text-xs text-gray-300">{option.name}</span>
          </div>
        ))}
      </div>

      {/* Pricing Details */}
      <div className="text-xs text-gray-300 space-y-1">
        <div className="flex justify-between">
          <span>{isWeb3 ? 'Transaction Fees:' : 'Processing Fees:'}</span>
          <span className={isWeb3 ? 'text-green-400 font-mono' : 'text-red-400'}>
            {isWeb3
              ? formatCurrency(data.transactionFee) + ' per test'
              : `${metrics.legacy.transactionFee}% + $0.30 per transaction`}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{isWeb3 ? 'Platform Fees:' : 'Monthly Platform Fee:'}</span>
          <span className={isWeb3 ? 'text-green-400' : 'text-red-400'}>
            {isWeb3
              ? `$${data.platformFee} (Blockchain Native)`
              : `$${data.platformFee}/month`}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Processing Time:</span>
          <span className={isWeb3 ? 'text-green-400' : 'text-red-400'}>
            {isWeb3 ? `${data.processingTime}ms (Sub-second)` : `${data.processingTime} hours`}
          </span>
        </div>
        {isWeb3 && (
          <div className="flex justify-between">
            <span>Network Load:</span>
            <span className="text-blue-400">
              {(metrics.web3.networkLoad * 100).toFixed(0)}% utilization
            </span>
          </div>
        )}
        {!isWeb3 && (
          <div className="flex justify-between">
            <span>Current Delays:</span>
            <span className="text-orange-400">+{metrics.legacy.processingDelay}h additional</span>
          </div>
        )}
        <div className="flex justify-between font-medium border-t border-gray-600 pt-1 mt-2">
          <span>Total Cost per Test:</span>
          <span className={isWeb3 ? 'text-green-400 font-mono' : 'text-red-400'}>
            {formatCurrency(data.totalCost)}
          </span>
        </div>
      </div>

      {/* Comparison Badge */}
      {isWeb3 && (
        <div className="mt-3 p-2 bg-green-500/10 rounded border border-green-500/30">
          <div className="text-center">
            <div className="text-green-400 font-bold text-lg">
              {Math.floor(metrics.legacy.totalCost / metrics.web3.totalCost)}x Cheaper
            </div>
            <div className="text-green-300 text-xs">Transparent • Predictable • Fixed Pricing</div>
          </div>
        </div>
      )}

      {/* Benefits List */}
      <ul className="text-xs text-gray-400 space-y-1 mt-3">
        {isWeb3 ? (
          <>
            <li>• Instant settlement with 400ms finality</li>
            <li>• Global accessibility, no geographic restrictions</li>
            <li>• Zero chargebacks or payment disputes</li>
            <li>• Transparent, predictable pricing</li>
            <li>• Built-in escrow and smart contract security</li>
          </>
        ) : (
          <>
            <li>• Subject to payment processor fees and delays</li>
            <li>• Requires PCI compliance and security audits</li>
            <li>• Risk of chargebacks and fraud</li>
            <li>• Geographic restrictions may apply</li>
          </>
        )}
      </ul>
    </div>
  );
}
