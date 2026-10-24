import { type MouseEvent, useState } from 'react';

import DownloadIcon from '@mui/icons-material/FileDownloadOutlined';
import { Button, IconButton, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';

import cv from '@/data/cv';
import { cvFileBase, cvFormats } from '@/data/cvFiles';

// The files are generated from src/data/cv.ts before every build (scripts/generate-cv.ts),
// so what people download always matches the site.
const base = `${import.meta.env.BASE_URL}${cvFileBase(cv.name)}`;

interface DownloadCvProps {
  /** 'button' = labeled pill, 'icon' = compact icon for the header */
  variant?: 'button' | 'icon';
  /** Stretch the labeled button to its container's width (sidebar). */
  fullWidth?: boolean;
}

function DownloadCv({ variant = 'button', fullWidth = false }: DownloadCvProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const open = (event: MouseEvent<HTMLElement>) => setAnchor(event.currentTarget);
  const close = () => setAnchor(null);

  const trigger =
    variant === 'icon' ? (
      <Tooltip title="Download CV" arrow>
        <IconButton aria-label="Download CV" aria-haspopup="menu" onClick={open}>
          <DownloadIcon />
        </IconButton>
      </Tooltip>
    ) : (
      <Button
        variant="contained"
        disableElevation
        startIcon={<DownloadIcon />}
        aria-haspopup="menu"
        onClick={open}
        fullWidth={fullWidth}
        size={fullWidth ? 'large' : 'medium'}
        sx={{ borderRadius: 99, px: 2 }}
      >
        Download CV
      </Button>
    );

  return (
    <>
      {trigger}
      <Menu
        anchorEl={anchor}
        open={anchor !== null}
        onClose={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{ paper: { sx: { mt: 0.5, minWidth: 220 } } }}
      >
        {cvFormats.map((format) => (
          <MenuItem
            key={format.ext}
            component="a"
            href={`${base}.${format.ext}`}
            download={`${cvFileBase(cv.name)}.${format.ext}`}
            onClick={close}
          >
            <ListItemText primary={format.label} secondary={format.description} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default DownloadCv;
