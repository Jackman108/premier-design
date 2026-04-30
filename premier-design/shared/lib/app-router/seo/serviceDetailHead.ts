import type { CustomHeadProps } from '@shared/interface/seoHead.props';
import type { ServiceDetailProps } from '@features/services/interface/ServiceDetail.props';
import type { RelatedServiceDetailProps } from '@features/related-services/interface/RelatedService.props';
import { getFullCanonicalUrl } from '@shared/utils/getFullCanonicalUrl';

export function serviceDetailPageToHeadProps(props: ServiceDetailProps): CustomHeadProps {
	const { service, categoryProps, structuredDataRating } = props;
	return {
		metaTitle: service.service,
		metaDescription: categoryProps.description,
		canonical: getFullCanonicalUrl(service.canonical),
		structuredDataRating,
		serviceForStructuredData: {
			name: categoryProps.title,
			description: categoryProps.description,
			url: getFullCanonicalUrl(service.canonical),
		},
	};
}

export function relatedServiceDetailPageToHeadProps(props: RelatedServiceDetailProps): CustomHeadProps {
	const { relatedService, structuredDataRating } = props;
	return {
		metaTitle: relatedService.title,
		metaDescription: relatedService.description,
		canonical: getFullCanonicalUrl(relatedService.canonical),
		structuredDataRating,
		serviceForStructuredData: {
			name: relatedService.title,
			description: relatedService.description,
			url: getFullCanonicalUrl(relatedService.canonical),
		},
	};
}
