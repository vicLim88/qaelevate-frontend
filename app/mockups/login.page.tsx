import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Brain, Atom, Globe, Wallet, Zap, Shield, Activity, DollarSign } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
}

type AuthType = 'web3' | 'traditional';
type WalletProvider = 'phantom' | 'solflare' | 'backpack';

const QAEvelateLogin = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [authType, setAuthType] = useState<AuthType>('web3');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Real-time metrics
  const [networkStats, setNetworkStats] = useState({
    validators: 3400,
    tps: 65000,
    costPerTest: 0.0005,
    quantumActive: false
  });

  // Live payment metrics - More stable with transparency focus
  const [paymentMetrics, setPaymentMetrics] = useState({
    web3: {
      transactionFee: 0.0005, // Fixed transparent pricing
      platformFee: 0,
      processingTime: 400,
      totalCost: 0.0005,
      networkLoad: 0.15 // Show network utilization for transparency
    },
    legacy: {
      transactionFee: 2.9,
      platformFee: 79, // Fixed but realistic
      processingTime: 72,
      totalCost: 3.50, // Fixed pricing
      processingDelay: 0 // Show any delays
    }
  });

  // Update stats periodically - Focus on transparency metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStats(prev => ({
        ...prev,
        tps: Math.floor(Math.random() * 5000) + 60000,
        quantumActive: Math.random() > 0.5,
        costPerTest: 0.0005 // Keep price stable
      }));
      
      // Update transparency metrics without changing core pricing
      setPaymentMetrics(prev => ({
        web3: {
          ...prev.web3,
          processingTime: Math.floor(Math.random() * 100) + 350, // 350-450ms variance
          networkLoad: Number((0.10 + Math.random() * 0.30).toFixed(2)) // 10-40% network load
        },
        legacy: {
          ...prev.legacy,
          processingDelay: Math.floor(Math.random() * 24), // 0-24 hour delays
          processingTime: 72 + Math.floor(Math.random() * 48) // 72-120 hours
        }
      }));
    }, 5000); // Slower updates for less distraction
    return () => clearInterval(interval);
  }, []);

  const connectWallet = async (provider: WalletProvider) => {
    setIsLoading(true);
    try {
      // Simulate wallet connection
      setTimeout(() => {
        setWalletConnected(true);
        setWalletAddress('A7KmS9VgBfxR2Qw8NpX3Yz4M');
        setNetworkStats(prev => ({ ...prev, quantumActive: true }));
        setIsLoading(false);
        console.log(`Connected to ${provider} wallet!`);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.error('Wallet connection failed:', error);
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress('');
    setNetworkStats(prev => ({ ...prev, quantumActive: false }));
  };

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Traditional login:', formData);
    }, 2000);
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
            backgroundSize: '50px 50px'
          }} 
        />
      </div>

      {/* Network Stats Bar */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80 backdrop-blur-sm border-b border-purple-500/30 p-3 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-white">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <Globe className="w-3 h-3 text-green-400" />
              <span>{networkStats.validators.toLocaleString()} Validators</span>
            </div>
            <div className="flex items-center space-x-1">
              <Activity className="w-3 h-3 text-blue-400" />
              <span>{networkStats.tps.toLocaleString()} TPS</span>
            </div>
            <div className="flex items-center space-x-1">
              <DollarSign className="w-3 h-3 text-yellow-400" />
              <span>${networkStats.costPerTest} per test</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Atom className={`w-3 h-3 ${networkStats.quantumActive ? 'text-green-400 animate-pulse' : 'text-gray-400'}`} />
              <span>Quantum: {networkStats.quantumActive ? 'ACTIVE' : 'STANDBY'}</span>
            </div>
            <div className="text-green-400 font-medium">95% cheaper than cloud</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 pt-20">
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
              QAEvelate
            </h1>
            <p className="text-gray-300 text-sm mb-1">
              Quantum-Enhanced Autonomous AI Testing 🤖⚡
            </p>
            <p className="text-gray-400 text-xs mb-3">
              World's First Post-Cloud Testing Platform
            </p>
            
            {/* Value Props */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-2 border border-green-500/30">
                <div className="text-green-400 font-medium">95% Cost Reduction</div>
                <div className="text-gray-300">vs Traditional Cloud</div>
              </div>
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-2 border border-blue-500/30">
                <div className="text-blue-400 font-medium">65,000 TPS</div>
                <div className="text-gray-300">Parallel Processing</div>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
            {/* Auth Type Selector */}
            <div className="flex mb-6 bg-gray-800/50 rounded-lg p-1">
              <button
                onClick={() => setAuthType('web3')}
                className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all flex items-center justify-center ${
                  authType === 'web3'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Wallet className="w-3 h-3 mr-1" />
                Web3 Native
              </button>
              <button
                onClick={() => setAuthType('traditional')}
                className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all flex items-center justify-center ${
                  authType === 'traditional'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Shield className="w-3 h-3 mr-1" />
                Legacy
              </button>
            </div>

            {/* Web3 Authentication */}
            {authType === 'web3' && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl mb-3">
                    <Zap className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Connect to Solana Network
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    Post-cloud quantum testing infrastructure
                  </p>
                </div>

                {walletConnected && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse" />
                        <span className="text-green-400 text-sm font-medium">Connected to Solana</span>
                      </div>
                      <button
                        onClick={disconnectWallet}
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
                  <button
                    onClick={() => connectWallet('phantom')}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600/20 to-purple-700/20 border border-purple-500/30 rounded-lg text-white hover:from-purple-600/30 hover:to-purple-700/30 transition-all disabled:opacity-50"
                  >
                    <div className="w-6 h-6 mr-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                      <Wallet className="w-3 h-3 text-white" />
                    </div>
                    {isLoading ? 'Connecting...' : 'Phantom Wallet'}
                  </button>

                  <button
                    onClick={() => connectWallet('solflare')}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-orange-600/20 to-orange-700/20 border border-orange-500/30 rounded-lg text-white hover:from-orange-600/30 hover:to-orange-700/30 transition-all disabled:opacity-50"
                  >
                    <div className="w-6 h-6 mr-3 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                    {isLoading ? 'Connecting...' : 'Solflare Wallet'}
                  </button>

                  <button
                    onClick={() => connectWallet('backpack')}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600/20 to-blue-700/20 border border-blue-500/30 rounded-lg text-white hover:from-blue-600/30 hover:to-blue-700/30 transition-all disabled:opacity-50"
                  >
                    <div className="w-6 h-6 mr-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <Wallet className="w-3 h-3 text-white" />
                    </div>
                    {isLoading ? 'Connecting...' : 'Backpack Wallet'}
                  </button>
                </div>

                <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
                  <h4 className="text-sm font-medium text-white mb-2">🚀 Web3-Native Payment Methods</h4>
                  
                  {/* Crypto Payment Options */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center space-x-2 p-2 bg-gradient-to-r from-purple-600/20 to-purple-700/20 rounded border border-purple-500/30">
                      <div className="w-8 h-5 bg-gradient-to-r from-purple-500 to-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">SOL</div>
                      <span className="text-xs text-white">Solana</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded border border-blue-500/30">
                      <div className="w-8 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">USDC</div>
                      <span className="text-xs text-white">USD Coin</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-gradient-to-r from-green-600/20 to-green-700/20 rounded border border-green-500/30">
                      <div className="w-8 h-5 bg-gradient-to-r from-green-500 to-green-600 rounded text-white text-xs flex items-center justify-center font-bold">USDT</div>
                      <span className="text-xs text-white">Tether USD</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-gradient-to-r from-orange-600/20 to-orange-700/20 rounded border border-orange-500/30">
                      <div className="w-8 h-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded text-white text-xs flex items-center justify-center font-bold">BTC</div>
                      <span className="text-xs text-white">Bitcoin</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-300 space-y-1">
                    <div className="flex justify-between">
                      <span>Transaction Fees:</span>
                      <span className="text-green-400 font-mono">${paymentMetrics.web3.transactionFee} per test</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Fees:</span>
                      <span className="text-green-400">${paymentMetrics.web3.platformFee} (Blockchain Native)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Time:</span>
                      <span className="text-green-400">{paymentMetrics.web3.processingTime}ms (Sub-second)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Network Load:</span>
                      <span className="text-blue-400">{(paymentMetrics.web3.networkLoad * 100).toFixed(0)}% utilization</span>
                    </div>
                    <div className="flex justify-between font-medium border-t border-gray-600 pt-1 mt-2">
                      <span>Total Cost per Test:</span>
                      <span className="text-green-400 font-mono">${paymentMetrics.web3.totalCost}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-2 bg-green-500/10 rounded border border-green-500/30">
                    <div className="text-center">
                      <div className="text-green-400 font-bold text-lg">
                        {Math.floor(paymentMetrics.legacy.totalCost / paymentMetrics.web3.totalCost)}x Cheaper
                      </div>
                      <div className="text-green-300 text-xs">Transparent • Predictable • Fixed Pricing</div>
                    </div>
                  </div>
                  
                  <ul className="text-xs text-gray-400 space-y-1 mt-3">
                    <li>• Instant settlement with 400ms finality</li>
                    <li>• Global accessibility, no geographic restrictions</li>
                    <li>• Zero chargebacks or payment disputes</li>
                    <li>• Transparent, predictable pricing</li>
                    <li>• Built-in escrow and smart contract security</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Traditional Authentication */}
            {authType === 'traditional' && (
              <div>
                <div className="text-center mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-400 text-xs">⚠️ Legacy Mode: Limited features, cloud dependencies, higher costs</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="user@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
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

                  {/* Legacy Payment Methods */}
                  <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-600/30">
                    <h4 className="text-sm font-medium text-white mb-3 flex items-center">
                      💳 Legacy Payment Methods
                      <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Higher Fees</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center space-x-2 p-2 bg-gray-700/30 rounded border border-gray-600/50">
                        <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                        <span className="text-xs text-gray-300">Visa Cards</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-gray-700/30 rounded border border-gray-600/50">
                        <div className="w-8 h-5 bg-gradient-to-r from-red-600 to-orange-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                        <span className="text-xs text-gray-300">Mastercard</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-gray-700/30 rounded border border-gray-600/50">
                        <div className="w-8 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">AMEX</div>
                        <span className="text-xs text-gray-300">American Express</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-gray-700/30 rounded border border-gray-600/50">
                        <div className="w-8 h-5 bg-gradient-to-r from-blue-400 to-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">PP</div>
                        <span className="text-xs text-gray-300">PayPal</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div className="flex justify-between">
                        <span>Processing Fees:</span>
                        <span className="text-red-400">{paymentMetrics.legacy.transactionFee}% + $0.30 per transaction</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Platform Fee:</span>
                        <span className="text-red-400">${paymentMetrics.legacy.platformFee}/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Processing Time:</span>
                        <span className="text-red-400">{paymentMetrics.legacy.processingTime} hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Delays:</span>
                        <span className="text-orange-400">+{paymentMetrics.legacy.processingDelay}h additional</span>
                      </div>
                      <div className="flex justify-between font-medium border-t border-gray-600 pt-1 mt-2">
                        <span>Total Cost per Test:</span>
                        <span className="text-red-400">${paymentMetrics.legacy.totalCost}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleLogin}
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
                    <p className="text-blue-400 text-xs">💡 Switch to Web3 Native to save 95% on payment fees!</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 text-center text-sm text-gray-400">
              {authType === 'web3' ? (
                <p className="text-xs">
                  By connecting your wallet, you agree to join the post-cloud revolution
                </p>
              ) : (
                <p className="text-xs">
                  New to QAEvelate? Switch to Web3 Native for the full experience
                </p>
              )}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-6 text-gray-400 text-xs mb-4">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                31 Nakamoto Coefficient
              </div>
              <div className="flex items-center">
                <Atom className="w-4 h-4 mr-1" />
                Quantum Enhanced
              </div>
              <div className="flex items-center">
                <Brain className="w-4 h-4 mr-1" />
                Autonomous AI
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-2 border border-green-500/20">
                <div className="text-green-400 font-bold text-lg">95%</div>
                <div className="text-gray-300">Cost Reduction</div>
              </div>
              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-2 border border-blue-500/20">
                <div className="text-blue-400 font-bold text-lg">65K</div>
                <div className="text-gray-300">TPS Capacity</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-2 border border-purple-500/20">
                <div className="text-purple-400 font-bold text-lg">400ms</div>
                <div className="text-gray-300">Global Finality</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QAEvelateLogin;