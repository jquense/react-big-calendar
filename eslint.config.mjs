import js from '@eslint/js'
import babelParser from '@babel/eslint-parser'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'
import prettierConfig from 'eslint-config-prettier'
import storybookPlugin from 'eslint-plugin-storybook'
import globals from 'globals'

export default [
  // Global ignores (migrated from .eslintignore)
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'lib/**',
      'storybook-static/**',
      'coverage/**',
      '.*',
    ],
  },

  // JS recommended baseline
  js.configs.recommended,

  // Main source and stories
  {
    files: ['src/**/*.js', 'stories/**/*.js', 'stories/**/*.jsx'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true, impliedStrict: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2015,
        __DEV__: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
    },
    settings: {
      'import/extensions': ['.js', '.jsx'],
      'import/resolver': {
        webpack: {},
        node: { extensions: ['.js', '.jsx'] },
      },
    },
    rules: {
      // import rules (replaces plugin:import/errors from eslint-config-jason/base)
      'import/no-duplicates': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',

      // react rules (from eslint-config-jason/react)
      'react/display-name': 'off',
      'react/no-multi-comp': 'off',
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-react': 'error',
      'react/react-in-jsx-scope': 'error',
      'react/jsx-wrap-multilines': 'error',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',

      // react hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // base rules (from eslint-config-jason/base)
      'prefer-const': 'off',
      'global-require': 'off',
      'no-unused-expressions': [
        'error',
        { allowTernary: true, allowShortCircuit: true },
      ],

      // project-specific overrides
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },

  // Prettier — disables conflicting formatting rules (must be near last)
  prettierConfig,

  // Storybook flat config (for story files)
  ...storybookPlugin.configs['flat/recommended'],
  {
    files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)', 'stories/**/*.stories.*'],
    rules: {
      'storybook/default-exports': 'off',
    },
  },

  // Test files
  {
    files: ['test/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
]
