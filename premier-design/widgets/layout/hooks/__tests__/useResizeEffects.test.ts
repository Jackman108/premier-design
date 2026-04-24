/** @jest-environment jsdom */
import {act, renderHook} from '@testing-library/react';
import useResizeEffects from '../useResizeEffects';
import useMobileMenu from '../useMobileMenu';

jest.mock('../useMobileMenu', () => ({
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

	it('combines mobile menu state with viewport mobile flag', () => {
		Object.defineProperty(document.documentElement, 'clientWidth', {
			configurable: true,
			get: () => 1200,
		});
		const {result} = renderHook(() => useResizeEffects());
		expect(result.current.isMobile).toBe(false);
		expect(result.current.isMobileMenuOpen).toBe(false);

		Object.defineProperty(document.documentElement, 'clientWidth', {
			configurable: true,
			get: () => 640,
		});
		act(() => {
			window.dispatchEvent(new Event('resize'));
		});

		expect(result.current.isMobile).toBe(true);
	});
});
