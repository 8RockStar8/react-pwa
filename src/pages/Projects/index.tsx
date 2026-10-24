import { Box, Link, Typography } from '@mui/material';

import Page from '@/components/Page';
import cv from '@/data/cv';

function Projects() {
  return (
    <Page title="Projects" intro="Things I build outside of work, mostly to learn the parts of the stack I don't touch every day.">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 2,
        }}
      >
        {cv.projects.map((project) => (
          <Box
            component="article"
            key={project.name}
            sx={{
              display: 'grid',
              alignContent: 'start',
              gap: 1,
              p: 2.5,
              border: 1,
              borderColor: 'divider',
              borderRadius: 2.5,
              bgcolor: 'background.paper',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="h4" component="h2" sx={{ fontSize: '1.2rem' }}>
                {project.url ? (
                  <Link href={project.url} target="_blank" rel="noopener" underline="hover">
                    {project.name}
                  </Link>
                ) : (
                  project.name
                )}
              </Typography>
              {project.status && (
                <Typography component="span" sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'secondary.main' }}>
                  {project.status}
                </Typography>
              )}
            </Box>
            <Typography>{project.description}</Typography>
            <Typography color="text.secondary" sx={{ fontSize: '0.9rem' }}>
              {project.stack.join(', ')}
            </Typography>
          </Box>
        ))}
      </Box>
    </Page>
  );
}

export default Projects;
