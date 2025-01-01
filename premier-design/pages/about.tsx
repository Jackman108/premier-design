import type {NextPage} from 'next';
import Layout from '../Layout/Layout';
import {getStaticProps} from './api/dataProvider';
import {GetDataProps} from '../interface/interfaceData';
import {ReactElement} from "react";
import {usePageData} from "../hooks/usePageData";
import Banner from "../components/Banner/Banner";
import {Appeal, News, OfferList, Partners, StepsWork} from '../components';
import CustomHead from "../components/CustomHead/CustomHead";
import {getFullCanonicalUrl} from "../utils/findService";
import {useLayoutProps} from "../hooks/useLayoutProps";

const About: NextPage<GetDataProps> = ({data}): ReactElement => {
    const {
        titleData,
        buttonData,
        bannerData,
    } = usePageData(data, "our-values", "leave_request", "about_banner");
    const pageMeta = data.pageMeta['about'];
    const fullCanonicalUrl = getFullCanonicalUrl(pageMeta.canonical);
    const {headerProps, footerProps} = useLayoutProps(data);

    return (
        <>
            <CustomHead
                title={pageMeta.title}
                description={pageMeta.description}
                canonical={fullCanonicalUrl}
            />
            <Layout headerProps={headerProps} footerProps={footerProps}>
                <Banner
                    titleData={titleData}
                    buttonData={buttonData}
                    bannerData={bannerData}
                    buttonStyle='button-white'
                />
                <OfferList data={data.offerList.aboutType}/>
                <News
                    news={data.news}
                    newsStyle='about'
                />
                <Partners
                    data={data}
                />
                <StepsWork
                    stepsWork={data.stepsWork}
                    titles={data.title}
                />
                <Appeal
                    data={data}
                />
            </Layout>
        </>
    );
};
export {getStaticProps};
export default About;
