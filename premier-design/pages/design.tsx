import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import data from "../data/data.json";
import bannerImg from '../public/banner-design.png';



const Design: NextPage = () => {
    const findTitle = data.title.find((item) => item.id === 7);
    const { title = '', description = '' } = findTitle || {};

    const findButton = data.button[1] ?? { buttonHeader: '' };
    const { buttonHeader: buttonTitle = '' } = findButton;

    const bannerImageProps = {
        src: bannerImg,
        alt: 'Banner Image',
        quality: 100,
    };
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
                            buttonHeader={buttonTitle}
                            bannerImg={bannerImageProps}
                            titleStyle='title-white'
                            descriptionStyle='description-white'
                        />
                    </section>
                </main>
            </Layout>
        </>
    );
};

export default Design;