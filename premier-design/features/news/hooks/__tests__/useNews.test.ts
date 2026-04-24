/** @jest-environment jsdom */
import {act, renderHook} from '@testing-library/react';
import {useNews} from '../useNews';
import {useModalState} from '@shared/hooks/useModalState';
import {useUrlHash} from '@shared/hooks/useUrlHash';
import {useScrollToElement} from '@shared/hooks/useScrollToElement';
import {useVisibilityObserver} from '@shared/hooks/useVisibilityObserver';

jest.mock('@shared/hooks/useModalState', () => ({
	useModalState: jest.fn(),
}));

jest.mock('@shared/hooks/useUrlHash', () => ({
	useUrlHash: jest.fn(),
}));

jest.mock('@shared/hooks/useScrollToElement', () => ({
	useScrollToElement: jest.fn(),
}));

jest.mock('@shared/hooks/useVisibilityObserver', () => ({
	useVisibilityObserver: jest.fn(),
}));

const mockedUseModalState = jest.mocked(useModalState);
const mockedUseUrlHash = jest.mocked(useUrlHash);
const mockedUseScrollToElement = jest.mocked(useScrollToElement);
const mockedUseVisibilityObserver = jest.mocked(useVisibilityObserver);

describe('useNews', () => {
	const openModal = jest.fn();
	const toggleModal = jest.fn();
	const closeModal = jest.fn();
	const updateHash = jest.fn();
	const resetHash = jest.fn();
	const scrollToElement = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		mockedUseModalState.mockReturnValue({isOpen: false, openModal, toggleModal, closeModal});
		mockedUseUrlHash.mockReturnValue({updateHash, resetHash});
		mockedUseScrollToElement.mockReturnValue({
			scrollToElement,
			scrollToRef: {current: null},
		});
		mockedUseVisibilityObserver.mockImplementation(() => undefined);
		window.location.hash = '';
	});

	it('expands and collapses news items', () => {
		const news = [{title: 'A'}, {title: 'B'}] as never;
		const {result} = renderHook(() => useNews(news));

		act(() => {
			result.current.handleNewsClick(1);
		});
		expect(openModal).toHaveBeenCalledTimes(1);
		expect(updateHash).toHaveBeenCalledWith('news', 1);
		expect(scrollToElement).toHaveBeenCalledWith('news-1');
		expect(result.current.expandedNews).toBe(1);

		act(() => {
			result.current.handleNewsClick(1);
		});
		expect(closeModal).toHaveBeenCalledTimes(1);
		expect(resetHash).toHaveBeenCalledTimes(1);
		expect(scrollToElement).toHaveBeenCalledWith('news-list');
		expect(result.current.expandedNews).toBeNull();
		expect(mockedUseVisibilityObserver).toHaveBeenCalledWith('news-');
	});

	it('opens item from url hash on mount', () => {
		window.location.hash = '#news-0';
		const news = [{title: 'A'}] as never;
		renderHook(() => useNews(news));

		expect(openModal).toHaveBeenCalledTimes(1);
		expect(updateHash).toHaveBeenCalledWith('news', 0);
		expect(scrollToElement).toHaveBeenCalledWith('news-0');
	});

	it('skips hash sync when syncHashOnMount is false', () => {
		window.location.hash = '#news-0';
		const news = [{title: 'A'}] as never;
		renderHook(() => useNews(news, {syncHashOnMount: false}));

		expect(openModal).not.toHaveBeenCalled();
		expect(updateHash).not.toHaveBeenCalled();
	});
});
