import type {AppProps} from 'next/app';
import {ThemeProvider} from 'next-themes';
import '../styles/globals.css';
import "keen-slider/keen-slider.min.css";

import Head from 'next/head';
import {FC} from 'react';

const MyApp: FC<AppProps> = ({Component, pageProps}) => {
    return (
        <ThemeProvider
            defaultTheme="light"
            themes={['light', 'dark']}
            attribute="class">
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;