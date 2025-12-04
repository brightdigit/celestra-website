import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://celestr.app',
  output: 'static',

  build: {
    format: 'directory',
  },

  integrations: [tailwind()],
});