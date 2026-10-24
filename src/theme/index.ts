import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useCallback } from 'react';

import { useMediaQuery } from '@mui/material';

export type ThemeMode = 'light' | 'dark';

// null = follow the device setting. Saved in localStorage once the user toggles.
const storedThemeMode = atomWithStorage<ThemeMode | null>('theme-mode', null, undefined, {
  getOnInit: true,
});

export function useThemeMode() {
  const [stored, setStored] = useAtom(storedThemeMode);
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
  const themeMode: ThemeMode = stored ?? (prefersDark ? 'dark' : 'light');

  const toggle = useCallback(
    () => setStored(themeMode === 'dark' ? 'light' : 'dark'),
    [themeMode, setStored],
  );

  return { themeMode, isDarkMode: themeMode === 'dark', toggle };
}
