// Next.js 16 ships flat ESLint presets (`eslint-config-next`); do not use FlatCompat + legacy `extends: 'next'` (circular config with ESLint 9).
// Storybook: https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import {createRequire} from 'node:module';
import storybook from 'eslint-plugin-storybook';
import reactCompiler from 'eslint-plugin-react-compiler';

const require = createRequire(import.meta.url);

/** @type {import('eslint').Linter.Config[]} */
const nextCoreWebVitals = require('eslint-config-next/core-web-vitals');

const eslintConfig = [
	{
		ignores: [
			'node_modules/**',
			'coverage/**',
			'storybook-static/**',
			'.next/**',
			'next-env.d.ts',
		],
	},
	...nextCoreWebVitals,
	{
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['**/pages/**'],
							message:
								'Каталог Pages Router `pages/` не используется — маршруты в `app/`, композиция страниц в `pages-layer/`.',
						},
					],
				},
			],
		},
	},
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		plugins: {
			'react-compiler': reactCompiler,
		},
		rules: {
			'react-compiler/react-compiler': 'error',
			'jsx-a11y/alt-text': 'error',
			'jsx-a11y/anchor-is-valid': 'error',
			'jsx-a11y/aria-props': 'error',
			'jsx-a11y/aria-proptypes': 'error',
			'jsx-a11y/aria-role': 'error',
			'jsx-a11y/role-has-required-aria-props': 'error',
		},
	},
	{
		files: ['**/hooks/**/*.{ts,tsx,js,jsx}'],
		rules: {
			'react-compiler/react-compiler': 'off',
		},
	},
	{
		files: ['app/**/*.{ts,tsx,js,jsx}', 'pages-layer/**/*.{ts,tsx,js,jsx}'],
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
							group: ['**/pages/**', '@pages/**', '@pages-layer/**'],
							message:
								'Бизнес-слой не должен зависеть от слоя страниц (`pages-layer`, `@pages/*`).',
						},
					],
				},
			],
		},
	},
	{
		// FSD: страницы-детали собирают `@widgets/*`; не блокируем `**/Layout/**` (на Windows совпадает с `layout`).
		files: [
			'features/related-services/**/*.{ts,tsx,js,jsx}',
			'features/services/**/*.{ts,tsx,js,jsx}',
		],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['**/components/**'],
							message: 'Бизнес-слой не должен зависеть от легаси components/.',
						},
						{
							group: ['**/pages/**', '@pages/**', '@pages-layer/**'],
							message:
								'Бизнес-слой не должен зависеть от слоя страниц (`pages-layer`, `@pages/*`).',
						},
					],
				},
			],
		},
	},
	...storybook.configs['flat/recommended'],
];

export default eslintConfig;
