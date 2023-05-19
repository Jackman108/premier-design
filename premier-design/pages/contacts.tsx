import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Appeal from '../components/Appeal/Appeal';
import YandexMap from '../components/YandexMap/YandexMap';
import Address from '../components/Address/Address';
import { getData } from './api/data';
import { FC } from 'react';

const Contacts: FC<NextPage & DataProps> = (): JSX.Element => {
    const data = getData();
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
                <Appeal
                    data={data}
                />
            </Layout>
        </>
    );
};

export default Contacts;