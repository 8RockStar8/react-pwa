import { type ComponentType, Suspense, lazy, useEffect, useState } from 'react';

import { loader as loaderConfig } from '@/config';
import Loading from '@/components/Loading';

// Same idea as react-pwa's asyncComponentLoader:
// 1) don't show the spinner at all if the page loads within `delay`
// 2) if the spinner does show, keep it for at least `minimumLoading` so it doesn't flash.

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function DelayedFallback() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setVisible(true), loaderConfig.delay);
    return () => clearTimeout(id);
  }, []);
  return visible ? <Loading /> : null;
}

type Loadable = () => Promise<{ default: ComponentType }>;

function asyncComponentLoader(load: Loadable) {
  const { delay, minimumLoading } = loaderConfig;

  const LazyComponent = lazy(() => {
    const start = performance.now();
    return load().then((module) => {
      const elapsed = performance.now() - start;
      if (elapsed < delay || elapsed > delay + minimumLoading) return module;
      return sleep(delay + minimumLoading - elapsed).then(() => module);
    });
  });

  return function AsyncComponent() {
    return (
      <Suspense fallback={<DelayedFallback />}>
        <LazyComponent />
      </Suspense>
    );
  };
}

export default asyncComponentLoader;
