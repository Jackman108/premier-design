import {NextPage} from 'next';
import Layout from '../Layout/Layout';
import {getStaticProps} from './api/dataProvider';
import Banner from "../components/Banner/Banner";
import {usePageData} from "../hooks/usePageData";
import {Appeal, Approach, Costing, Examples, Features, OfferList, Services, StepsWork} from '../components';
import CustomHead from "../components/CustomHead/CustomHead";
import {PageProps} from "../interface/Page.props";
import Reviews from "../components/Reviews/Reviews";
import {getFullCanonicalUrl} from "../utils/getFullCanonicalUrl";
import {useLayoutProps} from "../hooks/useLayoutProps";
import RelatedServices from "../components/RelatedServices/RelatedServices";

const Home: NextPage<PageProps> = ({data, enableSlider = true}) => {
    const {titleData, buttonData, bannerData} = usePageData(data, "repair-and-design", "leave_request", "home_banner");

    const pageMeta = data.pageMeta['home'];
    const fullCanonicalUrl = getFullCanonicalUrl(pageMeta.canonical);

    return (
        <>
            <CustomHead
                title={pageMeta.title}
                description={pageMeta.description}
                canonical={fullCanonicalUrl}
            />
            <Layout {...useLayoutProps(data)}>
                <Banner
                    titleData={titleData}
                    buttonData={buttonData}
                    bannerData={bannerData}
                    buttonStyle='button-white'
                />
                <Features features={data.features}/>
                <OfferList offer={data.offerList.homeType}/>
                <Services
                    titles={data.title}
                    buttons={data.button}
                    servicesCard={data.servicesCard}
                />
                <Approach
                    titles={data.title}
                    cards={data.approachCard}
                />
                <StepsWork
                    stepsWork={data.stepsWork}
                    titles={data.title}
                />
                <Examples
                    cards={data.examplesCard}
                    titles={data.title}
                    enableSlider={enableSlider}
                />
                <Costing
                    titles={data.title}
                    cards={data.costingCard}
                />
                <RelatedServices titles={data.title} relatedServices={data.relatedServices}/>
                <Reviews
                    titles={data.title}
                    reviews={data.reviews}
                />
                <Appeal data={data}/>
            </Layout>
        </>
    );
};
export {getStaticProps};
export default Home;