import Head from 'next/head';
import {CustomHeadProps} from "./CustomHead.props";
import {generateStructuredData} from "../../utils/generateStructuredData";

const CustomHead = ({title, description, canonical}: CustomHeadProps) => {
    const structuredData = generateStructuredData();

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:type" content="website"/>
            <meta property="og:image" content="/path/to/image.jpg"/>
            <link rel="icon" href="/favicon.webp"/>
            <link rel="canonical" href={canonical}/>
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Head>
    );
};

export default CustomHead;
