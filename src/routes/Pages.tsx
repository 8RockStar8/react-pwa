import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';

import { title as siteTitle } from '@/config';

import routes from '.';

function Pages() {
  const { pathname } = useLocation();

  // Scroll to top and update the tab title on every page change.
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const route = routes.find((r) => r.path === pathname);
    document.title = route?.title && route.path !== '/' ? `${route.title} · ${siteTitle}` : siteTitle;
  }, [pathname]);

  return (
    <Routes>
      {routes.map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
}

export default Pages;
