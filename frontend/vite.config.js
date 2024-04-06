import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    lib: {
      entry: resolve(__dirname, 'frontend/src/pages/CheckoutSuccess.jsx'),
      formats: ['es']
    }
  }
})
