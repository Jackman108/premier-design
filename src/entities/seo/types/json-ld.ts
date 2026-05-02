/** Входные данные для JSON-LD `Service` (страницы услуг / related). */
export type ServiceJsonLdInput = {
	name: string;
	description: string;
	url: string;
};

/** Элемент FAQ для JSON-LD `FAQPage`. */
export type FaqStructuredDataItem = {
	question: string;
	answer: string;
};
