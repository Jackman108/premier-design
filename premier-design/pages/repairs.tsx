import type {NextPage} from 'next';
import Layout from '../Layout/Layout';
import {getStaticProps} from './api/dataProvider';
import {ReactElement} from "react";
import {usePageData} from "../hooks/usePageData";
import Banner from "../components/Banner/Banner";
import {Appeal, Examples, OfferList, ProjectOffer} from '../components';
import CustomHead from "../components/CustomHead/CustomHead";
import {PageProps} from "../interface/Page.props";

const Repairs: NextPage<PageProps> = ({data, enableSlider = true}): ReactElement => {
    const {
        titleData,
        buttonData,
        bannerData,
        offerListData
    } = usePageData(data, "pleasant-repair", "leave_request", "repair_banner", "repairs_offer");
    const pageMeta = data.pageMeta['repairs'];

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
                    data={data.offerProject.repairType}
                    buttonData={buttonData.buttonHeader}
                    buttonStyle='button-black'
                />
                <Appeal data={data}/>
            </Layout>
        </>
    );
};
export {getStaticProps};
export default Repairs;
