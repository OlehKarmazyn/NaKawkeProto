import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

const FIGMA_ASSET_PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='

function figmaAssetPlugin() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) return '\0' + id
      return null
    },
    load(id: string) {
      if (id.startsWith('\0figma:asset/')) return `export default ${JSON.stringify(FIGMA_ASSET_PLACEHOLDER)}`
      return null
    },
  }
}

const siteUrl = process.env.VITE_SITE_URL ?? 'https://nakawke.pl'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    figmaAssetPlugin(),
    Sitemap({
      hostname: siteUrl,
      exclude: ['/'],
      dynamicRoutes: [
        '/pl/',
        '/pl/pakiet-standard',
        '/pl/pakiet-premium',
        '/en/',
        '/en/pakiet-standard',
        '/en/pakiet-premium',
        '/uk/',
        '/uk/pakiet-standard',
        '/uk/pakiet-premium',
      ],
      // Sitemap frequency:
      // - Package pages: weekly
      // - Other pages (including auto-detected): monthly
      changefreq: {
        '/pl/pakiet-standard': 'weekly',
        '/pl/pakiet-premium': 'weekly',
        '/en/pakiet-standard': 'weekly',
        '/en/pakiet-premium': 'weekly',
        '/uk/pakiet-standard': 'weekly',
        '/uk/pakiet-premium': 'weekly',
        '/pl/': 'monthly',
        '/en/': 'monthly',
        '/uk/': 'monthly',
        '*': 'monthly',
      },
      // Sitemap priority:
      // - Language roots: 1.0
      // - Package pages: 0.8
      // - All other routes: 0.5
      priority: {
        '/pl/': 1.0,
        '/en/': 1.0,
        '/uk/': 1.0,
        '/pl/pakiet-standard': 0.8,
        '/pl/pakiet-premium': 0.8,
        '/en/pakiet-standard': 0.8,
        '/en/pakiet-premium': 0.8,
        '/uk/pakiet-standard': 0.8,
        '/uk/pakiet-premium': 0.8,
        '*': 0.5,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
