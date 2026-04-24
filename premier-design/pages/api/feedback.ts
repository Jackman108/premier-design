import {NextApiRequest, NextApiResponse} from 'next';
import {submitFeedbackAction} from '../../features/feedback/useCases/submitFeedbackAction';
import {feedbackSchema} from '../../features/feedback/schema';
import {applyApiRateLimit} from '@shared/lib/applyApiRateLimit';
import {getFeedbackApiTimeoutMs, recordFeedbackSloSample} from '@shared/lib/feedbackSlo';
import {createApiErrorPayload, createApiRequestObserver, withTimeout} from '@shared/lib/api/apiRequestRuntime';
import {z} from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {correlationId, finish} = createApiRequestObserver(
        req,
        res,
        '/api/feedback',
        ({statusCode, timedOut, durationMs}) => {
            recordFeedbackSloSample({statusCode, timedOut, durationMs});
        },
    );

    switch (req.method) {
        case 'OPTIONS':
            res.setHeader('Allow', ['POST', 'OPTIONS']);
            res.status(200).end();
            finish(200);
            return;
        case 'POST':
            break;
        default:
            res.status(405).json(createApiErrorPayload(correlationId, 'Method not allowed.'));
            finish(405, {status: 'error'});
            return;
    }

    const contentType = req.headers['content-type'] || '';
    if (!contentType.includes('application/json')) {
        res.status(415).json(createApiErrorPayload(correlationId, 'Unsupported content type. Use application/json.'));
        finish(415, {status: 'error'});
        return;
    }

    const rateLimit = applyApiRateLimit(req, res, 'feedback', {windowMs: 60_000, maxRequests: 5});
    if (!rateLimit.allowed) {
        res.status(429).json(createApiErrorPayload(correlationId, 'Too many requests. Try again later.'));
        finish(429, {status: 'error'});
        return;
    }

    const parsed = feedbackSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            ...createApiErrorPayload(correlationId, 'Validation failed.'),
            errors: z.treeifyError(parsed.error),
        });
        finish(400, {status: 'error'});
        return;
    }

    const timedCall = await withTimeout(submitFeedbackAction(parsed.data), getFeedbackApiTimeoutMs());
    if (timedCall.error) {
        const statusCode = 500;
        res.status(statusCode).json(
            createApiErrorPayload(correlationId, 'Failed to process feedback.', {code: statusCode}),
        );
        finish(statusCode, {status: 'error'});
        return;
    }

    if (timedCall.timedOut || !timedCall.value) {
        const statusCode = 504;
        res.status(statusCode).json(
            createApiErrorPayload(correlationId, 'Feedback processing timed out.', {code: statusCode}),
        );
        finish(statusCode, {status: 'error', timedOut: true});
        return;
    }

    const response = timedCall.value;

    switch (response.status) {
        case 'error': {
            const statusCode = response.code ?? 500;
            res.status(statusCode).json({...response, correlationId});
            finish(statusCode, {status: 'error'});
            return;
        }
        case 'success': {
            const statusCode = 200;
            res.status(statusCode).json({...response, correlationId});
            finish(statusCode);
            return;
        }
        default: {
            const statusCode = 500;
            res.status(statusCode).json(
                createApiErrorPayload(correlationId, 'Unexpected feedback response status.', {code: statusCode}),
            );
            finish(statusCode, {status: 'error'});
            return;
        }
    }
}
