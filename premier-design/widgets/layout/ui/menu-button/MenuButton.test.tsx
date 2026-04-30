/** @jest-environment jsdom */
import { fireEvent, render, screen } from '@testing-library/react';
import MenuButton from './MenuButton';

describe('MenuButton', () => {
	it('renders closed state and triggers toggle handler', () => {
		const toggleMobileMenu = jest.fn();
		render(<MenuButton isMobileMenuOpen={false} toggleMobileMenu={toggleMobileMenu} />);

		const button = screen.getByRole('button', { name: 'Открыть или закрыть меню' });
		expect(button).toHaveAttribute('aria-expanded', 'false');
		expect(button).toHaveAttribute('aria-controls', 'site-mobile-nav');

		fireEvent.click(button);
		expect(toggleMobileMenu).toHaveBeenCalledTimes(1);
	});

	it('adds active class when mobile menu is open', () => {
		const { rerender } = render(<MenuButton isMobileMenuOpen={false} toggleMobileMenu={jest.fn()} />);
		const button = screen.getByRole('button', { name: 'Открыть или закрыть меню' });
		expect(button).not.toHaveClass('active');

		rerender(<MenuButton isMobileMenuOpen toggleMobileMenu={jest.fn()} />);
		expect(button).toHaveClass('active');
		expect(button).toHaveAttribute('aria-expanded', 'true');
	});
});
