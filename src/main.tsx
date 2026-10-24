import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider as JotaiProvider } from 'jotai';

// Fonts are bundled (not loaded from Google), so the app looks right offline too.
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/atkinson-hyperlegible/400.css';
import '@fontsource/atkinson-hyperlegible/700.css';

import App from '@/App';
import ThemeProvider from '@/theme/Provider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <JotaiProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </JotaiProvider>
  </StrictMode>,
);
