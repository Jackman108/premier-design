import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Approach from '../components/Approach/Approach';
import Appeal from '../components/Appeal/Appeal';
import AboutUs from '../components/AboutUs/AboutUs';
import data from "../data/data.json";
import OfferList from '../components/OfferList/OfferList';

const About: React.FC<NextPage & DataProps> = (): JSX.Element => {
    const findTitle = data.title.find((item) => item.id === 10);
    const { title = '', description = '' } = findTitle || {};


    return (
        <>
            <Head>
                <title>О нас</title>
                <meta name="description" content="Информация о нашей компании" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <AboutUs
                    title={title}
                    description={description}
                    titleStyle='title-black'
                    descriptionStyle='description-black' />
                <Approach />
                <OfferList
                    data={data.offerList.filter(offer => offer.id === 2)}
                />
                <Appeal />
            </Layout>
        </>
    );
};

export default About;
