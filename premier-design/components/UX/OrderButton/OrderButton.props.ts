import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

interface OrderButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    onClick?: () => void;
    buttonStyle: 'button-white' | 'button-black';
}

export type { OrderButtonProps };