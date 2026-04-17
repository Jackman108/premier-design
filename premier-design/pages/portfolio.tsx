import type {NextPage} from 'next';
import type {ReactElement} from 'react';

import HeroBanner from '@features/banner/hero/ui/HeroBanner';
import {HeroBannerProps} from '@features/banner/hero/interface/HeroBannerProps';
import {getStaticProps} from '@lib/getStaticData';
import {Appeal, Examples, Features, OfferBanner} from '@shared/utils/dynamicImports';
import {usePageData} from '@shared/hooks/usePageData';
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
                <OfferBanner ctaLabel={buttonData.buttonHeader} offer={data.offerBanner.designType}/>
                <Examples cards={data.examplesCard} title={titles['our-works']}/>
                <Appeal
                    {...usePageData(
                        data.title,
                        data.button,
                        data.bannersImages,
                        'create-best-place',
                        'leave_request',
                        'appeal_banner',
                    )}
                />
            </Layout>
        </>
    );
};

export {getStaticProps};
export default Portfolio;
