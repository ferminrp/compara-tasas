import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercelStatic from '@astrojs/vercel/static';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), partytown(), sitemap(), react()],
  site: 'https://comparatasas.ar',
  output: 'static',
  adapter: vercelStatic(),
});
