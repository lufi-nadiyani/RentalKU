import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Pakai relative path
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    open: true,
  },
});