import Head from 'next/head';

const CustomHead = ({ title, description }: { title: string, description: string }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href="/favicon.webp" />
        </Head>
    );
};

export default CustomHead;
