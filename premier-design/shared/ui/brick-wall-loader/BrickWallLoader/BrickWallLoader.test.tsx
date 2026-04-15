/** @jest-environment jsdom */
import {act, render} from '@testing-library/react';
import BrickWallLoader from './BrickWallLoader';

describe('BrickWallLoader', () => {
	it('starts animation and renders wall container', () => {
		jest.useFakeTimers();
		const {container} = render(<BrickWallLoader />);

		expect(container.firstChild).toHaveStyle({display: 'none'});
		act(() => {
			jest.advanceTimersByTime(500);
		});
		expect(container.firstChild).toHaveStyle({display: 'block'});

		jest.useRealTimers();
	});
});
