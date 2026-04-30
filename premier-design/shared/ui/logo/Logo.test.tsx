/** @jest-environment jsdom */
import { render, screen } from '@testing-library/react';
import React from 'react';
import type { ImgHTMLAttributes, ReactNode } from 'react';
import Logo from './Logo';

jest.mock('next/link', () => ({
	__esModule: true,
	default: ({ href, children, ...rest }: { href: string; children: ReactNode }) => (
		<a href={href} {...rest}>
			{children}
		</a>
	),
}));

jest.mock('next/image', () => ({
	__esModule: true,
	default: ({ priority: _priority, ...props }: ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) =>
		React.createElement('img', { ...props, alt: props.alt ?? '' }),
}));

jest.mock('../../../public/logo.svg', () => ({
	__esModule: true,
	default: '/logo.svg',
}));

describe('Logo', () => {
	it('renders home link with image', () => {
		render(<Logo />);
		expect(screen.getByRole('link', { name: 'Перейти на главную' })).toHaveAttribute('href', '/');
		expect(screen.getByAltText('Logo')).toBeInTheDocument();
	});
});
