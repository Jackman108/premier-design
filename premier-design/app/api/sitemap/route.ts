/**
 * GET /api/sitemap (rewrite с `/sitemap.xml`): machine-readable sitemap.
 */
import type { DataProps } from '@shared/validates/dataPropsSchema';
import { getData } from '@shared/lib/getStaticData';
import { applyApiRateLimitWeb } from '@shared/lib/applyApiRateLimit.web';
import { createApiErrorPayload } from '@shared/lib/api/apiRequestRuntime';
import { createCorrelationId } from '@shared/lib/correlationId';
import { SITE_PUBLIC_ORIGIN } from '@shared/constants/company';
import { STATIC_SITEMAP_PATHS, collectSitePathnames } from '@shared/lib/collectSitePathnames';
import { z } from 'zod';

const BASE_URL = SITE_PUBLIC_ORIGIN;
const CHANGE_FREQUENCY = 'monthly';
const STATIC_PRIORITY = 1.0;
const DYNAMIC_PRIORITY = 0.8;

z.array(z.string())
	.min(1)
	.parse([...STATIC_SITEMAP_PATHS]);

const generateUrl = (path: string, priority: number): string => `
        <url>
            <loc>${BASE_URL}${path}</loc>
            <changefreq>${CHANGE_FREQUENCY}</changefreq>
            <priority>${priority}</priority>
        </url>
    `;

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

export async function GET(request: Request) {
	const correlationId = request.headers.get('x-correlation-id')?.trim() || createCorrelationId('cid');

	if (request.method !== 'GET') {
		return Response.json(
			createApiErrorPayload(correlationId, 'METHOD_NOT_ALLOWED', 'Method not allowed. Use GET.'),
			{ status: 405, headers: { Allow: 'GET', 'X-Correlation-Id': correlationId } },
		);
	}

	const rate = applyApiRateLimitWeb(request, 'sitemap', { windowMs: 60_000, maxRequests: 60 });
	if (!rate.allowed) {
		return Response.json(
			createApiErrorPayload(correlationId, 'RATE_LIMITED', 'Too many requests. Try again later.'),
			{
				status: 429,
				headers: { ...rate.limitHeaders, 'X-Correlation-Id': correlationId },
			},
		);
	}

	try {
		const sitemap = await generateSitemap();
		return new Response(sitemap, {
			status: 200,
			headers: {
				'Content-Type': 'application/xml',
				'X-Correlation-Id': correlationId,
				...rate.limitHeaders,
			},
		});
	} catch (error) {
		console.error('[sitemap]', error);
		return Response.json(
			createApiErrorPayload(correlationId, 'SITEMAP_FAILED', 'Не удалось сформировать sitemap'),
			{
				status: 500,
				headers: { ...rate.limitHeaders, 'X-Correlation-Id': correlationId },
			},
		);
	}
}
