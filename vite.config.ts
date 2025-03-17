import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    tailwindcss(),
    checker({
      eslint: {
        lintCommand: 'eslint "**/*.{mjs,ts,tsx}"',
        useFlatConfig: true,
      },
      typescript: true,
    }),
  ],
});
