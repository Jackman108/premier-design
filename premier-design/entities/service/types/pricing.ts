/**
 * Доменные типы прайса услуг (категории и позиции списка цен).
 * PD-R-05: слой entities — источник правды; shared переэкспортирует для обратной совместимости импортов.
 */
export interface PriceItem {
	service: string;
	unit: string;
	price: string;
	canonical: string;
}

export interface Category {
	id: string;
	title: string;
	description: string;
	image: {
		src: string;
		alt: string;
		quality: number;
		width: number;
		height: number;
	};
	priceList: PriceItem[];
}
