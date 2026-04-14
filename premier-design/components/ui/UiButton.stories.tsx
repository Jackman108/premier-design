import type {Meta, StoryObj} from '@storybook/nextjs-vite';

import {fn} from 'storybook/test';

import {UiButton} from './UiButton';

const meta = {
	title: 'UI/UiButton',
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
