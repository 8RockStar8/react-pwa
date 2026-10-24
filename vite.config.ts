import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// BASE_PATH lets the same build work at a domain root ("/") or in a sub-folder,
// e.g. GitHub Pages at https://8rockstar8.github.io/react-pwa/ needs "/react-pwa/".
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'robots.txt', 'photo.jpg'],
      // switch to true to test the service worker with `npm run dev`
      devOptions: { enabled: false },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,woff2,pdf,docx}'],
        navigateFallback: 'index.html',
      },
      manifest: {
        name: 'Gagik Aproyan — CV',
        short_name: 'Gagik CV',
        description: 'Senior React and React Native engineer.',
        start_url: base,
        scope: base,
        display: 'standalone',
        background_color: '#f2f5f7',
        theme_color: '#0f6b6a',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
});
