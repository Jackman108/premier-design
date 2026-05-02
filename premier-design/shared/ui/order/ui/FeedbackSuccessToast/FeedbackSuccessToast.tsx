'use client';

import type { FC } from 'react';

import { UI, useLocale } from '@shared/i18n';
import { FEEDBACK_SUCCESS_TOAST_MS } from '@shared/ui/order/constants';
import { BodyPortal } from '@shared/ui/portal/BodyPortal';

import styles from './FeedbackSuccessToast.module.css';

export type FeedbackSuccessToastProps = {
	open: boolean;
	durationMs?: number;
};

export const FeedbackSuccessToast: FC<FeedbackSuccessToastProps> = ({
	open,
	durationMs = FEEDBACK_SUCCESS_TOAST_MS,
}) => {
	const { t } = useLocale();

	if (!open) {
		return null;
	}

	return (
		<BodyPortal>
			<div
				className={styles.wrap}
				role="status"
				aria-live="polite"
				aria-atomic="true"
				data-testid="feedback-success-toast"
			>
				<div className={styles.card}>
					<div className={styles.inner}>
						<div className={styles.icon} aria-hidden>
							✓
						</div>
						<div className={styles.textBlock}>
							<p className={styles.title}>{t(UI.feedbackSuccessTitle)}</p>
							<p className={styles.subtitle}>{t(UI.feedbackSuccessSubtitle)}</p>
						</div>
					</div>
					<div className={styles.progress} style={{ animationDuration: `${durationMs}ms` }} aria-hidden />
				</div>
			</div>
		</BodyPortal>
	);
};
