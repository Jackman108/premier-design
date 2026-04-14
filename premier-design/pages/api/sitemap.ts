import {NextApiRequest, NextApiResponse} from 'next';
import {DataProps} from "@widgets/interface/interfaceData";
import {getData} from "@pages/api/dataProvider";

const BASE_URL = 'https://premier-design.by';
const CHANGE_FREQUENCY = 'monthly';
const STATIC_PRIORITY = 1.0;
const DYNAMIC_PRIORITY = 0.8;

const STATIC_PAGES: readonly string[] = [
    '', '/repairs', '/design', '/about', '/contacts',
    '/documents/privacy-policy', '/documents/public-offer', '/documents/user-agreement',
];

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

export default async function handler(_req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const sitemap = await generateSitemap();
        res.setHeader('Content-Type', 'application/xml');
        res.status(200).send(sitemap);
    } catch (error) {
        handleError(res, error);
    }
}

const handleError = (res: NextApiResponse, error: unknown): void => {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({error: 'Error generating sitemap', details: errorMessage});
};