/** @jest-environment jsdom */
import {fireEvent, render, screen} from '@testing-library/react';
import type {ImgHTMLAttributes} from 'react';
import PhotoViewer from './PhotoViewer';

jest.mock('next/image', () => ({
	__esModule: true,
	// eslint-disable-next-line @next/next/no-img-element
	default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt ?? ''} />,
}));

describe('PhotoViewer', () => {
	it('switches slides and closes via controls', () => {
		const onClose = jest.fn();
		const {container} = render(
			<PhotoViewer images={['/a.png', '/b.png', '/c.png']} currentImage="/a.png" onClose={onClose} />,
		);

		expect(screen.getByText('1 / 3')).toBeInTheDocument();

		fireEvent.keyDown(container.firstChild as HTMLElement, {key: 'ArrowRight'});
		expect(screen.getByText('2 / 3')).toBeInTheDocument();

		fireEvent.keyDown(container.firstChild as HTMLElement, {key: 'ArrowLeft'});
		expect(screen.getByText('1 / 3')).toBeInTheDocument();

		fireEvent.keyDown(container.firstChild as HTMLElement, {
			key: 'Escape',
		});
		expect(onClose).toHaveBeenCalledTimes(1);
	});
});
