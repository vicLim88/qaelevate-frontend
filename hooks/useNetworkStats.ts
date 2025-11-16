import { useState, useEffect } from 'react';
import { NetworkStats } from '@/types/test.types';
import { ANIMATION_INTERVALS } from '@/constants/theme';

export function useNetworkStats() {
  const [stats, setStats] = useState<NetworkStats>({
    totalNodes: 127,
    activeTests: 34,
    avgResponseTime: 245,
    systemLoad: 0.68,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        totalNodes: prev.totalNodes + Math.floor(Math.random() * 3 - 1),
        activeTests: Math.max(0, prev.activeTests + Math.floor(Math.random() * 5 - 2)),
        avgResponseTime: Math.max(100, prev.avgResponseTime + Math.floor(Math.random() * 20 - 10)),
        systemLoad: Math.min(1, Math.max(0.1, prev.systemLoad + (Math.random() * 0.1 - 0.05))),
      }));
    }, ANIMATION_INTERVALS.networkStats);

    return () => clearInterval(interval);
  }, []);

  return stats;
}
