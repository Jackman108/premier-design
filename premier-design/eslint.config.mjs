// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import {FlatCompat} from '@eslint/eslintrc';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({baseDirectory: __dirname});

const config = [{
    ignores: [
        '.next/**',
        'node_modules/**',
        'coverage/**',
        'storybook-static/**',
        'next-env.d.ts',
    ],
}, ...compat.config({
    root: true,
    env: {
        browser: true,
        es2022: true,
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'next/core-web-vitals',
        'next',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['@typescript-eslint', 'react'],
    rules: {
        'no-restricted-imports': [
            'error',
            {
                patterns: [
                    {
                        group: ['**/pages/**'],
                        message: 'Импорты из pages разрешены только внутри pages (entrypoint слой).',
                    },
                ],
            },
        ],
    },
    overrides: [
        {
            files: ['pages/**/*.{ts,tsx,js,jsx}'],
            rules: {
                'no-restricted-imports': 'off',
            },
        },
        {
            files: ['**/__tests__/**/*.{ts,tsx,js,jsx}', 'tests/**/*.{ts,tsx,js,jsx}'],
            rules: {
                'no-restricted-imports': 'off',
            },
        },
        {
            files: ['features/**/*.{ts,tsx,js,jsx}', 'services/**/*.{ts,tsx,js,jsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['**/components/**', '**/Layout/**'],
                                message: 'Бизнес-слой не должен зависеть от UI-слоя.',
                            },
                            {
                                group: ['**/pages/**'],
                                message: 'Бизнес-слой не должен зависеть от entrypoint слоя pages.',
                            },
                        ],
                    },
                ],
            },
        },
    ],
}), ...storybook.configs["flat/recommended"]];

export default config;
