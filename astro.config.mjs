// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { stripWoffFallback } from './vite.stripwoff.mjs';

// https://astro.build/config
export default defineConfig({
  // 站点根 URL：Astro.site 用于生成 canonical / hreflang / og:url 等绝对 URL。
  // 拿到正式自定义域名时只改这一行。
  site: 'https://c63ec20e.personal-site-ea5.pages.dev',
  integrations: [],
  vite: {
    plugins: [tailwindcss(), stripWoffFallback()],
  },
});
