/** @jest-environment jsdom */
import { fireEvent, render, screen } from '@testing-library/react';
import type { CostingCardProps } from '@entities/costing';
import EstimateModal from './EstimateModal';

jest.mock('@shared/ui/estimate-modal/hooks/useEstimateModalHandlers', () => ({
	__esModule: true,
	default: () => ({
		selectedTab: 0,
		inputValue: '10',
		isLoading: false,
		result: 120,
		error: '',
		propertyType: 'flat',
		repairType: 'cosmetic',
		serviceType: 'all',
		inputValueAsNumber: 10,
		handleTabChange: jest.fn(),
		handleObjectCardIdSelect: jest.fn(),
		handleInputChange: jest.fn(),
		handleTypeChange: jest.fn(),
		handleCalculate: jest.fn(),
	}),
}));

jest.mock('@shared/ui/estimate-modal/ui/CollapsibleContainer/CollapsibleContainer', () => ({
	__esModule: true,
	default: () => <div data-testid="collapsible-container" />,
}));

jest.mock('@shared/ui/estimate-modal/ui/CostInput/CostInput', () => ({
	__esModule: true,
	default: () => <div data-testid="cost-input" />,
}));

jest.mock('@shared/ui/logo/Logo', () => ({
	__esModule: true,
	default: () => <div data-testid="logo" />,
}));

jest.mock('@shared/ui/preloader/Preloader/Preloader', () => ({
	__esModule: true,
	default: () => <div data-testid="preloader" />,
}));

describe('EstimateModal', () => {
	const card: CostingCardProps = {
		id: 1,
		title: 'Card 1',
		image: '/img.png',
	};
	const cards: CostingCardProps[] = [card];

	it('renders as dialog and closes via backdrop click', () => {
		const onClose = jest.fn();
		render(<EstimateModal cards={cards} card={card} onClose={onClose} />);

		const dialog = screen.getByRole('dialog', { name: 'Рассчитайте стоимость Вашего ремонта' });
		expect(dialog).toHaveAttribute('open');

		fireEvent.mouseDown(dialog);
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('closes via cancel event', () => {
		const onClose = jest.fn();
		render(<EstimateModal cards={cards} card={card} onClose={onClose} />);

		const dialog = screen.getByRole('dialog', { name: 'Рассчитайте стоимость Вашего ремонта' });
		fireEvent(dialog, new Event('cancel', { bubbles: false, cancelable: true }));

		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('closes via Escape key fallback', () => {
		const onClose = jest.fn();
		render(<EstimateModal cards={cards} card={card} onClose={onClose} />);

		const dialog = screen.getByRole('dialog', { name: 'Рассчитайте стоимость Вашего ремонта' });
		fireEvent.keyDown(dialog, { key: 'Escape' });

		expect(onClose).toHaveBeenCalledTimes(1);
	});
});
