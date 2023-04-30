import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import "keen-slider/keen-slider.min.css";
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <ThemeProvider
            defaultTheme="light"
            themes={['light', 'dark']}
            attribute="class">
            <Head>
                <title>Premium Interior - Ремонт и дизайн интерьеров в Беларуси</title>
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
                <link href="http://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
                <link href="http://fonts.googleapis.com/css2?family=Public+Sans:wght@600&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
            </Head>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;