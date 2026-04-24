/** @jest-environment jsdom */
import {act, renderHook} from '@testing-library/react';
import type {KeyboardEvent} from 'react';
import {useCostingCardLogic} from '@features/coasting/hooks/useCostingCardLogic';

jest.mock('@shared/hooks/useResizeEffects', () => ({
	__esModule: true,
	default: () => ({
		isMobileMenuOpen: false,
		toggleMobileMenu: jest.fn(),
		isMobile: false,
	}),
}));

const sampleCard = {id: 1, title: 'Card A', image: '/img.jpg'};

describe('useCostingCardLogic', () => {
	it('exposes cards and slider settings', () => {
		const {result} = renderHook(() => useCostingCardLogic([sampleCard]));

		expect(result.current.memoizedCards).toEqual([sampleCard]);
		expect(result.current.slidesPerView).toBe(3);
		expect(result.current.isModalOpen).toBe(false);
		expect(result.current.selectedCard).toBeNull();
	});

	it('opens modal and selects card on handleCardClick', () => {
		const {result} = renderHook(() => useCostingCardLogic([sampleCard]));

		act(() => {
			result.current.handleCardClick(sampleCard);
		});

		expect(result.current.isModalOpen).toBe(true);
		expect(result.current.selectedCard).toEqual(sampleCard);
	});

	it('handles Enter and Space on handleKeyDown', () => {
		const {result} = renderHook(() => useCostingCardLogic([sampleCard]));
		const preventDefault = jest.fn();

		act(() => {
			result.current.handleKeyDown(
				{key: 'Enter', preventDefault} as unknown as KeyboardEvent,
				sampleCard,
			);
		});
		expect(preventDefault).toHaveBeenCalled();
		expect(result.current.selectedCard).toEqual(sampleCard);

		act(() => {
			result.current.closeModal();
		});

		act(() => {
			result.current.handleKeyDown(
				{key: ' ', preventDefault} as unknown as KeyboardEvent,
				sampleCard,
			);
		});
		expect(result.current.isModalOpen).toBe(true);
	});

	it('closes modal from closeModal', () => {
		const {result} = renderHook(() => useCostingCardLogic([sampleCard]));

		act(() => {
			result.current.handleCardClick(sampleCard);
		});
		act(() => {
			result.current.closeModal();
		});

		expect(result.current.isModalOpen).toBe(false);
	});
});
