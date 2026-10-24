import { useState } from 'react';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/MailOutline';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Button, Snackbar } from '@mui/material';

import DownloadCv from '@/components/DownloadCv';
import cv from '@/data/cv';

const pill = {
  borderRadius: 99,
  px: 1.75,
  borderColor: 'divider',
  color: 'text.primary',
  bgcolor: 'background.paper',
  '&:hover': { borderColor: 'primary.main', bgcolor: 'background.paper' },
};

/** Copies text and shows a short confirmation. Falls back to nothing if the clipboard is blocked. */
export function useCopy() {
  const [message, setMessage] = useState<string | null>(null);
  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setMessage(`${label} copied`);
    } catch {
      setMessage(`Couldn't copy. ${label}: ${text}`);
    }
  };
  const snackbar = (
    <Snackbar
      open={message !== null}
      message={message}
      autoHideDuration={2500}
      onClose={() => setMessage(null)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    />
  );
  return { copy, snackbar };
}

function ContactLinks() {
  const { email, github, youtube, linkedin } = cv.contacts;
  const { copy, snackbar } = useCopy();

  return (
    <>
    <Box component="ul" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, p: 0, m: 0, listStyle: 'none' }}>
      <li>
        <DownloadCv />
      </li>
      {github && (
        <li>
          <Button variant="outlined" sx={pill} startIcon={<GitHubIcon />} href={github} target="_blank" rel="noopener">
            GitHub
          </Button>
        </li>
      )}
      {linkedin && (
        <li>
          <Button variant="outlined" sx={pill} startIcon={<LinkedInIcon />} href={linkedin} target="_blank" rel="noopener">
            LinkedIn
          </Button>
        </li>
      )}
      {youtube && (
        <li>
          <Button variant="outlined" sx={pill} startIcon={<YouTubeIcon />} href={youtube} target="_blank" rel="noopener">
            YouTube lessons
          </Button>
        </li>
      )}
      <li>
        <Button variant="outlined" sx={pill} startIcon={<MailIcon />} onClick={() => copy(email, 'Email')}>
          Copy email
        </Button>
      </li>
    </Box>
    {snackbar}
    </>
  );
}

export default ContactLinks;
