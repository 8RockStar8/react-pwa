// One-page A4 CV rendered with @react-pdf/renderer from src/data/cv.ts.
// Layout: tinted sidebar (photo, contact, skills, education) + main column
// (name, summary, career ribbon, experience, teaching, projects).

import path from 'node:path';

import React from 'react';
import { Document, Font, Image, Link, Page, StyleSheet, Text, View, renderToFile } from '@react-pdf/renderer';

import type { CV, Job } from '../../src/data/types';
import {
  currentMonthIndex,
  durationInMonths,
  formatDuration,
  formatRange,
  toMonthIndex,
} from '../../src/utils/dates';

const root = process.cwd();
const font = (pkg: string, file: string) => path.join(root, 'node_modules', '@fontsource', pkg, 'files', file);

Font.register({
  family: 'Archivo',
  fonts: [
    { src: font('archivo', 'archivo-latin-700-normal.woff'), fontWeight: 700 },
    { src: font('archivo', 'archivo-latin-800-normal.woff'), fontWeight: 800 },
  ],
});
Font.register({
  family: 'Atkinson',
  fonts: [
    { src: font('atkinson-hyperlegible', 'atkinson-hyperlegible-latin-400-normal.woff'), fontWeight: 400 },
    { src: font('atkinson-hyperlegible', 'atkinson-hyperlegible-latin-700-normal.woff'), fontWeight: 700 },
    { src: font('atkinson-hyperlegible', 'atkinson-hyperlegible-latin-400-italic.woff'), fontWeight: 400, fontStyle: 'italic' },
  ],
});
// Don't break words with hyphens.
Font.registerHyphenationCallback((word) => [word]);

const c = {
  ink: '#142230',
  muted: '#566573',
  line: '#d3dbe2',
  side: '#eef2f5',
  track: '#dfe6ec',
  teal: '#0f6b6a',
  tealSoft: '#5e9e9d',
  amber: '#9a5b00',
};

const s = StyleSheet.create({
  page: { flexDirection: 'row', fontFamily: 'Atkinson', fontSize: 9, color: c.ink, lineHeight: 1.4 },
  side: { width: 178, backgroundColor: c.side, paddingTop: 34, paddingBottom: 48, paddingHorizontal: 20, gap: 18 },
  main: { flex: 1, paddingTop: 34, paddingBottom: 48, paddingLeft: 28, paddingRight: 32, gap: 16 },
  photo: { width: 92, height: 92, borderRadius: 8, objectFit: 'cover' },
  sideTitle: { fontFamily: 'Archivo', fontWeight: 700, fontSize: 9.5, color: c.teal, marginBottom: 5 },
  sideText: { fontSize: 8.5 },
  sideMuted: { fontSize: 8, color: c.muted },
  link: { color: c.ink, textDecoration: 'none' },
  name: { fontFamily: 'Archivo', fontWeight: 800, fontSize: 30, lineHeight: 1.05, letterSpacing: -0.3 },
  title: { fontFamily: 'Archivo', fontWeight: 700, fontSize: 12, color: c.teal, marginTop: 4 },
  summary: { fontSize: 9.5, lineHeight: 1.5, marginTop: 8 },
  h2: { fontFamily: 'Archivo', fontWeight: 700, fontSize: 11.5, marginBottom: 8 },
  muted: { color: c.muted },
  row: { flexDirection: 'row', paddingVertical: 5, borderTopWidth: 0.6, borderTopColor: c.line },
  dateCol: { width: 92, fontSize: 8, color: c.muted, paddingTop: 1 },
  company: { fontFamily: 'Archivo', fontWeight: 700, fontSize: 10 },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 198,
    right: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 7.5,
    color: c.muted,
  },
});

const statusLabel = { daily: 'Daily work', used: 'Used at work', learning: 'Learning now' } as const;

function prettyUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

/** The whole career on one ruler, like the ribbon on the website. */
function Ribbon({ jobs }: { jobs: Job[] }) {
  const sorted = [...jobs].sort((a, b) => toMonthIndex(a.start) - toMonthIndex(b.start));
  const first = toMonthIndex(sorted[0].start);
  const now = currentMonthIndex();
  const start = Math.floor(first / 12) * 12;
  const end = (Math.floor(now / 12) + 1) * 12;
  const pct = (m: number) => `${((m - start) / (end - start)) * 100}%`;
  const width = (a: number, b: number) => `${((b - a) / (end - start)) * 100}%`;
  const years: number[] = [];
  for (let y = start / 12; y < end / 12; y++) years.push(y);

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={{ position: 'relative', height: 10, backgroundColor: c.track, borderRadius: 2 }}>
        {sorted.map((job, i) => {
          const a = toMonthIndex(job.start);
          const b = job.end ? toMonthIndex(job.end) : now + 1;
          return (
            <View
              key={job.company + job.start}
              style={{
                position: 'absolute',
                top: 2,
                bottom: 2,
                left: pct(a),
                width: width(a, b),
                backgroundColor: job.end === null ? c.amber : i % 2 ? c.tealSoft : c.teal,
                borderRadius: 1,
                borderLeftWidth: 0.8,
                borderLeftColor: c.track,
              }}
            />
          );
        })}
      </View>
      <View style={{ position: 'relative', height: 10, marginTop: 2 }}>
        {years.map((y) => (
          <Text
            key={y}
            style={{ position: 'absolute', left: pct(y * 12), fontSize: 6.5, color: c.muted, paddingLeft: 2, borderLeftWidth: 0.5, borderLeftColor: c.line }}
          >
            {y}
          </Text>
        ))}
      </View>
    </View>
  );
}

function CvDocument({ cv, photoPath }: { cv: CV; photoPath: string | null }) {
  const { contacts } = cv;
  const firstStart = [...cv.experience].sort((a, b) => toMonthIndex(a.start) - toMonthIndex(b.start))[0].start;
  const updated = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <Document title={`${cv.name} — CV`} author={cv.name} subject={cv.title} creator={cv.name}>
      <Page size="A4" style={s.page}>
        {/* Sidebar */}
        <View style={s.side}>
          {photoPath && <Image src={photoPath} style={s.photo} />}

          <View>
            <Text style={s.sideTitle}>Contact</Text>
            <View style={{ gap: 3 }}>
              <Link src={`mailto:${contacts.email}`} style={[s.sideText, s.link]}>{contacts.email}</Link>
              {contacts.phone && <Text style={s.sideText}>{contacts.phone}</Text>}
              {contacts.linkedin && <Link src={contacts.linkedin} style={[s.sideText, s.link]}>{prettyUrl(contacts.linkedin)}</Link>}
              {contacts.github && <Link src={contacts.github} style={[s.sideText, s.link]}>{prettyUrl(contacts.github)}</Link>}
              {contacts.youtube && <Link src={contacts.youtube} style={[s.sideText, s.link]}>YouTube: JavaScript lessons</Link>}
              <Text style={s.sideText}>{cv.location}</Text>
            </View>
          </View>

          <View>
            <Text style={s.sideTitle}>Skills</Text>
            <View style={{ gap: 7 }}>
              {cv.stack.map((layer) => (
                <View key={layer.layer}>
                  <Text style={{ fontWeight: 700, fontSize: 8.5 }}>
                    {layer.layer}{' '}
                    <Text style={{ fontWeight: 400, fontSize: 7.5, color: layer.status === 'learning' ? c.amber : c.muted }}>
                      {statusLabel[layer.status]}
                    </Text>
                  </Text>
                  <Text style={s.sideText}>{layer.skills.join(', ')}</Text>
                </View>
              ))}
            </View>
          </View>

          <View>
            <Text style={s.sideTitle}>Tools</Text>
            <Text style={s.sideText}>{cv.tools.join(', ')}</Text>
          </View>

          <View>
            <Text style={s.sideTitle}>Education</Text>
            <View style={{ gap: 6 }}>
              {cv.education.map((e) => (
                <View key={e.school}>
                  <Text style={{ fontWeight: 700, fontSize: 8.5 }}>{e.school}</Text>
                  {e.degree ? <Text style={s.sideText}>{e.degree}</Text> : null}
                  <Text style={s.sideMuted}>{e.period}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Main column */}
        <View style={s.main}>
          <View>
            <Text style={s.name}>{cv.name}</Text>
            <Text style={s.title}>{cv.title}</Text>
            <Text style={s.summary}>{cv.summary}</Text>
          </View>

          <View>
            <Text style={s.h2}>
              Experience{' '}
              <Text style={{ fontFamily: 'Atkinson', fontWeight: 400, fontSize: 8.5, color: c.muted }}>
                {formatDuration(currentMonthIndex() - toMonthIndex(firstStart) + 1)} in total
              </Text>
            </Text>
            <Ribbon jobs={cv.experience} />
            {cv.experience.map((job, i) => (
              <View key={job.company + job.start} style={[s.row, i === 0 ? { borderTopWidth: 0 } : {}]} wrap={false}>
                <View style={s.dateCol}>
                  <Text>{formatRange(job.start, job.end)}</Text>
                  <Text>{formatDuration(durationInMonths(job.start, job.end))}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.company}>
                    {job.company}
                    {job.end === null && <Text style={{ fontSize: 7.5, color: c.amber }}>{'  '}Current</Text>}
                  </Text>
                  <Text>{job.role}</Text>
                  <Text style={[s.muted, { fontSize: 8 }]}>{job.stack.join(', ')}</Text>
                  {job.highlights.map((h) => (
                    <View key={h} style={{ flexDirection: 'row', marginTop: 1.5 }}>
                      <Text style={{ width: 8 }}>•</Text>
                      <Text style={{ flex: 1 }}>{h}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {cv.teaching.length > 0 && (
            <View wrap={false}>
              <Text style={s.h2}>Teaching</Text>
              <View style={{ gap: 5 }}>
                {cv.teaching.map((t) => (
                  <View key={t.title}>
                    {t.url ? (
                      <Link src={t.url} style={{ fontWeight: 700, color: c.ink, textDecoration: 'none' }}>{t.title}</Link>
                    ) : (
                      <Text style={{ fontWeight: 700 }}>{t.title}</Text>
                    )}
                    <Text style={s.muted}>{t.description}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {cv.projects.length > 0 && (
            <View wrap={false}>
              <Text style={s.h2}>Projects</Text>
              <View style={{ gap: 5 }}>
                {cv.projects.map((p) => (
                  <View key={p.name}>
                    <Text>
                      <Text style={{ fontWeight: 700 }}>{p.name}</Text>
                      {p.status ? <Text style={{ color: c.amber, fontSize: 7.5 }}>{'  '}{p.status}</Text> : null}
                    </Text>
                    <Text style={s.muted}>
                      {p.description} {p.stack.join(', ')}.
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        <View style={s.footer} fixed>
          {contacts.website ? (
            <Link src={contacts.website} style={{ color: c.muted, textDecoration: 'none' }}>
              Online version: {prettyUrl(contacts.website)}
            </Link>
          ) : (
            <Text> </Text>
          )}
          <Text>Updated {updated}</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function writePdf(cv: CV, outFile: string) {
  const photoPath = cv.photo ? path.join(root, 'public', cv.photo) : null;
  await renderToFile(<CvDocument cv={cv} photoPath={photoPath} />, outFile);
}
