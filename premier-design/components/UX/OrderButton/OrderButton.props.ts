import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

interface OrderButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode;
}

export type { OrderButtonProps };