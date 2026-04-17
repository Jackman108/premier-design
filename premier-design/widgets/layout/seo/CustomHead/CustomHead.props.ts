import type {ServiceJsonLdInput} from '../types/serviceJsonLd';

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