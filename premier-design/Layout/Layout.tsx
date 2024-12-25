import {LayoutProps} from '../interface/Layout.props';
import styles from './Layout.module.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import {FC, ReactElement} from 'react';
import ChatBotSidebar from '../components/ChatBotSidebar/ChatBotSidebar';

const Layout: FC<LayoutProps> = ({children, data}: LayoutProps): ReactElement => {

    return (
        <>
            <Header data={data}/>
            <main className={styles.body} role='main'>
                {children}
                <ChatBotSidebar/>
            </main>
            <Footer data={data}/>
        </>
    );
}
export default Layout;
