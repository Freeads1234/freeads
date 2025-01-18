import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/admin': {
  //       target: 'http://127.0.0.1:8000', // Your Django server's address
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //     '/api': {
  //       target: 'http://127.0.0.1:8000', // Proxy API requests
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
});
