import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';

const About: React.FC<NextPage & DataProps> = (): JSX.Element => {
    return (
        <>
            <Head>
                <title>О нас</title>
                <meta name="description" content="Информация о нашей компании" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <h1>О нас</h1>
                <p>Мы - компания, занимающаяся продажей и монтажом окон в Москве и Московской области.</p>
                <p>Наша цель - обеспечить наших клиентов качественными окнами по адекватной цене.</p>
            </Layout>
        </>
    );
};

export default About;
