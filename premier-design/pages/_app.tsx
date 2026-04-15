import type {AppProps} from 'next/app';
import {ThemeProvider} from 'next-themes';
import '@widgets/styles/globals.css';
import "keen-slider/keen-slider.min.css";
import {FC} from 'react';
import {ThemeStoreProvider} from '@shared/store/themeStore';
import {AppErrorBoundary} from '@shared/ui/error-boundary/AppErrorBoundary';

const MyApp: FC<AppProps> = ({Component, pageProps}) => (
    <ThemeProvider defaultTheme="light" themes={['light', 'dark']} attribute="class">
        <ThemeStoreProvider>
            <AppErrorBoundary>
                <Component {...pageProps} />
            </AppErrorBoundary>
        </ThemeStoreProvider>
    </ThemeProvider>
);

export default MyApp;