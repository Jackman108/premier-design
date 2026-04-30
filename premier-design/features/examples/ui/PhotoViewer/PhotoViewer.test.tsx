/** @jest-environment jsdom */
import { fireEvent, render, screen } from '@testing-library/react';
import type { ImgHTMLAttributes } from 'react';
import PhotoViewer from './PhotoViewer';

jest.mock('next/image', () => ({
	__esModule: true,
	// eslint-disable-next-line @next/next/no-img-element
	default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt ?? ''} />,
}));

describe('PhotoViewer', () => {
	it('switches slides and closes via controls', () => {
		const onClose = jest.fn();
		render(<PhotoViewer images={['/a.png', '/b.png', '/c.png']} currentImage="/a.png" onClose={onClose} />);

		const dialog = screen.getByRole('dialog', { name: 'Просмотр примеров работ' });
		expect(screen.getByText('1 / 3')).toBeInTheDocument();

		fireEvent.keyDown(dialog, { key: 'ArrowRight' });
		expect(screen.getByText('2 / 3')).toBeInTheDocument();

		fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
		expect(screen.getByText('1 / 3')).toBeInTheDocument();

		fireEvent.keyDown(dialog, { key: 'Escape' });
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('closes when clicking scrim button', () => {
		const onClose = jest.fn();
		render(<PhotoViewer images={['/a.png']} currentImage="/a.png" onClose={onClose} />);

		fireEvent.click(screen.getByRole('button', { name: 'Закрыть просмотр' }));
		expect(onClose).toHaveBeenCalledTimes(1);
	});
});
