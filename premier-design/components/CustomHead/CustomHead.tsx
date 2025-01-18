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
            <meta property="og:url" content={canonical}/>
            <meta property="og:image" content="/logo.png"/>
            <meta property="og:site_name" content="Premium Interior"/>

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content="/logo.png" />


            <link rel="canonical" href={canonical}/>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{"__html": JSON.stringify(structuredData)}}
            />
        </Head>
    );
};

export default CustomHead;
