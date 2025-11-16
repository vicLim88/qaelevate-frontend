import { useEffect } from 'react';
import type { TestJob } from '@/types/test.types';
import { ANIMATION_INTERVALS } from '@/constants/theme';

export function useLiveTestUpdates(
  _testJobs: TestJob[], 
  setTestJobs: React.Dispatch<React.SetStateAction<TestJob[]>>
) {
  useEffect(() => {
    const interval = setInterval(() => {
      setTestJobs(prev => prev.map(job => {
        if (job.status === 'executing' || job.status === 'optimizing' || job.status === 'discovering') {
          const newProgress = Math.min(job.progress + Math.random() * 5, 100);
          
          if (newProgress >= 100) {
            return { 
              ...job, 
              status: 'completed', 
              progress: 100,
              passed: job.testCases,
              failed: Math.floor(Math.random() * 3),
            };
          }
          
          return { ...job, progress: newProgress };
        }
        return job;
      }));
    }, ANIMATION_INTERVALS.testProgress);

    return () => clearInterval(interval);
  }, [setTestJobs]);
}
