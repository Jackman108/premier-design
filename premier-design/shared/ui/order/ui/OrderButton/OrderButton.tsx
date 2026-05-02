'use client';

import React, { FC } from 'react';

import { UI, useLocale } from '@shared/i18n';
import PanelButton from '@shared/ui/panel-button/PanelButton';
import { useFeedback } from '@shared/ui/order/hooks/useFeedback';
import { useOrderButtonOpenHandler } from '@shared/ui/order/hooks/useOrderButtonOpenHandler';
import { OrderButtonProps } from '@shared/ui/order/interface/OrderButton.props';
import FeedbackModal from '@shared/ui/order/ui/FeedbackModal/FeedbackModal';
import { FeedbackSuccessToast } from '@shared/ui/order/ui/FeedbackSuccessToast/FeedbackSuccessToast';

import styles from './OrderButton.module.css';

const OrderButton: FC<OrderButtonProps> = ({
	buttonData,
	buttonStyle,
	panelData,
	prefilledMessage,
	trackingContext,
	...buttonDomProps
}: OrderButtonProps) => {
	const { t } = useLocale();
	const { isOpen, openModalWithMessage, closeModal, handleSubmit, initialMessage, error, isSuccess, successToastMs } =
		useFeedback();
	const buttonClass = styles[buttonStyle];

	const handleOpenModal = useOrderButtonOpenHandler(
		buttonStyle,
		prefilledMessage,
		trackingContext,
		openModalWithMessage,
	);

	return (
		<>
			{buttonStyle === 'button-panel' && panelData ? (
				<PanelButton {...panelData} onClick={handleOpenModal} />
			) : (
				buttonData && (
					<button
						{...buttonDomProps}
						className={`${styles['button-base']} ${buttonClass}`}
						type="button"
						onClick={handleOpenModal}
						aria-label={t(UI.orderPlaceOrderAria)}
					>
						{buttonData}
					</button>
				)
			)}
			{isOpen && <FeedbackModal onClose={closeModal} onSubmit={handleSubmit} initialMessage={initialMessage} />}
			{error && <p className={styles.error}>{error}</p>}
			<FeedbackSuccessToast open={isSuccess} durationMs={successToastMs} />
		</>
	);
};

export default OrderButton;
