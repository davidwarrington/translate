import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const isProduction = !process.env.ROLLUP_WATCH;

export default {
  input: './src/translate.js',
  output: ['cjs', 'esm', 'umd'].map(format => ({
    file: `./dist/translate.${format}.js`,
    format,
    name: format === 'umd' ? 'translate' : null,
  })),
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    isProduction && terser(),
  ],
};
