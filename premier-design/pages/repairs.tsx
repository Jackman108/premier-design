import type {NextPage} from 'next';
import Layout from '../Layout/Layout';
import {getStaticProps} from './api/dataProvider';
import {ReactElement} from "react";
import {usePageData} from "../hooks/usePageData";
import Banner from "../components/Banner/Banner";
import {Appeal, Costing, Examples, Features, OfferList, ProjectOffer, StepsWork} from '../components';
import CustomHead from "../components/CustomHead/CustomHead";
import {PageProps} from "../interface/Page.props";
import Category from "../components/Category/Category";

const Repairs: NextPage<PageProps> = ({data, enableSlider = true}): ReactElement => {
    const {
        titleData,
        buttonData,
        bannerData,
    } = usePageData(data, "pleasant-repair", "leave_request", "repair_banner");

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
                <Features features={data.features}/>
                <Examples
                    cards={data.cards.examplesCard}
                    titles={data.title}
                    enableSlider={enableSlider}
                />
                <Costing
                    cards={data.cards.costingCard}
                    titles={data.title}
                />
                <Category data={data}/>
                <OfferList data={data.offerList.repairType}/>
                <ProjectOffer
                    data={data.offerProject.repairType}
                    buttonData={buttonData.buttonHeader}
                    buttonStyle='button-black'
                />
                <StepsWork
                    stepsWork={data.stepsWork}
                    titles={data.title}
                />
                <Appeal data={data}/>
            </Layout>
        </>
    );
};
export {getStaticProps};
export default Repairs;
