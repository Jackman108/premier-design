/** @jest-environment jsdom */
import { renderHook } from '@testing-library/react';

import { useFallback } from '../useFallback';

describe('useFallback', () => {
	it('returns error node when data is unavailable', () => {
		const { result } = renderHook(() => useFallback(false));
		expect(result.current).not.toBeNull();
	});

	it('returns null when data is available', () => {
		const { result } = renderHook(() => useFallback(true));
		expect(result.current).toBeNull();
	});
});
