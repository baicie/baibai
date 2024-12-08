// @ts-check
import { builtinModules } from 'node:module'
import { fileURLToPath, URL } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import pluginImportX from 'eslint-plugin-import-x'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import pluginN from 'eslint-plugin-n'
import pluginRegExp from 'eslint-plugin-regexp'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default tseslint.config(
  {
    plugins: {
      ['@typescript-eslint']: tseslint.plugin,
      ['jsx-a11y']: jsxA11yPlugin,
      ['n']: pluginN,
      ['import-x']: pluginImportX,
      vue: pluginVue,
    },
  },

  {
    ignores: [
      'node_modules/',
      '**/dist/**',
      '**/static/**',
      '**/.turbo/**',
      '**/temp/**',
      '**/.vitepress/**',
      '**/*.snap',
      '**/vite.config.ts',
      '**/vitest.config.ts',
      'coverage',
      'cypress',
    ],
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  pluginRegExp.configs['flat/recommended'],
  pluginVue.configs['flat/vue3-recommended'],

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },

  // Vue files
  {
    files: ['**/*.vue'],
    rules: {
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/component-options-name-casing': ['error', 'PascalCase'],
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/define-macros-order': ['error', {
        order: ['defineProps', 'defineEmits'],
      }],
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'always',
      }],
      'vue/html-indent': ['error', 2],
      'vue/max-attributes-per-line': ['error', {
        singleline: 3,
        multiline: 1,
      }],
    },
  },

  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-function': 'off',
    },
  },

  // Test files
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/*.spec.[jt]s?(x)'],
    languageOptions: {
      globals: {
        ...globals.jest,
        cy: true,
        assert: true,
        expect: true,
      },
    },
    rules: {
      'no-empty': 'off',
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
) 