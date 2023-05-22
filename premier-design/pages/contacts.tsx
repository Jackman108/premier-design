import type { NextPage } from 'next';
import Layout from '../components/Layout/Layout';
import Appeal from '../components/Appeal/Appeal';
import YandexMap from '../components/YandexMap/YandexMap';
import Address from '../components/Address/Address';
import { getStaticProps } from './api/data';
import CustomHead from '../components/helpers/CustomHead';

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