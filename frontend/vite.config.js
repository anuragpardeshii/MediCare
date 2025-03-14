import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./", // Ensure correct relative paths
  build: {
    outDir: "dist", // Ensure this matches Vercel's config
  },
})
 
