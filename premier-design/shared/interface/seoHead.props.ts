/** SEO / JSON-LD контракты для `<head>` и типов страниц (`TitlePage`). Слой `shared` — без зависимости от `widgets`. Доменные DTO — `@entities/seo`, `@entities/review`. */

import type { FaqStructuredDataItem, ServiceJsonLdInput } from '@entities/seo';
import type { StructuredDataAggregateRating } from '@entities/review';

export type { FaqStructuredDataItem, ServiceJsonLdInput };

export interface CustomHeadProps {
	metaTitle: string;
	metaDescription: string;
	canonical: string;
	/** Вопросы/ответы для JSON-LD `FAQPage` на URL страницы (без дубля видимого контента не ставить). */
	faqForStructuredData?: FaqStructuredDataItem[];
	/** Рейтинг для `AggregateRating` у `LocalBusiness`; только при согласованных данных с блоком доверия. Тип: `@entities/review`. */
	structuredDataRating?: StructuredDataAggregateRating;
	/** Услуга для JSON-LD `Service` (страницы услуг / related). */
	serviceForStructuredData?: ServiceJsonLdInput;
}
