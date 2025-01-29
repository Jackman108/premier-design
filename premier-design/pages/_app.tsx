import type {AppProps} from 'next/app';
import {ThemeProvider} from 'next-themes';
import '@widgets/styles/globals.css';
import "keen-slider/keen-slider.min.css";
import {FC} from 'react';

const MyApp: FC<AppProps> = ({Component, pageProps}) => {
    return (
        <ThemeProvider
            defaultTheme="light"
            themes={['light', 'dark']}
            attribute="class">
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;