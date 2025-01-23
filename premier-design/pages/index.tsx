import {NextPage} from 'next';
import Layout from '../widgets/layout/ui/layout/Layout';
import {getStaticProps} from './api/dataProvider';
import Banner from "@features/banner/ui/Banner";
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
} from '@shared/utils/dynamicImports';
import CustomHead from "../widgets/layout/seo/CustomHead/CustomHead";
import {useLayoutProps} from "../widgets/layout/hooks/useLayoutProps";
import {GetDataProps} from "../widgets/interface/interfaceData";
import {BannerProps} from "@features/banner/interface/Banner.props";
import {usePageData} from "@shared/hooks/usePageData";
import {AppealProps} from "@features/appeal/interface/Appeal.props";
import {getTitleData} from "@shared/utils/findItemByTitle";

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