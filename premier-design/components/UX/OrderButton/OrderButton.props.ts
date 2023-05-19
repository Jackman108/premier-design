import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

interface OrderButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    buttonStyle: 'button-white' | 'button-black' | 'button-none';
    buttonHeader?: string;
}
export type { OrderButtonProps };
interface OrderButtonState {
    showModal: boolean;
    error: string;
}
export type { OrderButtonState };