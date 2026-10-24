import { Box, Typography } from '@mui/material';

import Page, { SectionTitle } from '@/components/Page';
import cv from '@/data/cv';
import { displayFont } from '@/theme/themes';
import { durationInMonths, formatDuration, formatRange } from '@/utils/dates';

function Experience() {
  return (
    <Page title="Experience" intro="Front-end and mobile work since 2017, newest first.">
      <Box component="section" aria-labelledby="jobs-h">
        <SectionTitle id="jobs-h">Work</SectionTitle>
        <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid' }}>
          {cv.experience.map((job, index) => (
            <Box
              component="li"
              key={`${job.company}-${job.start}`}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'minmax(0,1fr)', sm: '11rem minmax(0,1fr)' },
                columnGap: 3,
                rowGap: 0.5,
                py: 2.5,
                borderTop: index ? 1 : 0,
                borderColor: 'divider',
              }}
            >
              <Box sx={{ fontFamily: displayFont, fontVariantNumeric: 'tabular-nums', color: 'text.secondary', fontSize: '0.92rem', pt: { sm: 0.4 } }}>
                <div>{formatRange(job.start, job.end)}</div>
                <div>{formatDuration(durationInMonths(job.start, job.end))}</div>
              </Box>
              <Box sx={{ display: 'grid', gap: 0.5, minWidth: 0 }}>
                <Typography variant="h4" component="h3" sx={{ fontSize: '1.25rem' }}>
                  {job.company}
                  {job.end === null && (
                    <Box
                      component="span"
                      sx={{
                        ml: 1,
                        px: 1,
                        py: 0.25,
                        borderRadius: 99,
                        fontFamily: 'inherit',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        verticalAlign: 'middle',
                        color: 'primary.main',
                        border: 1,
                        borderColor: 'primary.main',
                      }}
                    >
                      Current
                    </Box>
                  )}
                </Typography>
                <Typography>{job.role}</Typography>
                <Typography color="text.secondary" sx={{ fontSize: '0.92rem' }}>
                  {job.stack.join(', ')}
                </Typography>
                {job.highlights.length > 0 && (
                  <Box component="ul" sx={{ m: 0, mt: 0.5, pl: 2.5, display: 'grid', gap: 0.5 }}>
                    {job.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box component="section" aria-labelledby="edu-h">
        <SectionTitle id="edu-h">Education</SectionTitle>
        <Box sx={{ display: 'grid', gap: 2.5 }}>
          {cv.education.map((item) => (
            <Box
              key={item.school}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'minmax(0,1fr)', sm: '11rem minmax(0,1fr)' },
                columnGap: 3,
              }}
            >
              <Typography color="text.secondary" sx={{ fontFamily: displayFont, fontVariantNumeric: 'tabular-nums', fontSize: '0.92rem', pt: { sm: 0.4 } }}>
                {item.period}
              </Typography>
              <Box>
                <Typography variant="h4" component="h3" sx={{ fontSize: '1.15rem' }}>
                  {item.school}
                </Typography>
                {item.degree && <Typography>{item.degree}</Typography>}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Page>
  );
}

export default Experience;
