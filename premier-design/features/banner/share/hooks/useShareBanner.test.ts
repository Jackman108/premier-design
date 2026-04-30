/** @jest-environment jsdom */
import { act, renderHook, waitFor } from '@testing-library/react';
import { useShareBanner } from './useShareBanner';

describe('useShareBanner', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('starts open and allows closing', () => {
		const { result } = renderHook(() => useShareBanner());
		expect(result.current.isClosed).toBe(false);

		act(() => {
			result.current.handleClose();
		});
		expect(result.current.isClosed).toBe(true);
		expect(localStorage.getItem('shareBannerClosed')).toBe('true');
	});

	it('reads closed state from localStorage', async () => {
		localStorage.setItem('shareBannerClosed', 'true');
		const { result } = renderHook(() => useShareBanner());

		await waitFor(() => {
			expect(result.current.isClosed).toBe(true);
		});
	});
});
