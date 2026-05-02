/** @jest-environment jsdom */
import { fireEvent, render, screen } from '@testing-library/react';
import type { FeedbackItem } from '@shared/ui/order/interface/FeedbackModal.props';
import FeedbackModal from './FeedbackModal';

jest.mock('@shared/ui/order/ui/FeedbackForm/FeedbackForm', () => ({
	__esModule: true,
	default: () => <div data-testid="feedback-form" />,
}));

describe('FeedbackModal', () => {
	const onSubmit = async (_data: FeedbackItem) => Promise.resolve();

	it('renders dialog and closes by backdrop click', () => {
		const onClose = jest.fn();
		render(<FeedbackModal onClose={onClose} onSubmit={onSubmit} />);

		const dialog = screen.getByRole('dialog');
		expect(dialog).toHaveAttribute('open');

		fireEvent.mouseDown(dialog);
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it('closes via cancel event', () => {
		const onClose = jest.fn();
		render(<FeedbackModal onClose={onClose} onSubmit={onSubmit} />);

		const dialog = screen.getByRole('dialog');
		fireEvent(dialog, new Event('cancel', { bubbles: false, cancelable: true }));

		expect(onClose).toHaveBeenCalledTimes(1);
	});
});
