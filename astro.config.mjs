import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://felipelamarca.com',
  outDir: './docs',
  integrations: [tailwind()],
  build: {
    assets: '_assets'
  }
});
