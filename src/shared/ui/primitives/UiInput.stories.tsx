import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { UiInput } from './UiInput';

const meta = {
	title: 'Primitives/UiInput',
	component: UiInput,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
} satisfies Meta<typeof UiInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Телефон',
		placeholder: '+7 …',
		hint: 'Мы перезвоним в рабочее время',
	},
};

export const WithError: Story = {
	args: {
		label: 'Email',
		defaultValue: 'not-an-email',
		error: 'Введите корректный адрес',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText('Email');
		await expect(input).toHaveAttribute('aria-invalid', 'true');
	},
};
