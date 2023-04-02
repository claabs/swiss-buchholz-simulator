module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    // import
    'import/no-cycle': 'off',
    // 'import/no-extraneous-dependencies': ['error', { devDependencies: ['scripts/**'] }],
    // 'import/prefer-default-export': 'off',
    // 'import/extensions': [
    //   'error',
    //   'ignorePackages',
    //   {
    //     js: 'never',
    //     ts: 'never',
    //   },
    // ],
  },
  ignorePatterns: ['dist/**', '.*rc.js'],
};
