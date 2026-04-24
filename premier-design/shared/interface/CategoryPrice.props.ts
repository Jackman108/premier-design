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
