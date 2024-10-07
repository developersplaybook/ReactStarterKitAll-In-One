module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  rules: {
    'react/prop-types': 'off', // Disable prop-types rule if not using it
    'react/react-in-jsx-scope': 'off', // React 17+ doesn't need 'React' in scope for JSX
    'jsx-a11y/anchor-is-valid': 'warn', // Warn for invalid anchor tags
/*    'no-console': 'warn', // Warn on console logs,*/
    'no-unused-vars': 2, // 0=off, 1=warning, 2= error
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
