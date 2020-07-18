import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: './src/translate.js',
    output: ['cjs', 'esm', 'umd'].map(format => ({
        file: `./dist/translate.${format}.js`,
        format,
        name: format === 'umd' ? 'translate' : null,
    })),
    plugins: [resolve(), babel({ babelHelpers: 'bundled' })],
};
