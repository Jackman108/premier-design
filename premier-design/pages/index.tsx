import {NextPage} from 'next';

import {HeroBannerProps} from '@features/banner/hero/interface/HeroBannerProps';
import HeroBanner from '@features/banner/hero/ui/HeroBanner';
import {getStaticProps} from '@lib/getStaticData';
import {usePageData} from '@shared/hooks/usePageData';
import {useScrollReveal} from '@shared/hooks/useScrollReveal';
import {getTitleData} from '@shared/utils/findItemByTitle';
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
    StepsWork,
    LeadQuiz,
    TrustSignals,
} from '@shared/utils/dynamicImports';
import {GetDataProps} from '@widgets/interface/interfaceData';
import {useLayoutProps} from '@widgets/layout/hooks/useLayoutProps';
import CustomHead from '@widgets/layout/seo/CustomHead/CustomHead';
import Layout from '@widgets/layout/ui/layout/Layout';

import styles from './HomePage.module.css';

const Home: NextPage<GetDataProps> = ({data}) => {
    useScrollReveal();

    const {titleItem: titleData, buttonItem: buttonData, bannerItem: bannerData} = usePageData(
        data.titlesPage,
        data.button,
        data.bannersImages,
        'home',
        'leave_request',
        'home_banner',
    );

    const bannerProps: HeroBannerProps = {titleData, buttonData, bannerData};

    const titles = getTitleData(
        data.title,
        'services',
        'our-approach',
        'application-process',
        'our-works',
        'price-calculation',
        'related-services',
        'customer_reviews',
    );

    return (
        <>
            <CustomHead {...titleData}/>
            <Layout {...useLayoutProps(data)}>
                <section className={styles.heroShell}>
                    <HeroBanner {...bannerProps}/>
                </section>

                <section className={`${styles.section} ${styles.reveal}`} data-align='left' data-reveal='true'>
                    <Features features={data.features}/>
                </section>

                <section className={`${styles.section} ${styles.reveal}`} data-align='right' data-density='compact' data-reveal='true'>
                    <OfferBanner offer={data.offerBanner.homeType}/>
                </section>

                <section className={`${styles.section} ${styles.reveal}`} data-width='wide' data-reveal='true'>
                    <Services
                        title={titles.services}
                        buttons={data.button}
                        servicesCard={data.servicesCard}
                    />
                </section>

                <section className={`${styles.section} ${styles.reveal}`} data-align='left' data-reveal='true'>
                    <Approach
                        title={titles['our-approach']}
                        cards={data.approachCard}
                    />
                </section>

                <section className={`${styles.section} ${styles.reveal}`} data-align='right' data-density='compact' data-reveal='true'>
                    <StepsWork
                        title={titles['application-process']}
                        stepsWork={data.stepsWork}
                    />
                </section>

                <section className={`${styles.section} ${styles.reveal}`} data-width='wide' data-reveal='true'>
                    <Examples
                        title={titles['our-works']}
                        cards={data.examplesCard}
                    />
                </section>

                <section className={`${styles.section} ${styles.reveal}`} data-align='right' data-reveal='true'>
                    <TrustSignals reviews={data.reviews} features={data.features}/>
                </section>

                <section className={`${styles.section} ${styles.reveal}`} data-align='left' data-density='compact' data-reveal='true'>
                    <Costing
                        title={titles['price-calculation']}
                        cards={data.costingCard}
                    />
                </section>

                <section className={`${styles.section} ${styles.reveal}`} data-align='right' data-reveal='true'>
                    <RelatedServices
                        title={titles['related-services']}
                        relatedServices={data.relatedServices}
                    />
                </section>

                <section className={`${styles.section} ${styles.reveal}`} data-align='left' data-density='compact' data-reveal='true'>
                    <LeadQuiz ctaLabel={buttonData.buttonHeader}/>
                </section>

                <section className={`${styles.section} ${styles.reveal}`} data-align='right' data-reveal='true'>
                    <Reviews
                        title={titles.customer_reviews}
                        reviews={data.reviews}
                    />
                </section>

                <section className={`${styles.section} ${styles.reveal}`} data-align='left' data-density='compact' data-reveal='true'>
                    <Appeal
                        {...usePageData(
                            data.title,
                            data.button,
                            data.bannersImages,
                            'create-best-place',
                            'leave_request',
                            'appeal_banner',
                        )}
                    />
                </section>
            </Layout>
        </>
    );
};

export {getStaticProps};
export default Home;
