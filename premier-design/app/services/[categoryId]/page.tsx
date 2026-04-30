import type { Metadata } from 'next';

import { loadServicesTierPageProps } from '@shared/lib/app-router/loadServicesTierPage';
import { generateStaticParamsServicesTier } from '@shared/lib/app-router/generateStaticParams/services';
import { servicesTierPageToHeadProps } from '@shared/lib/app-router/seo/serviceTierHead';
import { customHeadPropsToMetadata } from '@shared/lib/seo/customHeadPropsToMetadata';
import { StructuredDataScript } from '@widgets/layout/seo/StructuredDataScript';
import ServicesTierPage from '@widgets/services-tier/ui/ServicesTierPage/ServicesTierPage';

export const revalidate = 3600;

export async function generateStaticParams() {
	return generateStaticParamsServicesTier();
}

type PageProps = {
	params: Promise<{ categoryId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { categoryId } = await params;
	const props = await loadServicesTierPageProps(categoryId);
	return customHeadPropsToMetadata(servicesTierPageToHeadProps(props));
}

export default async function ServicesTierRoutePage({ params }: PageProps) {
	const { categoryId } = await params;
	const tierProps = await loadServicesTierPageProps(categoryId);
	const head = servicesTierPageToHeadProps(tierProps);

	return (
		<>
			<StructuredDataScript {...head} />
			<ServicesTierPage {...tierProps} />
		</>
	);
}
