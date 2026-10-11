import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const productsUpstream =
  'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/products': {
        target: productsUpstream,
        changeOrigin: true,
        rewrite: () => '/teste-front-end/junior/tecnologia/lista-produtos/produtos.json',
      },
    },
  },
})
