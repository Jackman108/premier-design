/** @jest-environment jsdom */
import {fireEvent, render, screen} from '@testing-library/react';
import type {ImgHTMLAttributes} from 'react';
import {useModalState} from '@shared/hooks/useModalState';
import {usePaperNavigation} from '@features/papers/hooks/usePaperNavigation';
import {useCookiesBanner, usePrivacyPolicy} from '../hooks/useCookiesBanner';
import CookiesBanner from './CookiesBanner';

jest.mock('next/image', () => ({
	__esModule: true,
	// eslint-disable-next-line @next/next/no-img-element
	default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt ?? ''} />,
}));

jest.mock('@shared/hooks/useModalState', () => ({
	useModalState: jest.fn(),
}));

jest.mock('@features/papers/hooks/usePaperNavigation', () => ({
	usePaperNavigation: jest.fn(),
}));

jest.mock('../hooks/useCookiesBanner', () => ({
	useCookiesBanner: jest.fn(),
	usePrivacyPolicy: jest.fn(),
}));

const mockedUseModalState = jest.mocked(useModalState);
const mockedUsePaperNavigation = jest.mocked(usePaperNavigation);
const mockedUseCookiesBanner = jest.mocked(useCookiesBanner);
const mockedUsePrivacyPolicy = jest.mocked(usePrivacyPolicy);

describe('CookiesBanner', () => {
	const handleAction = jest.fn();
	const handlePaperClick = jest.fn();
	const handlePrivacyPolicyClick = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();

		mockedUseModalState.mockReturnValue({
			isOpen: true,
			openModal: jest.fn(),
			closeModal: jest.fn(),
		});
		mockedUsePaperNavigation.mockReturnValue({handlePaperClick});
		mockedUseCookiesBanner.mockReturnValue({handleAction});
		mockedUsePrivacyPolicy.mockReturnValue({handlePrivacyPolicyClick});
	});

	it('does not render while closed', () => {
		mockedUseModalState.mockReturnValue({
			isOpen: false,
			openModal: jest.fn(),
			closeModal: jest.fn(),
		});

		render(<CookiesBanner papers={[]} />);
		expect(screen.queryByRole('heading', {name: 'Ваша конфиденциальность важна для нас'})).not.toBeInTheDocument();
	});

	it('renders actions and delegates handlers to hooks', () => {
		const privacyPolicy = {id: 1, title: 'Политика конфиденциальности', shortTitle: 'privacy-policy'};
		render(<CookiesBanner papers={[privacyPolicy]} />);

		expect(mockedUsePrivacyPolicy).toHaveBeenCalledWith(privacyPolicy, handlePaperClick);

		fireEvent.click(screen.getByRole('button', {name: 'Открыть Политику конфиденциальности'}));
		expect(handlePrivacyPolicyClick).toHaveBeenCalledTimes(1);

		fireEvent.click(screen.getByRole('button', {name: 'Принять все куки'}));
		expect(handleAction).toHaveBeenCalledWith(true);

		fireEvent.click(screen.getByRole('button', {name: 'Отклонить все куки'}));
		expect(handleAction).toHaveBeenCalledWith(false);
	});
});
