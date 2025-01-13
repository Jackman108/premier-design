import {NextApiRequest, NextApiResponse} from 'next';
import data from '../../data/data.json';

// Константы для базового URL и конфигурации sitemap
const BASE_URL = 'https://premier-design.by';
const CHANGE_FREQUENCY = 'monthly';
const STATIC_PRIORITY = 1.0;
const DYNAMIC_PRIORITY = 0.8;

const generateUrl = (path: string, changefreq: string = CHANGE_FREQUENCY, priority: number): string => {
    return `
        <url>
            <loc>${BASE_URL}${path}</loc>
            <changefreq>${changefreq}</changefreq>
            <priority>${priority}</priority>
        </url>
    `;
};

const generateStaticPages = (): string[] => {
    const staticPages = [
        '', '/repairs', '/design', '/about', '/contacts', '/documents/privacy-policy', '/documents/public-offer', '/documents/user-agreement',
    ];
    return staticPages.map(page => generateUrl(page, CHANGE_FREQUENCY, STATIC_PRIORITY));
};

const generateDynamicPages = (): string[] => {
    if (!data.prices || !Array.isArray(data.prices.repairs)) {
        throw new Error('Invalid data structure: expected prices.repairs array.');
    }

    return data.prices.repairs.flatMap(category =>
        category.priceList.map(item => generateUrl(`/services/${category.id}/${item.canonical.split('/').pop()}`, CHANGE_FREQUENCY, DYNAMIC_PRIORITY))
    );
};

const generateSitemap = (): string => {
    const staticPages = generateStaticPages();
    const dynamicPages = generateDynamicPages();

    const allPages = [...staticPages, ...dynamicPages];

    return `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
        ${allPages.join('')}
    </urlset>`;
};

export default function handler(_req: NextApiRequest, res: NextApiResponse): void {
    try {
        const sitemap = generateSitemap();
        res.setHeader('Content-Type', 'application/xml');
        res.status(200).send(sitemap);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({error: 'Error generating sitemap', details: error.message});
        } else {
            res.status(500).json({error: 'Error generating sitemap', details: 'Unknown error'});
        }
    }
}
