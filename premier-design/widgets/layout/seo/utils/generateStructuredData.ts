import type {FaqStructuredDataItem, ServiceJsonLdInput, StructuredDataAggregateRating} from '@shared/interface/seoHead.props';
import {SITE_OPERATOR} from '@shared/constants/company';
import {getFullCanonicalUrl} from '@shared/utils/getFullCanonicalUrl';

const SITE = SITE_OPERATOR.publicOrigin;

export type GenerateStructuredDataOptions = {
    faqItems?: FaqStructuredDataItem[];
    aggregateRating?: StructuredDataAggregateRating;
    service?: ServiceJsonLdInput;
};

export const generateStructuredData = (options?: GenerateStructuredDataOptions) => {
    const graph: Record<string, unknown>[] = [];

    const localBusiness: Record<string, unknown> = {
        '@type': 'LocalBusiness',
        '@id': `${SITE}/#localbusiness`,
        name: SITE_OPERATOR.brandName,
        url: SITE,
        logo: getFullCanonicalUrl('/logo.png'),
        image: getFullCanonicalUrl('/logo.png'),
        sameAs: [...SITE_OPERATOR.structuredData.sameAs],
        address: {
            '@type': 'PostalAddress',
            ...SITE_OPERATOR.structuredData.address,
        },
        areaServed: SITE_OPERATOR.structuredData.areaServed,
        priceRange: SITE_OPERATOR.structuredData.priceRange,
    };

    if (options?.aggregateRating) {
        localBusiness.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: String(options.aggregateRating.ratingValue),
            reviewCount: options.aggregateRating.reviewCount,
            bestRating: String(options.aggregateRating.bestRating),
        };
    }

    graph.push(localBusiness);

    if (options?.faqItems?.length) {
        graph.push({
            '@type': 'FAQPage',
            '@id': `${SITE}/#faq`,
            mainEntity: options.faqItems.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer,
                },
            })),
        });
    }

    if (options?.service) {
        graph.push({
            '@type': 'Service',
            '@id': `${options.service.url}#service`,
            name: options.service.name,
            description: options.service.description,
            url: options.service.url,
            provider: {
                '@id': `${SITE}/#localbusiness`,
            },
        });
    }

    return {
        '@context': 'https://schema.org',
        '@graph': graph,
    };
};
