import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <ThemeProvider defaultTheme="light" attribute="class">
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;