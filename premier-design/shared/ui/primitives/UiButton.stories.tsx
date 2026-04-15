import type {Meta, StoryObj} from '@storybook/nextjs-vite';

import {fn} from 'storybook/test';

import {UiButton} from './UiButton';

const meta = {
	title: 'Primitives/UiButton',
	component: UiButton,
	parameters: {layout: 'centered'},
	tags: ['autodocs'],
	args: {onClick: fn()},
} satisfies Meta<typeof UiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {variant: 'primary', children: 'Оставить заявку'},
};

export const Secondary: Story = {
	args: {variant: 'secondary', children: 'Подробнее'},
};

export const Ghost: Story = {
	args: {variant: 'ghost', children: 'Связаться'},
};

export const AsLink: Story = {
	args: {
		as: 'a',
		href: '/contacts',
		variant: 'primary',
		children: 'Перейти к контактам',
	},
};
