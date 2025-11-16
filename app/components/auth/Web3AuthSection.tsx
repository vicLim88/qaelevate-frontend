import React, { useState } from 'react';
import { Zap, Shield } from 'lucide-react';
import { WalletConnector } from '@/app/components/auth/WalletConnector';
import { PaymentComparison } from '@/app/components/auth/PaymentComparison';
import type { WalletProvider } from '@/types/test.types';
import { usePaymentMetrics } from '@/hooks/usePaymentMetrics';

interface Web3AuthSectionProps {
  onConnect: (provider: WalletProvider) => Promise<void>;
  isLoading: boolean;
  isConnected: boolean;
  walletAddress?: string;
  onDisconnect: () => void;
}

export function Web3AuthSection({
  onConnect,
  isLoading,
  isConnected,
  walletAddress,
  onDisconnect,
}: Web3AuthSectionProps) {
  const paymentMetrics = usePaymentMetrics();

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl mb-3">
          <Zap className="w-8 h-8 text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">Connect to Solana Network</h3>
        <p className="text-sm text-gray-400 mb-3">Post-cloud quantum testing infrastructure</p>
      </div>

      <WalletConnector
        onConnect={onConnect}
        isLoading={isLoading}
        isConnected={isConnected}
        walletAddress={walletAddress}
        onDisconnect={onDisconnect}
      />

      <PaymentComparison metrics={paymentMetrics} type="web3" />
    </div>
  );
}
