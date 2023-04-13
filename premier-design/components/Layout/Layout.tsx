import { LayoutProps } from './Layout.props';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}