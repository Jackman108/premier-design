import type { CustomHeadProps } from '@shared/interface/seoHead.props';
import type { DataProps } from '@shared/validates/dataPropsSchema';
import { selectPageData } from '@shared/hooks/usePageData';
import { mapFaqEntriesToStructuredData } from '@shared/utils/faqStructuredData';

export function buildHomeHeadProps(data: DataProps): CustomHeadProps {
	const { titleItem } = selectPageData(
		data.titlesPage,
		data.button,
		data.bannersImages,
		'home',
		'leave_request',
		'home_banner',
	);
	return {
		...titleItem,
		faqForStructuredData: mapFaqEntriesToStructuredData(data.faqContent.home),
		structuredDataRating: data.trustSignals.structuredDataRating,
	};
}

export function buildAboutHeadProps(data: DataProps): CustomHeadProps {
	const { titleItem } = selectPageData(
		data.titlesPage,
		data.button,
		data.bannersImages,
		'about',
		'leave_request',
		'about_banner',
	);
	return {
		...titleItem,
		structuredDataRating: data.trustSignals.structuredDataRating,
	};
}

export function buildContactsHeadProps(data: DataProps): CustomHeadProps {
	const { titleItem } = selectPageData(
		data.titlesPage,
		data.button,
		data.bannersImages,
		'contacts',
		'leave_request',
		'contacts_banner',
	);
	return {
		...titleItem,
		structuredDataRating: data.trustSignals.structuredDataRating,
	};
}

export function buildPortfolioHeadProps(data: DataProps): CustomHeadProps {
	const { titleItem } = selectPageData(
		data.titlesPage,
		data.button,
		data.bannersImages,
		'portfolio',
		'leave_request',
		'design_banner',
	);
	return {
		...titleItem,
		structuredDataRating: data.trustSignals.structuredDataRating,
	};
}

export function buildServicesIndexHeadProps(data: DataProps): CustomHeadProps {
	const { titleItem } = selectPageData(
		data.titlesPage,
		data.button,
		data.bannersImages,
		'services',
		'leave_request',
		'repair_banner',
	);
	return {
		...titleItem,
		structuredDataRating: data.trustSignals.structuredDataRating,
	};
}

export function buildRepairsHeadProps(data: DataProps): CustomHeadProps {
	const { titleItem } = selectPageData(
		data.titlesPage,
		data.button,
		data.bannersImages,
		'repairs',
		'leave_request',
		'repair_banner',
	);
	return {
		...titleItem,
		faqForStructuredData: mapFaqEntriesToStructuredData(data.faqContent.repairs),
		structuredDataRating: data.trustSignals.structuredDataRating,
	};
}

export function buildDesignHeadProps(data: DataProps): CustomHeadProps {
	const { titleItem } = selectPageData(
		data.titlesPage,
		data.button,
		data.bannersImages,
		'design',
		'order_project',
		'design_banner',
	);
	return {
		...titleItem,
		faqForStructuredData: mapFaqEntriesToStructuredData(data.faqContent.design),
		structuredDataRating: data.trustSignals.structuredDataRating,
	};
}

export function buildSitemapHeadProps(data: DataProps): CustomHeadProps {
	const { titleItem } = selectPageData(
		data.titlesPage,
		data.button,
		data.bannersImages,
		'sitemap',
		'leave_request',
		'repair_banner',
	);
	return {
		...titleItem,
		structuredDataRating: data.trustSignals.structuredDataRating,
	};
}
