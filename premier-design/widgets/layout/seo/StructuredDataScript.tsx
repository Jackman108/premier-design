import Script from 'next/script';

import type { CustomHeadProps } from '@shared/interface/seoHead.props';
import { generateStructuredData } from '@shared/lib/seo/generateStructuredData';

/** JSON-LD `@graph` для App Router (без `next/head`). */
export function StructuredDataScript(props: CustomHeadProps) {
	const structuredData = generateStructuredData({
		faqItems: props.faqForStructuredData,
		aggregateRating: props.structuredDataRating,
		service: props.serviceForStructuredData,
	});

	return (
		<Script
			id="structured-data"
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	);
}
