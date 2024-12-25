import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/frontend/', // Change this if your frontend is deployed to a different subdirectory or leave it as '/' if it's at the root
  plugins: [react()],
})