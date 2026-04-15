/** @jest-environment jsdom */
import {renderHook} from '@testing-library/react';
import {useRouter} from 'next/router';
import {useFallback} from '../useFallback';

jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));

const mockedUseRouter = jest.mocked(useRouter);

describe('useFallback', () => {
	it('returns loader node when page is in fallback mode', () => {
		mockedUseRouter.mockReturnValue({isFallback: true} as never);
		const {result} = renderHook(() => useFallback(true));
		expect(result.current).not.toBeNull();
	});

	it('returns error node when data is unavailable', () => {
		mockedUseRouter.mockReturnValue({isFallback: false} as never);
		const {result} = renderHook(() => useFallback(false));
		expect(result.current).not.toBeNull();
	});

	it('returns null when data is available and not fallback', () => {
		mockedUseRouter.mockReturnValue({isFallback: false} as never);
		const {result} = renderHook(() => useFallback(true));
		expect(result.current).toBeNull();
	});
});
