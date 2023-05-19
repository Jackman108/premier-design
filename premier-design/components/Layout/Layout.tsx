import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { useRef } from 'react';
import { getData } from '../../pages/api/data';

export default function Layout({ children }: LayoutProps): JSX.Element {
    const data = getData();
    const bodyRef = useRef<HTMLDivElement>(null);
    return (
        <>
            <Header  data={data}/>
            <main
                className={styles.body}
                ref={bodyRef}
                role='main'>
                {children}
            </main>
            <Footer data={data}/>
        </>
    );
}