import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import '@styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider defaultTheme="light" attribute="class">
            <Header />
            <Component {...pageProps} />
            <Footer />
        </ThemeProvider>
    );
}

export default MyApp;