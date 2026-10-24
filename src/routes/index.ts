import type { ComponentType } from 'react';

import CodeIcon from '@mui/icons-material/CodeOutlined';
import LayersIcon from '@mui/icons-material/LayersOutlined';
import MailIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/PersonOutline';
import WorkIcon from '@mui/icons-material/WorkOutline';
import type { SvgIconComponent } from '@mui/icons-material';

import asyncComponentLoader from '@/utils/loader';

export interface AppRoute {
  path: string;
  component: ComponentType;
  /** Routes with a title appear in the sidebar. */
  title?: string;
  icon?: SvgIconComponent;
}

const routes: AppRoute[] = [
  {
    path: '/',
    title: 'About',
    icon: PersonIcon,
    component: asyncComponentLoader(() => import('@/pages/Home')),
  },
  {
    path: '/experience',
    title: 'Experience',
    icon: WorkIcon,
    component: asyncComponentLoader(() => import('@/pages/Experience')),
  },
  {
    path: '/skills',
    title: 'Skills',
    icon: LayersIcon,
    component: asyncComponentLoader(() => import('@/pages/Skills')),
  },
  {
    path: '/projects',
    title: 'Projects',
    icon: CodeIcon,
    component: asyncComponentLoader(() => import('@/pages/Projects')),
  },
  {
    path: '/contact',
    title: 'Contact',
    icon: MailIcon,
    component: asyncComponentLoader(() => import('@/pages/Contact')),
  },
  {
    path: '*',
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
  },
];

export default routes;
