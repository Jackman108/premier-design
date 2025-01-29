import {NextPage} from 'next';
import Layout from '@widgets/layout/ui/layout/Layout';
import {getStaticProps} from './api/dataProvider';
import HeroBanner from "@features/banner/hero/ui/HeroBanner";
import {
    Appeal,
    Approach,
    Costing,
    Examples,
    Features,
    OfferBanner,
    RelatedServices,
    Reviews,
    Services,
    StepsWork
} from '@shared/utils/dynamicImports';
import CustomHead from "@widgets/layout/seo/CustomHead/CustomHead";
import {useLayoutProps} from "@widgets/layout/hooks/useLayoutProps";
import {GetDataProps} from "@widgets/interface/interfaceData";
import {HeroBannerProps} from "@features/banner/hero/interface/HeroBannerProps";
import {usePageData} from "@shared/hooks/usePageData";
import {getTitleData} from "@shared/utils/findItemByTitle";

const Home: NextPage<GetDataProps> = ({data}) => {

    const {titleItem: titleData, buttonItem: buttonData, bannerItem: bannerData} = usePageData(
        data.titlesPage, data.button, data.bannersImages,
        "home", "leave_request", "home_banner"
    );

    const bannerProps: HeroBannerProps = {titleData, buttonData, bannerData};

    const titles = getTitleData(
        data.title, "services", "our-approach", "application-process",
        "our-works", "price-calculation", "related-services", "customer_reviews"
    );

    return (
        <>
            <CustomHead {...titleData}/>
            <Layout {...useLayoutProps(data)}>
                <HeroBanner {...bannerProps}/>
                <Features features={data.features}/>
                <OfferBanner offer={data.offerBanner.homeType}/>
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
                    title={titles["application-process"]}
                    stepsWork={data.stepsWork}
                />
                <Examples
                    title={titles["our-works"]}
                    cards={data.examplesCard}
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
                <Appeal {...usePageData(
                    data.title, data.button, data.bannersImages,
                    "create-best-place", "leave_request", "appeal_banner"
                )} />
            </Layout>
        </>
    );
};
export {getStaticProps};
export default Home;