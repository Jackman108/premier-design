import {LayoutProps} from '../interface/Layout.props';
import styles from './Layout.module.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import {FC, ReactElement} from 'react';
import ChatBotSidebar from '../components/ChatBotSidebar/ChatBotSidebar';
import CalculatorButton from "../components/CalculatorButton/CalculatorButton";

const Layout: FC<LayoutProps> = ({children, headerProps, footerProps, costingCards}: LayoutProps): ReactElement => {

    return (
        <>
            <Header {...headerProps}/>
            <main className={styles.body} role='main'>
                {children}
                <ChatBotSidebar/>
                <CalculatorButton costingCards={costingCards}/>
            </main>
            <Footer {...footerProps}/>
        </>
    );
}
export default Layout;
