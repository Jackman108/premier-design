import {getFullCanonicalUrl} from './getFullCanonicalUrl';

import type {FaqStructuredDataItem, StructuredDataAggregateRating} from '../CustomHead/CustomHead.props';
import type {ServiceJsonLdInput} from '../types/serviceJsonLd';

const SITE = 'https://premium-interior.by';

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
        name: 'Premium Interior',
        url: SITE,
        logo: getFullCanonicalUrl('/logo.png'),
        image: getFullCanonicalUrl('/logo.png'),
        sameAs: [
            'https://t.me/PremiumInterior',
            'https://www.instagram.com/proremont_zhl',
            'https://vk.com/premium_interior_zhl',
        ],
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Pervomayskaya',
            addressLocality: 'Zhlobin',
            postalCode: '247210',
            addressCountry: 'BY',
        },
        areaServed: [{'@type': 'City', name: 'Zhlobin'}, {'@type': 'Country', name: 'Belarus'}],
        priceRange: '$$',
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
