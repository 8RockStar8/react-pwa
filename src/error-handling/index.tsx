import type { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Box, Button, Typography } from '@mui/material';

function AppErrorFallback() {
  return (
    <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh', p: 3, textAlign: 'center' }}>
      <Box sx={{ display: 'grid', gap: 2, maxWidth: 420 }}>
        <Typography variant="h3">This page couldn't load</Typography>
        <Typography color="text.secondary">
          Reload to try again. If it keeps happening, clear this site's data in your browser settings.
        </Typography>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Reload
        </Button>
      </Box>
    </Box>
  );
}

function withErrorHandler<P extends object>(Component: FC<P>) {
  function WithErrorHandler(props: P) {
    return (
      <ErrorBoundary FallbackComponent={AppErrorFallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  }
  WithErrorHandler.displayName = `WithErrorHandler(${Component.displayName || Component.name})`;
  return WithErrorHandler;
}

export { withErrorHandler };
