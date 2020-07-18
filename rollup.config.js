import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: './src/translate.js',
    output: {
        file: './dist/translate.js',
        format: 'cjs',
    },
    plugins: [resolve(), babel({ babelHelpers: 'bundled' })],
};
