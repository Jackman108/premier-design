/** @jest-environment jsdom */
import {render, screen} from '@testing-library/react';
import type {ImgHTMLAttributes} from 'react';
import OfferBanner from './OfferBanner';

jest.mock('next/image', () => ({
	__esModule: true,
	// eslint-disable-next-line @next/next/no-img-element
	default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt ?? ''} />,
}));

describe('OfferBanner', () => {
	it('renders offer text and questions list', () => {
		render(
			<OfferBanner
				ctaLabel='Оставить заявку'
				offer={{
					id: 1,
					title: 'Ремонт под ключ',
					shortTitle: 'repair',
					description: 'Описание',
					tips: 'Советы',
					image: '/design/offerList.webp',
					questions: ['Вопрос 1', 'Вопрос 2'],
				}}
			/>,
		);

		expect(screen.getByText('Ремонт под ключ')).toBeInTheDocument();
		expect(screen.getByText('Вопрос 1')).toBeInTheDocument();
		expect(screen.getByText('Вопрос 2')).toBeInTheDocument();
		expect(screen.getByText('Описание')).toBeInTheDocument();
		expect(screen.getByText('Советы')).toBeInTheDocument();
	});
});
