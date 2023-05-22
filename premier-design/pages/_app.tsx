import type { AppProps, NextWebVitalsMetric } from 'next/app';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import "keen-slider/keen-slider.min.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProvider
            defaultTheme="light"
            themes={['light', 'dark']}
            attribute="class">
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
    console.log(metric);
}

export default MyApp;