/** @jest-environment jsdom */
import {act, renderHook} from '@testing-library/react';
import useResizeEffects from '../useResizeEffects';
import useMobileMenu from '@widgets/layout/hooks/useMobileMenu';

jest.mock('@widgets/layout/hooks/useMobileMenu', () => ({
	__esModule: true,
	default: jest.fn(),
}));

const mockedUseMobileMenu = jest.mocked(useMobileMenu);

describe('useResizeEffects', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockedUseMobileMenu.mockReturnValue({
			isMobileMenuOpen: false,
			toggleMobileMenu: jest.fn(),
		});
	});

	it('tracks mobile state based on client width and resize events', () => {
		Object.defineProperty(document.documentElement, 'clientWidth', {
			configurable: true,
			get: () => 1200,
		});
		const {result} = renderHook(() => useResizeEffects());
		expect(result.current.isMobile).toBe(false);

		Object.defineProperty(document.documentElement, 'clientWidth', {
			configurable: true,
			get: () => 640,
		});
		act(() => {
			window.dispatchEvent(new Event('resize'));
		});

		expect(result.current.isMobile).toBe(true);
		expect(result.current.isMobileMenuOpen).toBe(false);
	});
});
