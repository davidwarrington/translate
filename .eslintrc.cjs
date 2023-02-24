module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],

  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint'],

  root: true,

  overrides: [
    {
      files: ['./test/translate.spec.ts'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 0,
      },
    },
  ],
};
