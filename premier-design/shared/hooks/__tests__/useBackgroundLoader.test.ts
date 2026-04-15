/** @jest-environment jsdom */
import {renderHook} from '@testing-library/react';
import {useBackgroundLoader} from '../useBackgroundLoader';

describe('useBackgroundLoader', () => {
	it('sets body background after image load', () => {
		let imageOnload: null | (() => void) = null;
		class MockImage {
			set src(_value: string) {
				// no-op for test
			}
			set onload(cb: () => void) {
				imageOnload = cb;
			}
		}
		Object.defineProperty(window, 'Image', {
			writable: true,
			value: MockImage,
		});
		Object.defineProperty(globalThis, 'Image', {
			writable: true,
			value: MockImage,
		});

		renderHook(() => useBackgroundLoader());
		expect(imageOnload).not.toBeNull();

		imageOnload?.();
		expect(document.body.style.backgroundImage).toBe('url("/tools.svg")');
		expect(document.body.style.backgroundRepeat).toBe('repeat');
		expect(document.body.style.backgroundSize).toBe('18%');
	});
});
