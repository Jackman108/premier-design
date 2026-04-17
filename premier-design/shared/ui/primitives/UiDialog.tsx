'use client';

import * as Dialog from '@radix-ui/react-dialog';
import type {FC, ReactNode} from 'react';

import styles from './UiDialog.module.css';

type UiDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	contentClassName: string;
	overlayClassName: string;
	title?: string;
	description?: string;
	children: ReactNode;
};

export const UiDialog: FC<UiDialogProps> = ({
	open,
	onOpenChange,
	contentClassName,
	overlayClassName,
	title = 'Диалоговое окно',
	description = 'Модальное окно с дополнительным содержимым.',
	children,
}) => {
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className={overlayClassName} />
				<Dialog.Content className={contentClassName}>
					<Dialog.Title className={styles.visuallyHidden}>
						{title}
					</Dialog.Title>
					<Dialog.Description className={styles.visuallyHidden}>
						{description}
					</Dialog.Description>
					{children}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
