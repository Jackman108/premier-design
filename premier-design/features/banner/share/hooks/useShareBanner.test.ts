/** @jest-environment jsdom */
import {act, renderHook} from '@testing-library/react';
import {useShareBanner} from './useShareBanner';

describe('useShareBanner', () => {
	beforeEach(() => {
		localStorage.clear();
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('marks banner ready and allows closing', () => {
		const {result} = renderHook(() => useShareBanner());
		expect(result.current.isReady).toBe(false);
		expect(result.current.isClosed).toBe(false);

		act(() => {
			jest.advanceTimersByTime(100);
		});
		expect(result.current.isReady).toBe(true);

		act(() => {
			result.current.handleClose();
		});
		expect(result.current.isClosed).toBe(true);
		expect(localStorage.getItem('shareBannerClosed')).toBe('true');
	});

	it('reads closed state from localStorage', () => {
		localStorage.setItem('shareBannerClosed', 'true');
		const {result} = renderHook(() => useShareBanner());

		act(() => {
			queueMicrotask(() => undefined);
			jest.advanceTimersByTime(0);
		});
		expect(result.current.isClosed).toBe(true);
	});
});
