import {NextApiRequest, NextApiResponse} from 'next';
import {submitFeedbackAction} from '../../features/feedback/useCases/submitFeedbackAction';
import {feedbackSchema} from '../../features/feedback/schema';
import {applyApiRateLimit} from '@shared/lib/applyApiRateLimit';
import {z} from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Allow', ['POST', 'OPTIONS']);
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({message: 'Method not allowed.'});
        return;
    }

    const contentType = req.headers['content-type'] || '';
    if (!contentType.includes('application/json')) {
        res.status(415).json({
            status: 'error',
            message: 'Unsupported content type. Use application/json.',
        });
        return;
    }

    const rateLimit = applyApiRateLimit(req, res, 'feedback', {windowMs: 60_000, maxRequests: 5});
    if (!rateLimit.allowed) {
        res.status(429).json({
            status: 'error',
            message: 'Too many requests. Try again later.',
        });
        return;
    }

    const parsed = feedbackSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            status: 'error',
            message: 'Validation failed.',
            errors: z.treeifyError(parsed.error),
        });
        return;
    }

    const response = await submitFeedbackAction(parsed.data);

    if (response.status === 'error') {
        res.status(response.code ?? 500).json(response);
        return;
    }

    res.status(200).json(response);
}
