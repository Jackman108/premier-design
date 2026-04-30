'use server';

import { feedbackSchema } from '@features/feedback/schema';
import { submitFeedback } from '@features/feedback/useCases/submitFeedback';
import { z } from 'zod';

type FeedbackActionResult =
	| { status: 'success'; message: string; data?: unknown }
	| { status: 'error'; message: string; errors?: unknown; code?: 400 | 429 | 500 | 503 };

export const submitFeedbackAction = async (payload: unknown): Promise<FeedbackActionResult> => {
	const parsed = feedbackSchema.safeParse(payload);
	if (!parsed.success) {
		return {
			status: 'error',
			code: 400,
			message: 'Validation failed.',
			errors: z.treeifyError(parsed.error),
		};
	}

	const response = await submitFeedback(parsed.data);
	if (response.status === 'error') {
		return {
			status: 'error',
			code: response.code ?? 500,
			message: response.message,
		};
	}

	return response;
};
