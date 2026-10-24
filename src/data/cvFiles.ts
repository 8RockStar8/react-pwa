// Names of the downloadable CV files. Shared by the site (download links)
// and scripts/generate-cv.ts (which writes the files into public/ before every build).

export function cvFileBase(name: string): string {
  return `${name.trim().replace(/\s+/g, '_')}_CV`;
}

export const cvFormats = [
  { ext: 'pdf', label: 'PDF', description: 'Designed, one page' },
  { ext: 'docx', label: 'Word', description: 'Editable, simple layout' },
] as const;
