import type {NextPage} from 'next';
import Layout from '@widgets/layout/ui/layout/Layout';
import {getStaticProps} from '@lib/getStaticData';
import {GetDataProps} from '@widgets/interface/interfaceData';
import {ReactElement} from "react";
import HeroBanner from "@features/banner/hero/ui/HeroBanner";
import CompanyAboutSections from "@features/company-about/ui/CompanyAboutSections";
import {Appeal, OfferBanner} from '@lib/dynamicSectionImports';
import CustomHead from "@widgets/layout/seo/CustomHead/CustomHead";
import {useLayoutProps} from "@widgets/layout/hooks/useLayoutProps";
import {HeroBannerProps} from "@features/banner/hero/interface/HeroBannerProps";
import {getTitleData} from "@shared/utils/findItemByTitle";
import {selectAppealSectionData, usePageData} from '@shared/hooks/usePageData';
import News from '@features/news/ui/News/News';
import Partners from '@features/partners/ui/Partners/Partners';

const About: NextPage<GetDataProps> = ({data}): ReactElement => {
    const {titleItem: titleData, buttonItem: buttonData, bannerItem: bannerData} = usePageData(
        data.titlesPage, data.button, data.bannersImages,
        "about", "leave_request", "about_banner"
    );
    const bannerProps: HeroBannerProps = {titleData, buttonData, bannerData};

    const titles = getTitleData(data.title, "news-shares", "our-partners");

    return (
        <>
            <CustomHead {...titleData} structuredDataRating={data.trustSignals.structuredDataRating}/>
            <Layout {...useLayoutProps(data)} footerNewsHashSyncOnMount={false}>
                <HeroBanner {...bannerProps}/>
                <CompanyAboutSections content={data.companyAbout}/>
                <OfferBanner ctaLabel={buttonData.buttonHeader} offer={data.offerBanner.aboutType}/>
                <News
                    title={titles["news-shares"]}
                    news={data.news}
                    newsStyle='about'
                />
                <Partners
                    title={titles["our-partners"]}
                    partners={data.partners}
                />
                <Appeal {...selectAppealSectionData(data.title, data.button, data.bannersImages)} />
            </Layout>
        </>
    );
};
export {getStaticProps};
export default About;
