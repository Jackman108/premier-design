/** @jest-environment jsdom */
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { SITE_SOCIAL } from '@shared/constants/company';
import SocialIcons from './SocialIcons';

jest.mock('next/link', () => ({
	__esModule: true,
	default: ({ href, children, ...rest }: { href: string; children: ReactNode }) => (
		<a href={href} {...rest}>
			{children}
		</a>
	),
}));

describe('SocialIcons', () => {
	it('renders social links', () => {
		render(<SocialIcons />);
		expect(screen.getByRole('link', { name: 'Мы в телеграм' })).toHaveAttribute('href', SITE_SOCIAL.telegram);
		expect(screen.getByRole('link', { name: 'Мы в ВКонтакте' })).toHaveAttribute('href', SITE_SOCIAL.vk);
		expect(screen.getByRole('link', { name: 'Мы в Instagram' })).toHaveAttribute('href', SITE_SOCIAL.instagram);
	});
});
