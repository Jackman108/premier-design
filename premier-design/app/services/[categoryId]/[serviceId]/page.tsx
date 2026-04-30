import type { Metadata } from 'next';

import { loadServiceDetailPageProps } from '@lib/app-router/loadServiceDetailPage';
import { generateStaticParamsServiceDetail } from '@lib/app-router/generateStaticParams/services';
import { serviceDetailPageToHeadProps } from '@lib/app-router/seo/serviceDetailHead';
import { customHeadPropsToMetadata } from '@shared/lib/seo/customHeadPropsToMetadata';
import { ServiceDetail } from '@features/services';
import { StructuredDataScript } from '@widgets/layout/seo/StructuredDataScript';

export const revalidate = 3600;

export async function generateStaticParams() {
	return generateStaticParamsServiceDetail();
}

type PageProps = {
	params: Promise<{ categoryId: string; serviceId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { categoryId, serviceId } = await params;
	const detailProps = await loadServiceDetailPageProps(categoryId, serviceId);
	return customHeadPropsToMetadata(serviceDetailPageToHeadProps(detailProps));
}

export default async function ServiceDetailRoutePage({ params }: PageProps) {
	const { categoryId, serviceId } = await params;
	const detailProps = await loadServiceDetailPageProps(categoryId, serviceId);
	const head = serviceDetailPageToHeadProps(detailProps);

	return (
		<>
			<StructuredDataScript {...head} />
			<ServiceDetail {...detailProps} />
		</>
	);
}
