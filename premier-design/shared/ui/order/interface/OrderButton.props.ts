import {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import {PanelProps} from "@features/buttons-panel/interface/PanelButton.props";

export interface OrderButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    buttonStyle: 'button-white' | 'button-black' | 'button-panel' | 'button-none';
    buttonData: string;
    panelData?: PanelProps;
}
