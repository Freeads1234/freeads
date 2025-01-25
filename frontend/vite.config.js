import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { BACKEND_URL } from './src/config';

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/media': {
  //       target: BACKEND_URL, 
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/media/, '/media'),
  //     },
  //   },
  // },
});