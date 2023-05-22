import type { NextPage } from 'next';
import Layout from '../components/Layout/Layout';
import Approach from '../components/Approach/Approach';
import Appeal from '../components/Appeal/Appeal';
import AboutUs from '../components/AboutUs/AboutUs';
import OfferList from '../components/OfferList/OfferList';
import { getStaticProps } from './api/data';
import { findTitle } from './api/constants';
import CustomHead from '../components/helpers/CustomHead';

const About: NextPage<GetDataProps> = ({ data }): JSX.Element => {
    const { title = '', description = '' } = findTitle(data, 10) || {};
    return (
        <>
            <CustomHead title={'Premium Interior | О Компании'} description={'Ремонт и дизайн интерьеров в Беларуси'} />
            <Layout data={data}>
                <AboutUs
                    title={title}
                    description={description}
                    titleStyle='title-black'
                    descriptionStyle='description-black' />
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
