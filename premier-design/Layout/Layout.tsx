import {LayoutProps} from '../interface/Layout.props';
import styles from './Layout.module.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import {FC, ReactElement} from 'react';
import ChatBotSidebar from '../components/ChatBotSidebar/ChatBotSidebar';
import CalculatorButton from "../components/UX/CalculatorButton/CalculatorButton";
import OrderButton from "../components/UX/OrderButton/OrderButton";
import {findItemByTitle} from "../utils/findItemByTitle";
import {ButtonProps} from "../interface/Button.props";
import {findPanelById} from "../utils/findPanelById";

const Layout: FC<LayoutProps> = ({
                                     children,
                                     headerProps,
                                     footerProps,
                                     costingCards,
                                     buttonData,
                                     panelData
                                 }: LayoutProps): ReactElement => {
    const buttonHeader = findItemByTitle(buttonData, "get_counseling") || {} as ButtonProps;

    const phoneButton = findPanelById(panelData, "phoneButton");
    const calculatorButton = findPanelById(panelData, "calculatorButton");
    const chatButton = findPanelById(panelData, "chatButton");

    return (
        <>
            <Header {...headerProps}/>
            <main className={styles.body} role='main'>
                {children}
                <OrderButton buttonStyle='button-panel' buttonData={buttonHeader.buttonHeader} panelData={phoneButton}/>
                <ChatBotSidebar panelData={chatButton}/>
                <CalculatorButton costingCards={costingCards} panelData={calculatorButton}/>
            </main>
            <Footer {...footerProps}/>
        </>
    );
}
export default Layout;
