/** @jest-environment jsdom */
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import Phone from './Phone';

jest.mock('next/link', () => ({
	__esModule: true,
	default: ({ href, children, ...rest }: { href: string; children: ReactNode }) => (
		<a href={href} {...rest}>
			{children}
		</a>
	),
}));

describe('Phone', () => {
	it('renders phone link', () => {
		render(<Phone />);
		expect(screen.getByRole('link', { name: 'Позвонить' })).toHaveAttribute('href', 'tel:+375291942881');
	});
});
