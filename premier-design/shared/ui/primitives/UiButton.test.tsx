/** @jest-environment jsdom */
import {render, screen} from '@testing-library/react';
import {UiButton} from './UiButton';

describe('UiButton', () => {
	it('renders with default props', () => {
		render(<UiButton>Отправить</UiButton>);
		const button = screen.getByRole('button', {name: 'Отправить'});

		expect(button).toHaveAttribute('type', 'button');
		expect(button).toHaveClass('root');
		expect(button).toHaveClass('primary');
	});

	it('applies selected variant and custom class', () => {
		render(
			<UiButton type="submit" variant="secondary" className="extra-class">
				Сохранить
			</UiButton>,
		);
		const button = screen.getByRole('button', {name: 'Сохранить'});

		expect(button).toHaveAttribute('type', 'submit');
		expect(button).toHaveClass('root');
		expect(button).toHaveClass('secondary');
		expect(button).toHaveClass('extra-class');
	});
});
