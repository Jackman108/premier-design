import type { Metadata } from 'next';

import type { CustomHeadProps } from '@shared/interface/seoHead.props';
import { SITE_OPERATOR } from '@shared/constants/company';
import { getFullCanonicalUrl } from '@shared/utils/getFullCanonicalUrl';

/** Metadata API (App Router) из того же контракта, что и бывший `<Head>` в `CustomHead`. */
export function customHeadPropsToMetadata(props: CustomHeadProps): Metadata {
	const ogImageUrl = getFullCanonicalUrl('/logo.png');
	return {
		title: props.metaTitle,
		description: props.metaDescription,
		alternates: { canonical: props.canonical },
		openGraph: {
			title: props.metaTitle,
			description: props.metaDescription,
			url: props.canonical,
			type: 'website',
			siteName: SITE_OPERATOR.brandName,
			images: [{ url: ogImageUrl }],
		},
		twitter: {
			card: 'summary_large_image',
			title: props.metaTitle,
			description: props.metaDescription,
			images: [ogImageUrl],
		},
	};
}
