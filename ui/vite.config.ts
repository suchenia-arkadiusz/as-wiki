import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setupTests.ts',
    coverage: {
      provider: 'istanbul'
    },
    exclude: ['**/node_modules/**', '**/dist/**', '**/coverage/**'],
  },
});
