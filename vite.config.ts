import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslint({ cache: false }), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@P': path.resolve(__dirname, 'public'),
    },
  },
});
