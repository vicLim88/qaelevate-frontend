import { useState, useEffect } from 'react';
import type { PaymentMetrics } from '@/types/test.types';

export function usePaymentMetrics() {
  const [metrics, setMetrics] = useState<PaymentMetrics>({
    web3: {
      transactionFee: 0.02,
      platformFee: 0.01,
      processingTime: 2.5,
      totalCost: 0.03,
      networkLoad: 0.45,
    },
    legacy: {
      transactionFee: 0.15,
      platformFee: 0.25,
      processingTime: 450,
      totalCost: 0.40,
      processingDelay: 300,
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        web3: {
          ...prev.web3,
          networkLoad: Math.min(1, Math.max(0, prev.web3.networkLoad + (Math.random() * 0.1 - 0.05))),
        },
        legacy: {
          ...prev.legacy,
          processingDelay: Math.max(200, prev.legacy.processingDelay + Math.floor(Math.random() * 20 - 10)),
        },
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return metrics;
}
