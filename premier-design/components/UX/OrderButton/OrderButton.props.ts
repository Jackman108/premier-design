import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

interface OrderButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    onClick?: () => void;
}

export type { OrderButtonProps };