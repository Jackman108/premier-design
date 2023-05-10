import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import FeedbackForm from '../components/FeedbackForm/FeedbackForm';
import { FeedbackFormProps } from '../components/FeedbackForm/FeedbackForm.props';

const Contacts: React.FC<NextPage & DataProps> = (): JSX.Element => {
    const handleSubmit: FeedbackFormProps['onSubmit'] = (e) => {
        e.preventDefault();
        console.log('Form submitted!');
    };
    return (
        <>
            <Head>
                <title>Контакты</title>
                <meta name="description" content="Контакты нашей компании" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <h1>Контакты</h1>
                <p>Наш адрес: г. Москва, ул. Ленина, д. 10, офис 123</p>
                <p>Телефон: +7 (999) 123-45-67</p>
                <FeedbackForm onSubmit={handleSubmit} />
            </Layout>
        </>
    );
};

export default Contacts;