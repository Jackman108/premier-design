/** @jest-environment jsdom */
import {act, renderHook} from '@testing-library/react';
import {useExamplesLogic} from '../useExamplesLogic';
import {useModalState} from '@shared/hooks/useModalState';
import useResizeEffects from '@shared/hooks/useResizeEffects';

jest.mock('@shared/hooks/useModalState', () => ({
	useModalState: jest.fn(),
}));

jest.mock('@shared/hooks/useResizeEffects', () => ({
	__esModule: true,
	default: jest.fn(),
}));

const mockedUseModalState = jest.mocked(useModalState);
const mockedUseResizeEffects = jest.mocked(useResizeEffects);

describe('useExamplesLogic', () => {
	const openModal = jest.fn();
	const closeModal = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		mockedUseModalState.mockReturnValue({
			isOpen: false,
			openModal,
			closeModal,
		});
		mockedUseResizeEffects.mockReturnValue({
			isMobileMenuOpen: false,
			toggleMobileMenu: jest.fn(),
			isMobile: true,
		});
	});

	it('opens and closes photo viewer for card images', () => {
		const cards = [
			{id: 1, images: ['/a.png', '/b.png']},
			{id: 2, images: []},
		] as never;
		const {result} = renderHook(() => useExamplesLogic(cards));

		expect(result.current.memoizedCards).toHaveLength(2);
		expect(result.current.slidesPerView).toBe(3);
		expect(result.current.isMobile).toBe(true);

		act(() => {
			result.current.handleCardClick(cards[0]);
		});
		expect(openModal).toHaveBeenCalledTimes(1);
		expect(result.current.selectedImage).toBe('/a.png');

		act(() => {
			result.current.closeViewer();
		});
		expect(closeModal).toHaveBeenCalledTimes(1);
		expect(result.current.selectedImage).toBeNull();
	});
});
