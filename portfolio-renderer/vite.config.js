import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: true,
    allowedHosts: [
      "john.blackfade.com",
      "amanda.blackfade.com",
      "blackfade.com",
    ],
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        
      },
    },
  },
})
