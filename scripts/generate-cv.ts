// Writes the downloadable CV files into public/ from src/data/cv.ts.
// Runs automatically before `npm run dev` and `npm run build` (see package.json),
// so the PDF and Word files always match what the website shows.

import { existsSync } from 'node:fs';
import path from 'node:path';

import cv from '../src/data/cv';
import { cvFileBase } from '../src/data/cvFiles';
import { writeDocx } from './cv/docx';
import { writePdf } from './cv/pdf';

const outDir = path.join(process.cwd(), 'public');
const base = path.join(outDir, cvFileBase(cv.name));

if (cv.photo && !existsSync(path.join(outDir, cv.photo))) {
  throw new Error(`Photo not found: public/${cv.photo}. Fix "photo" in src/data/cv.ts.`);
}

await Promise.all([writePdf(cv, `${base}.pdf`), writeDocx(cv, `${base}.docx`)]);
console.log(`CV written: public/${path.basename(base)}.pdf and .docx`);
