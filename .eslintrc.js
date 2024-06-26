module.exports = {
  root: true,
  ignorePatterns: ['node_modules/', 'dist/', '*.min.js', 'build/'],
  overrides: [
    {
      files: ['server/**/*.{js,ts}'],
      env: {
        node: true,
        browser: true,
        es2021: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['frontend/**/*.{js,jsx,ts,tsx}'],
      env: {
        node: true,
        es2021: true,
        node: true,
        jest: true,
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
      ],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        'prettier/prettier': ['error'],
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
};
