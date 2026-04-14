import {NextApiRequest, NextApiResponse} from 'next';
import {submitFeedback} from '../../features/feedback/useCases/submitFeedback';
import {feedbackSchema} from '../../features/feedback/schema';
import {checkRateLimit} from '../../shared/lib/rateLimit';

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

    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    const rateLimit = checkRateLimit(clientIp, {windowMs: 60_000, maxRequests: 5});
    res.setHeader('X-RateLimit-Remaining', String(rateLimit.remaining));
    res.setHeader('Retry-After', String(rateLimit.retryAfterSec));
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
            errors: parsed.error.flatten(),
        });
        return;
    }

    const response = await submitFeedback(parsed.data);
    if (response.status === 'error') {
        res.status(500).json(response);
        return;
    }

    res.status(200).json(response);
}
