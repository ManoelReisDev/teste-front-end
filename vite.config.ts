import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const defaultProductsUpstream =
  'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json'
const defaultProductsOrigin = 'https://app.econverse.com.br'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const upstream = env.PRODUCTS_UPSTREAM_URL || defaultProductsUpstream
  const upstreamOrigin = upstream.match(/^https?:\/\/[^/]+/)?.[0] || defaultProductsOrigin
  const upstreamPath = upstream.slice(upstreamOrigin.length) || '/'

  return {
    plugins: [react()],
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/components/**/*.test.tsx'],
      globals: false,
      coverage: {
        provider: 'v8',
        all: true,
        include: ['src/components/**/*.tsx'],
        exclude: ['src/components/**/*.test.tsx'],
        reporter: ['text', 'html', 'json-summary'],
      },
    },
    server: {
      proxy: {
        '/api/products': {
          target: upstreamOrigin,
          changeOrigin: true,
          rewrite: () => upstreamPath,
        },
      },
    },
    preview: {
      proxy: {
        '/api/products': {
          target: upstreamOrigin,
          changeOrigin: true,
          rewrite: () => upstreamPath,
        },
      },
    },
  }
})
