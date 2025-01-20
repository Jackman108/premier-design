import {getStaticProps} from '../api/dataProvider';
import styles from '../../styles/DocumetPage.module.css';
import Layout from "../../Layout/Layout";
import {useLayoutProps} from "../../hooks/useLayoutProps";
import {NextPage} from "next";
import BackButton from "../../components/UX/BackButton/BackButton";
import DocumentImage from "../../components/UX/DocumentImage/DocumentImage";
import PrivacyPolicyContent from "../../components/Documents/PrivacyPolicyContent";
import CustomHead from "../../components/CustomHead/CustomHead";
import {getFullCanonicalUrl} from "../../utils/getFullCanonicalUrl";
import {GetDataProps} from "../../interface/interfaceData";
import {findItemByTitle} from "../../utils/findItemByTitle";
import {TitlePage} from "../../interface/Title.props";

const PrivacyPolicyPage: NextPage<GetDataProps> = ({data}) => {
    const layoutProps = useLayoutProps(data);
    const titleData = findItemByTitle(data.titlesPage, "privacy-policy") || {} as TitlePage;
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
                        <DocumentImage src='/logo.svg' alt='privacy-policy'/>
                        <PrivacyPolicyContent/>
                    </div>
                    <BackButton/>
                </section>
            </Layout>
        </>
    );
};

export {getStaticProps};

export default PrivacyPolicyPage;
