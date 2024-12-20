import type {AppProps} from 'next/app';
import {ThemeProvider} from 'next-themes';
import '../styles/globals.css';
import "keen-slider/keen-slider.min.css";
import {FC} from 'react';
import CustomHead from "../components/CustomHead/CustomHead";

const MyApp: FC<AppProps> = ({Component, pageProps}) => {
    return (
        <ThemeProvider
            defaultTheme="light"
            themes={['light', 'dark']}
            attribute="class">
            <CustomHead title="Premium Interior" description="Ремонт и дизайн интерьеров" />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;