import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
	stories: [
		'../src/shared/**/*.stories.@(js|jsx|mjs|ts|tsx)',
		'../src/features/marketing/**/*.stories.@(js|jsx|mjs|ts|tsx)',
	],
	addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
	framework: '@storybook/nextjs-vite',
	staticDirs: ['../public'],
};

export default config;
