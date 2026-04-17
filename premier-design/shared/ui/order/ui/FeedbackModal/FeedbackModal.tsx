'use client';
import type {FC, MouseEvent} from 'react';

import {BodyPortal} from '@shared/ui/portal/BodyPortal';
import FeedbackForm from '@shared/ui/order/ui/FeedbackForm/FeedbackForm';
import {FeedbackModalProps} from '@shared/ui/order/interface/FeedbackModal.props';

import styles from './FeedbackModal.module.css';

const FeedbackModal: FC<FeedbackModalProps> = ({onClose, onSubmit, initialMessage}) => {
	const handleOverlayClick = (event: MouseEvent<HTMLDialogElement>) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	return (
		<BodyPortal>
			<dialog
				className={styles.overlay}
				open
				onCancel={onClose}
				onMouseDown={handleOverlayClick}
				aria-labelledby='feedback-modal-heading'
				aria-describedby='feedback-modal-description'
			>
				<div className={styles.modal}>
					<div className={styles.modal_top}>
						<div className={styles.modal_text}>
							<h3 id='feedback-modal-heading'>Оставьте заявку</h3>
							<p id='feedback-modal-description'>Мы свяжемся в ближайшее время</p>
						</div>
						<button
							className={styles.closeButton}
							type='button'
							onClick={onClose}
							aria-label='Закрыть форму'
						>
							&times;
						</button>
					</div>
					<div className={styles.modal__container}>
						<FeedbackForm initialMessage={initialMessage} onSubmit={onSubmit} />
					</div>
				</div>
			</dialog>
		</BodyPortal>
	);
};

export default FeedbackModal;
