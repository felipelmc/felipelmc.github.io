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
  // Old URLs that are still indexed or linked externally: the previous Quarto
  // site's pages, and pages removed in later restructures (Research, Talks,
  // Work, and Notes, which is now a section of Teaching).
  redirects: {
    '/my-work/my-work.html': '/publications/',
    '/my-work': '/publications/',
    '/publications/publications.html': '/publications/',
    '/learning/learning.html': '/teaching/#notes',
    '/learning': '/teaching/#notes',
    '/teaching/teaching.html': '/teaching/',
    '/talking/talking.html': '/publications/#talks',
    '/talking': '/publications/#talks',
    '/materials': '/teaching/#notes',
    '/research': '/publications/',
    '/talks': '/publications/#talks',
    '/work': '/cv/',
    '/pt-br/materials': '/pt-br/teaching/#notes',
    '/pt-br/learning': '/pt-br/teaching/#notes',
    '/pt-br/research': '/pt-br/publications/',
    '/pt-br/work': '/pt-br/cv/'
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-br'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
