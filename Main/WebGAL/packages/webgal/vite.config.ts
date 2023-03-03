import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import loadVersion from 'vite-plugin-package-version';
import {resolve} from 'path';
import {visualizer} from 'rollup-plugin-visualizer';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), loadVersion(), visualizer()],
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
});
