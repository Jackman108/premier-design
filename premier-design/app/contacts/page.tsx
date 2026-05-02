import type { Metadata } from 'next';

import { buildContactsHeadProps } from '@shared/lib/app-router/seo/marketingPagesHead';
import HeroBanner from '@features/banner/hero/ui/HeroBanner';
import type { HeroBannerProps } from '@features/banner/hero/interface/HeroBannerProps';
import { ContactsMicroUspAside } from '@features/contacts';
import { selectAppealSectionData, selectPageData } from '@shared/hooks/usePageData';
import { customHeadPropsToMetadata } from '@shared/lib/seo/customHeadPropsToMetadata';
import { Address, Appeal } from '@shared/lib/dynamicSectionImports';
import { getCachedData, getCachedSiteBundle } from '@shared/lib/getStaticData';
import { buildLayoutProps } from '@widgets/layout/lib/buildLayoutProps';
import { StructuredDataScript } from '@widgets/layout/seo/StructuredDataScript';
import Layout from '@widgets/layout/ui/layout/Layout';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
	const data = await getCachedData();
	return customHeadPropsToMetadata(buildContactsHeadProps(data));
}

export default async function ContactsPage() {
	const { data } = await getCachedSiteBundle();
	const head = buildContactsHeadProps(data);
	const {
		titleItem: titleData,
		buttonItem: buttonData,
		bannerItem: bannerData,
	} = selectPageData(
		data.titlesPage,
		data.button,
		data.bannersImages,
		'contacts',
		'leave_request',
		'contacts_banner',
	);
	const bannerProps: HeroBannerProps = { titleData, buttonData, bannerData };

	return (
		<>
			<StructuredDataScript {...head} />
			<Layout {...buildLayoutProps(data)}>
				<HeroBanner {...bannerProps} />
				<ContactsMicroUspAside uspAside={data.contactsPage.uspAside} />
				<Address />
				<Appeal {...selectAppealSectionData(data.title, data.button, data.bannersImages)} />
			</Layout>
		</>
	);
}
