import type { NextPage } from 'next';
import Layout from '../Layout/Layout';
import { getStaticProps } from './api/data';
import { findTitle, bannerImageSettings, findButton } from './api/constants';
import CustomHead from '../components/helpers/CustomHead';
import dynamic from 'next/dynamic';

const Banner = dynamic(() => import('../components/Banner/Banner'));
const OfferList = dynamic(() => import('../components/OfferList/OfferList'));
const ProjectOffer = dynamic(() => import('../components/ProjectOffer/ProjectOffer'));
const Examples = dynamic(() => import('../components/Examples/Examples'));
const Appeal = dynamic(() => import('../components/Appeal/Appeal'));

const Design: NextPage<GetDataProps> = ({data}): JSX.Element => {
    const { title = '', description = '' } = findTitle(data, 7) || {};
    const buttonHeader = findButton(data, 1);
    const bannerImg = bannerImageSettings(data, 0); 
    return (
        <>
            <CustomHead title={'Premium Interior | Дизайн интерьеров'} description={'Ремонт и дизайн интерьеров в Беларуси'} />
            <Layout data={data}>
                    <Banner
                        title={title}
                        description={description}
                        buttonHeader={buttonHeader}
                        bannerImg={bannerImg}                      
                    />
                    <OfferList data={data.offerList.filter((offer) => offer.id === 1)} />
                    <Examples data={data} />
                    <ProjectOffer
                        data={data.offerProject.designType}
                        buttonHeader={buttonHeader}
                        buttonStyle='button-black'
                    />
                    <Appeal data={data} />
            </Layout>
        </>
    );
};
export { getStaticProps };
export default Design;