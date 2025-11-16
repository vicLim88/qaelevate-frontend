import React from 'react';
import { Wallet } from 'lucide-react';
import { formatWalletAddress } from '@/lib/helpers';

interface WalletInfoProps {
  address: string;
  balance: number;
  currency?: string;
  className?: string;
}

export function WalletInfo({ 
  address, 
  balance, 
  currency = 'SOL',
  className = '' 
}: WalletInfoProps) {
  return (
    <div className={`flex items-center space-x-3 bg-white/10 rounded-lg px-3 py-2 ${className}`}>
      <Wallet className="w-4 h-4 text-purple-400" />
      <div className="text-right">
        <div className="text-xs text-gray-300">{formatWalletAddress(address)}</div>
        <div className="text-sm font-medium text-white">
          {balance} {currency}
        </div>
      </div>
    </div>
  );
}
