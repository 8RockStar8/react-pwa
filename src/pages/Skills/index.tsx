import { Box, Typography } from '@mui/material';

import Page, { SectionTitle } from '@/components/Page';
import StackLayers from '@/components/StackLayers';
import cv from '@/data/cv';

function Skills() {
  return (
    <Page
      title="Skills"
      intro="Grouped by where they sit in the stack, from the screen down to the cloud. Dashed outlines are skills I'm learning now."
    >
      <StackLayers layers={cv.stack} />

      <Box component="section" aria-labelledby="tools-h">
        <SectionTitle id="tools-h">Tools and platforms</SectionTitle>
        <Typography sx={{ fontSize: '1.05rem' }}>{cv.tools.join(', ')}</Typography>
      </Box>
    </Page>
  );
}

export default Skills;
