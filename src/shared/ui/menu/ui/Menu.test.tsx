/** @jest-environment jsdom */
import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { LocaleProvider } from '@shared/i18n';
import type { SiteLocale } from '@shared/site-data/site-locale';

import Menu from './Menu';

jest.mock('next/navigation', () => ({
	useRouter: () => ({ refresh: jest.fn() }),
}));

jest.mock('@shared/lib/server-actions/set-site-locale', () => ({
	setSiteLocaleCookie: jest.fn(),
}));

jest.mock('next/link', () => ({
	__esModule: true,
	default: ({
		href,
		onClick,
		children,
		className,
		'aria-label': ariaLabel,
	}: {
		href: string;
		onClick?: () => void;
		children: ReactNode;
		className?: string;
		'aria-label'?: string;
	}) => (
		<a href={href} onClick={onClick} className={className} aria-label={ariaLabel}>
			{children}
		</a>
	),
}));

function renderWithLocale(locale: SiteLocale, ui: React.ReactElement) {
	return render(<LocaleProvider initialLocale={locale}>{ui}</LocaleProvider>);
}

describe('Menu', () => {
	it('renders menu items and uses mobile behavior (ru)', () => {
		const toggleMobileMenu = jest.fn();
		renderWithLocale(
			'ru',
			<Menu
				menuStyle="mobile"
				isMobileMenuOpen
				toggleMobileMenu={toggleMobileMenu}
				menu={[
					{ id: 1, title: 'Home', ruTitle: 'Главная' },
					{ id: 2, title: 'Design', ruTitle: 'Дизайн' },
				]}
			/>,
		);

		const home = screen.getByRole('link', { name: 'Перейти к разделу Главная' });
		const design = screen.getByRole('link', { name: 'Перейти к разделу Дизайн' });

		expect(home).toHaveAttribute('href', '/');
		expect(design).toHaveAttribute('href', '/design');

		fireEvent.click(design);
		expect(toggleMobileMenu).toHaveBeenCalledTimes(1);
		expect(screen.getByRole('navigation')).toHaveAttribute('id', 'site-mobile-nav');
	});

	it('uses English labels when locale is en', () => {
		renderWithLocale(
			'en',
			<Menu
				menuStyle="mobile"
				isMobileMenuOpen
				toggleMobileMenu={jest.fn()}
				menu={[
					{ id: 1, title: 'Home', ruTitle: 'Главная' },
					{ id: 2, title: 'Design', ruTitle: 'Дизайн' },
				]}
			/>,
		);

		expect(screen.getByRole('link', { name: 'Go to Home' })).toHaveAttribute('href', '/');
		expect(screen.getByRole('link', { name: 'Go to Design' })).toHaveAttribute('href', '/design');
		expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Main navigation');
	});
});
