import type {NextPage} from 'next';
import Layout from '../widgets/layout/ui/layout/Layout';
import {getStaticProps} from './api/dataProvider';
import {ReactElement} from "react";
import HeroBanner from "@features/banner/hero/ui/HeroBanner";
import {
    Appeal,
    BusinessServices,
    Category,
    Costing,
    Examples,
    Features,
    OfferBanner,
    ProjectOffer
} from '@shared/utils/dynamicImports';
import CustomHead from "../widgets/layout/seo/CustomHead/CustomHead";
import {useLayoutProps} from "../widgets/layout/hooks/useLayoutProps";
import {GetDataProps} from "../widgets/interface/interfaceData";
import {HeroBannerProps} from "@features/banner/hero/interface/HeroBannerProps";
import {usePageData} from "@shared/hooks/usePageData";
import {AppealBannerProps} from "@features/banner/appeal/interface/AppealBannerProps";
import {getTitleData} from "@shared/utils/findItemByTitle";

const Repairs: NextPage<GetDataProps> = ({data}): ReactElement => {
    const {titleItem: titleData, buttonItem: buttonData, bannerItem: bannerData} = usePageData(
        data.titlesPage, data.button, data.bannersImages,
        "repairs", "leave_request", "repair_banner"
    );
    const bannerProps: HeroBannerProps = {titleData, buttonData, bannerData};

    const {titleItem, buttonItem, bannerItem} = usePageData(
        data.title, data.button, data.bannersImages,
        "create-best-place", "leave_request", "appeal_banner"
    );
    const appealProps: AppealBannerProps = {titleItem, buttonItem, bannerItem};
    const titles = getTitleData(data.title, "our-works", "price-calculation");

    return (
        <>
            <CustomHead {...titleData}/>
            <Layout {...useLayoutProps(data)}>
                <HeroBanner {...bannerProps}/>
                <Features features={data.features}/>
                <OfferBanner offer={data.offerBanner.repairType}/>
                <Examples
                    cards={data.examplesCard}
                    title={titles["our-works"]}
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
                    title={titles["price-calculation"]}
                />

                <ProjectOffer
                    data={data.offerProject.repairType}
                    buttonData={buttonData.buttonHeader}
                    buttonStyle='button-black'
                />
                <Appeal {...appealProps}/>
            </Layout>
        </>
    );
};
export {getStaticProps};
export default Repairs;
