import { useState, useEffect } from 'react';
import type { PaymentMetrics } from '@/types/test.types';

export function usePaymentMetrics() {
  const [metrics, setMetrics] = useState<PaymentMetrics>({
    totalSpent: 127.45,
    testsExecuted: 2847,
    averageCostPerTest: 0.045,
    currency: 'USD',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        testsExecuted: prev.testsExecuted + Math.floor(Math.random() * 3),
        totalSpent: +(prev.totalSpent + Math.random() * 0.15).toFixed(2),
        averageCostPerTest: +(prev.totalSpent / prev.testsExecuted).toFixed(3),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return metrics;
}
