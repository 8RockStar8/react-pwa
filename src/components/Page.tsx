import type { ReactNode } from 'react';

import { Box, Typography } from '@mui/material';

interface PageProps {
  /** Page heading. Omit on the home page, which has its own hero. */
  title?: string;
  intro?: ReactNode;
  children: ReactNode;
}

function Page({ title, intro, children }: PageProps) {
  return (
    <Box
      sx={{
        maxWidth: 880,
        mx: 'auto',
        pl: 'max(16px, env(safe-area-inset-left, 0px))',
        pr: 'max(16px, env(safe-area-inset-right, 0px))',
        px: { sm: 4 },
        pt: { xs: 4, md: 6 },
        pb: 10,
        display: 'grid',
        gap: { xs: 6, md: 8 },
      }}
    >
      {title && (
        <Box sx={{ display: 'grid', gap: 1.5 }}>
          <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '2.2rem', sm: '2.8rem' } }}>
            {title}
          </Typography>
          {intro && (
            <Typography color="text.secondary" sx={{ maxWidth: '62ch', fontSize: '1.05rem' }}>
              {intro}
            </Typography>
          )}
        </Box>
      )}
      {children}
    </Box>
  );
}

export function SectionTitle({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <Typography
      variant="h4"
      component="h2"
      id={id}
      sx={{ fontSize: '1.05rem', color: 'text.secondary', mb: 2.5 }}
    >
      {children}
    </Typography>
  );
}

export default Page;
