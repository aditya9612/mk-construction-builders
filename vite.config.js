import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    proxy: {
      // Same-origin POST /api/v1/enquiries → local FastAPI (avoids CORS on :5174)
      '/api/v1/enquiries': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/api': {
        target: 'https://api.mkconstruction.site',
        changeOrigin: true,
      },
    },
  },
})
