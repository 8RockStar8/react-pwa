# Gagik Aproyan — CV app

My CV as a progressive web app: it installs on phones and desktops and works offline.
The structure follows [react-pwa](https://github.com/suren-atoyan/react-pwa), trimmed down for a CV.

**Stack:** Vite · React 19 · TypeScript · MUI 6 · React Router 7 · Jotai · vite-plugin-pwa (Workbox)

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ (the service worker works here, not in dev)
```

## Edit the content

Everything you read on the site is in **`src/data/cv.ts`**: name, summary, story, contacts,
jobs, education, skills, teaching and projects. The pages read from it, so you never touch JSX
to update the CV.

- Jobs use `start: 'YYYY-MM'` and `end: 'YYYY-MM'`, or `end: null` for the current job.
  Durations and the career timeline are calculated from these dates.
- Add 1–2 `highlights` per job (what you built, and the result). They appear on the Experience page.
- Add `linkedin` under `contacts` and the LinkedIn button appears everywhere.
- The photo is `public/photo.jpg` (square, 640 × 640).

## Downloadable CV (PDF and Word)

The **Download CV** button offers `Gagik_Aproyan_CV.pdf` (designed, one page) and
`Gagik_Aproyan_CV.docx` (editable, simple layout that recruiters' systems can read).
Both are generated from `src/data/cv.ts` by `scripts/generate-cv.ts`, which runs
automatically before `npm run dev` and `npm run build`. Run `npm run cv` to regenerate them
on their own. The generated files are not committed (see `.gitignore`).

- PDF: `scripts/cv/pdf.tsx` (@react-pdf/renderer)
- Word: `scripts/cv/docx.ts` (docx)

## Project structure

```
src/
  data/          cv.ts (content), types.ts, cvFiles.ts (download file names)
  pages/         Home, Experience, Skills, Projects, Contact, NotFound (lazy-loaded)
  routes/        route list (also drives the sidebar) and <Pages/>
  sections/      Header and Sidebar
  components/    CareerRibbon, StackLayers, ContactLinks, DownloadCv, Page, Loading
  theme/         light/dark palettes, fonts, theme toggle (remembers the choice)
  hooks/         usePwaInstall (the Install button)
  utils/         dates.ts (pure date helpers), loader.tsx (no-flash lazy loading)
  error-handling/
scripts/         generate-cv.ts + cv/pdf.tsx, cv/docx.ts
```

## Deploy

### GitHub Pages (free, automatic)

1. The repo is public on GitHub and the app lives on `main`.
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. Every push to `main` builds and deploys via `.github/workflows/deploy.yml`.
   The site appears at `https://8rockstar8.github.io/react-pwa/`.

### Your own domain (no server needed)

GitHub Pages hosts the site for free; you only buy the domain.

1. Buy a domain at any registrar (Cloudflare, Namecheap, Porkbun…).
2. In the registrar's DNS settings add:
   - four `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - one `CNAME` record for `www` → `8rockstar8.github.io`
3. In the repo: **Settings → Secrets and variables → Actions → Variables → New repository variable**:
   name `CUSTOM_DOMAIN`, value your domain (for example `gagikaproyan.dev`).
4. Re-run the deploy. The build switches to the domain root, writes the `CNAME` file and prints
   the new address on the PDF and Word CV.
5. **Settings → Pages**: confirm the custom domain and tick **Enforce HTTPS** once it's offered.

### AWS (S3 + CloudFront) — good AWS practice

1. `npm run build`
2. Create an S3 bucket (block public access on) and a CloudFront distribution with that bucket
   as the origin (Origin Access Control). Default root object: `index.html`.
3. Add custom error responses for 403 and 404 → `/index.html` with status 200, so page links
   like `/experience` work.
4. Upload: `aws s3 sync dist s3://YOUR_BUCKET --delete`
5. After each deploy: `aws cloudfront create-invalidation --distribution-id ID --paths "/*"`
6. Optional: your own domain with a free ACM certificate (must be in us-east-1 for CloudFront).

### Vercel / Netlify

Import the repo. Build command `npm run build`, output folder `dist`.

## Install the app

- Chrome, Edge, Android: the **Install** button appears in the header.
- iPhone (Safari): Share → Add to Home Screen.
