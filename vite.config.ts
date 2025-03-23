/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'css/[name]-[hash][extname]';
          }
          if (assetInfo.name?.endsWith('.js')) {
            return 'js/[name]-[hash][extname]';
          }
          if (assetInfo.name?.endsWith('.png') || assetInfo.name?.endsWith('.jpg') || assetInfo.name?.endsWith('.svg')) {
            return 'images/[name]-[hash][extname]';
          }
          if (assetInfo.name?.endsWith('.woff') || assetInfo.name?.endsWith('.woff2') || assetInfo.name?.endsWith('.ttf')) {
            return 'fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
