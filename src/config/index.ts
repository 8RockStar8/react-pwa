import cv from '@/data/cv';

const title = cv.name;

// Where the source code lives (shown in the header). Change after you create the repo.
const repository = cv.contacts.github ?? '';

const loader = {
  // If a page loads faster than this, no spinner is shown at all (no blinking).
  delay: 300,
  // If the spinner does appear, keep it for at least this long.
  minimumLoading: 600,
};

const sidebarWidth = 248;

export { title, repository, loader, sidebarWidth };
