// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // 无 site 配置，Cloudflare Pages 自动分配 *.pages.dev 域名
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
