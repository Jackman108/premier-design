import type {NextPage} from 'next';
import Layout from '../Layout/Layout';
import {getStaticProps} from './api/dataProvider';
import {ReactElement} from "react";
import Banner from "../components/Banner/Banner";
import {usePageData} from "../hooks/usePageData";
import {Appeal, Examples, OfferList, ProjectOffer} from '../components';
import CustomHead from "../components/CustomHead/CustomHead";
import {PageProps} from "../interface/Page.props";

const Design: NextPage<PageProps> = ({data, enableSlider = true}): ReactElement => {
    const pageMeta = data.pageMeta['design'];

    const {
        titleData,
        buttonData,
        bannerData,
        offerListData
    } = usePageData(data, "comfort-dreams", "order_project", "design_banner", "design_offer");

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
                <Examples data={data} enableSlider={enableSlider}/>
                {offerListData && <OfferList data={[offerListData]}/>}
                <ProjectOffer
                    data={data.offerProject.designType}
                    buttonData={buttonData.buttonHeader}
                    buttonStyle='button-black'
                />
                <Appeal data={data}/>
            </Layout>
        </>
    );
};
export {getStaticProps};
export default Design;