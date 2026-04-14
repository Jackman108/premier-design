import type {Meta, StoryObj} from '@storybook/nextjs-vite';

import {UiInput} from './UiInput';

const meta = {
	title: 'UI/UiInput',
	component: UiInput,
	parameters: {layout: 'padded'},
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
};
