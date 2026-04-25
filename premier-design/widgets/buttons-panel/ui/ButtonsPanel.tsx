import dynamic from 'next/dynamic';
import React, {FC} from "react";
import {findItemByTitle} from "@shared/utils/findItemByTitle";
import {findPanelById} from "../utils/findPanelById";
import OrderButton from "@shared/ui/order/ui/OrderButton/OrderButton";
import {EstimateButton} from '@features/buttons-panel';
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
    const estimateButton = findPanelById(panelData, "estimateButton");
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
                {estimateButton && (
                    <EstimateButton costingCards={costingCards} panelData={estimateButton}/>
                )}
            </div>
        </aside>
    );
};

export default ButtonsPanel;
