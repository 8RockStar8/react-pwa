import CopyIcon from '@mui/icons-material/ContentCopy';
import { Box, IconButton, Link, Tooltip, Typography } from '@mui/material';

import { useCopy } from '@/components/ContactLinks';
import DownloadCv from '@/components/DownloadCv';
import Page from '@/components/Page';
import cv from '@/data/cv';
import { displayFont } from '@/theme/themes';

interface Row {
  label: string;
  value: string;
  href?: string;
  copy?: boolean;
}

function Contact() {
  const { email, phone, github, youtube, linkedin } = cv.contacts;
  const { copy, snackbar } = useCopy();

  const rows: Row[] = [
    { label: 'Email', value: email, copy: true },
    ...(phone ? [{ label: 'Phone', value: phone, copy: true }] : []),
    ...(linkedin ? [{ label: 'LinkedIn', value: linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: linkedin }] : []),
    ...(github ? [{ label: 'GitHub', value: github.replace(/^https?:\/\//, ''), href: github }] : []),
    ...(youtube ? [{ label: 'YouTube', value: 'JavaScript lessons', href: youtube }] : []),
    { label: 'Location', value: cv.location },
  ];

  return (
    <Page title="Contact" intro="Email is the fastest way to reach me.">
      <Box component="dl" sx={{ m: 0, display: 'grid' }}>
        {rows.map((row, index) => (
          <Box
            key={row.label}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'minmax(0,1fr)', sm: '8rem minmax(0,1fr)' },
              alignItems: 'center',
              columnGap: 3,
              py: 2,
              borderTop: index ? 1 : 0,
              borderColor: 'divider',
            }}
          >
            <Typography component="dt" color="text.secondary" sx={{ fontSize: '0.92rem' }}>
              {row.label}
            </Typography>
            <Box component="dd" sx={{ m: 0, display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontFamily: displayFont,
                  fontWeight: 700,
                  fontStretch: '105%',
                  fontSize: { xs: '1.1rem', sm: '1.3rem' },
                  overflowWrap: 'anywhere',
                  userSelect: 'all',
                }}
              >
                {row.href ? (
                  <Link href={row.href} target="_blank" rel="noopener" underline="hover">
                    {row.value}
                  </Link>
                ) : (
                  row.value
                )}
              </Typography>
              {row.copy && (
                <Tooltip title={`Copy ${row.label.toLowerCase()}`} arrow>
                  <IconButton size="small" aria-label={`Copy ${row.label.toLowerCase()}`} onClick={() => copy(row.value, row.label)}>
                    <CopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>
        ))}
      </Box>
      <div>
        <DownloadCv />
      </div>
      {snackbar}
    </Page>
  );
}

export default Contact;
