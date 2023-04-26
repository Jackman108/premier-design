    import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

    interface ArrowButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
        onClick?: () => void;
    }
    
    export type { ArrowButtonProps };