/**
 * GET /api/sitemap (rewrite с `/sitemap.xml`): тело и query не используются, только rate limit по IP.
 * Список статических путей валидируется через zod при загрузке модуля.
 */
import {NextApiRequest, NextApiResponse} from 'next';
import {z} from 'zod';

import type {DataProps} from '@shared/validates/dataPropsSchema';
import {getData} from '@lib/getStaticData';
import {applyApiRateLimit} from '@shared/lib/applyApiRateLimit';
import {createApiErrorPayload, createApiRequestObserver} from '@shared/lib/api/apiRequestRuntime';
import {SITE_PUBLIC_ORIGIN} from '@shared/constants/company';
import {STATIC_SITEMAP_PATHS, collectSitePathnames} from '@lib/collectSitePathnames';

const BASE_URL = SITE_PUBLIC_ORIGIN;
const CHANGE_FREQUENCY = 'monthly';
const STATIC_PRIORITY = 1.0;
const DYNAMIC_PRIORITY = 0.8;

z.array(z.string()).min(1).parse([...STATIC_SITEMAP_PATHS]);

const generateUrl = (path: string, priority: number): string => {
    return `
        <url>
            <loc>${BASE_URL}${path}</loc>
            <changefreq>${CHANGE_FREQUENCY}</changefreq>
            <priority>${priority}</priority>
        </url>
    `;
};

const priorityForPath = (path: string): number =>
	STATIC_SITEMAP_PATHS.includes(path) ? STATIC_PRIORITY : DYNAMIC_PRIORITY;

const generateSitemap = async (): Promise<string> => {
    const data: DataProps = await getData();
    const pathnames = collectSitePathnames(data);
    const allPages = pathnames.map((path) => generateUrl(path, priorityForPath(path)));

    return `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
        ${allPages.join('')}
    </urlset>`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const {correlationId, finish} = createApiRequestObserver(req, res, '/api/sitemap');

    switch (req.method) {
        case 'GET':
            break;
        default:
            res.setHeader('Allow', 'GET');
            res.status(405).json({message: 'Method not allowed.'});
            finish(405, {status: 'error'});
            return;
    }

    const rateLimit = applyApiRateLimit(req, res, 'sitemap', {windowMs: 60_000, maxRequests: 60});
    if (!rateLimit.allowed) {
        res.status(429).json(createApiErrorPayload(correlationId, 'Too many requests. Try again later.'));
        finish(429, {status: 'error'});
        return;
    }

    try {
        const sitemap = await generateSitemap();
        res.setHeader('Content-Type', 'application/xml');
        res.status(200).send(sitemap);
        finish(200);
    } catch (error) {
        handleError(res, error, correlationId);
        finish(500, {status: 'error'});
    }
}

const handleError = (res: NextApiResponse, error: unknown, correlationId: string): void => {
	console.error('[sitemap]', error);
	res.status(500).json(createApiErrorPayload(correlationId, 'Не удалось сформировать sitemap'));
};
