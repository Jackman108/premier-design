import type {NextPage} from 'next';
import type {ReactElement} from 'react';

import {HeroBanner, type HeroBannerProps} from '@features/banner';
import {getStaticProps} from '@lib/getStaticData';
import {selectAppealSectionData, usePageData} from '@shared/hooks/usePageData';
import {Address, Appeal} from '@lib/dynamicSectionImports';
import {GetDataProps} from '@widgets/interface/interfaceData';
import CustomHead from '@widgets/layout/seo/CustomHead/CustomHead';
import {useLayoutProps} from '@widgets/layout/hooks/useLayoutProps';
import Layout from '@widgets/layout/ui/layout/Layout';
import {ContactsMicroUspAside} from '@features/contacts';

const Contacts: NextPage<GetDataProps> = ({data}): ReactElement => {
	const {titleItem: titleData, buttonItem: buttonData, bannerItem: bannerData} = usePageData(
		data.titlesPage,
		data.button,
		data.bannersImages,
		'contacts',
		'leave_request',
		'contacts_banner',
	);
	const bannerProps: HeroBannerProps = {titleData, buttonData, bannerData};

	return (
		<>
			<CustomHead {...titleData} structuredDataRating={data.trustSignals.structuredDataRating} />
			<Layout {...useLayoutProps(data)}>
				<HeroBanner {...bannerProps} />
				<ContactsMicroUspAside uspAside={data.contactsPage.uspAside} />
				<Address />
				<Appeal {...selectAppealSectionData(data.title, data.button, data.bannersImages)} />
			</Layout>
		</>
	);
};

export {getStaticProps};
export default Contacts;
