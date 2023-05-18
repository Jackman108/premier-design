import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import data from "../data/data.json";
import OfferList from '../components/OfferList/OfferList';
import ProjectOffer from '../components/ProjectOffer/ProjectOffer';
import Examples from '../components/Examples/Examples';
import Appeal from '../components/Appeal/Appeal';

const Design: React.FC<NextPage & DataProps> = (): JSX.Element => {
    const findTitle = data.title.find((item) => item.id === 7);
    const { title = '', description = '' } = findTitle || {};
    const findButton = data.button[1]?.buttonHeader ?? '';
    const bannerImageSettings: BannerImagesProps = data.bannersImages[0];
    return (
        <>
            <Head>
                <title>Дизайн интерьеров в Беларуси</title>
                <meta name="description" content="Наши проекты по дизайну интерьеров" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <main>
                    <section>
                        <Banner
                            buttonStyle='button-white'
                            title={title}
                            description={description}
                            buttonHeader={findButton}
                            bannerImg={bannerImageSettings}
                            titleStyle='title-white'
                            descriptionStyle='description-white'
                        />
                        <OfferList
                            data={data.offerList.filter((offer) => offer.id === 1)}
                        />
                        <Examples />
                        <ProjectOffer
                            data={data.offerProject.designType}
                            buttonHeader={findButton}
                            buttonStyle='button-black'
                        />
                        <Appeal />

                    </section>
                </main>
            </Layout>
        </>
    );
};

export default Design;