/** @jest-environment jsdom */
import {act, renderHook, waitFor} from '@testing-library/react';
import type {IMessage} from 'react-chatbot-kit/build/src/interfaces/IMessages';
import {useChatMessages} from '@features/buttons-panel/hooks/useChatMessages';

describe('useChatMessages', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('loads messages from localStorage after mount', async () => {
		const stored: IMessage[] = [{id: 1, message: 'hi', type: 'bot'}];
		localStorage.setItem('chat_messages', JSON.stringify(stored));

		const {result} = renderHook(() => useChatMessages());

		await waitFor(() => {
			expect(result.current[0]).toEqual(stored);
		});
	});

	it('starts empty when storage is empty', async () => {
		const {result} = renderHook(() => useChatMessages());

		await waitFor(() => {
			expect(result.current[0]).toEqual([]);
		});
	});

	it('persists messages via saveMessages', async () => {
		const {result} = renderHook(() => useChatMessages());
		await waitFor(() => {
			expect(result.current[0]).toEqual([]);
		});

		const next: IMessage[] = [{id: 2, message: 'bye', type: 'user'}];
		act(() => {
			result.current[1](next);
		});

		expect(JSON.parse(localStorage.getItem('chat_messages') ?? '[]')).toEqual(next);
	});

	it('returns empty array on invalid JSON in storage', async () => {
		localStorage.setItem('chat_messages', '{not-json');

		const {result} = renderHook(() => useChatMessages());

		await waitFor(() => {
			expect(result.current[0]).toEqual([]);
		});
	});
});
