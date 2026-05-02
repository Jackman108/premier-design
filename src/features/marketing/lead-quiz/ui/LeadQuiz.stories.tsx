import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import LeadQuiz from './LeadQuiz';

const meta = {
	title: 'Marketing/LeadQuiz',
	component: LeadQuiz,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Квиз на главной: три шага, прогресс, переход к заявке через `OrderButton` с предзаполненным сообщением.',
			},
		},
	},
} satisfies Meta<typeof LeadQuiz>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		ctaLabel: 'Оставить заявку',
	},
};
