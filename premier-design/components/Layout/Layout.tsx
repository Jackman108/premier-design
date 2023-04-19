import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Layout({ children }: LayoutProps): JSX.Element {
    return (
        <>
            <Header />
            <main className={styles.body}>
                {children}
            </main>
            <Footer />
        </>
    );
}