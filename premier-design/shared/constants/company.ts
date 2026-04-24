/**
 * Единый источник публичных идентификаторов сайта, оператора и внешних контрагентов (вне `data.json`).
 * При смене домена, бренда, юр. лица или контактов для ПДн — править здесь; `public/robots.txt` (Sitemap) держать в синхроне с `SITE_OPERATOR.publicOrigin`.
 */

export const SITE_OPERATOR = {
	publicOrigin: 'https://premium-interior.by',
	brandName: 'Premium Interior',
	copyrightStartYear: 2012,
	/** Контакт для вопросов по персональным данным и юридическим текстам. */
	privacyContactEmail: 'premium-interior@tut.by',
	/** Как в офертах и политике конфиденциальности. */
	legalEntityShortName: 'ИП Коробова Е.В.',
	structuredData: {
		sameAs: [
			'https://t.me/PremiumInterior',
			'https://www.instagram.com/proremont_zhl',
			'https://vk.com/premium_interior_zhl',
		],
		address: {
			streetAddress: 'Pervomayskaya',
			addressLocality: 'Zhlobin',
			postalCode: '247210',
			addressCountry: 'BY',
		},
		areaServed: [
			{'@type': 'City', name: 'Zhlobin'},
			{'@type': 'Country', name: 'Belarus'},
		],
		priceRange: '$$',
	},
} as const;

/** Канонический production-origin без завершающего слэша (sitemap, JSON-LD id, `getFullCanonicalUrl`). */
export const SITE_PUBLIC_ORIGIN = SITE_OPERATOR.publicOrigin;

export const DEVELOPER_STUDIO_FEB_CODE = {
	siteUrl: 'https://febcode.by',
	logoSrc: '/images/feb_logo.svg',
	logoAlt: 'feb-code',
	creditLabel: 'Разработано',
} as const;
