import type {NextPage} from 'next';
import Layout from '../Layout/Layout';
import {getStaticProps} from './api/dataProvider';
import {GetDataProps} from '../interface/interfaceData';
import {ReactElement} from "react";
import Banner from "../components/Banner/Banner";
import {Appeal, News, OfferList, Partners} from '../components';
import CustomHead from "../components/CustomHead/CustomHead";
import {useLayoutProps} from "../hooks/useLayoutProps";
import {BannerProps} from "../interface/Banner.props";
import {getTitleData} from "../utils/findItemByTitle";
import {usePageData} from "../hooks/usePageData";
import {AppealProps} from "../interface/Appeal.props";

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
