import type {NextPage} from 'next';
import Layout from '../Layout/Layout';
import {getStaticProps} from './api/dataProvider';
import {ReactElement} from "react";
import Banner from "../components/Banner/Banner";
import {Appeal, Costing, Examples, Features, OfferList, ProjectOffer} from '../components';
import CustomHead from "../components/CustomHead/CustomHead";
import {useLayoutProps} from "../hooks/useLayoutProps";
import {GetDataProps} from "../interface/interfaceData";
import {BannerProps} from "../interface/Banner.props";
import {usePageData} from "../hooks/usePageData";
import {AppealProps} from "../interface/Appeal.props";
import {getTitleData} from "../utils/findItemByTitle";

const Design: NextPage<GetDataProps> = ({data}): ReactElement => {
    const {titleItem: titleData, buttonItem: buttonData, bannerItem: bannerData} = usePageData(
        data.titlesPage, data.button, data.bannersImages,
        "design", "order_project", "design_banner"
    );
    const bannerProps: BannerProps = {titleData, buttonData, bannerData};

    const {titleItem, buttonItem, bannerItem} = usePageData(
        data.title, data.button, data.bannersImages,
        "our-partners", "leave_request", "appeal_banner"
    );
    const appealProps: AppealProps = {titleItem, buttonItem, bannerItem};
    const titles = getTitleData(data.title, "our-works", "price-calculation");

    return (
        <>
            <CustomHead {...titleData}/>
            <Layout {...useLayoutProps(data)}>
                <Banner {...bannerProps}/>
                <Features features={data.features}/>
                <OfferList offer={data.offerList.designType}/>
                <Examples
                    cards={data.examplesCard}
                    title={titles["our-works"]}
                />
                <Costing
                    cards={data.costingCard}
                    title={titles["price-calculation"]}
                />
                <ProjectOffer
                    data={data.offerProject.designType}
                    buttonData={buttonData.buttonHeader}
                    buttonStyle='button-black'
                />
                <Appeal {...appealProps}/>
            </Layout>
        </>
    );
};
export {getStaticProps};
export default Design;