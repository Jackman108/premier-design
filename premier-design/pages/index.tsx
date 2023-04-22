import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import Features from '../components/Features/Features';
import Services from '../components/Services/Services';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pro Ремонт - Ремонт и дизайн интерьеров в Беларуси</title>
        <meta
          name="description"
          content="Pro Ремонт - ремонт и дизайн интерьеров в Беларуси"
        />
      </Head>
      <Layout>
        <main>
          <section>
            <Banner />
            <Features />
            <Services/>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Home;