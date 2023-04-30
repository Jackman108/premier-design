import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import Features from '../components/Features/Features';
import Services from '../components/Services/Services';
import Approach from '../components/Approach/Approach';
import Examples from '../components/Examples/Examples';
import Costing from '../components/Costing/Costing';
import Preloader from '../components/UX/Preloader/Preloader';
import Appeal from '../components/Appeal/Appeal';
import data from "../data/data.json";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Premium Interior - Ремонт и дизайн интерьеров в Беларуси</title>
        <meta
          name="description"
          content="Premium Interior - ремонт и дизайн интерьеров в Беларуси"
        />
      </Head>
      <Layout>
        <main>
          <section>
            <Banner />
            <Features  data={data} />
            <Services />
            <Approach/>
            <Examples/>
            <Costing/>
            <Preloader/>
            <Appeal/>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Home;