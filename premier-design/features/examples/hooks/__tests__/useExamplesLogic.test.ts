/** @jest-environment jsdom */
import { act, renderHook } from '@testing-library/react';
import { useExamplesLogic } from '../useExamplesLogic';
import { useModalState } from '@shared/hooks/useModalState';
import { useViewportMobile } from '@shared/hooks/useViewportMobile';

jest.mock('@shared/hooks/useModalState', () => ({
	useModalState: jest.fn(),
}));

jest.mock('@shared/hooks/useViewportMobile', () => ({
	useViewportMobile: jest.fn(),
}));

const mockedUseModalState = jest.mocked(useModalState);
const mockedUseViewportMobile = jest.mocked(useViewportMobile);

describe('useExamplesLogic', () => {
	const openModal = jest.fn();
	const closeModal = jest.fn();
	const toggleModal = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		mockedUseModalState.mockReturnValue({
			isOpen: false,
			openModal,
			closeModal,
			toggleModal,
		});
		mockedUseViewportMobile.mockReturnValue({
			isMobile: true,
		});
	});

	it('opens and closes photo viewer for card images', () => {
		const cards = [
			{ id: 1, images: ['/a.png', '/b.png'] },
			{ id: 2, images: [] },
		] as never;
		const { result } = renderHook(() => useExamplesLogic(cards));

		expect(result.current.memoizedCards).toHaveLength(2);
		expect(result.current.slidesPerView).toBe(3);
		expect(result.current.isMobile).toBe(true);

		act(() => {
			result.current.handleCardClick(cards[0]);
		});
		expect(openModal).toHaveBeenCalledTimes(1);
		expect(result.current.selectedImage).toBe('/a.png');
		expect(result.current.viewerImages).toEqual(['/a.png', '/b.png']);

		act(() => {
			result.current.closeViewer();
		});
		expect(closeModal).toHaveBeenCalledTimes(1);
		expect(result.current.selectedImage).toBeNull();
		expect(result.current.viewerImages).toEqual([]);
	});
});
