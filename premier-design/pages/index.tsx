import { NextPage } from 'next';
import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import Approach from '../components/Approach/Approach';
import Features from '../components/Features/Features';
import Examples from '../components/Examples/Examples';
import Costing from '../components/Costing/Costing';
import Appeal from '../components/Appeal/Appeal';
import Services from '../components/Services/Services';
import { getStaticProps } from './api/data';
import { findTitle, bannerImageSettings, findButton } from './api/constants';
import CustomHead from '../components/helpers/CustomHead';

const Home: NextPage<GetDataProps> = ({ data }) => {
  const { title = '', description = '' } = findTitle(data, 1) || {};
  const buttonHeader = findButton(data, 0);
  const bannerImg = bannerImageSettings(data, 2);
  return (
    <>
            <CustomHead title={'Premium Interior | Главная'} description={'Ремонт и дизайн интерьеров в Беларуси'} />
        <Layout data={data}>
          <Banner
            title={title}
            description={description}
            buttonHeader={buttonHeader}
            bannerImg={bannerImg}
          />
          <Features features={data.features} />
          <Services data={data} />
          <Approach data={data} />
          <Examples data={data} />
          <Costing data={data} />
          <Appeal data={data} />
        </Layout>
      </>
      );
};
      export {getStaticProps};
      export default Home;