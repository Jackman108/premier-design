import type { CustomHeadProps } from '@shared/interface/seoHead.props';
import { getFullCanonicalUrl } from '@shared/utils/getFullCanonicalUrl';
import type { ServicesTierPageProps } from '@widgets/services-tier/ui/ServicesTierPage/ServicesTierPage';

export function servicesTierPageToHeadProps(props: ServicesTierPageProps): CustomHeadProps {
	if (props.tierKind === 'repair') {
		const { category, structuredDataRating } = props;
		const canonicalPath = `/services/${category.id}`;
		const canonical = getFullCanonicalUrl(canonicalPath);
		return {
			metaTitle: category.title,
			metaDescription: category.description,
			canonical,
			structuredDataRating,
			serviceForStructuredData: {
				name: category.title,
				description: category.description,
				url: canonical,
			},
		};
	}

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
