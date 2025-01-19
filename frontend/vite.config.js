import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { BACKEND_URL } from './src/config';

// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/static': {
        target: `${BACKEND_URL}`, 
        changeOrigin: true,
        secure: false,
      },
      '/media': {
        target: `${BACKEND_URL}`, 
        changeOrigin: true,
        secure: false,
      },
      '/admin': {
        target: `${BACKEND_URL}`,
        changeOrigin: true,
        secure: true,
      },
      // '/api': {
      //   target: `${BACKEND_URL}`,
      //   changeOrigin: true,
      //   secure: true,
      // },
    },
  },
});
