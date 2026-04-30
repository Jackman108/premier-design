/** @jest-environment jsdom */
import { render, screen } from '@testing-library/react';
import WorkHours from './WorkHours';
import { SITE_OPERATOR } from '@shared/constants/company';

describe('WorkHours', () => {
	it('shows working hours from SITE_OPERATOR (single source of truth)', () => {
		render(<WorkHours />);
		expect(screen.getByText(SITE_OPERATOR.workHours.summary)).toBeInTheDocument();
	});
});
