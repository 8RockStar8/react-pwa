import { Link as RouterLink } from 'react-router';

import GitHubIcon from '@mui/icons-material/GitHub';
import DarkIcon from '@mui/icons-material/DarkModeOutlined';
import InstallIcon from '@mui/icons-material/InstallMobileOutlined';
import LightIcon from '@mui/icons-material/LightModeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material';

import { repository, title } from '@/config';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { useSidebar } from '@/sections/Sidebar/hooks';
import { useThemeMode } from '@/theme';
import { displayFont } from '@/theme/themes';

function Header() {
  const { isDarkMode, toggle } = useThemeMode();
  const { open: openSidebar } = useSidebar();
  const { canInstall, install } = usePwaInstall();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="inherit"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'background.default',
        borderBottom: 1,
        borderColor: 'divider',
        pt: 'env(safe-area-inset-top, 0px)',
        pl: 'env(safe-area-inset-left, 0px)',
        pr: 'env(safe-area-inset-right, 0px)',
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        <IconButton
          edge="start"
          aria-label="Open menu"
          onClick={openSidebar}
          sx={{ display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          component={RouterLink}
          to="/"
          sx={{
            fontFamily: displayFont,
            fontWeight: 800,
            fontStretch: '115%',
            fontSize: '1.15rem',
            color: 'text.primary',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>

        <Stack direction="row" alignItems="center" gap={0.5} sx={{ ml: 'auto' }}>
          {canInstall && (
            <Button
              size="small"
              variant="contained"
              disableElevation
              startIcon={<InstallIcon />}
              onClick={install}
              sx={{ borderRadius: 99, px: 1.75 }}
            >
              Install
            </Button>
          )}
          {repository && (
            <Tooltip title="GitHub" arrow>
              <IconButton component="a" href={repository} target="_blank" rel="noopener" aria-label="GitHub profile">
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={isDarkMode ? 'Light theme' : 'Dark theme'} arrow>
            <IconButton edge="end" onClick={toggle} aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}>
              {isDarkMode ? <LightIcon /> : <DarkIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
