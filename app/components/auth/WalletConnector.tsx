import React from 'react';
import { Wallet, Zap } from 'lucide-react';
import type { WalletProvider } from '@/types/test.types';
import { GRADIENTS } from '@/constants/theme';

interface WalletConnectorProps {
  onConnect: (provider: WalletProvider) => Promise<void>;
  isLoading: boolean;
  isConnected: boolean;
  walletAddress?: string;
  onDisconnect: () => void;
}

const walletOptions: Array<{
  provider: WalletProvider;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}> = [
  {
    provider: 'phantom',
    name: 'Phantom Wallet',
    icon: Wallet,
    gradient: 'from-purple-600/20 to-purple-700/20',
  },
  {
    provider: 'solflare',
    name: 'Solflare Wallet',
    icon: Zap,
    gradient: 'from-orange-600/20 to-orange-700/20',
  },
  {
    provider: 'backpack',
    name: 'Backpack Wallet',
    icon: Wallet,
    gradient: 'from-blue-600/20 to-blue-700/20',
  },
];

export function WalletConnector({ 
  onConnect, 
  isLoading, 
  isConnected, 
  walletAddress,
  onDisconnect 
}: WalletConnectorProps) {
  return (
    <div className="space-y-4">
      {isConnected && walletAddress && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse" />
              <span className="text-green-400 text-sm font-medium">Connected to Solana</span>
            </div>
            <button
              onClick={onDisconnect}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              Disconnect
            </button>
          </div>
          <p className="text-xs text-gray-400 font-mono mb-2">
            {walletAddress}...{walletAddress.slice(-4)}
          </p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Network:</span>
            <span className="text-blue-400">Mainnet-Beta</span>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {walletOptions.map(wallet => (
          <button
            key={wallet.provider}
            onClick={() => onConnect(wallet.provider)}
            disabled={isLoading}
            className={`w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r ${wallet.gradient} border border-purple-500/30 rounded-lg text-white hover:opacity-80 transition-all disabled:opacity-50`}
          >
            <div className={`w-6 h-6 mr-3 bg-gradient-to-r ${GRADIENTS.primary} rounded-full flex items-center justify-center`}>
              <wallet.icon className="w-3 h-3 text-white" />
            </div>
            {isLoading ? 'Connecting...' : wallet.name}
          </button>
        ))}
      </div>
    </div>
  );
}
