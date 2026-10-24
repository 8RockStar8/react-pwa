// Editable Word CV built with the `docx` package from src/data/cv.ts.
// Single column, real headings and plain text, so recruiters' ATS systems can read it.

import { writeFile } from 'node:fs/promises';

import {
  BorderStyle,
  Document,
  ExternalHyperlink,
  HeadingLevel,
  Packer,
  Paragraph,
  TabStopType,
  TextRun,
} from 'docx';

import type { CV } from '../../src/data/types';
import { durationInMonths, formatDuration, formatRange } from '../../src/utils/dates';

const TEAL = '0F6B6A';
const MUTED = '566573';
const AMBER = '9A5B00';
const FONT = 'Calibri';
// Right tab stop at the text edge of an A4 page with 2 cm margins (in twentieths of a point).
const RIGHT_EDGE = 9638;

const statusLabel = { daily: 'daily work', used: 'used at work', learning: 'learning now' } as const;

function heading(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'D3DBE2', space: 2 } },
    children: [new TextRun({ text, bold: true, size: 24, color: TEAL, font: FONT })],
  });
}

function link(text: string, url: string) {
  return new ExternalHyperlink({
    link: url,
    children: [new TextRun({ text, style: 'Hyperlink', font: FONT, size: 20 })],
  });
}

function prettyUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export async function writeDocx(cv: CV, outFile: string) {
  const { contacts } = cv;
  const sep = () => new TextRun({ text: '   |   ', color: MUTED, size: 20, font: FONT });

  const contactRuns: (TextRun | ExternalHyperlink)[] = [
    link(contacts.email, `mailto:${contacts.email}`),
  ];
  if (contacts.phone) contactRuns.push(sep(), new TextRun({ text: contacts.phone, size: 20, font: FONT }));
  if (contacts.linkedin) contactRuns.push(sep(), link(prettyUrl(contacts.linkedin), contacts.linkedin));
  if (contacts.github) contactRuns.push(sep(), link(prettyUrl(contacts.github), contacts.github));
  if (contacts.website) contactRuns.push(sep(), link(prettyUrl(contacts.website), contacts.website));

  const children: Paragraph[] = [
    new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({ text: cv.name, bold: true, size: 52, font: FONT })],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({ text: cv.title, bold: true, size: 26, color: TEAL, font: FONT }),
        new TextRun({ text: `   ${cv.location}`, size: 22, color: MUTED, font: FONT }),
      ],
    }),
    new Paragraph({ spacing: { after: 60 }, children: contactRuns }),

    heading('Summary'),
    new Paragraph({ children: [new TextRun({ text: cv.summary, size: 21, font: FONT })] }),

    heading('Experience'),
  ];

  cv.experience.forEach((job) => {
    children.push(
      new Paragraph({
        spacing: { before: 160, after: 0 },
        keepNext: true,
        tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_EDGE }],
        children: [
          new TextRun({ text: job.company, bold: true, size: 22, font: FONT }),
          ...(job.end === null ? [new TextRun({ text: '  (current)', size: 18, color: AMBER, font: FONT })] : []),
          new TextRun({
            text: `\t${formatRange(job.start, job.end)}  (${formatDuration(durationInMonths(job.start, job.end))})`,
            size: 19,
            color: MUTED,
            font: FONT,
          }),
        ],
      }),
      new Paragraph({
        keepNext: job.highlights.length > 0,
        children: [
          new TextRun({ text: job.role, size: 21, font: FONT }),
          new TextRun({ text: `   ${job.stack.join(', ')}`, size: 19, color: MUTED, font: FONT }),
        ],
      }),
      ...job.highlights.map(
        (h) => new Paragraph({ bullet: { level: 0 }, children: [new TextRun({ text: h, size: 21, font: FONT })] }),
      ),
    );
  });

  children.push(heading('Skills'));
  cv.stack.forEach((layer) => {
    children.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({ text: `${layer.layer}: `, bold: true, size: 21, font: FONT }),
          new TextRun({ text: layer.skills.join(', '), size: 21, font: FONT }),
          new TextRun({
            text: ` (${statusLabel[layer.status]})`,
            size: 19,
            color: layer.status === 'learning' ? AMBER : MUTED,
            font: FONT,
          }),
        ],
      }),
    );
  });
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Tools: ', bold: true, size: 21, font: FONT }),
        new TextRun({ text: cv.tools.join(', '), size: 21, font: FONT }),
      ],
    }),
  );

  children.push(heading('Education'));
  cv.education.forEach((e) => {
    children.push(
      new Paragraph({
        spacing: { before: 80 },
        tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_EDGE }],
        children: [
          new TextRun({ text: e.school, bold: true, size: 21, font: FONT }),
          new TextRun({ text: `\t${e.period}`, size: 19, color: MUTED, font: FONT }),
        ],
      }),
      ...(e.degree ? [new Paragraph({ children: [new TextRun({ text: e.degree, size: 21, font: FONT })] })] : []),
    );
  });

  if (cv.teaching.length) {
    children.push(heading('Teaching'));
    cv.teaching.forEach((t) => {
      children.push(
        new Paragraph({
          spacing: { before: 80 },
          children: [
            t.url ? link(t.title, t.url) : new TextRun({ text: t.title, bold: true, size: 21, font: FONT }),
          ],
        }),
        new Paragraph({ children: [new TextRun({ text: t.description, size: 21, color: MUTED, font: FONT })] }),
      );
    });
  }

  if (cv.projects.length) {
    children.push(heading('Projects'));
    cv.projects.forEach((p) => {
      children.push(
        new Paragraph({
          spacing: { before: 80 },
          children: [
            new TextRun({ text: p.name, bold: true, size: 21, font: FONT }),
            ...(p.status ? [new TextRun({ text: `  (${p.status.toLowerCase()})`, size: 19, color: AMBER, font: FONT })] : []),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: `${p.description} `, size: 21, font: FONT }),
            new TextRun({ text: p.stack.join(', '), size: 19, color: MUTED, font: FONT }),
          ],
        }),
      );
    });
  }

  const doc = new Document({
    creator: cv.name,
    title: `${cv.name} — CV`,
    description: cv.title,
    styles: { default: { document: { run: { font: FONT, size: 21 } } } },
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 }, // A4
            margin: { top: 1000, bottom: 1000, left: 1134, right: 1134 },
          },
        },
        children,
      },
    ],
  });

  await writeFile(outFile, await Packer.toBuffer(doc));
}
