import {getStaticProps} from '../api/dataProvider';
import styles from '@features/documents-content/ui/documet-page/DocumetPage.module.css';
import Layout from "@widgets/layout/ui/layout/Layout";
import {useLayoutProps} from "@widgets/layout/hooks/useLayoutProps";
import {NextPage} from "next";
import BackButton from "@shared/ui/back-button/BackButton";
import DocumentImage from "@features/documents-content/ui/document-image/DocumentImage";
import PublicOfferContent from "@features/documents-content/ui/documet-page/PublicOfferContent";
import {getFullCanonicalUrl} from "@widgets/layout/seo/utils/getFullCanonicalUrl";
import CustomHead from "@widgets/layout/seo/CustomHead/CustomHead";
import {GetDataProps} from "@widgets/interface/interfaceData";
import {findItemByTitle} from "@shared/utils/findItemByTitle";
import {TitlePage} from "@shared/ui/title/interface/Title.props";

const PublicOfferPage: NextPage<GetDataProps> = ({data}) => {
    const layoutProps = useLayoutProps(data);
    const titleData = findItemByTitle(data.titlesPage, "public-offer") || {} as TitlePage;
    const fullCanonical = getFullCanonicalUrl(titleData.canonical);

    return (
        <>
            <CustomHead
                metaTitle={titleData.metaTitle}
                metaDescription={titleData.metaDescription}
                canonical={fullCanonical}
            />
            <Layout {...layoutProps}>
                <section className={styles.document}>
                    <div className={styles.document__container}>
                        <DocumentImage src='/logo.svg' alt='public-offer'/>
                        <PublicOfferContent/>
                    </div>
                    <BackButton/>
                </section>
            </Layout>
        </>
    );
};

export {getStaticProps};

export default PublicOfferPage;
