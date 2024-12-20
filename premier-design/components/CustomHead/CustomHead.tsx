import Head from 'next/head';
import {CustomHeadProps} from "./CustomHead.props";

const CustomHead = ({ title, description }: CustomHeadProps) => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Premium Interior",
        "url": "https://example.com",
        "logo": "/logo.png",
        "sameAs": ["https://www.facebook.com/PremiumInterior", "https://twitter.com/PremiumInterior"],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Pervomayskaya",
            "addressLocality": "Zhlobin",
            "postalCode": "247210",
            "addressCountry": "BY"
        }
    };

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:type" content="website"/>
            <meta property="og:image" content="/path/to/image.jpg"/>
            <link rel="icon" href="/favicon.webp"/>
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Head>
    );
};

export default CustomHead;
