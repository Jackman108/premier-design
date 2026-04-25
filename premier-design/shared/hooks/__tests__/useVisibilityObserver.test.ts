/** @jest-environment jsdom */
import {renderHook} from '@testing-library/react';
import {useVisibilityObserver} from '../useVisibilityObserver';

describe('useVisibilityObserver', () => {
	it('observes prefixed elements and resets url for visible entries', () => {
		const unobserve = jest.fn();
		const observe = jest.fn();
		const replaceStateSpy = jest.spyOn(window.history, 'replaceState');

		const observedElements = [document.createElement('div'), document.createElement('div')];
		observedElements[0].id = 'news-0';
		observedElements[1].id = 'news-1';
		jest.spyOn(document, 'querySelectorAll').mockReturnValue(observedElements as never);

		class MockIntersectionObserver {
			private readonly cb: IntersectionObserverCallback;
			constructor(cb: IntersectionObserverCallback) {
				this.cb = cb;
			}
			observe = observe;
			unobserve = unobserve;
			trigger = (entries: IntersectionObserverEntry[]) => this.cb(entries, this as never);
		}

		const instanceRef: {current: MockIntersectionObserver | null} = {current: null};
		Object.defineProperty(window, 'IntersectionObserver', {
			writable: true,
			value: class {
				constructor(cb: IntersectionObserverCallback) {
					instanceRef.current = new MockIntersectionObserver(cb);
					return instanceRef.current as never;
				}
			},
		});

		const {unmount} = renderHook(() => useVisibilityObserver('news-'));
		expect(observe).toHaveBeenCalledTimes(2);

		instanceRef.current?.trigger([
			{
				isIntersecting: true,
				target: observedElements[0],
			} as never,
		]);
		expect(replaceStateSpy).toHaveBeenCalledWith(null, '', window.location.pathname);

		unmount();
		expect(unobserve).toHaveBeenCalledTimes(2);
	});
});
