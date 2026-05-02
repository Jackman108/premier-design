import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UiTextarea } from './UiTextarea';

const meta = {
	title: 'Primitives/UiTextarea',
	component: UiTextarea,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
} satisfies Meta<typeof UiTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Комментарий',
		placeholder: 'Кратко опишите задачу',
		rows: 4,
	},
};

export const WithError: Story = {
	args: {
		label: 'Сообщение',
		error: 'Поле обязательно',
	},
};
