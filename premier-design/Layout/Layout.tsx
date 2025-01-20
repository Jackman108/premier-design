import {LayoutProps} from '../interface/Layout.props';
import styles from './Layout.module.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import {FC, ReactElement} from 'react';
import ButtonsPanel from "../components/UX/ButtonsPanel/ButtonsPanel";

const Layout: FC<LayoutProps> = ({
                                     children, headerProps, footerProps, additionalData
                                 }: LayoutProps): ReactElement => {
    return (
        <>
            <Header {...headerProps}/>
            <main className={styles.body} role='main'>
                {children}
                <ButtonsPanel additionalData={additionalData}/>
            </main>
            <Footer {...footerProps}/>
        </>
    );
}
export default Layout;
