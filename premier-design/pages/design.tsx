import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Services from '../components/Services/Services';

const Portfolio: NextPage = () => {
    return (
        <>
            <Head>
                <title>Услуги дизайна интерьеров</title>
                <meta name="description" content="Наши проекты по ремонту и дизайну интерьеров" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <main>
                    <section>
                        <Services />
                    </section>
                </main>               
            </Layout>
        </>
    );
};

export default Portfolio;