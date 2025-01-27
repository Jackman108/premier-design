import type {NextPage} from 'next';
import Layout from '../widgets/layout/ui/layout/Layout';
import {getStaticProps} from './api/dataProvider';
import {GetDataProps} from '../widgets/interface/interfaceData';
import {ReactElement} from "react";
import HeroBanner from "@features/banner/hero/ui/HeroBanner";
import {Address, Appeal} from '@shared/utils/dynamicImports';
import CustomHead from "../widgets/layout/seo/CustomHead/CustomHead";
import {useLayoutProps} from "../widgets/layout/hooks/useLayoutProps";
import {HeroBannerProps} from "@features/banner/hero/interface/HeroBannerProps";
import {usePageData} from "@shared/hooks/usePageData";
import {AppealBannerProps} from "@features/banner/appeal/interface/AppealBannerProps";

const Contacts: NextPage<GetDataProps> = ({data}): ReactElement => {
    const {titleItem: titleData, buttonItem: buttonData, bannerItem: bannerData} = usePageData(
        data.titlesPage, data.button, data.bannersImages,
        "contacts", "leave_request", "contacts_banner"
    );
    const bannerProps: HeroBannerProps = {titleData, buttonData, bannerData};

    const {titleItem, buttonItem, bannerItem} = usePageData(
        data.title, data.button, data.bannersImages,
        "create-best-place", "leave_request", "appeal_banner"
    );
    const appealProps: AppealBannerProps = {titleItem, buttonItem, bannerItem};

    return (
        <>
            <CustomHead {...titleData}/>
            <Layout {...useLayoutProps(data)}>
                <HeroBanner {...bannerProps}/>
                <Address/>
                <Appeal {...appealProps}/>
            </Layout>
        </>
    );
};
export {getStaticProps};
export default Contacts;