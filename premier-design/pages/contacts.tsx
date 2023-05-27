import type { NextPage } from 'next';
import Layout from '../Layout/Layout';
import { getStaticProps } from './api/data';
import CustomHead from '../components/helpers/CustomHead';
import dynamic from 'next/dynamic';
import  {GetDataProps}  from '../interface/interfaceData';

const Address = dynamic(() => import('../components/Address/Address'));
const YandexMap = dynamic(() => import('../components/YandexMap/YandexMap'));
const Appeal = dynamic(() => import('../components/Appeal/Appeal'));

const Contacts: NextPage<GetDataProps> = ({ data }): JSX.Element => {
    return (
        <>
            <CustomHead title={'Premium Interior | Контакты'} description={'Ремонт и дизайн интерьеров в Беларуси'} />
            <Layout data={data}>
                <Address />
                <YandexMap />
                <Appeal
                    data={data}
                />
            </Layout>
        </>
    );
};
export { getStaticProps };
export default Contacts;