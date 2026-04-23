/** @jest-environment jsdom */
import {fireEvent, render, screen} from '@testing-library/react';
import type {CostingCardProps} from '@shared/interface/CostingCard.props';
import CalculatorModal from './CalculatorModal';

jest.mock('@shared/ui/calculator-modal/hooks/useCalculatorHandlers', () => ({
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
		handleInputChange: jest.fn(),
		handleTypeChange: jest.fn(),
		handleCalculate: jest.fn(),
	}),
}));

jest.mock('@shared/ui/calculator-modal/ui/ModalTabs/ModalTabs', () => ({
	__esModule: true,
	default: () => <div data-testid="modal-tabs" />,
}));

jest.mock('@shared/ui/calculator-modal/ui/CollapsibleContainer/CollapsibleContainer', () => ({
	__esModule: true,
	default: () => <div data-testid="collapsible-container" />,
}));

jest.mock('@shared/ui/calculator-modal/ui/CostInput/CostInput', () => ({
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

describe('CalculatorModal', () => {
	const card: CostingCardProps = {
		id: 1,
		title: 'Card 1',
		image: '/img.png',
	};
	const cards: CostingCardProps[] = [card];

	it('renders as dialog and closes via backdrop click', () => {
		const onClose = jest.fn();
		render(<CalculatorModal cards={cards} card={card} onClose={onClose} />);

		const dialog = screen.getByRole('dialog', {name: 'Рассчитайте стоимость Вашего ремонта'});
		expect(dialog).toHaveAttribute('open');

		fireEvent.mouseDown(dialog);
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('closes via cancel event', () => {
		const onClose = jest.fn();
		render(<CalculatorModal cards={cards} card={card} onClose={onClose} />);

		const dialog = screen.getByRole('dialog', {name: 'Рассчитайте стоимость Вашего ремонта'});
		fireEvent(dialog, new Event('cancel', {bubbles: false, cancelable: true}));

		expect(onClose).toHaveBeenCalledTimes(1);
	});
});
