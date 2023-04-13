import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Form from '../components/Form/Form';
import type { FormProps } from '../components/Form/Form.props';

const Contacts: NextPage = () => {
    const handleSubmit: FormProps['onSubmit'] = (e) => {
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
                <Form onSubmit={handleSubmit}/>
            </Layout>
        </>
    );
};

export default Contacts;