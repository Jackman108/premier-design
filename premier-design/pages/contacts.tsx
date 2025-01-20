import type {NextPage} from 'next';
import Layout from '../Layout/Layout';
import {getStaticProps} from './api/dataProvider';
import {GetDataProps} from '../interface/interfaceData';
import {ReactElement} from "react";
import Banner from "../components/Banner/Banner";
import {Address, Appeal} from '../components';
import CustomHead from "../components/CustomHead/CustomHead";
import {useLayoutProps} from "../hooks/useLayoutProps";
import {BannerProps} from "../interface/Banner.props";
import {usePageData} from "../hooks/usePageData";
import {AppealProps} from "../interface/Appeal.props";

const Contacts: NextPage<GetDataProps> = ({data}): ReactElement => {
    const {titleItem: titleData, buttonItem: buttonData, bannerItem: bannerData} = usePageData(
        data.titlesPage, data.button, data.bannersImages,
        "contacts", "leave_request", "contacts_banner"
    );
    const bannerProps: BannerProps = {titleData, buttonData, bannerData};

    const {titleItem, buttonItem, bannerItem} = usePageData(
        data.title, data.button, data.bannersImages,
        "our-partners", "leave_request", "appeal_banner"
    );
    const appealProps: AppealProps = {titleItem, buttonItem, bannerItem};

    return (
        <>
            <CustomHead {...titleData}/>
            <Layout {...useLayoutProps(data)}>
                <Banner {...bannerProps}/>
                <Address/>
                <Appeal {...appealProps}/>
            </Layout>
        </>
    );
};
export {getStaticProps};
export default Contacts;