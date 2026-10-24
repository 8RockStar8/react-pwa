import { useMemo, useState } from 'react';

import { Box, Typography } from '@mui/material';

import type { Job } from '@/data/types';
import {
  currentMonthIndex,
  durationInMonths,
  formatDuration,
  formatRange,
  toMonthIndex,
} from '@/utils/dates';
import { displayFont } from '@/theme/themes';

// The whole career on one ruler: each job is a segment placed by its real months,
// so gaps and short contracts show up honestly. Tap a segment to read it.

function CareerRibbon({ jobs }: { jobs: Job[] }) {
  const chronological = useMemo(
    () => [...jobs].sort((a, b) => toMonthIndex(a.start) - toMonthIndex(b.start)),
    [jobs],
  );
  const current = chronological.findIndex((job) => job.end === null);
  const [selected, setSelected] = useState(current >= 0 ? current : chronological.length - 1);

  const first = toMonthIndex(chronological[0].start);
  // Ruler runs from January of the first year to the end of the current year.
  const rulerStart = Math.floor(first / 12) * 12;
  const now = currentMonthIndex();
  const rulerEnd = (Math.floor(now / 12) + 1) * 12;
  const span = rulerEnd - rulerStart;
  const pct = (month: number) => ((month - rulerStart) / span) * 100;

  const years: number[] = [];
  for (let y = rulerStart / 12; y < rulerEnd / 12; y++) years.push(y);

  const totalMonths = now - first + 1;
  const job = chronological[selected];

  return (
    <Box sx={{ display: 'grid', gap: 2.5 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: 2, rowGap: 0.5 }}>
        <Typography
          sx={{
            fontFamily: displayFont,
            fontWeight: 850,
            fontStretch: '120%',
            fontSize: { xs: '2.4rem', sm: '3rem' },
            lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {formatDuration(totalMonths)}
        </Typography>
        <Typography color="text.secondary">
          building interfaces, across {chronological.length} teams
        </Typography>
      </Box>

      <Box>
        {/* Track */}
        <Box
          role="group"
          aria-label="Career timeline"
          sx={{
            position: 'relative',
            height: 48,
            borderRadius: 2,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1c2836' : '#e3e9ee'),
            overflow: 'hidden',
          }}
        >
          {chronological.map((item, index) => {
            const start = toMonthIndex(item.start);
            const end = item.end ? toMonthIndex(item.end) : now + 1;
            const isSelected = index === selected;
            const isCurrent = item.end === null;
            return (
              <Box
                key={`${item.company}-${item.start}`}
                component="button"
                type="button"
                aria-pressed={isSelected}
                aria-label={`${item.company}, ${item.role}, ${formatRange(item.start, item.end)}`}
                onClick={() => setSelected(index)}
                sx={{
                  position: 'absolute',
                  top: 6,
                  bottom: 6,
                  left: `calc(${pct(start)}% + 1px)`,
                  width: `calc(${pct(end) - pct(start)}% - 2px)`,
                  minWidth: 6,
                  p: 0,
                  border: 0,
                  borderRadius: 1,
                  cursor: 'pointer',
                  bgcolor: isSelected ? 'secondary.main' : 'primary.main',
                  opacity: isSelected ? 1 : index % 2 ? 0.62 : 0.9,
                  // The current job fades out at its right edge: it's still going.
                  maskImage: isCurrent ? 'linear-gradient(90deg, #000 70%, transparent)' : 'none',
                  transition: 'opacity 150ms, background-color 150ms',
                  '&:hover': { opacity: 1 },
                  color: 'text.primary',
                  '&:focus-visible': { outline: '3px solid currentColor', outlineOffset: 2 },
                }}
              />
            );
          })}
        </Box>

        {/* Year ruler */}
        <Box sx={{ position: 'relative', height: 26, mt: 0.75 }} aria-hidden>
          {years.map((year, i) => (
            <Box
              key={year}
              sx={{
                position: 'absolute',
                left: `${pct(year * 12)}%`,
                top: 0,
                pl: 0.5,
                borderLeft: 1,
                borderColor: 'divider',
                fontSize: '0.78rem',
                color: 'text.secondary',
                fontVariantNumeric: 'tabular-nums',
                lineHeight: '22px',
                // On phones, label every other year so the numbers don't collide.
                display: { xs: i % 2 ? 'none' : 'block', sm: 'block' },
              }}
            >
              {year}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Selected job */}
      <Box aria-live="polite" sx={{ display: 'grid', gap: 0.25, minHeight: 64 }}>
        <Typography variant="h4" component="p" sx={{ fontSize: '1.2rem' }}>
          {job.company}
        </Typography>
        <Typography>{job.role}</Typography>
        <Typography color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.92rem' }}>
          {formatRange(job.start, job.end)}, {formatDuration(durationInMonths(job.start, job.end))}
        </Typography>
      </Box>
    </Box>
  );
}

export default CareerRibbon;
