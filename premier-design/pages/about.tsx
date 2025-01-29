import type {NextPage} from 'next';
import Layout from '@widgets/layout/ui/layout/Layout';
import {getStaticProps} from './api/dataProvider';
import {GetDataProps} from '@widgets/interface/interfaceData';
import {ReactElement} from "react";
import HeroBanner from "@features/banner/hero/ui/HeroBanner";
import {Appeal, News, OfferBanner, Partners} from '@shared/utils/dynamicImports';
import CustomHead from "@widgets/layout/seo/CustomHead/CustomHead";
import {useLayoutProps} from "@widgets/layout/hooks/useLayoutProps";
import {HeroBannerProps} from "@features/banner/hero/interface/HeroBannerProps";
import {getTitleData} from "@shared/utils/findItemByTitle";
import {usePageData} from "@shared/hooks/usePageData";

const About: NextPage<GetDataProps> = ({data}): ReactElement => {
    const {titleItem: titleData, buttonItem: buttonData, bannerItem: bannerData} = usePageData(
        data.titlesPage, data.button, data.bannersImages,
        "about", "leave_request", "about_banner"
    );
    const bannerProps: HeroBannerProps = {titleData, buttonData, bannerData};

    const titles = getTitleData(data.title, "news-shares", "our-partners");

    return (
        <>
            <CustomHead {...titleData}/>
            <Layout {...useLayoutProps(data)}>
                <HeroBanner {...bannerProps}/>
                <OfferBanner offer={data.offerBanner.aboutType}/>
                <News
                    title={titles["news-shares"]}
                    news={data.news}
                    newsStyle='about'
                />
                <Partners
                    title={titles["our-partners"]}
                    partners={data.partners}
                />
                <Appeal {...usePageData(
                    data.title, data.button, data.bannersImages,
                    "create-best-place", "leave_request", "appeal_banner"
                )} />
            </Layout>
        </>
    );
};
export {getStaticProps};
export default About;
