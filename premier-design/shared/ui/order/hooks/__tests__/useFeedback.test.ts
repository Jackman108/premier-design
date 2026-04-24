/** @jest-environment jsdom */
import {act, renderHook} from '@testing-library/react';
import {FEEDBACK_SUCCESS_TOAST_MS} from '@shared/ui/order/constants';
import {useFeedback} from '@shared/ui/order/hooks/useFeedback';

describe('useFeedback', () => {
	const payload = {
		name: 'Иван Иванов',
		phone: '375291234567',
		email: 'ivan@test.by',
		message: 'Тест',
		consent: true,
	};

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('opens and closes modal state', () => {
		const {result} = renderHook(() => useFeedback());

		expect(result.current.isOpen).toBe(false);
		act(() => {
			result.current.openModal();
		});
		expect(result.current.isOpen).toBe(true);
		act(() => {
			result.current.closeModal();
		});
		expect(result.current.isOpen).toBe(false);
	});

	it('submits successfully and clears error', async () => {
		const fetchMock = jest.fn().mockResolvedValue({
			ok: true,
			status: 200,
			statusText: 'OK',
		} as Response);
		global.fetch = fetchMock as unknown as typeof fetch;

		const {result} = renderHook(() => useFeedback());
		act(() => {
			result.current.openModal();
		});

		await act(async () => {
			await result.current.handleSubmit(payload);
		});

		expect(fetchMock).toHaveBeenCalled();
		expect(result.current.error).toBe('');
		expect(result.current.isOpen).toBe(false);
	});

	it('exposes successToastMs matching FEEDBACK_SUCCESS_TOAST_MS', () => {
		const {result} = renderHook(() => useFeedback());
		expect(result.current.successToastMs).toBe(FEEDBACK_SUCCESS_TOAST_MS);
	});

	it('clears isSuccess after toast duration', async () => {
		jest.useFakeTimers();
		const fetchMock = jest.fn().mockResolvedValue({
			ok: true,
			status: 200,
			statusText: 'OK',
		} as Response);
		global.fetch = fetchMock as unknown as typeof fetch;

		const {result} = renderHook(() => useFeedback());
		act(() => {
			result.current.openModal();
		});
		await act(async () => {
			await result.current.handleSubmit(payload);
		});
		expect(result.current.isSuccess).toBe(true);

		act(() => {
			jest.advanceTimersByTime(FEEDBACK_SUCCESS_TOAST_MS);
		});
		expect(result.current.isSuccess).toBe(false);

		jest.useRealTimers();
	});

	it('sets user-facing error when request fails', async () => {
		const body = JSON.stringify({message: 'server fail', correlationId: 'err-cid'});
		const fetchMock = jest.fn().mockResolvedValue({
			ok: false,
			status: 500,
			statusText: 'Internal Server Error',
			headers: {get: () => null},
			text: () => Promise.resolve(body),
		});
		global.fetch = fetchMock as unknown as typeof fetch;

		const {result} = renderHook(() => useFeedback());
		await act(async () => {
			await result.current.handleSubmit(payload);
		});

		expect(result.current.error).toContain('Произошла ошибка при отправке формы');
		expect(result.current.error).toContain('err-cid');
	});
});
