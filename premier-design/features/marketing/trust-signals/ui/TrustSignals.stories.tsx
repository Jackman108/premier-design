import type {Meta, StoryObj} from '@storybook/nextjs-vite';

import type {FeatureProps} from '@shared/ui/features-section/interface/Feature.props';
import type {Review} from '@shared/ui/reviews/ui/interface/Review.props';

import TrustSignals from './TrustSignals';

const sampleFeatures: FeatureProps[] = [
	{id: 1, title: 'Оптимальные сроки', icon: '/features/clock.webp', iconPng: '/features/clock.png'},
	{id: 2, title: 'Разумные цены', icon: '/features/economy.webp', iconPng: '/features/economy.png'},
];

const sampleReviews: Review[] = [
	{
		id: 1,
		name: 'Иван',
		city: 'Минск',
		text: 'Ремонт прошёл без задержек, рекомендую.',
		photoUrl: '/reviews/review_1.jpg',
	},
	{
		id: 2,
		name: 'Мария',
		city: 'Гомель',
		text: 'Очень довольна качеством и сроками.',
		photoUrl: '/reviews/review_2.jpg',
	},
];

const meta = {
	title: 'Marketing/TrustSignals',
	component: TrustSignals,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: 'Блок доверия: метрики, преимущества из `features`, короткие цитаты из отзывов.',
			},
		},
	},
} satisfies Meta<typeof TrustSignals>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithData: Story = {
	args: {
		reviews: sampleReviews,
		features: sampleFeatures,
	},
};

export const EmptyReviews: Story = {
	args: {
		reviews: [],
		features: sampleFeatures,
	},
};
