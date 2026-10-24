// =====================================================================
//  All CV content lives in this one file.
//  Edit text here and every page updates. Dates use 'YYYY-MM'.
//  `end: null` means the job is current.
// =====================================================================

import type { CV } from './types';

const cv: CV = {
  name: 'Gagik Aproyan',
  title: 'Senior React & React Native engineer',
  location: 'Yerevan, Armenia',
  photo: 'photo.jpg',

  summary:
    'I build web and mobile interfaces with React, React Native and TypeScript. ' +
    'I have worked with eight teams since 2017, taught JavaScript to new developers, ' +
    'and I am now adding Node.js and AWS so I can own features from the screen to the server.',

  story: [
    'I studied law at Northern University and graduated in 2015. Two years later I joined the Full-Stack JavaScript bootcamp at Microsoft Innovation Center Armenia, and by the end of 2017 I had my first job as a front-end developer.',
    'Since then I have worked mostly in React: product teams, freelance work and larger engineering companies like Grid Dynamics. Along the way I taught JavaScript at LevelUp IT Center and started a YouTube channel with JavaScript lessons.',
    'Now I want to understand everything that happens after a user taps a button. I am learning Node.js and AWS and building a full-stack project of my own, from the database to the mobile app.',
  ],

  contacts: {
    email: 'gagik.aproyan.dev@gmail.com',
    // phone: '+374 ...',  // hidden: the site is public
    github: 'https://github.com/8RockStar8',
    youtube: 'https://www.youtube.com/watch?v=0qXWbMQiA24&list=PL8TDbi_Q7TikcEjizJu5QQKPdoJ9U7wGm',
    // linkedin: 'https://www.linkedin.com/in/your-profile',
    website: 'https://8rockstar8.github.io/react-pwa/',
  },

  // Newest first. Add 1–2 `highlights` per job: what you built and the result.
  experience: [
    {
      company: 'TMCYC',
      role: 'Senior Software Engineer',
      stack: ['React.js'],
      start: '2023-01',
      end: null,
      highlights: [],
    },
    {
      company: 'Grid Dynamics',
      role: 'Senior Software Engineer',
      stack: ['React.js'],
      start: '2022-04',
      end: '2022-08',
      highlights: [],
    },
    {
      company: 'NWSLab',
      role: 'Senior Software Engineer',
      stack: ['React.js'],
      start: '2021-08',
      end: '2022-02',
      highlights: [],
    },
    {
      company: 'Alena Solutions',
      role: 'Senior Software Engineer',
      stack: ['React.js'],
      start: '2021-04',
      end: '2021-07',
      highlights: [],
    },
    {
      company: 'SSSystem',
      role: 'Software Engineer',
      stack: ['React.js'],
      start: '2020-12',
      end: '2021-04',
      highlights: [],
    },
    {
      company: 'Self-employed',
      role: 'Software Engineer',
      stack: ['React.js'],
      start: '2020-03',
      end: '2020-11',
      highlights: [],
    },
    {
      company: 'LevelUp IT Center',
      role: 'Software Engineer and JavaScript Trainer',
      stack: ['React', 'React Native'],
      start: '2019-11',
      end: '2020-03',
      highlights: [],
    },
    {
      company: 'X-TECH',
      role: 'Front-End Developer',
      stack: ['JavaScript', 'HTML', 'CSS'],
      start: '2017-12',
      end: '2019-11',
      highlights: [],
    },
  ],

  education: [
    {
      school: 'Microsoft Innovation Center Armenia',
      degree: 'Full-Stack JavaScript coding bootcamp',
      period: 'Jul 2017 – Dec 2017',
    },
    {
      school: 'Northern University, Armenia',
      degree: "Bachelor's degree, Faculty of Law",
      period: '2010 – 2015',
    },
    {
      school: 'Yerevan College No. 7',
      degree: '',
      period: '2005 – 2008',
    },
  ],

  // Skills as layers of the stack, top (closest to the user) to bottom.
  // status: 'daily' = used at work, 'used' = used on projects, 'learning' = learning now
  stack: [
    {
      layer: 'Interface',
      status: 'daily',
      description: 'Web and mobile screens, state and the components behind them.',
      skills: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'React Native', 'Redux', 'HTML5', 'CSS3', 'jQuery'],
    },
    {
      layer: 'Data & realtime',
      status: 'used',
      description: 'Getting data to the screen and keeping it live.',
      skills: ['GraphQL', 'REST APIs', 'WebSocket', 'SignalR'],
    },
    {
      layer: 'Server',
      status: 'learning',
      description: 'APIs, authentication and databases.',
      skills: ['Node.js', 'JWT auth'],
    },
    {
      layer: 'Cloud',
      status: 'learning',
      description: 'Deploying and running what I build.',
      skills: ['AWS'],
    },
  ],

  tools: ['Git', 'GitHub', 'GitLab', 'Azure DevOps', 'Linux (Ubuntu)', 'macOS'],

  teaching: [
    {
      title: 'JavaScript lessons on YouTube',
      description: 'My channel with JavaScript lessons for beginners.',
      url: 'https://www.youtube.com/watch?v=0qXWbMQiA24&list=PL8TDbi_Q7TikcEjizJu5QQKPdoJ9U7wGm',
    },
    {
      title: 'JavaScript Trainer at LevelUp IT Center',
      description: 'Taught JavaScript, React and React Native to new developers (2019 – 2020).',
    },
  ],

  // Personal projects. Remove any you don't want public.
  projects: [
    {
      name: 'Family tree platform',
      description:
        'A full-stack app where people build their family tree and relatives work on it together. Web first, then a mobile app.',
      stack: ['React', 'Node.js', 'WebSockets', 'Expo'],
      status: 'In progress',
    },
    {
      name: 'Wallet onboarding',
      description: 'A web flow for creating a wallet, including identity verification.',
      stack: ['React', 'KYC'],
    },
    {
      name: '3D model viewer',
      description: 'Shows .usdz 3D models in a React app, with files served from a backend.',
      stack: ['React', 'model-viewer', 'Node.js'],
    },
    {
      name: 'React Native component library',
      description: 'Reusable inputs and styling helpers, documented in Storybook.',
      stack: ['React Native', 'Storybook'],
    },
  ],
};

export default cv;
