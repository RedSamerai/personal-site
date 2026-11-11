// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { stripWoffFallback } from './vite.stripwoff.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [],
  vite: {
    plugins: [tailwindcss(), stripWoffFallback()],
  },
});
