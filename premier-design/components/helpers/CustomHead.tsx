import Head from 'next/head';

const CustomHead = ({ title, description }: { title: string, description: string }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:type" content="website"/>
            <meta property="og:image" content="/path/to/image.jpg"/>
            <link rel="icon" href="/favicon.webp"/>
        </Head>
    );
};

export default CustomHead;
