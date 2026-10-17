// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://redsamerai.github.io/personal-site',
  integrations: [
    sitemap({
      // 只输出主要语言版本，避免 /en/* 重复收录
      filter: (page) => !page.includes('/en/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
