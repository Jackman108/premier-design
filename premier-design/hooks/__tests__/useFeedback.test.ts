/** @jest-environment jsdom */
import { act, renderHook } from '@testing-library/react';
import { useFeedback } from '../useFeedback';

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
        const { result } = renderHook(() => useFeedback());

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

        const { result } = renderHook(() => useFeedback());
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

    it('sets user-facing error when request fails', async () => {
        const fetchMock = jest.fn().mockResolvedValue({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error',
        } as Response);
        global.fetch = fetchMock as unknown as typeof fetch;

        const { result } = renderHook(() => useFeedback());
        await act(async () => {
            await result.current.handleSubmit(payload);
        });

        expect(result.current.error).toContain('Произошла ошибка при отправке формы');
    });
});
