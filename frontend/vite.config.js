import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Cleaner imports
    },
  },
  build: {
    outDir: 'dist', // Ensure output matches the Nginx mount point
    emptyOutDir: true, // Clear the output directory before building
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js', // Chunked JS files
        entryFileNames: 'assets/js/[name]-[hash].js', // Entry JS files
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]', // Static assets
      },
    },
  },
  server: {
    host: '0.0.0.0', // Listen on all interfaces (important for Docker)
    port: 3000, // Local dev port (ignored in production)
    proxy: {
      // Proxy API requests to the Django backend
      '/api': {
        target: 'http://backend', // Django backend service in Docker Compose
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove `/api` prefix
      },
    },
  },
});
