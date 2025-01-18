import type {NextPage} from 'next';
import Layout from '../Layout/Layout';
import {getStaticProps} from './api/dataProvider';
import {ReactElement} from "react";
import {usePageData} from "../hooks/usePageData";
import Banner from "../components/Banner/Banner";
import {Appeal, Costing, Examples, Features, OfferList, ProjectOffer} from '../components';
import CustomHead from "../components/CustomHead/CustomHead";
import {PageProps} from "../interface/Page.props";
import Category from "../components/Category/Category";
import {getFullCanonicalUrl} from "../utils/getFullCanonicalUrl";
import {useLayoutProps} from "../hooks/useLayoutProps";
import BusinessServices from "../components/BusinessServices/BusinessServices";

const Repairs: NextPage<PageProps> = ({data, enableSlider = true}): ReactElement => {
    const {titleData, buttonData, bannerData} = usePageData(data, "pleasant-repair", "leave_request", "repair_banner");

    const pageMeta = data.pageMeta['repairs'];
    const fullCanonicalUrl = getFullCanonicalUrl(pageMeta.canonical);
    const layoutProps = useLayoutProps(data);

    return (
        <>
            <CustomHead
                title={pageMeta.title}
                description={pageMeta.description}
                canonical={fullCanonicalUrl}
            />
            <Layout {...layoutProps}>
                <Banner
                    titleData={titleData}
                    buttonData={buttonData}
                    bannerData={bannerData}
                    buttonStyle='button-white'
                />
                <Features features={data.features}/>
                <OfferList offer={data.offerList.repairType}/>
                <Examples
                    cards={data.examplesCard}
                    titles={data.title}
                    enableSlider={enableSlider}
                />
                <Category
                    titles={data.title}
                    repairs={data.prices.repairs}
                    buttonData={data.button}
                />
                <BusinessServices
                    titles={data.title}
                    businessServices={data.businessServices}
                    businessServiceCard={data.businessServiceCard}
                    buttonData={data.button}
                    buttonStyle='button-white'
                />
                <Costing
                    cards={data.costingCard}
                    titles={data.title}
                />

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
