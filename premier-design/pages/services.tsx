import type {NextPage} from 'next';
import type {ReactElement} from 'react';

import {HeroBanner, type HeroBannerProps} from '@features/banner';
import {ServiceCategoriesHub} from '@features/category';
import {Appeal, BusinessServices, RelatedServices} from '@lib/dynamicSectionImports';
import {getStaticProps} from '@lib/getStaticData';
import {selectAppealSectionData, usePageData} from '@shared/hooks/usePageData';
import {getTitleData} from '@shared/utils/findItemByTitle';
import {GetDataProps} from '@widgets/interface/interfaceData';
import CustomHead from '@widgets/layout/seo/CustomHead/CustomHead';
import {useLayoutProps} from '@widgets/layout/hooks/useLayoutProps';
import Layout from '@widgets/layout/ui/layout/Layout';

const ServicesIndex: NextPage<GetDataProps> = ({data}): ReactElement => {
	const {titleItem: titleData, buttonItem: buttonData, bannerItem: bannerData} = usePageData(
		data.titlesPage,
		data.button,
		data.bannersImages,
		'services',
		'leave_request',
		'repair_banner',
	);
	const bannerProps: HeroBannerProps = {titleData, buttonData, bannerData};
	const titles = getTitleData(data.title, 'related-services');

	return (
		<>
			<CustomHead {...titleData} structuredDataRating={data.trustSignals.structuredDataRating} />
			<Layout {...useLayoutProps(data)}>
				<HeroBanner {...bannerProps} />
				<ServiceCategoriesHub titles={data.title} repairs={data.prices.repairs} buttonData={data.button} />
				<RelatedServices title={titles['related-services']} relatedServices={data.relatedServices} />
				<BusinessServices
					titles={data.title}
					businessServices={data.businessServices}
					businessServiceCard={data.businessServiceCard}
					buttonData={data.button}
					buttonStyle="button-white"
				/>
				<Appeal {...selectAppealSectionData(data.title, data.button, data.bannersImages)} />
			</Layout>
		</>
	);
};

export {getStaticProps};
export default ServicesIndex;
