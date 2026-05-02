import type { StructuredDataAggregateRating } from '@entities/review';
import type { FaqStructuredDataItem, ServiceJsonLdInput } from '@entities/seo';
import { SITE_OPERATOR } from '@shared/constants/company';
import { getFullCanonicalUrl } from '@shared/utils/getFullCanonicalUrl';

const SITE = SITE_OPERATOR.publicOrigin;

export type GenerateStructuredDataOptions = {
	faqItems?: FaqStructuredDataItem[];
	aggregateRating?: StructuredDataAggregateRating;
	service?: ServiceJsonLdInput;
};

/** JSON-LD `@graph` для `<CustomHead>` — PD-R-09: общая SEO-логика в `shared/lib/seo`. */
export const generateStructuredData = (options?: GenerateStructuredDataOptions) => {
	const graph: Record<string, unknown>[] = [];

	const localBusiness: Record<string, unknown> = {
		'@type': 'LocalBusiness',
		'@id': `${SITE}/#localbusiness`,
		name: SITE_OPERATOR.brandName,
		legalName: SITE_OPERATOR.legalEntity.fullName,
		url: SITE,
		logo: getFullCanonicalUrl('/logo.png'),
		image: getFullCanonicalUrl('/logo.png'),
		telephone: SITE_OPERATOR.phone.tel,
		email: SITE_OPERATOR.publicEmail,
		sameAs: [...SITE_OPERATOR.structuredData.sameAs],
		address: {
			'@type': 'PostalAddress',
			...SITE_OPERATOR.structuredData.address,
		},
		areaServed: SITE_OPERATOR.structuredData.areaServed,
		priceRange: SITE_OPERATOR.structuredData.priceRange,
		openingHoursSpecification: SITE_OPERATOR.workHours.slots.map((slot) => ({
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: [...slot.daysOfWeek],
			opens: slot.opens,
			closes: slot.closes,
		})),
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
