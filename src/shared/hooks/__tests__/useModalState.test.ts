/** @jest-environment jsdom */
import { act, renderHook } from '@testing-library/react';
import { useModalState } from '@shared/hooks/useModalState';

describe('useModalState', () => {
	it('uses false default initial state', () => {
		const { result } = renderHook(() => useModalState());
		expect(result.current.isOpen).toBe(false);
	});

	it('uses custom initial state', () => {
		const { result } = renderHook(() => useModalState(true));
		expect(result.current.isOpen).toBe(true);
	});

	it('toggles modal state', () => {
		const { result } = renderHook(() => useModalState(false));

		act(() => {
			result.current.toggleModal();
		});
		expect(result.current.isOpen).toBe(true);

		act(() => {
			result.current.toggleModal();
		});
		expect(result.current.isOpen).toBe(false);
	});
});
