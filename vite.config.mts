import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    open: true,
    watch: {}
  },
  preview: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'build',
    sourcemap: true,
    manifest: true,
    emptyOutDir: true
  },
  plugins: [
    react({
      include: /\.(jsx|tsx)$/,
      babel: {
        plugins: ['styled-components'],
        babelrc: false,
        configFile: false
      }
    })
  ]
});
