import { useState, useEffect } from 'react';
import type { QuantumMetrics } from '@/types/test.types';
import { ANIMATION_INTERVALS } from '@/constants/theme';

export function useQuantumMetrics(initialMetrics?: Partial<QuantumMetrics>) {
  const [metrics, setMetrics] = useState<QuantumMetrics>({
    qubitsActive: initialMetrics?.qubitsActive || 42,
    optimizationJobs: initialMetrics?.optimizationJobs || 3,
    advantageScore: initialMetrics?.advantageScore || 87.3,
    isActive: initialMetrics?.isActive || true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        qubitsActive: Math.floor(Math.random() * 20) + 30,
        advantageScore: 80 + Math.random() * 20,
        optimizationJobs: Math.floor(Math.random() * 5) + 1,
      }));
    }, ANIMATION_INTERVALS.quantumMetrics);

    return () => clearInterval(interval);
  }, []);

  return metrics;
}
