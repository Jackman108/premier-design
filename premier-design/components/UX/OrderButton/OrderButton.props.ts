import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

interface OrderButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    type?: 'button' | 'submit' | 'reset' | undefined;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    buttonStyle: 'button-white' | 'button-black' | 'button-none';
    buttonHeader?: string;
}

export type { OrderButtonProps };