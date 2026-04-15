'use client';

import * as Dialog from '@radix-ui/react-dialog';
import type {FC, ReactNode} from 'react';

type UiDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	contentClassName: string;
	overlayClassName: string;
	children: ReactNode;
};

export const UiDialog: FC<UiDialogProps> = ({
	open,
	onOpenChange,
	contentClassName,
	overlayClassName,
	children,
}) => {
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className={overlayClassName} />
				<Dialog.Content className={contentClassName}>{children}</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
