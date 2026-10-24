import { BrowserRouter } from 'react-router';

import { Box, CssBaseline, Toolbar } from '@mui/material';

import { withErrorHandler } from '@/error-handling';
import Pages from '@/routes/Pages';
import Header from '@/sections/Header/Header';
import Sidebar from '@/sections/Sidebar/Sidebar';

// When the site is hosted in a sub-folder (GitHub Pages: /repo-name/), Vite's BASE_URL
// tells the router where the app lives.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter basename={basename}>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <Header />
          <Sidebar />
          <Box
            component="main"
            sx={{
              flex: 1,
              minWidth: 0,
              pt: 'env(safe-area-inset-top, 0px)',
              pb: 'env(safe-area-inset-bottom, 0px)',
            }}
          >
            <Toolbar />
            <Pages />
          </Box>
        </Box>
      </BrowserRouter>
    </>
  );
}

export default withErrorHandler(App);
