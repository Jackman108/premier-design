/**
 * GET /api/sitemap (rewrite с `/sitemap.xml`): тело и query не используются, только rate limit по IP.
 * Список статических путей валидируется через zod при загрузке модуля.
 */
import {NextApiRequest, NextApiResponse} from 'next';
import {z} from 'zod';

import {DataProps} from "@widgets/interface/interfaceData";
import {getData} from '@lib/getStaticData';
import {applyApiRateLimit} from '@shared/lib/applyApiRateLimit';
import {createApiErrorPayload, createApiRequestObserver} from '@shared/lib/api/apiRequestRuntime';

const BASE_URL = 'https://premium-interior.by';
const CHANGE_FREQUENCY = 'monthly';
const STATIC_PRIORITY = 1.0;
const DYNAMIC_PRIORITY = 0.8;

const STATIC_PAGES_RAW = [
    '', '/repairs', '/design', '/portfolio', '/calculator', '/about', '/contacts',
    '/documents/privacy-policy', '/documents/public-offer', '/documents/user-agreement',
] as const;

const STATIC_PAGES: readonly string[] = z
	.array(z.string())
	.min(1)
	.parse([...STATIC_PAGES_RAW]);

const generateUrl = (path: string, priority: number): string => {
    return `
        <url>
            <loc>${BASE_URL}${path}</loc>
            <changefreq>${CHANGE_FREQUENCY}</changefreq>
            <priority>${priority}</priority>
        </url>
    `;
};

const generateStaticPages = (): string[] => STATIC_PAGES.map(page => generateUrl(page, STATIC_PRIORITY));


const generateDynamicPagesFromPrices = (data: DataProps): string[] => {
    if (!data.prices || !Array.isArray(data.prices.repairs)) {
        throw new Error('Invalid data structure: expected prices.repairs array.');
    }

    return data.prices.repairs.flatMap(category =>
        category.priceList.map(item =>
            generateUrl(`/services/${category.id}/${item.canonical.split('/').pop()}`, DYNAMIC_PRIORITY)
        )
    );
};

const generateDynamicPagesFromRelatedServices = (data: DataProps): string[] => {
    if (!data.relatedServices || !Array.isArray(data.relatedServices)) {
        throw new Error('Invalid data structure: expected relatedServices array.');
    }

    return data.relatedServices.map(service =>
        generateUrl(service.canonical, DYNAMIC_PRIORITY)
    );
};

const generateSitemap = async (): Promise<string> => {
    const data: DataProps = await getData();
    const staticPages = generateStaticPages();
    const dynamicPages = generateDynamicPagesFromPrices(data);
    const dynamicRelatedPages = generateDynamicPagesFromRelatedServices(data);

    const allPages = [...staticPages, ...dynamicPages, ...dynamicRelatedPages];

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
