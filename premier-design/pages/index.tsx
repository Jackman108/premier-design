import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import Features from '../components/Features/Features';
import Services from '../components/Services/Services';
import Approach from '../components/Approach/Approach';
import Examples from '../components/Examples/Examples';
import Costing from '../components/Costing/Costing';

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
            <Approach/>
            <Examples/>
            <Costing/>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Home;