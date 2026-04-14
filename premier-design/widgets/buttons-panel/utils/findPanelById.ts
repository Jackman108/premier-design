import {PanelProps} from "@features/buttons-panel/interface/PanelButton.props";

export const findPanelById = (panelData: PanelProps[], id: string): PanelProps => {
    const defaultPanel = {
        id: "",
        icon: "",
        altText: "",
        text: "",
        position: { bottom: "0%" },
        onClick: () => {},
    };

    return panelData.find(panel => panel.id === id) || defaultPanel;
};