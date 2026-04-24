import type {NextPage} from 'next';
import Layout from '@widgets/layout/ui/layout/Layout';
import {getStaticProps} from '@lib/getStaticData';
import {ReactElement} from "react";
import {HeroBanner} from '@features/banner';
import {
    Appeal,
    BusinessServices,
    Category,
    Costing,
    Examples,
    FaqSection,
    Features,
    OfferBanner,
    ProjectOffer
} from '@lib/dynamicSectionImports';
import CustomHead from "@widgets/layout/seo/CustomHead/CustomHead";
import {useLayoutProps} from "@widgets/layout/hooks/useLayoutProps";
import {GetDataProps} from "@widgets/interface/interfaceData";
import type {HeroBannerProps} from '@features/banner';
import {selectAppealSectionData, usePageData} from '@shared/hooks/usePageData';
import {getTitleData} from '@shared/utils/findItemByTitle';
import {mapFaqEntriesToStructuredData} from '@shared/utils/faqStructuredData';

const Repairs: NextPage<GetDataProps> = ({data}): ReactElement => {
    const {titleItem: titleData, buttonItem: buttonData, bannerItem: bannerData} = usePageData(
        data.titlesPage, data.button, data.bannersImages,
        "repairs", "leave_request", "repair_banner"
    );
    const bannerProps: HeroBannerProps = {titleData, buttonData, bannerData};

    const titles = getTitleData(data.title, "our-works", "price-calculation", "faq-section");
    const faqForHead = mapFaqEntriesToStructuredData(data.faqContent.repairs);

    return (
        <>
            <CustomHead
                {...titleData}
                faqForStructuredData={faqForHead}
                structuredDataRating={data.trustSignals.structuredDataRating}
            />
            <Layout {...useLayoutProps(data)}>
                <HeroBanner {...bannerProps}/>
                <Features features={data.features}/>
                <OfferBanner ctaLabel={buttonData.buttonHeader} offer={data.offerBanner.repairType}/>
                <Examples
                    title={titles["our-works"]}
                    cards={data.examplesCard}
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
                    title={titles["price-calculation"]}
                    cards={data.costingCard}
                />
                <ProjectOffer
                    data={data.offerProject.repairType}
                    buttonData={buttonData.buttonHeader}
                    buttonStyle='button-black'
                />
                <FaqSection
                    sectionId='repairs-faq'
                    title={titles['faq-section']}
                    items={data.faqContent.repairs}
                />
                <Appeal {...selectAppealSectionData(data.title, data.button, data.bannersImages)} />
            </Layout>
        </>
    );
};
export {getStaticProps};
export default Repairs;
