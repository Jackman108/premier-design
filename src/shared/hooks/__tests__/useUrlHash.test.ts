/** @jest-environment jsdom */
import { act, renderHook } from '@testing-library/react';
import { useUrlHash } from '../useUrlHash';

describe('useUrlHash', () => {
	it('updates and resets browser hash', () => {
		const replaceStateSpy = jest.spyOn(window.history, 'replaceState');
		const { result } = renderHook(() => useUrlHash());

		act(() => {
			result.current.updateHash('news', 2);
		});
		expect(window.location.hash).toBe('#news-2');

		act(() => {
			result.current.resetHash();
		});
		expect(replaceStateSpy).toHaveBeenCalledWith(null, '', window.location.pathname);
	});
});
