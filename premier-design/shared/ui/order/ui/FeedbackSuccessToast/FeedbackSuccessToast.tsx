'use client';

import type {FC} from 'react';

import {FEEDBACK_SUCCESS_TOAST_MS} from '@shared/ui/order/constants';
import {BodyPortal} from '@shared/ui/portal/BodyPortal';

import styles from './FeedbackSuccessToast.module.css';

export type FeedbackSuccessToastProps = {
	open: boolean;
	/** Длительность анимации прогресса (= таймер скрытия в `useFeedback`). */
	durationMs?: number;
};

/**
 * Отдельное от модалки формы уведомление об успешной отправке: портал, семантические токены, ~5s до скрытия снаружи.
 */
export const FeedbackSuccessToast: FC<FeedbackSuccessToastProps> = ({
	open,
	durationMs = FEEDBACK_SUCCESS_TOAST_MS,
}) => {
	if (!open) {
		return null;
	}

	return (
		<BodyPortal>
			<div
				className={styles.wrap}
				role='status'
				aria-live='polite'
				aria-atomic='true'
				data-testid='feedback-success-toast'
			>
				<div className={styles.card}>
					<div className={styles.inner}>
						<div className={styles.icon} aria-hidden>
							✓
						</div>
						<div className={styles.textBlock}>
							<p className={styles.title}>Заявка отправлена</p>
							<p className={styles.subtitle}>Мы свяжемся с вами в ближайшее время.</p>
						</div>
					</div>
					<div
						className={styles.progress}
						style={{animationDuration: `${durationMs}ms`}}
						aria-hidden
					/>
				</div>
			</div>
		</BodyPortal>
	);
};
