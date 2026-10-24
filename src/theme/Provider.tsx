import { type ReactNode, useEffect, useMemo } from 'react';

import { ThemeProvider } from '@mui/material/styles';

import { useThemeMode } from '.';
import { buildTheme } from './themes';

function CustomThemeProvider({ children }: { children: ReactNode }) {
  const { themeMode } = useThemeMode();
  const theme = useMemo(() => buildTheme(themeMode), [themeMode]);

  // Keep the browser / installed-app title bar in the same color as the page.
  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme.palette.background.default);
  }, [theme]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default CustomThemeProvider;
