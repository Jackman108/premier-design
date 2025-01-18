import {CustomHeadProps} from "./CustomHead.props";
import {generateStructuredData} from "../../utils/generateStructuredData";
import Head from 'next/head';

const CustomHead = ({title, description, canonical}: CustomHeadProps) => {
    const structuredData = generateStructuredData();

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:type" content="website"/>
            <link rel="canonical" href={canonical}/>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{"__html": JSON.stringify(structuredData)}}
            />
        </Head>
    );
};

export default CustomHead;
