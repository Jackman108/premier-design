type MarketingPayload = Record<string, string | number | boolean | null | undefined>;

type DataLayerEvent = MarketingPayload & {
	event: string;
};

type WindowWithDataLayer = Window & {
	dataLayer?: DataLayerEvent[];
};

export const trackMarketingEvent = (eventName: string, payload: MarketingPayload = {}): void => {
	if (typeof window === 'undefined') {
		return;
	}

	const browserWindow = window as WindowWithDataLayer;
	const eventPayload: DataLayerEvent = { event: eventName, ...payload };

	if (Array.isArray(browserWindow.dataLayer)) {
		browserWindow.dataLayer.push(eventPayload);
	}
};
