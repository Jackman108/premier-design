import type { NextPage } from 'next';
import Layout from '../Layout/Layout';
import { getStaticProps } from './api/data';
import { findTitle, bannerImageSettings, findButton } from './api/constants';
import CustomHead from '../components/helpers/CustomHead';
import dynamic from 'next/dynamic';
import  {GetDataProps}  from '../interface/interfaceData';

const Banner = dynamic(() => import('../components/Banner/Banner'));
const OfferList = dynamic(() => import('../components/OfferList/OfferList'));
const ProjectOffer = dynamic(() => import('../components/ProjectOffer/ProjectOffer'));
const Appeal = dynamic(() => import('../components/Appeal/Appeal'));

const Repairs: NextPage<GetDataProps> = ({ data }): JSX.Element => {
    const { title = '', description = '' } = findTitle(data, 9) || {};
    const buttonHeader = findButton(data, 0);
    const bannerImg = bannerImageSettings(data, 2);
    return (
        <>
            <CustomHead title={'Premium Interior | Ремонт интерьеров'} description={'Ремонт и дизайн интерьеров в Беларуси'} />
            <Layout data={data}>
                <Banner
                    title={title}
                    description={description}
                    buttonHeader={buttonHeader}
                    buttonStyle='button-white'
                    bannerImg={bannerImg}
                />
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
