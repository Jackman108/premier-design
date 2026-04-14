import type {Meta, StoryObj} from '@storybook/nextjs-vite';

import {UiSurface} from './UiSurface';

const meta = {
	title: 'UI/UiSurface',
	component: UiSurface,
	parameters: {layout: 'padded'},
	tags: ['autodocs'],
} satisfies Meta<typeof UiSurface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Контент карточки: краткий текст или форма.',
	},
};

export const Muted: Story = {
	args: {
		variant: 'muted',
		children: 'Вторичная поверхность для группировки полей.',
	},
};
