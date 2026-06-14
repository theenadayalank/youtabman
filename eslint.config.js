import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';

export default [
  { ignores: ['dist/', 'node_modules/'] },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    files: ['src/**/*.{js,vue}', 'public/background.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        chrome: 'readonly',
      },
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-alert': 'error',
      'eqeqeq': ['error', 'always'],
      'no-eval': 'error',
      'no-caller': 'error',
      'no-undef': 'error',
      'no-eq-null': 'error',
      'space-unary-ops': ['error', { words: true, nonwords: false }],
    },
  },

  {
    files: ['deploy.js', 'vite.config.js', 'eslint.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
];
