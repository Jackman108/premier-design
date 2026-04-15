import type {Meta, StoryObj} from '@storybook/nextjs-vite';

import {UiCheckbox} from './UiCheckbox';

const meta = {
	title: 'Primitives/UiCheckbox',
	component: UiCheckbox,
	parameters: {layout: 'padded'},
	tags: ['autodocs'],
} satisfies Meta<typeof UiCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Согласен с условиями',
	},
};

export const WithError: Story = {
	args: {
		label: 'Подтвердите согласие',
		error: 'Нужно отметить галочку',
	},
};
