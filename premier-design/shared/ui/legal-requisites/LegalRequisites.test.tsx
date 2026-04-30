/** @jest-environment jsdom */
import { render, screen } from '@testing-library/react';
import LegalRequisites from './LegalRequisites';
import { SITE_OPERATOR } from '@shared/constants/company';

describe('LegalRequisites (Belarusian compliance footer block)', () => {
	it('renders mandatory IP info from SITE_OPERATOR (full name, address, email, UNP when set)', () => {
		render(<LegalRequisites />);

		expect(screen.getByText(SITE_OPERATOR.legalEntity.fullName)).toBeInTheDocument();
		expect(screen.getByText(SITE_OPERATOR.address.full)).toBeInTheDocument();
		expect(screen.getByText(SITE_OPERATOR.publicEmail)).toBeInTheDocument();
		if (SITE_OPERATOR.legalEntity.unp) {
			expect(screen.getByText('УНП')).toBeInTheDocument();
			expect(screen.getByText(SITE_OPERATOR.legalEntity.unp)).toBeInTheDocument();
		}
		if (SITE_OPERATOR.legalEntity.registrationAuthority && SITE_OPERATOR.legalEntity.registrationDate) {
			expect(screen.getByText('Регистрация')).toBeInTheDocument();
			expect(
				screen.getByText(
					`${SITE_OPERATOR.legalEntity.registrationAuthority}, ${SITE_OPERATOR.legalEntity.registrationDate}`,
				),
			).toBeInTheDocument();
		}
	});

	it('hides bank details when not yet set (null)', () => {
		render(<LegalRequisites />);

		if (SITE_OPERATOR.bankDetails === null) {
			expect(screen.queryByText('Банк')).not.toBeInTheDocument();
			expect(screen.queryByText('Счёт')).not.toBeInTheDocument();
		}
	});
});
