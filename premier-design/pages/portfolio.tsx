import type {NextPage} from 'next';
import type {ReactElement} from 'react';

import {HeroBanner, type HeroBannerProps} from '@features/banner';
import {getStaticProps} from '@lib/getStaticData';
import {Appeal, Examples, Features, OfferBanner} from '@lib/dynamicSectionImports';
import {selectAppealSectionData, usePageData} from '@shared/hooks/usePageData';
import {getTitleData} from '@shared/utils/findItemByTitle';
import {GetDataProps} from '@widgets/interface/interfaceData';
import CustomHead from '@widgets/layout/seo/CustomHead/CustomHead';
import {useLayoutProps} from '@widgets/layout/hooks/useLayoutProps';
import Layout from '@widgets/layout/ui/layout/Layout';

const Portfolio: NextPage<GetDataProps> = ({data}): ReactElement => {
    const {titleItem: titleData, buttonItem: buttonData, bannerItem: bannerData} = usePageData(
        data.titlesPage,
        data.button,
        data.bannersImages,
        'portfolio',
        'leave_request',
        'design_banner',
    );
    const bannerProps: HeroBannerProps = {titleData, buttonData, bannerData};
    const titles = getTitleData(data.title, 'our-works');

    return (
        <>
            <CustomHead {...titleData} structuredDataRating={data.trustSignals.structuredDataRating}/>
            <Layout {...useLayoutProps(data)}>
                <HeroBanner {...bannerProps}/>
                <Features features={data.features}/>
                <OfferBanner ctaLabel={buttonData.buttonHeader} offer={data.offerBanner.portfolioType}/>
                <Examples cards={data.examplesCard} title={titles['our-works']}/>
                <Appeal {...selectAppealSectionData(data.title, data.button, data.bannersImages)} />
            </Layout>
        </>
    );
};

export {getStaticProps};
export default Portfolio;
