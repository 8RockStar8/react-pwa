import { type ThemeOptions, createTheme } from '@mui/material/styles';

import type { ThemeMode } from '.';

// Palette: cool slate paper, ink text, teal = "shipping today", amber = "learning now".
const palettes = {
  light: {
    mode: 'light' as const,
    background: { default: '#f2f5f7', paper: '#ffffff' },
    text: { primary: '#142230', secondary: '#566573' },
    divider: '#d3dbe2',
    primary: { main: '#0f6b6a', contrastText: '#ffffff' },
    secondary: { main: '#9a5b00', contrastText: '#ffffff' },
  },
  dark: {
    mode: 'dark' as const,
    background: { default: '#0e141c', paper: '#16202b' },
    text: { primary: '#e5ebf1', secondary: '#9aa8b5' },
    divider: '#2a3644',
    primary: { main: '#4fc8c4', contrastText: '#0e141c' },
    secondary: { main: '#f0b255', contrastText: '#0e141c' },
  },
};

export const displayFont = '"Archivo Variable", "Archivo", "Arial Narrow", system-ui, sans-serif';
export const bodyFont = '"Atkinson Hyperlegible", system-ui, -apple-system, "Segoe UI", sans-serif';

function options(mode: ThemeMode): ThemeOptions {
  return {
    palette: palettes[mode],
    shape: { borderRadius: 10 },
    typography: {
      fontFamily: bodyFont,
      fontSize: 15,
      h1: { fontFamily: displayFont, fontWeight: 850, fontStretch: '118%', lineHeight: 1.02, letterSpacing: '-0.01em' },
      h2: { fontFamily: displayFont, fontWeight: 800, fontStretch: '112%', lineHeight: 1.1 },
      h3: { fontFamily: displayFont, fontWeight: 700, fontStretch: '100%', lineHeight: 1.2 },
      h4: { fontFamily: displayFont, fontWeight: 700, fontStretch: '100%', lineHeight: 1.25 },
      button: { textTransform: 'none', fontWeight: 700 },
      body1: { lineHeight: 1.65 },
    },
    components: {
      MuiButtonBase: { defaultProps: { disableRipple: true } },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
      MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
      MuiCssBaseline: {
        styleOverrides: `
          h1, h2, h3, h4 { text-wrap: balance; }
          ::selection { background: ${mode === 'dark' ? '#4fc8c455' : '#0f6b6a33'}; }
        `,
      },
    },
  };
}

export function buildTheme(mode: ThemeMode) {
  return createTheme(options(mode));
}
