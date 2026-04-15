'use client';

import * as Dialog from '@radix-ui/react-dialog';
import type {FC, ReactNode} from 'react';

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
					<Dialog.Title
						style={{
							position: 'absolute',
							width: '1px',
							height: '1px',
							padding: 0,
							margin: '-1px',
							overflow: 'hidden',
							clip: 'rect(0, 0, 0, 0)',
							whiteSpace: 'nowrap',
							border: 0,
						}}
					>
						{title}
					</Dialog.Title>
					<Dialog.Description
						style={{
							position: 'absolute',
							width: '1px',
							height: '1px',
							padding: 0,
							margin: '-1px',
							overflow: 'hidden',
							clip: 'rect(0, 0, 0, 0)',
							whiteSpace: 'nowrap',
							border: 0,
						}}
					>
						{description}
					</Dialog.Description>
					{children}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
