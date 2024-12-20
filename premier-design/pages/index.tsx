import {NextPage} from 'next';
import Layout from '../Layout/Layout';
import {getStaticProps} from './api/dataProvider';
import {PageProps} from '../interface/ExampleCards.props';
import Banner from "../components/Banner/Banner";
import {usePageData} from "../hooks/usePageData";
import {Appeal, Approach, Costing, Examples, Features, Services} from '../components';
import CustomHead from "../components/CustomHead/CustomHead";

const Home: NextPage<PageProps> = ({data, enableSlider = true}) => {
    const {titleData, buttonData, bannerData} = usePageData(data, "repair-and-design", "leave_request", "home_banner");
    const pageMeta = data.pageMeta['home'];

    return (
        <>
            <CustomHead title={pageMeta.title} description={pageMeta.description}/>
            <Layout data={data}>
                <Banner
                    titleData={titleData}
                    buttonData={buttonData}
                    bannerData={bannerData}
                    buttonStyle='button-white'
                />
                <Features features={data.features}/>
                <Services data={data}/>
                <Approach data={data}/>
                <Examples data={data} enableSlider={enableSlider}/>
                <Costing data={data}/>
                <Appeal data={data}/>
            </Layout>
        </>
    );
};
export {getStaticProps};
export default Home;