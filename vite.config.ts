import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: './src/translate.ts',
      name: 'Translate',
      fileName: 'translate',
    },
  },
  plugins: [dts()],
});
