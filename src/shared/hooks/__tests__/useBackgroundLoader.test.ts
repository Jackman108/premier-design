/** @jest-environment jsdom */
import { renderHook } from '@testing-library/react';
import { useBackgroundLoader } from '../useBackgroundLoader';

describe('useBackgroundLoader', () => {
	it('sets body background after image load', () => {
		const imageOnloadRef = { current: null as (() => void) | null };

		class MockImage {
			set src(_value: string) {
				// no-op
			}
			set onload(cb: () => void) {
				imageOnloadRef.current = cb;
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
		expect(imageOnloadRef.current).not.toBeNull();

		// ✅ TS видит, что .current может быть функцией
		imageOnloadRef.current?.();

		expect(document.body.style.backgroundImage).toContain('url("/tools.svg")');
		expect(document.body.style.backgroundRepeat).toBe('repeat');
		expect(document.body.style.backgroundSize).toBe('18%');
		expect(document.body.style.backgroundAttachment).toBe('fixed');
	});
});
