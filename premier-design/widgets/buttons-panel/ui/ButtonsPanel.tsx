import dynamic from 'next/dynamic';
import React, {FC} from "react";
import {findItemByTitle} from "@shared/utils/findItemByTitle";
import {findPanelById} from "../utils/findPanelById";
import OrderButton from "@shared/ui/order/ui/OrderButton/OrderButton";
import {CalculatorButton} from '@features/buttons-panel';
import styles from './ButtonsPanel.module.css';
import {ButtonsPanelProps} from "../interface/ButtonsPanel.props";

const ChatBotSidebar = dynamic(() => import('@features/buttons-panel/ui/ChatBotSidebar/ChatBotSidebar'), {
	ssr: false,
	loading: () => null,
});

const ButtonsPanel: FC<ButtonsPanelProps> = ({additionalData}) => {
    const {costingCards, buttonData, panelData} = additionalData;

    const buttonHeader = findItemByTitle(buttonData, "get_counseling");
    const phoneButton = findPanelById(panelData, "phoneButton");
    const calculatorButton = findPanelById(panelData, "calculatorButton");
    const chatButton = findPanelById(panelData, "chatButton");

    return (
        <aside className={styles.buttonsContainer} aria-label="Быстрые действия">
            <div className={styles.buttonsDock}>
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
            </div>
        </aside>
    );
};

export default ButtonsPanel;
