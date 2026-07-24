import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://felipelamarca.com',
  outDir: './docs',
  integrations: [tailwind(), sitemap()],
  build: {
    assets: '_assets'
  },
  // Legacy URLs from the previous Quarto site (still indexed and linked externally).
  redirects: {
    '/my-work/my-work.html': '/publications/',
    '/my-work': '/publications/',
    '/publications/publications.html': '/publications/',
    '/learning/learning.html': '/materials/',
    '/learning': '/materials/',
    '/teaching/teaching.html': '/teaching/',
    '/talking/talking.html': '/publications/',
    '/talking': '/publications/'
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-br'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
