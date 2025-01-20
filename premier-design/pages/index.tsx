import {NextPage} from 'next';
import Layout from '../Layout/Layout';
import {getStaticProps} from './api/dataProvider';
import Banner from "../components/Banner/Banner";
import {
    Appeal,
    Approach,
    Costing,
    Examples,
    Features,
    OfferList,
    RelatedServices,
    Reviews,
    Services,
    StepsWork
} from '../components';
import CustomHead from "../components/CustomHead/CustomHead";
import {useLayoutProps} from "../hooks/useLayoutProps";
import {GetDataProps} from "../interface/interfaceData";
import {BannerProps} from "../interface/Banner.props";
import {usePageData} from "../hooks/usePageData";
import {AppealProps} from "../interface/Appeal.props";
import {getTitleData} from "../utils/findItemByTitle";

const Home: NextPage<GetDataProps> = ({data}) => {
    const {titleItem: titleData, buttonItem: buttonData, bannerItem: bannerData} = usePageData(
        data.titlesPage, data.button, data.bannersImages,
        "home", "leave_request", "home_banner"
    );
    const bannerProps: BannerProps = {titleData, buttonData, bannerData};

    const {titleItem, buttonItem, bannerItem} = usePageData(
        data.title, data.button, data.bannersImages,
        "our-partners", "leave_request", "appeal_banner"
    );
    const appealProps: AppealProps = {titleItem, buttonItem, bannerItem};
    const titles = getTitleData(data.title, "services", "our-approach", "application-process", "our-works", "price-calculation", "related-services", "customer_reviews");


    return (
        <>
            <CustomHead {...titleData}/>
            <Layout {...useLayoutProps(data)}>
                <Banner {...bannerProps}/>
                <Features features={data.features}/>
                <OfferList offer={data.offerList.homeType}/>
                <Services
                    title={titles["services"]}
                    buttons={data.button}
                    servicesCard={data.servicesCard}
                />
                <Approach
                    title={titles["our-approach"]}
                    cards={data.approachCard}
                />
                <StepsWork
                    stepsWork={data.stepsWork}
                    title={titles["application-process"]}
                />
                <Examples
                    cards={data.examplesCard}
                    title={titles["our-works"]}
                />
                <Costing
                    title={titles["price-calculation"]}
                    cards={data.costingCard}
                />
                <RelatedServices
                    title={titles["related-services"]}
                    relatedServices={data.relatedServices}
                />
                <Reviews
                    title={titles["customer_reviews"]}
                    reviews={data.reviews}
                />
                <Appeal {...appealProps}/>
            </Layout>
        </>
    );
};
export {getStaticProps};
export default Home;