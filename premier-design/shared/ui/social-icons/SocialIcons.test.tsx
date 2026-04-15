/** @jest-environment jsdom */
import {render, screen} from '@testing-library/react';
import type {ReactNode} from 'react';
import SocialIcons from './SocialIcons';

jest.mock('next/link', () => ({
	__esModule: true,
	default: ({href, children, ...rest}: {href: string; children: ReactNode}) => (
		<a href={href} {...rest}>
			{children}
		</a>
	),
}));

describe('SocialIcons', () => {
	it('renders social links', () => {
		render(<SocialIcons />);
		expect(screen.getByRole('link', {name: 'Мы в телеграм'})).toHaveAttribute('href', 'https://t.me/PremiumInterior');
		expect(screen.getByRole('link', {name: 'Мы в вконтакте'})).toHaveAttribute(
			'href',
			'https://vk.com/premium_interior_zhl',
		);
		expect(screen.getByRole('link', {name: 'Мы в инстаграм'})).toHaveAttribute(
			'href',
			'https://instagram.com/proremont_zhl',
		);
	});
});
