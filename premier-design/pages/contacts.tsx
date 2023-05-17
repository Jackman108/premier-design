import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Appeal from '../components/Appeal/Appeal';
import YandexMap from '../components/YandexMap/YandexMap';
import Address from '../components/Address/Address';

const Contacts: React.FC<NextPage & DataProps> = (): JSX.Element => {
    return (
        <>
            <Head>
                <title>Контакты</title>
                <meta name="description" content="Контакты нашей компании" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <Address />
                <YandexMap />
                <Appeal />
            </Layout>
        </>
    );
};

export default Contacts;