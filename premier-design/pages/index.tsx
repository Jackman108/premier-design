import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import Features from '../components/Features/Features';
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Premium Repair - ремонт и дизайн интерьеров</title>
        <meta
          name="description"
          content="Premium Repair - ремонт и дизайн интерьеров в Москве и МО"
        />
      </Head>
      <Layout>
        <main>
          <section>
            <Banner
              title="Premium Repair"
              description="Мы занимаемся ремонтом и дизайном интерьеров в Москве и Московской области"
            />
            <Features />
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Home;