import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    resolve: {
      alias: {
        '~bootstrap': path.resolve(__dirname, 'bootstrap/scss/bootstrap'),
      }
    },
  };
});
