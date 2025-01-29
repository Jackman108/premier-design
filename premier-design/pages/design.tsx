import type {NextPage} from 'next';
import Layout from '@widgets/layout/ui/layout/Layout';
import {getStaticProps} from './api/dataProvider';
import {ReactElement} from "react";
import HeroBanner from "@features/banner/hero/ui/HeroBanner";
import {Appeal, Costing, Examples, Features, OfferBanner, ProjectOffer} from '@shared/utils/dynamicImports';
import CustomHead from "@widgets/layout/seo/CustomHead/CustomHead";
import {useLayoutProps} from "@widgets/layout/hooks/useLayoutProps";
import {GetDataProps} from "@widgets/interface/interfaceData";
import {HeroBannerProps} from "@features/banner/hero/interface/HeroBannerProps";
import {usePageData} from "@shared/hooks/usePageData";
import {getTitleData} from "@shared/utils/findItemByTitle";

const Design: NextPage<GetDataProps> = ({data}): ReactElement => {
    const {titleItem: titleData, buttonItem: buttonData, bannerItem: bannerData} = usePageData(
        data.titlesPage, data.button, data.bannersImages,
        "design", "order_project", "design_banner"
    );
    const bannerProps: HeroBannerProps = {titleData, buttonData, bannerData};

    const titles = getTitleData(data.title, "our-works", "price-calculation");

    return (
        <>
            <CustomHead {...titleData}/>
            <Layout {...useLayoutProps(data)}>
                <HeroBanner {...bannerProps}/>
                <Features features={data.features}/>
                <OfferBanner offer={data.offerBanner.designType}/>
                <Examples
                    title={titles["our-works"]}
                    cards={data.examplesCard}
                />
                <Costing
                    title={titles["price-calculation"]}
                    cards={data.costingCard}
                />
                <ProjectOffer
                    data={data.offerProject.designType}
                    buttonData={buttonData.buttonHeader}
                    buttonStyle='button-black'
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
export default Design;