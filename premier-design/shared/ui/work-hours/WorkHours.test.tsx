/** @jest-environment jsdom */
import {render, screen} from '@testing-library/react';
import WorkHours from './WorkHours';

describe('WorkHours', () => {
	it('shows working hours', () => {
		render(<WorkHours />);
		expect(screen.getByText('Пн-Пт: 09:00 - 18:00')).toBeInTheDocument();
	});
});
