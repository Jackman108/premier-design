/** @jest-environment jsdom */
import { fireEvent, render, screen } from '@testing-library/react';
import type { ImgHTMLAttributes, ReactNode } from 'react';
import { useModalState } from '@shared/hooks/useModalState';
import { useCookiesBanner } from '../hooks/useCookiesBanner';
import CookiesBanner from './CookiesBanner';

jest.mock('next/link', () => ({
	__esModule: true,
	default: ({
		href,
		children,
		...rest
	}: {
		href: string;
		children: ReactNode;
	}) => (
		<a href={href} {...rest}>
			{children}
		</a>
	),
}));

jest.mock('next/image', () => ({
	__esModule: true,
	// eslint-disable-next-line @next/next/no-img-element
	default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt ?? ''} />,
}));

jest.mock('@shared/hooks/useModalState', () => ({
	useModalState: jest.fn(),
}));

jest.mock('../hooks/useCookiesBanner', () => ({
	useCookiesBanner: jest.fn(),
}));

const mockedUseModalState = jest.mocked(useModalState);
const mockedUseCookiesBanner = jest.mocked(useCookiesBanner);

describe('CookiesBanner', () => {
	const handleAction = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();

		mockedUseModalState.mockReturnValue({
			isOpen: true,
			openModal: jest.fn(),
			closeModal: jest.fn(),
			toggleModal: jest.fn(),
		});
		mockedUseCookiesBanner.mockReturnValue({ handleAction });
	});

	it('does not render while closed', () => {
		mockedUseModalState.mockReturnValue({
			isOpen: false,
			openModal: jest.fn(),
			closeModal: jest.fn(),
			toggleModal: jest.fn(),
		});

		render(<CookiesBanner papers={[]} />);
		expect(screen.queryByRole('heading', { name: 'Ваша конфиденциальность важна для нас' })).not.toBeInTheDocument();
	});

	it('renders privacy link and delegates cookie actions to hooks', () => {
		const privacyPolicy = { id: 1, title: 'Политика конфиденциальности', shortTitle: 'privacy-policy' };
		render(<CookiesBanner papers={[privacyPolicy]} />);

		const privacyLink = screen.getByRole('link', { name: 'Открыть Политику конфиденциальности' });
		expect(privacyLink).toHaveAttribute('href', '/documents/privacy-policy');

		fireEvent.click(screen.getByRole('button', { name: 'Принять все куки' }));
		expect(handleAction).toHaveBeenCalledWith(true);

		fireEvent.click(screen.getByRole('button', { name: 'Отклонить все куки' }));
		expect(handleAction).toHaveBeenCalledWith(false);
	});
});
