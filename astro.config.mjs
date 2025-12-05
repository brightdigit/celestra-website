import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://celestr.app',
  output: 'static',

  build: {
    format: 'directory',
  },

  integrations: [sitemap()],

  vite: {
    server: {
      allowedHosts: [
        '.netlify.app',
        'celestr.app',
        'localhost',
      ],
    },
  },
});