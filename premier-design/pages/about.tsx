import type { NextPage } from 'next';
import Layout from '../Layout/Layout';
import { getStaticProps } from './api/data';
import { bannerImageSettings, findButton, findTitle } from './api/constants';
import CustomHead from '../components/helpers/CustomHead';
import dynamic from 'next/dynamic';

const Banner = dynamic(() => import('../components/Banner/Banner'));
const OfferList = dynamic(() => import('../components/OfferList/OfferList'));
const Approach = dynamic(() => import('../components/Approach/Approach'));
const Appeal = dynamic(() => import('../components/Appeal/Appeal'));
const News = dynamic(() => import('../components/News/News'));

const About: NextPage<GetDataProps> = ({ data }): JSX.Element => {
    const { title = '', description = '' } = findTitle(data, 10) || {};
    const buttonHeader = findButton(data, 0);
    const bannerImg = bannerImageSettings(data, 4);

    return (
        <>
            <CustomHead title={'Premium Interior | О Компании'} description={'Ремонт и дизайн интерьеров в Беларуси'} />
            <Layout data={data}>
                <Banner
                    title={title}
                    description={description}
                    buttonHeader={buttonHeader}
                    bannerImg={bannerImg}
                />
                <News
                    news={data.news}
                    newsStyle='about'
                />
                <Approach
                    data={data}
                />
                <OfferList
                    data={data.offerList.filter(offer => offer.id === 2)}
                />
                <Appeal
                    data={data}
                />
            </Layout>
        </>
    );
};
export { getStaticProps };
export default About;
