import dynamic from 'next/dynamic';
import React, {FC} from "react";
import {findItemByTitle} from "../../../utils/findItemByTitle";
import {findPanelById} from "../../../utils/findPanelById";
import OrderButton from "../OrderButton/OrderButton";
import CalculatorButton from "../CalculatorButton/CalculatorButton";

const ChatBotSidebar = dynamic(() => import('../../ChatBotSidebar/ChatBotSidebar'), {
	ssr: false,
	loading: () => null,
});
import styles from './ButtonsPanel.module.css';
import {ButtonsPanelProps} from "../../../interface/ButtonsPanel.props";


const ButtonsPanel: FC<ButtonsPanelProps> = ({additionalData}) => {
    const {costingCards, buttonData, panelData} = additionalData;

    const buttonHeader = findItemByTitle(buttonData, "get_counseling");
    const phoneButton = findPanelById(panelData, "phoneButton");
    const calculatorButton = findPanelById(panelData, "calculatorButton");
    const chatButton = findPanelById(panelData, "chatButton");

    return (
        <aside className={styles.buttonsContainer}>
            {buttonHeader && (
                <OrderButton
                    buttonStyle="button-panel"
                    buttonData={buttonHeader.buttonHeader}
                    panelData={phoneButton}
                />
            )}
            {chatButton && <ChatBotSidebar panelData={chatButton}/>}
            {calculatorButton && (
                <CalculatorButton costingCards={costingCards} panelData={calculatorButton}/>
            )}
        </aside>
    );
};

export default ButtonsPanel;
