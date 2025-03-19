import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config.ts';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      coverage: {
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/**/types/**',
          'src/**/constants/**',
          'src/**/index.ts',
          'src/**/types.ts',
          'src/**/*.d.ts',
        ],
      },
    },
  }),
);
