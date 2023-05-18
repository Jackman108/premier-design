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

const Home: React.FC<NextPage & DataProps> = (): JSX.Element => {
  const findTitle = data.title.find((item) => item.id === 1);
  const { title = '', description = '' } = findTitle || {};
  const findButton = data.button[1]?.buttonHeader ?? '';
  const bannerImageSettings: BannerImagesProps = data.bannersImages[2];

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
          <Banner
            title={title}
            description={description}
            titleStyle='title-white'
            descriptionStyle='description-white'
            buttonHeader={findButton}
            bannerImg={bannerImageSettings}
            buttonStyle='button-white'
          />
          <Features data={data} />
          <Services
            buttonStyle='button-black'
          />
          <Approach />
          <Examples />
          <Costing />
          <Preloader />
          <Appeal           
          />
        </main>
      </Layout>
    </>
  );
};

export default Home;