import {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import {PanelProps} from "@shared/interface/Panel.props";

export interface OrderButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    buttonStyle: 'button-white' | 'button-black' | 'button-panel' | 'button-none';
    buttonData: string;
    panelData?: PanelProps;
    prefilledMessage?: string;
    trackingContext?: string;
}

