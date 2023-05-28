import type { NextPage } from 'next';
import Layout from '../Layout/Layout';
import { getStaticProps } from './api/data';
import CustomHead from '../components/helpers/CustomHead';
import dynamic from 'next/dynamic';
import  {GetDataProps}  from '../interface/interfaceData';
import { bannerImageSettings, findButton, findTitle } from './api/constants';

const Banner = dynamic(() => import('../components/Banner/Banner'));
const Address = dynamic(() => import('../components/Address/Address'));
const Appeal = dynamic(() => import('../components/Appeal/Appeal'));

const Contacts: NextPage<GetDataProps> = ({ data }): JSX.Element => {
    const { title = '', description = '' } = findTitle(data, 11) || {};
    const buttonHeader = findButton(data, 0);
    const bannerImg = bannerImageSettings(data, 4);
    return (
        <>
            <CustomHead title={'Premium Interior | Контакты'} description={'Ремонт и дизайн интерьеров в Беларуси'} />
            <Layout data={data}>
            <Banner
                    title={title}
                    description={description}
                    buttonHeader={buttonHeader}
                    buttonStyle={'button-white'}
                    bannerImg={bannerImg}
                />
                <Address />              
                <Appeal
                    data={data}
                />
            </Layout>
        </>
    );
};
export { getStaticProps };
export default Contacts;