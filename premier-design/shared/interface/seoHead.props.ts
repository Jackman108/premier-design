/** SEO / JSON-LD контракты для `<head>` и типов страниц (`TitlePage`). Слой `shared` — без зависимости от `widgets`. */

export type ServiceJsonLdInput = {
	name: string;
	description: string;
	url: string;
};

export type FaqStructuredDataItem = {
	question: string;
	answer: string;
};

export type StructuredDataAggregateRating = {
	ratingValue: string;
	reviewCount: number;
	bestRating: string;
};

export interface CustomHeadProps {
	metaTitle: string;
	metaDescription: string;
	canonical: string;
	/** Вопросы/ответы для JSON-LD `FAQPage` на URL страницы (без дубля видимого контента не ставить). */
	faqForStructuredData?: FaqStructuredDataItem[];
	/** Рейтинг для `AggregateRating` у `LocalBusiness`; только при согласованных данных с блоком доверия. */
	structuredDataRating?: StructuredDataAggregateRating;
	/** Услуга для JSON-LD `Service` (страницы услуг / related). */
	serviceForStructuredData?: ServiceJsonLdInput;
}
