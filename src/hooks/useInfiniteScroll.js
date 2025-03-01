import { useInView } from 'react-intersection-observer';
import { useEffect, useCallback } from 'react';

export const useInfiniteScroll = (callback, loading) => {
  // Wrap the callback with useCallback to avoid unnecessary re-renders
  const memoizedCallback = useCallback(callback, [callback]);

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && !loading) {
      memoizedCallback();
    }
  }, [inView, loading, memoizedCallback]);

  return { ref };
};
