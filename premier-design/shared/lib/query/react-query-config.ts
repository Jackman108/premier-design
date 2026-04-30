/**
 * Фабрика QueryClient для SSR: без общего состояния между запросами (новый клиент на монтирование).
 */
import { QueryClient } from '@tanstack/react-query';

export function createQueryClient(): QueryClient {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 5 * 60 * 1000,
				gcTime: 10 * 60 * 1000,
				retry: 2,
				refetchOnWindowFocus: false,
				refetchOnReconnect: true,
			},
			mutations: {
				retry: 1,
			},
		},
	});
}
