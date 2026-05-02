/** @jest-environment jsdom */
import { render, screen } from '@testing-library/react';
import type { ImgHTMLAttributes } from 'react';
import ArrowButton from './ArrowButton';

jest.mock('next/image', () => ({
	__esModule: true,
	// eslint-disable-next-line @next/next/no-img-element
	default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt ?? ''} />,
}));

jest.mock('../../../../public/arrow.svg', () => ({
	__esModule: true,
	default: '/arrow.svg',
}));

describe('ArrowButton', () => {
	it('renders left and right arrow buttons', () => {
		render(<ArrowButton />);
		expect(screen.getByRole('button', { name: 'Стрелка влево' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Стрелка вправо' })).toBeInTheDocument();
	});
});
