import {Head, Html, Main, NextScript} from 'next/document';
import {inter} from '../lib/interFont';

const SEOHead = () => (
    <>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="index, follow"/>
        <meta name="author" content="Premier Design"/>
        <link rel="icon" href="/favicon.ico"/>
    </>
);

export default function Document() {
    return (
        <Html lang="ru" className={inter.className}>
            <Head>
                <SEOHead/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
