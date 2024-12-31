import type {NextPage} from 'next';
import Layout from '../Layout/Layout';
import {getStaticProps} from './api/dataProvider';
import {GetDataProps} from '../interface/interfaceData';
import {ReactElement} from "react";
import {usePageData} from "../hooks/usePageData";
import Banner from "../components/Banner/Banner";
import {Address, Appeal} from '../components';
import CustomHead from "../components/CustomHead/CustomHead";
import {getFullCanonicalUrl} from "../utils/findService";

const Contacts: NextPage<GetDataProps> = ({data}): ReactElement => {
    const {
        titleData,
        buttonData,
        bannerData
    } = usePageData(data, "we-are-here-to-help", "leave_request", "contacts_banner");
    const pageMeta = data.pageMeta['contacts'];
    const fullCanonicalUrl = getFullCanonicalUrl(pageMeta.canonical);

    return (
        <>
            <CustomHead
                title={pageMeta.title}
                description={pageMeta.description}
                canonical={fullCanonicalUrl}
            />
            <Layout data={data}>
                <Banner
                    titleData={titleData}
                    buttonData={buttonData}
                    bannerData={bannerData}
                    buttonStyle='button-white'
                />
                <Address/>
                <Appeal
                    data={data}
                />
            </Layout>
        </>
    );
};
export {getStaticProps};
export default Contacts;