import { Html, Head, Main, NextScript } from 'next/document';

const SEOHead = () => (
    <>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Premium Interior - ремонт и дизайн интерьеров в Беларуси" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Premier Design" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
        <meta httpEquiv="Expires" content="31536000" />
        <meta httpEquiv="Pragma" content="public" />
        <link rel="canonical" href="https://premier-design.by/" />
    </>
);

export default function Document() {
    return (
        <Html lang="ru">
            <Head>
                <SEOHead />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    );
}
