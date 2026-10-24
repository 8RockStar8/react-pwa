import { Link as RouterLink } from 'react-router';

import PlaceIcon from '@mui/icons-material/PlaceOutlined';
import { Box, Link, Typography } from '@mui/material';

import CareerRibbon from '@/components/CareerRibbon';
import ContactLinks from '@/components/ContactLinks';
import Page, { SectionTitle } from '@/components/Page';
import cv from '@/data/cv';

function Home() {
  const photo = cv.photo ? `${import.meta.env.BASE_URL}${cv.photo}` : null;

  return (
    <Page>
      {/* Hero */}
      <Box component="header" sx={{ display: 'grid', gap: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, sm: 3 } }}>
          {photo && (
            <Box
              component="img"
              src={photo}
              alt={cv.name}
              width={112}
              height={112}
              sx={{
                width: { xs: 84, sm: 112 },
                height: { xs: 84, sm: 112 },
                borderRadius: 4,
                objectFit: 'cover',
                flexShrink: 0,
                border: 1,
                borderColor: 'divider',
              }}
            />
          )}
          <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', sm: '3.6rem', lg: '4.4rem' }, minWidth: 0 }}>
            {cv.name}
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gap: 1 }}>
          <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.35rem' }, fontWeight: 700 }}>{cv.title}</Typography>
          <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PlaceIcon fontSize="small" aria-hidden /> {cv.location}
          </Typography>
        </Box>

        <Typography sx={{ maxWidth: '62ch', fontSize: '1.08rem' }}>{cv.summary}</Typography>
        <ContactLinks />
      </Box>

      {/* Career at a glance */}
      <Box component="section" aria-labelledby="career-h">
        <SectionTitle id="career-h">Career so far</SectionTitle>
        <CareerRibbon jobs={cv.experience} />
        <Link component={RouterLink} to="/experience" sx={{ fontWeight: 700, mt: 1, display: 'inline-block' }}>
          See all experience and education
        </Link>
      </Box>

      {/* Story */}
      <Box component="section" aria-labelledby="story-h" sx={{ display: 'grid', gap: 2 }}>
        <SectionTitle id="story-h">My story</SectionTitle>
        {cv.story.map((paragraph) => (
          <Typography key={paragraph.slice(0, 24)} sx={{ maxWidth: '65ch', fontSize: '1.05rem' }}>
            {paragraph}
          </Typography>
        ))}
      </Box>

      {/* Teaching */}
      <Box component="section" aria-labelledby="teach-h">
        <SectionTitle id="teach-h">Teaching</SectionTitle>
        <Box sx={{ display: 'grid', gap: 2.5 }}>
          {cv.teaching.map((item) => (
            <Box key={item.title} sx={{ display: 'grid', gap: 0.25 }}>
              <Typography variant="h4" component="h3" sx={{ fontSize: '1.15rem' }}>
                {item.url ? (
                  <Link href={item.url} target="_blank" rel="noopener" underline="hover">
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </Typography>
              <Typography color="text.secondary">{item.description}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Page>
  );
}

export default Home;
