import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://shopora-backend-1g44.onrender.com/', // 👈 Your backend
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
