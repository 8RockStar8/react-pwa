import { Box, Typography } from '@mui/material';

import type { SkillStatus, StackLayer } from '@/data/types';
import { displayFont } from '@/theme/themes';

const statusLabel: Record<SkillStatus, string> = {
  daily: 'Daily work',
  used: 'Used at work',
  learning: 'Learning now',
};

// Teal = shipping with it, amber = learning it. Dashed chips = still practicing.
const statusColor: Record<SkillStatus, 'primary' | 'secondary'> = {
  daily: 'primary',
  used: 'primary',
  learning: 'secondary',
};

function StackLayers({ layers }: { layers: StackLayer[] }) {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: 'background.paper',
      }}
    >
      {layers.map((layer, index) => {
        const color = statusColor[layer.status];
        const learning = layer.status === 'learning';
        return (
          <Box
            key={layer.layer}
            sx={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: { xs: 'minmax(0,1fr)', sm: 'minmax(0,1fr) auto' },
              gap: 1,
              columnGap: 2,
              p: { xs: '20px 18px 20px 24px', sm: '24px 24px 24px 30px' },
              borderTop: index ? 1 : 0,
              borderColor: 'divider',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: '0 auto 0 0',
                width: 6,
                bgcolor: `${color}.main`,
                opacity: layer.status === 'used' ? 0.55 : 1,
              },
            }}
          >
            <Typography
              component="h3"
              sx={{
                fontFamily: displayFont,
                fontWeight: 800,
                fontStretch: '125%',
                fontSize: { xs: '1.6rem', sm: '2.1rem' },
                lineHeight: 1.1,
              }}
            >
              {layer.layer}
            </Typography>
            <Box
              component="span"
              sx={{
                gridRow: { xs: 1, sm: 'auto' },
                justifySelf: 'start',
                alignSelf: 'start',
                px: 1.25,
                py: 0.4,
                borderRadius: 99,
                fontSize: '0.82rem',
                fontWeight: 700,
                color: `${color}.main`,
                border: 1,
                borderColor: `${color}.main`,
                whiteSpace: 'nowrap',
              }}
            >
              {statusLabel[layer.status]}
            </Box>
            <Typography color="text.secondary" sx={{ gridColumn: '1 / -1' }}>
              {layer.description}
            </Typography>
            <Box
              component="ul"
              sx={{ gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: 1, p: 0, m: 0, mt: 0.5, listStyle: 'none' }}
            >
              {layer.skills.map((skill) => (
                <Box
                  component="li"
                  key={skill}
                  sx={{
                    px: 1.25,
                    py: 0.5,
                    border: 1,
                    borderStyle: learning ? 'dashed' : 'solid',
                    borderColor: learning ? 'secondary.main' : 'divider',
                    borderRadius: 1.5,
                    fontSize: '0.92rem',
                  }}
                >
                  {skill}
                </Box>
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default StackLayers;
