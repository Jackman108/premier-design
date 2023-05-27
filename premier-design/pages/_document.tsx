import { Html, Head, Main, NextScript } from 'next/document';


export default function Document(): JSX.Element {
    return (
        <Html lang='ru'>
            <Head >
                <title>Premium Interior | Ремонт и дизайн интерьеров в Беларуси</title>
                <meta
                    name="description"
                    content="Premium Interior - ремонт и дизайн интерьеров в Беларуси"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
                <meta httpEquiv="Expires" content="31536000" />
                <meta httpEquiv="Pragma" content="public" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html >
    );
};

