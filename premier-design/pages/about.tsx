import type {NextPage} from 'next';
import Layout from '../widgets/layout/ui/layout/Layout';
import {getStaticProps} from './api/dataProvider';
import {GetDataProps} from '../widgets/interface/interfaceData';
import {ReactElement} from "react";
import Banner from "@features/banner/ui/Banner";
import {Appeal, News, OfferList, Partners} from '@shared/utils/dynamicImports';
import CustomHead from "../widgets/layout/seo/CustomHead/CustomHead";
import {useLayoutProps} from "../widgets/layout/hooks/useLayoutProps";
import {BannerProps} from "@features/banner/interface/Banner.props";
import {getTitleData} from "@shared/utils/findItemByTitle";
import {usePageData} from "@shared/hooks/usePageData";
import {AppealProps} from "@features/appeal/interface/Appeal.props";

const About: NextPage<GetDataProps> = ({data}): ReactElement => {
    const {titleItem: titleData, buttonItem: buttonData, bannerItem: bannerData} = usePageData(
        data.titlesPage, data.button, data.bannersImages,
        "about", "leave_request", "about_banner"
    );
    const bannerProps: BannerProps = {titleData, buttonData, bannerData};

    const {titleItem, buttonItem, bannerItem} = usePageData(
        data.title, data.button, data.bannersImages,
        "our-partners", "leave_request", "appeal_banner"
    );
    const appealProps: AppealProps = {titleItem, buttonItem, bannerItem}
    const titles = getTitleData(data.title, "our-partners");

    return (
        <>
            <CustomHead {...titleData}/>
            <Layout {...useLayoutProps(data)}>
                <Banner {...bannerProps}/>
                <OfferList offer={data.offerList.aboutType}/>
                <News
                    news={data.news}
                    newsStyle='about'
                />
                <Partners
                    title={titles["our-partners"]}
                    partners={data.partners}
                />
                <Appeal {...appealProps}/>
            </Layout>
        </>
    );
};
export {getStaticProps};
export default About;
