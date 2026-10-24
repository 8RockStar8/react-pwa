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

## Project structure

```
src/
  data/          cv.ts (content) and types.ts
  pages/         Home, Experience, Skills, Projects, Contact, NotFound (lazy-loaded)
  routes/        route list (also drives the sidebar) and <Pages/>
  sections/      Header and Sidebar
  components/    CareerRibbon, StackLayers, ContactLinks, Page, Loading
  theme/         light/dark palettes, fonts, theme toggle (remembers the choice)
  hooks/         usePwaInstall (the Install button)
  utils/         dates.ts (pure date helpers), loader.tsx (no-flash lazy loading)
  error-handling/
```

## Deploy

### GitHub Pages (free, automatic)

1. The repo is public on GitHub and the app lives on `main`.
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. Every push to `main` builds and deploys via `.github/workflows/deploy.yml`.
   The site appears at `https://8rockstar8.github.io/react-pwa/`.

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
