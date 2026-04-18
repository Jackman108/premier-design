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
    FaqSection,
    Features,
    OfferBanner,
    RelatedServices,
    Reviews,
    Services,
    StepsWork,
    LeadQuiz,
    TrustSignals,
    VideoSpotlight,
} from '@shared/utils/dynamicImports';
import {GetDataProps} from '@widgets/interface/interfaceData';
import {useLayoutProps} from '@widgets/layout/hooks/useLayoutProps';
import CustomHead from '@widgets/layout/seo/CustomHead/CustomHead';
import Layout from '@widgets/layout/ui/layout/Layout';

import HomePageChrome from '@widgets/home-page-chrome/ui/HomePageChrome';
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

    const bannerProps: HeroBannerProps = {
        titleData,
        buttonData,
        bannerData,
        highlights: data.homeHeroHighlights,
    };

    const titles = getTitleData(
        data.title,
        'services',
        'our-approach',
        'application-process',
        'our-works',
        'price-calculation',
        'related-services',
        'customer_reviews',
        'faq-section',
    );

    const faqForHead = data.faqContent.home.map((item) => ({
        question: item.question,
        answer: item.answer,
    }));

    return (
        <>
            <CustomHead
                {...titleData}
                faqForStructuredData={faqForHead}
                structuredDataRating={data.trustSignals.structuredDataRating}
            />
            <Layout {...useLayoutProps(data)}>
                <HomePageChrome/>
                <section id='home-hero' className={styles.heroShell}>
                    <HeroBanner {...bannerProps}/>
                </section>

                <section
                    id='home-features'
                    aria-label='Преимущества'
                    className={styles.featuresShell}
                    data-reveal='true'
                >
                    <Features features={data.features}/>
                </section>

                <section
                    id='home-offer'
                    aria-label='Специальное предложение'
                    className={`${styles.section} ${styles.reveal}`}
                    data-density='compact'
                    data-reveal='true'
                >
                    <OfferBanner ctaLabel={buttonData.buttonHeader} offer={data.offerBanner.homeType}/>
                </section>

                <section
                    id='home-services'
                    aria-label='Услуги'
                    className={`${styles.section} ${styles.reveal}`}
                    data-width='wide'
                    data-reveal='true'
                >
                    <Services
                        title={titles.services}
                        buttons={data.button}
                        servicesCard={data.servicesCard}
                    />
                </section>

                <section
                    id='home-approach'
                    aria-label='Наш подход'
                    className={`${styles.section} ${styles.reveal}`}
                    data-reveal='true'
                >
                    <Approach
                        title={titles['our-approach']}
                        cards={data.approachCard}
                    />
                </section>

                <section
                    id='home-steps'
                    aria-label='Этапы работы'
                    className={`${styles.section} ${styles.reveal}`}
                    data-density='compact'
                    data-reveal='true'
                >
                    <StepsWork
                        title={titles['application-process']}
                        stepsWork={data.stepsWork}
                    />
                </section>

                <section
                    id='home-examples'
                    aria-label='Примеры работ'
                    className={`${styles.section} ${styles.reveal}`}
                    data-width='wide'
                    data-reveal='true'
                >
                    <Examples
                        title={titles['our-works']}
                        cards={data.examplesCard}
                    />
                </section>

                <section
                    id='home-trust'
                    aria-label='Почему нам доверяют'
                    className={`${styles.section} ${styles.reveal}`}
                    data-reveal='true'
                >
                    <TrustSignals
                        reviews={data.reviews}
                        features={data.features}
                        metrics={data.trustSignals.metrics}
                    />
                </section>

                {data.homeVideoSpotlight.youtubeId.trim() ? (
                    <section
                        className={`${styles.section} ${styles.reveal}`}
                        data-reveal='true'
                    >
                        <VideoSpotlight
                            sectionId='home-video-spotlight'
                            title={data.homeVideoSpotlight.title}
                            description={data.homeVideoSpotlight.description}
                            youtubeId={data.homeVideoSpotlight.youtubeId}
                        />
                    </section>
                ) : null}

                <section
                    id='home-costing'
                    aria-label='Расчёт стоимости'
                    className={`${styles.section} ${styles.reveal}`}
                    data-density='compact'
                    data-reveal='true'
                >
                    <Costing
                        title={titles['price-calculation']}
                        cards={data.costingCard}
                    />
                </section>

                <section
                    id='home-related'
                    aria-label='Сопутствующие услуги'
                    className={`${styles.section} ${styles.reveal}`}
                    data-reveal='true'
                >
                    <RelatedServices
                        title={titles['related-services']}
                        relatedServices={data.relatedServices}
                    />
                </section>

                <section
                    aria-label='Частые вопросы'
                    className={`${styles.section} ${styles.reveal}`}
                    data-density='compact'
                    data-reveal='true'
                >
                    <FaqSection
                        sectionId='home-faq'
                        title={titles['faq-section']}
                        items={data.faqContent.home}
                    />
                </section>

                <section
                    id='home-reviews'
                    aria-label='Отзывы клиентов'
                    className={`${styles.section} ${styles.reveal}`}
                    data-reveal='true'
                >
                    <Reviews
                        title={titles.customer_reviews}
                        reviews={data.reviews}
                    />
                </section>

                <section
                    className={`${styles.section} ${styles.reveal}`}
                    data-density='compact'
                    data-reveal='true'
                >
                    <LeadQuiz ctaLabel={buttonData.buttonHeader}/>
                </section>

                <section
                    id='home-appeal'
                    aria-label='Оставить заявку'
                    className={`${styles.section} ${styles.reveal}`}
                    data-density='compact'
                    data-reveal='true'
                >
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
