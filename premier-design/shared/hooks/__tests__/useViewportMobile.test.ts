/** @jest-environment jsdom */
import {act, renderHook} from '@testing-library/react';
import {useViewportMobile} from '../useViewportMobile';

describe('useViewportMobile', () => {
	it('tracks mobile state based on client width and resize events', () => {
		Object.defineProperty(document.documentElement, 'clientWidth', {
			configurable: true,
			get: () => 1200,
		});
		const {result} = renderHook(() => useViewportMobile());
		expect(result.current.isMobile).toBe(false);

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
