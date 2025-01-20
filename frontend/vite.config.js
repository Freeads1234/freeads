import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { BACKEND_URL } from './src/config';

// vite.config.js
export default defineConfig({
  plugins: [react()],
});