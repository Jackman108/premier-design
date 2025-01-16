import React, {FC} from "react";
import {ButtonProps} from "../../../interface/Button.props";
import {PanelProps} from "../../../interface/Panel.props";
import {CostingCardProps} from "../../../interface/Costing.props";
import {findItemByTitle} from "../../../utils/findItemByTitle";
import {findPanelById} from "../../../utils/findPanelById";
import OrderButton from "../OrderButton/OrderButton";
import ChatBotSidebar from "../../ChatBotSidebar/ChatBotSidebar";
import CalculatorButton from "../CalculatorButton/CalculatorButton";
import styles from './ButtonsPanel.module.css';

interface ButtonsPanelProps {
    buttonData: ButtonProps[];
    panelData: PanelProps[];
    costingCards: CostingCardProps[];
}

const ButtonsPanel: FC<ButtonsPanelProps> = ({buttonData, panelData, costingCards}) => {
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
