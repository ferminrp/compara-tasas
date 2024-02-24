import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import svgr from 'vite-plugin-svgr'

import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), partytown(), sitemap(), react()],
  site: 'https://comparatasas.ar',
  output: 'server',
  adapter: vercel(),
  vite: {
    plugins: [
      svgr({
        include: '**/*.svg?react',
        svgrOptions: {
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
          svgoConfig: {
            plugins: [
              'preset-default',
              'removeTitle',
              'removeDesc',
              'removeDoctype',
              'cleanupIds'
            ]
          }
        }
      })
    ]
  }
})
