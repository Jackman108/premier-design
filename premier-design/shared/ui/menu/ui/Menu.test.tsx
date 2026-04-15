/** @jest-environment jsdom */
import {fireEvent, render, screen} from '@testing-library/react';
import type {ReactNode} from 'react';
import Menu from './Menu';

jest.mock('next/link', () => ({
	__esModule: true,
	default: ({
		href,
		onClick,
		children,
		...rest
	}: {
		href: string;
		onClick?: () => void;
		children: ReactNode;
	}) => (
		<a href={href} onClick={onClick} {...rest}>
			{children}
		</a>
	),
}));

describe('Menu', () => {
	it('renders menu items and uses mobile behavior', () => {
		const toggleMobileMenu = jest.fn();
		render(
			<Menu
				menuStyle="mobile"
				isMobileMenuOpen
				toggleMobileMenu={toggleMobileMenu}
				menu={[
					{id: 1, title: 'Home', ruTitle: 'Главная'},
					{id: 2, title: 'Design', ruTitle: 'Дизайн'},
				]}
			/>,
		);

		const home = screen.getByRole('link', {name: 'Перейти к разделу Главная'});
		const design = screen.getByRole('link', {name: 'Перейти к разделу Дизайн'});

		expect(home).toHaveAttribute('href', '/');
		expect(design).toHaveAttribute('href', '/design');

		fireEvent.click(design);
		expect(toggleMobileMenu).toHaveBeenCalledTimes(1);
		expect(screen.getByRole('navigation')).toHaveAttribute('id', 'site-mobile-nav');
	});
});
