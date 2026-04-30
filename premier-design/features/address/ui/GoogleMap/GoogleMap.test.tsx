/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import GoogleMap from './GoogleMap';

describe('GoogleMap', () => {
	it('renders map iframe', () => {
		const { container } = render(<GoogleMap />);
		const iframe = container.querySelector('iframe');
		expect(iframe).not.toBeNull();
		expect(iframe).toHaveAttribute('loading', 'lazy');
	});
});
