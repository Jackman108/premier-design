/** @jest-environment jsdom */
import { render, screen } from '@testing-library/react';
import Address from './Address';

jest.mock('@shared/ui/social-icons/SocialIcons', () => ({
	__esModule: true,
	default: () => <div>SocialIcons</div>,
}));

jest.mock('@shared/ui/phone/Phone', () => ({
	__esModule: true,
	default: () => <div>Phone</div>,
}));

jest.mock('@features/address/ui/GoogleMap/GoogleMap', () => ({
	__esModule: true,
	default: () => <div>GoogleMap</div>,
}));

jest.mock('@shared/ui/work-hours/WorkHours', () => ({
	__esModule: true,
	default: () => <div>WorkHours</div>,
}));

describe('Address', () => {
	it('renders address contacts sections', () => {
		render(<Address />);

		expect(screen.getByText('Позвоните нам:')).toBeInTheDocument();
		expect(screen.getByText('Адрес и режим работы:')).toBeInTheDocument();
		expect(screen.getByText('Мы в соц. сетях:')).toBeInTheDocument();
		expect(screen.getByText('GoogleMap')).toBeInTheDocument();
	});
});
