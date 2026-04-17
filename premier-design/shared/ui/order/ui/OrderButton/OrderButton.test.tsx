/** @jest-environment jsdom */
import {fireEvent, render, screen} from '@testing-library/react';
import {useFeedback} from '@shared/ui/order/hooks/useFeedback';
import OrderButton from './OrderButton';

jest.mock('@shared/ui/order/hooks/useFeedback', () => ({
	useFeedback: jest.fn(),
}));

jest.mock('@shared/ui/order/ui/FeedbackModal/FeedbackModal', () => ({
	__esModule: true,
	default: ({onClose}: {onClose: () => void}) => (
		<div>
			<div data-testid="feedback-modal">feedback-modal</div>
			<button type="button" onClick={onClose}>
				close-modal
			</button>
		</div>
	),
}));

jest.mock('@features/buttons-panel/ui/PanelButton/PanelButton', () => ({
	__esModule: true,
	default: ({onClick, text}: {onClick: () => void; text: string}) => (
		<button type="button" onClick={onClick} aria-label={text}>
			{text}
		</button>
	),
}));

const mockedUseFeedback = jest.mocked(useFeedback);

describe('OrderButton', () => {
	const openModal = jest.fn();
	const closeModal = jest.fn();
	const handleSubmit = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		mockedUseFeedback.mockReturnValue({
			isOpen: false,
			openModal,
			closeModal,
			handleSubmit,
			error: '',
		});
	});

	it('renders regular button and opens modal on mouse down', () => {
		render(<OrderButton buttonStyle="button-black" buttonData="Оставить заявку" />);
		const button = screen.getByRole('button', {name: 'Сделать заказ'});

		fireEvent.mouseDown(button);
		expect(openModal).toHaveBeenCalledTimes(1);
	});

	it('renders panel button variation when panel data is provided', () => {
		render(
			<OrderButton
				buttonStyle="button-panel"
				buttonData="ignored"
				panelData={{
					id: 'panel-order',
					icon: '/panel/phone.svg',
					altText: 'Позвонить',
					text: 'Заказать звонок',
					position: {bottom: '24px'},
				}}
			/>,
		);

		fireEvent.click(screen.getByRole('button', {name: 'Заказать звонок'}));
		expect(openModal).toHaveBeenCalledTimes(1);
	});

	it('renders modal and error from feedback hook state', async () => {
		mockedUseFeedback.mockReturnValue({
			isOpen: true,
			openModal,
			closeModal,
			handleSubmit,
			error: 'Ошибка отправки',
		});
		render(<OrderButton buttonStyle="button-white" buttonData="Оставить заявку" />);

		expect(await screen.findByTestId('feedback-modal')).toBeInTheDocument();
		expect(screen.getByText('Ошибка отправки')).toBeInTheDocument();
	});
});
