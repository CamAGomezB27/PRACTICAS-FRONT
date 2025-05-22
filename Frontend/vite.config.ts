import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Usamos import.meta.url para obtener el directorio actual en módulos ESM
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(
        new URL('./src/components', import.meta.url).pathname,
      ),
      '@pages': path.resolve(new URL('./src/pages', import.meta.url).pathname),
      '@hooks': path.resolve(new URL('./src/hooks', import.meta.url).pathname),
      '@services': path.resolve(
        new URL('./src/services', import.meta.url).pathname,
      ),
      '@utils': path.resolve(new URL('./src/utils', import.meta.url).pathname),
      '@styles': path.resolve(
        new URL('./src/styles', import.meta.url).pathname,
      ),
      '@assets': path.resolve(
        new URL('./src/assets', import.meta.url).pathname,
      ),
      '@routes': path.resolve(
        new URL('./src/routes', import.meta.url).pathname,
      ),
      '@context': path.resolve(
        new URL('./src/context', import.meta.url).pathname,
      ),
    },
  },
});
