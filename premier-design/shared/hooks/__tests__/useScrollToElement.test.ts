/** @jest-environment jsdom */
import {act, renderHook} from '@testing-library/react';
import {useScrollToElement} from '@shared/hooks/useScrollToElement';

describe('useScrollToElement', () => {
	it('scrolls element into view when present', () => {
		const scrollIntoView = jest.fn();
		const fakeEl = {scrollIntoView} as unknown as Element;
		const querySpy = jest.spyOn(document, 'querySelector').mockReturnValue(fakeEl);

		const {result} = renderHook(() => useScrollToElement());

		act(() => {
			result.current.scrollToElement('my-block');
		});

		expect(querySpy).toHaveBeenCalledWith('#my-block');
		expect(scrollIntoView).toHaveBeenCalledWith({behavior: 'smooth'});

		querySpy.mockRestore();
	});

	it('does not throw when element is missing', () => {
		const querySpy = jest.spyOn(document, 'querySelector').mockReturnValue(null);

		const {result} = renderHook(() => useScrollToElement());

		expect(() => {
			act(() => {
				result.current.scrollToElement('missing');
			});
		}).not.toThrow();

		querySpy.mockRestore();
	});

	it('exposes scrollToRef', () => {
		const {result} = renderHook(() => useScrollToElement());
		expect(result.current.scrollToRef).toBeDefined();
		expect(result.current.scrollToRef.current).toBeNull();
	});
});
