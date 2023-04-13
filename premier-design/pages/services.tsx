import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';

const Services: NextPage = () => {
    return (
        <>
            <Head>
                <title>Услуги</title>
                <meta name="description" content="Услуги, предоставляемые нашей компанией" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <h1>Услуги</h1>
                <ul>
                    <li>Продажа окон</li>
                    <li>Монтаж окон</li>
                    <li>Ремонт окон</li>
                    <li>Замена стеклопакетов</li>
                    <li>Изготовление окон на заказ</li>
                </ul>
            </Layout>
        </>
    );
};

export default Services;
