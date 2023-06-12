import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { FC, useRef } from 'react';
import ChatBotSidebar from '../components/ChatBotSidebar/ChatBotSidebar';

const Layout: FC<LayoutProps> = ({ children, data }): JSX.Element => {
    const bodyRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <Header data={data} />
            
            <main
                className={styles.body}
                ref={bodyRef}
                role='main'>
                {children}
                <ChatBotSidebar />
            </main>
            <Footer data={data} />
        </>
    );
}
export default Layout;
