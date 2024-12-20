import type {NextPage} from 'next';
import Layout from '../Layout/Layout';
import {getStaticProps} from './api/dataProvider';
import {GetDataProps} from '../interface/interfaceData';
import {ReactElement} from "react";
import {usePageData} from "../hooks/usePageData";
import Banner from "../components/Banner/Banner";
import {Appeal, News, OfferList, Partners, WorkStages} from '../components';
import CustomHead from "../components/CustomHead/CustomHead";

const About: NextPage<GetDataProps> = ({data}): ReactElement => {
    const {
        titleData,
        buttonData,
        bannerData,
        offerListData
    } = usePageData(data, "our-values", "leave_request", "about_banner", "about_offer");
    const pageMeta = data.pageMeta['about'];
    return (
        <>
            <CustomHead title={pageMeta.title} description={pageMeta.description}/>
            <Layout data={data}>
                <Banner
                    titleData={titleData}
                    buttonData={buttonData}
                    bannerData={bannerData}
                    buttonStyle='button-white'
                />
                {offerListData && <OfferList data={[offerListData]}/>}
                <News
                    news={data.news}
                    newsStyle='about'
                />
                <Partners
                    data={data}
                />
                <WorkStages
                    data={data}/>
                <Appeal
                    data={data}
                />
            </Layout>
        </>
    );
};
export {getStaticProps};
export default About;
