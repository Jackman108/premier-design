import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

export interface OrderButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    buttonStyle: 'button-white' | 'button-black' | 'button-none';
    buttonHeader: string;
}

export interface OrderButtonState {
    showModal: boolean;
    error: string;
}
