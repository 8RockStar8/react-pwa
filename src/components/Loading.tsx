import { Box, CircularProgress } from '@mui/material';

function Loading() {
  return (
    <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 240 }}>
      <CircularProgress size={28} aria-label="Loading" />
    </Box>
  );
}

export default Loading;
