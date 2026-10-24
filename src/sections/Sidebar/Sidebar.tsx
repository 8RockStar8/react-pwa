import { NavLink } from 'react-router';

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { sidebarWidth } from '@/config';
import routes from '@/routes';

import { useSidebar } from './hooks';

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <List component="nav" aria-label="Sections" sx={{ px: 1.5, display: 'grid', gap: 0.5 }}>
      {routes
        .filter((route) => route.title)
        .map(({ path, title, icon: Icon }) => (
          <ListItemButton
            key={path}
            component={NavLink}
            to={path}
            end={path === '/'}
            onClick={onNavigate}
            sx={{
              borderRadius: 2,
              color: 'text.secondary',
              '& .MuiListItemIcon-root': { color: 'inherit', minWidth: 38 },
              '&.active': {
                color: 'primary.main',
                bgcolor: 'action.selected',
                '& .MuiListItemText-primary': { fontWeight: 700 },
              },
            }}
          >
            {Icon && (
              <ListItemIcon>
                <Icon fontSize="small" />
              </ListItemIcon>
            )}
            <ListItemText primary={title} />
          </ListItemButton>
        ))}
    </List>
  );
}

function SidebarFooter() {
  return (
    <Box sx={{ mt: 'auto', p: 2.5 }}>
      <Typography variant="caption" color="text.secondary" component="p">
        Works offline. Install it to keep this CV on your home screen.
      </Typography>
    </Box>
  );
}

function Sidebar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });
  const { isOpen, open, close } = useSidebar();

  const paperSx = {
    width: sidebarWidth,
    boxSizing: 'border-box' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    bgcolor: 'background.default',
    borderRight: 1,
    borderColor: 'divider',
  };

  if (isDesktop) {
    return (
      <Drawer variant="permanent" sx={{ width: sidebarWidth, flexShrink: 0, '& .MuiDrawer-paper': paperSx }}>
        <Toolbar />
        <Box sx={{ pt: 2 }} />
        <NavItems />
        <SidebarFooter />
      </Drawer>
    );
  }

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onOpen={open}
      onClose={close}
      swipeAreaWidth={24}
      sx={{ '& .MuiDrawer-paper': { ...paperSx, pt: 'env(safe-area-inset-top, 0px)' } }}
    >
      <Toolbar />
      <NavItems onNavigate={close} />
      <SidebarFooter />
    </SwipeableDrawer>
  );
}

export default Sidebar;
