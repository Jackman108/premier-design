import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import Approach from '../components/Approach/Approach';
import Preloader from '../components/UX/Preloader/Preloader';
import { getData } from "./api/data";
import Features from '../components/Features/Features';
import Examples from '../components/Examples/Examples';
import Costing from '../components/Costing/Costing';
import Appeal from '../components/Appeal/Appeal';
import Services from '../components/Services/Services';

interface HomeProps {
  data: DataProps;
}

const Home: NextPage<HomeProps> = ({ data }) => {
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
      <Layout data={data}>
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
          <Features features={data.features} />
          <Services data={data} />
          <Approach data={data} />
          <Examples data={data} />
          <Costing data={data} />
          <Preloader />
          <Appeal data={data} />
        </main>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const data: DataProps = await getData(); 
  return {
    props: {
      data,
    },
  };
};

export default Home;