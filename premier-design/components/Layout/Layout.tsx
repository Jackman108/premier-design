import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { useRef } from 'react';

export default function Layout({ children, data }: LayoutProps): JSX.Element {
    const bodyRef = useRef<HTMLDivElement>(null);
    return (
        <>
            <Header data={data} />
            <main
                className={styles.body}
                ref={bodyRef}
                role='main'>
                {children}
            </main>
            <Footer data={data} />
        </>
    );
}