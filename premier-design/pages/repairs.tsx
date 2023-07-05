import type { NextPage } from 'next';
import CustomHead from '../components/helpers/CustomHead';
import Layout from '../Layout/Layout';
import { findButton, bannerImageSettings, findTitle } from './api/constants';
import { getStaticProps } from './api/data';
import dynamic from 'next/dynamic';
import { PageProps } from '../interface/ExampleCards.props';
import Examples from '../components/Examples/Examples';

const Banner = dynamic(() => import('../components/Banner/Banner'));
const OfferList = dynamic(() => import('../components/OfferList/OfferList'));
const ProjectOffer = dynamic(() => import('../components/ProjectOffer/ProjectOffer'));
const Appeal = dynamic(() => import('../components/Appeal/Appeal'));

// Определение типа страницы и получение данных
const Repairs: NextPage<PageProps> = ({ data, enableSlider = false }): JSX.Element => {
    const { title = '', description = '' } = findTitle(data, 9) || {};
    const buttonHeader = findButton(data, 0);
    const bannerImg = bannerImageSettings(data, 2);
    return (
        <>
            {/* Установка мета-тегов */}
            <CustomHead title={'Premium Interior | Ремонт интерьеров'} description={'Ремонт и дизайн интерьеров в Беларуси'} />
            <Layout data={data}>
                <Banner
                    title={title}
                    description={description}
                    buttonHeader={buttonHeader}
                    buttonStyle='button-white'
                    bannerImg={bannerImg}
                />
                <Examples data={data} enableSlider={enableSlider} />
                <OfferList data={data.offerList.filter(offer => offer.id === 2)}
                />
                <ProjectOffer
                    data={data.offerProject.repairType}
                    buttonHeader={buttonHeader}
                    buttonStyle='button-black'
                />
                <Appeal data={data} />
            </Layout>
        </>
    );
};
export { getStaticProps };
export default Repairs;
