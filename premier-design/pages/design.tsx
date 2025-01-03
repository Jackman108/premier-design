import type {NextPage} from 'next';
import Layout from '../Layout/Layout';
import {getStaticProps} from './api/dataProvider';
import {ReactElement} from "react";
import Banner from "../components/Banner/Banner";
import {usePageData} from "../hooks/usePageData";
import {Appeal, Costing, Examples, Features, OfferList, ProjectOffer} from '../components';
import CustomHead from "../components/CustomHead/CustomHead";
import {PageProps} from "../interface/Page.props";
import {getFullCanonicalUrl} from "../utils/findService";
import {useLayoutProps} from "../hooks/useLayoutProps";

const Design: NextPage<PageProps> = ({data, enableSlider = true}): ReactElement => {
    const {titleData, buttonData, bannerData,} = usePageData(data, "comfort-dreams", "order_project", "design_banner");

    const pageMeta = data.pageMeta['design'];
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
                <Costing
                    cards={data.cards.costingCard}
                    titles={data.title}
                />
                <Examples
                    cards={data.cards.examplesCard}
                    titles={data.title}
                    enableSlider={enableSlider}
                />
                <OfferList data={data.offerList.designType}/>
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