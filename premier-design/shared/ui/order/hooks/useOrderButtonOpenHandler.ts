import { useCallback } from 'react';

import { trackMarketingEvent } from '@shared/analytics/trackMarketingEvent';
import type { OrderButtonProps } from '@shared/ui/order/interface/OrderButton.props';

type OpenModalWithMessage = (message?: string) => void;

/** Открытие модалки заявки + маркетинговый трекинг — логика вне `ui/OrderButton`. */
export const useOrderButtonOpenHandler = (
	buttonStyle: OrderButtonProps['buttonStyle'],
	prefilledMessage: OrderButtonProps['prefilledMessage'],
	trackingContext: OrderButtonProps['trackingContext'],
	openModalWithMessage: OpenModalWithMessage,
) =>
	useCallback(() => {
		if (trackingContext) {
			trackMarketingEvent('cta_open_order_modal', {
				context: trackingContext,
				buttonStyle,
			});
		}

		openModalWithMessage(prefilledMessage);
	}, [buttonStyle, openModalWithMessage, prefilledMessage, trackingContext]);
