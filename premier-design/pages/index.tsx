import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import { getStaticProps } from './api/data';
import { findTitle, bannerImageSettings, findButton } from './api/constants';
import CustomHead from '../components/helpers/CustomHead';

const Examples = dynamic(() => import('../components/Examples/Examples'));
const Services = dynamic(() => import('../components/Services/Services'));
const Costing = dynamic(() => import('../components/Costing/Costing'));
const Appeal = dynamic(() => import('../components/Appeal/Appeal'));
const Approach = dynamic(() => import('../components/Approach/Approach'));
const Features = dynamic(() => import('../components/Features/Features'));

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
export { getStaticProps };
export default Home;