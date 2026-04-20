import {NextApiRequest, NextApiResponse} from 'next';
import {submitFeedbackAction} from '../../features/feedback/useCases/submitFeedbackAction';
import {feedbackSchema} from '../../features/feedback/schema';
import {applyApiRateLimit} from '@shared/lib/applyApiRateLimit';
import {getFeedbackApiTimeoutMs, recordFeedbackSloSample} from '@shared/lib/feedbackSlo';
import {z} from 'zod';

const withTimeout = async <T>(
	task: Promise<T>,
	timeoutMs: number,
): Promise<{timedOut: boolean; value?: T; error?: unknown}> => {
	return new Promise((resolve) => {
		const timer = setTimeout(() => {
			resolve({timedOut: true});
		}, timeoutMs);

		void task
			.then((value) => {
				clearTimeout(timer);
				resolve({timedOut: false, value});
			})
			.catch(() => {
				clearTimeout(timer);
				resolve({timedOut: false, error: new Error('Feedback processing failed before timeout')});
			});
	});
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const startedAt = Date.now();
    const finish = (statusCode: number, timedOut = false) => {
        recordFeedbackSloSample({
            statusCode,
            timedOut,
            durationMs: Date.now() - startedAt,
        });
    };

    if (req.method === 'OPTIONS') {
        res.setHeader('Allow', ['POST', 'OPTIONS']);
        res.status(200).end();
        finish(200);
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({message: 'Method not allowed.'});
        finish(405);
        return;
    }

    const contentType = req.headers['content-type'] || '';
    if (!contentType.includes('application/json')) {
        res.status(415).json({
            status: 'error',
            message: 'Unsupported content type. Use application/json.',
        });
        finish(415);
        return;
    }

    const rateLimit = applyApiRateLimit(req, res, 'feedback', {windowMs: 60_000, maxRequests: 5});
    if (!rateLimit.allowed) {
        res.status(429).json({
            status: 'error',
            message: 'Too many requests. Try again later.',
        });
        finish(429);
        return;
    }

    const parsed = feedbackSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            status: 'error',
            message: 'Validation failed.',
            errors: z.treeifyError(parsed.error),
        });
        finish(400);
        return;
    }

    const timedCall = await withTimeout(submitFeedbackAction(parsed.data), getFeedbackApiTimeoutMs());
    if (timedCall.error) {
        const statusCode = 500;
        res.status(statusCode).json({
            status: 'error',
            message: 'Failed to process feedback.',
            code: statusCode,
        });
        finish(statusCode);
        return;
    }

    if (timedCall.timedOut || !timedCall.value) {
        const statusCode = 504;
        res.status(statusCode).json({
            status: 'error',
            message: 'Feedback processing timed out.',
            code: statusCode,
        });
        finish(statusCode, true);
        return;
    }

    const response = timedCall.value;

    if (response.status === 'error') {
        const statusCode = response.code ?? 500;
        res.status(statusCode).json(response);
        finish(statusCode);
        return;
    }

    const statusCode = 200;
    res.status(statusCode).json(response);
    finish(statusCode);
}
