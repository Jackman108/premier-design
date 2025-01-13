import {getStaticProps} from '../api/dataProvider';
import styles from '../../styles/DocumetPage.module.css';
import Layout from "../../Layout/Layout";
import {useLayoutProps} from "../../hooks/useLayoutProps";
import {NextPage} from "next";
import {PageProps} from "../../interface/Page.props";
import BackButton from "../../components/UX/BackButton/BackButton";
import DocumentImage from "../../components/UX/DocumentImage/DocumentImage";
import PublicOfferContent from "../../components/Documents/PublicOfferContent";
import {getFullCanonicalUrl} from "../../utils/getFullCanonicalUrl";
import CustomHead from "../../components/CustomHead/CustomHead";

const PublicOfferPage: NextPage<PageProps> = ({data}) => {
    const layoutProps = useLayoutProps(data);
    const pageMeta = data.pageMeta['public-offer'];
    const fullCanonicalUrl = getFullCanonicalUrl(pageMeta.canonical);

    return (
        <>
            <CustomHead
                title={pageMeta.title}
                description={pageMeta.description}
                canonical={fullCanonicalUrl}
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
