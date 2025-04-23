import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'date-fns': ['date-fns'],
          'react-vendor': ['react', 'react-dom'],
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'date-fns']
  }
});
