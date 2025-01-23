import React, {FC} from "react";
import {findItemByTitle} from "@shared/utils/findItemByTitle";
import {findPanelById} from "../utils/findPanelById";
import OrderButton from "@shared/ui/order/ui/OrderButton/OrderButton";
import ChatBotSidebar from "@features/buttons-panel/ui/ChatBotSidebar/ChatBotSidebar";
import CalculatorButton from "@features/buttons-panel/ui/CalculatorButton/CalculatorButton";
import styles from './ButtonsPanel.module.css';
import {ButtonsPanelProps} from "../interface/ButtonsPanel.props";


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
