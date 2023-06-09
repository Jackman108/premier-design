import type { NextPage } from 'next';
import Layout from '../Layout/Layout';
import { getStaticProps } from './api/data';
import { bannerImageSettings, findButton, findTitle } from './api/constants';
import CustomHead from '../components/helpers/CustomHead';
import dynamic from 'next/dynamic';
import { GetDataProps } from '../interface/interfaceData';
import Partners from '../components/Partners/Partners';
import WorkStages from '../components/WorkStages/WorkStages';

const Banner = dynamic(() => import('../components/Banner/Banner'));
const OfferList = dynamic(() => import('../components/OfferList/OfferList'));
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
                    buttonStyle={'button-white'}
                    bannerImg={bannerImg}
                />
                <News
                    news={data.news}
                    newsStyle='about'
                />

                <OfferList
                    data={data.offerList.filter(offer => offer.id === 3)}
                />
                <Partners
                    data={data}
                />
                <WorkStages
                data={data}/>
                <Appeal
                    data={data}
                />
            </Layout>
        </>
    );
};
export { getStaticProps };
export default About;
